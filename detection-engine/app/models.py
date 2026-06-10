from pydantic import BaseModel
from typing import Dict, Any


class RequestData(BaseModel):
    ip: str
    path: str
    body: str = ""
    headers: Dict[str, Any] = {}