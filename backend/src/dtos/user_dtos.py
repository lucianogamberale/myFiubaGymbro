import datetime
from typing import Optional

from pydantic import BaseModel

# ====================== REQUESTS ====================== #


class UserCreationDTO(BaseModel):
    name: str
    surname: str
    username: str
    email: str
    password: str


class HealthDataDTO(BaseModel):
    weight: int
    height: int
    age: int
