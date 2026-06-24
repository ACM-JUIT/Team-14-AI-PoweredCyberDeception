from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from app.db.mongodb import database
from app.core.security import verify_password

router = APIRouter()


class LoginRequest(BaseModel):
    email: str
    password: str


@router.post("/login")
async def login(data: LoginRequest):

    if database is None:
        raise HTTPException(status_code=500, detail="Database not connected")

    user = await database.users.find_one({"email": data.email})

    if not user:
        raise HTTPException(status_code=401, detail="Invalid email or password")

    if not verify_password(data.password, user["password_hash"]):
        raise HTTPException(status_code=401, detail="Invalid email or password")

    return {
        "success": True,
        "message": "Login successful",
        "email": user["email"]
    }
