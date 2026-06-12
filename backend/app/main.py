from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.db.mongodb import (
    connect_to_mongo,
    close_mongo_connection,
)

from app.routes import (
    auth,
    users,
    transactions,
    logs,
    stats,
    sessions,
)

app = FastAPI(title="Backend API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
async def startup_event():
    await connect_to_mongo()


@app.on_event("shutdown")
async def shutdown_event():
    await close_mongo_connection()


@app.get("/health")
async def health_check():
    return {"status": "ok"}


app.include_router(auth.router, prefix="/auth")
app.include_router(users.router, prefix="/users")
app.include_router(transactions.router, prefix="/transactions")
app.include_router(logs.router, prefix="/logs")
app.include_router(stats.router, prefix="/stats")
app.include_router(sessions.router, prefix="/sessions")
