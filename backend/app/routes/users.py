from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from app.db.mongodb import database

router = APIRouter()


class UpdateUserRequest(BaseModel):
    name: str
    email: str


@router.get("/profile")
async def get_profile(email: str):

    if database is None:
        raise HTTPException(status_code=500, detail="Database not connected")

    user = await database.users.find_one({"email": email})

    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    return {
        "name": user["name"],
        "email": user["email"],
        "account_number": user["account_number"],
        "balance": user["balance"]
    }


@router.put("/update")
async def update_profile(email: str, data: UpdateUserRequest):

    if database is None:
        raise HTTPException(status_code=500, detail="Database not connected")

    result = await database.users.update_one(
        {"email": email},
        {
            "$set": {
                "name": data.name,
                "email": data.email
            }
        }
    )

    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="User not found")

    return {
        "success": True,
        "message": "Profile updated successfully"
    }
