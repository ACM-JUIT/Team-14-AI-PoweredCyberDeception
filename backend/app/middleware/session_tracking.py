import uuid
from datetime import datetime, timezone

from fastapi import Request
from starlette.middleware.base import BaseHTTPMiddleware

from app.db.mongodb import database


SESSION_COOKIE_NAME = "session_id"


class SessionTrackingMiddleware(BaseHTTPMiddleware):

    async def dispatch(self, request: Request, call_next):
        session_id = request.cookies.get(SESSION_COOKIE_NAME)
        client_ip = request.client.host if request.client else "unknown"
        now = datetime.now(timezone.utc)
        is_new_session = False

        if not session_id:
            session_id = str(uuid.uuid4())
            is_new_session = True

        request.state.session_id = session_id

        if database is not None:
            if is_new_session:
                await database.sessions.insert_one({
                    "session_id": session_id,
                    "start_time": now,
                    "ip": client_ip,
                    "last_seen": now
                })
            else:
                await database.sessions.update_one(
                    {"session_id": session_id},
                    {
                        "$set": {
                            "ip": client_ip,
                            "last_seen": now
                        }
                    },
                    upsert=True
                )

        response = await call_next(request)

        if is_new_session:
            response.set_cookie(
                key=SESSION_COOKIE_NAME,
                value=session_id,
                httponly=True,
                samesite="lax"
            )

        return response
