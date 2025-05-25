from datetime import datetime

from pydantic import BaseModel

# ====================== REQUESTS ====================== #


class UserHealthDataCreationDTO(BaseModel):
    weight: int
    height: int
    age: int
    date: datetime


# ====================== RESPONSES ====================== #
