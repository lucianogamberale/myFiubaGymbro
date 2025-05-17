from pydantic import BaseModel

# ====================== REQUESTS ====================== #


class UserCreationDTO(BaseModel):
    name: str
    surname: str
    username: str
    email: str
    password: str


class UserHealthDataCreationDTO(BaseModel):
    weight: int
    height: int
    age: int
