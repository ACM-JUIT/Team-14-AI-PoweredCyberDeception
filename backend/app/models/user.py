from pydantic import BaseModel, EmailStr


class Account(BaseModel):
    account_number: str
    balance: float = 0.0


class User(BaseModel):
    name: str
    email: EmailStr
    password_hash: str
    account_number: str
    balance: float = 0.0
