import httpx
from fastapi import Request
from starlette.middleware.base import BaseHTTPMiddleware


DETECTION_ENGINE_URL = "http://detection-engine:8001/check"


class RequestInspectorMiddleware(BaseHTTPMiddleware):

    async def dispatch(self, request: Request, call_next):
        client_ip = request.client.host if request.client else "unknown"
        path = request.url.path
        method = request.method

        request_data = {
            "ip": client_ip,
            "path": path,
            "method": method
        }

        try:
            async with httpx.AsyncClient(timeout=3.0) as client:
                response = await client.post(
                    DETECTION_ENGINE_URL,
                    json=request_data
                )
                response.raise_for_status()
                detection_result = response.json()

        except (httpx.TimeoutException, httpx.RequestError):
            detection_result = {
                "status": "unavailable",
                "message": "Detection engine could not be reached"
            }

        except httpx.HTTPStatusError:
            detection_result = {
                "status": "error",
                "message": "Detection engine returned an error"
            }

        request.state.detection_result = detection_result

        response = await call_next(request)
        return response
