import datetime
from typing import Optional

from pydantic import BaseModel

# ====================== REQUESTS ====================== #


class UserExcerciseCreationDTO(BaseModel):
    excercise_name: str
    duration: float
    calories: float
    date_done: datetime.date


# ====================== RESPONSES ====================== #


class UserExcerciseResponseDTO(BaseModel):
    id: Optional[int]
    excercise_name: str
    duration: float
    calories: float
    date_done: datetime.date
