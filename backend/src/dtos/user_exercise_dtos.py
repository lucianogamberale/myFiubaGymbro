import datetime
from typing import Optional

from pydantic import BaseModel

# ====================== REQUESTS ====================== #


class UserExerciseCreationDTO(BaseModel):
    exercise_name: str
    duration: float
    calories: float
    date_done: datetime.date


# ====================== RESPONSES ====================== #


class UserExerciseResponseDTO(BaseModel):
    id: Optional[int]
    exercise_name: str
    duration: float
    calories: float
    date_done: datetime.date
