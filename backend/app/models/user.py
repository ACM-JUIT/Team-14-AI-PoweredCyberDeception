from pydantic import BaseModel


class Account(BaseModel):
    account_number: str
    balance: float = 0.0


class User(BaseModel):
    name: str
    email: str
    password_hash: str
    account_number: str
    balance: float = 0.0



