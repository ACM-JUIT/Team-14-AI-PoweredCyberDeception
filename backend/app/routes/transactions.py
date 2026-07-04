from datetime import datetime

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from app.db.mongodb import database

router = APIRouter()


class SeedTransactionsRequest(BaseModel):
    email: str


@router.get("/")
async def get_transactions(email: str):
    if database is None:
        raise HTTPException(status_code=500, detail="Database not connected")

    user = await database.users.find_one({"email": email})

    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    transactions = await database.transactions.find(
        {"user_email": email},
        {"_id": 0}
    ).sort("timestamp", -1).to_list(length=100)

    return {
        "email": email,
        "transactions": transactions
    }


@router.post("/seed")
async def seed_transactions(data: SeedTransactionsRequest):
    if database is None:
        raise HTTPException(status_code=500, detail="Database not connected")

    user = await database.users.find_one({"email": data.email})

    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    fake_transactions = [
        {
            "user_email": data.email,
            "type": "credit",
            "amount": 5000.0,
            "description": "Salary credit",
            "timestamp": datetime.utcnow()
        },
        {
            "user_email": data.email,
            "type": "debit",
            "amount": 850.0,
            "description": "Online shopping",
            "timestamp": datetime.utcnow()
        },
        {
            "user_email": data.email,
            "type": "debit",
            "amount": 250.0,
            "description": "Food payment",
            "timestamp": datetime.utcnow()
        }
    ]

    result = await database.transactions.insert_many(fake_transactions)

    return {
        "success": True,
        "message": "Fake transactions seeded successfully",
        "inserted_count": len(result.inserted_ids)
    }
