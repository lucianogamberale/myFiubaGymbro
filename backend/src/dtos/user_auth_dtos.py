from datetime import datetime

from pydantic import BaseModel

# ====================== REQUESTS ====================== #


class UserSignUpDTO(BaseModel):
    name: str
    surname: str
    username: str
    email: str
    password: str


class UserLoginDTO(BaseModel):
    email: str
    password: str


# ====================== RESPONSES ====================== #


class AuthResponseDTO(BaseModel):
    id: int
    name: str
    surname: str
    username: str
    email: str
    status: bool
