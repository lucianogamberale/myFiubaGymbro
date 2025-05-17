from datetime import datetime
from typing import Optional

from pydantic import BaseModel
from src.repositories.models.exercise import ExerciseCategory

# ====================== REQUESTS ====================== #


class UserExerciseCreationDTO(BaseModel):
    exercise_name: str
    exercise_category: ExerciseCategory
    duration: Optional[float]
    calories: float
    date: datetime


# ====================== RESPONSES ====================== #


class UserExerciseResponseDTO(BaseModel):
    id: Optional[int]
    exercise_name: str
    duration: Optional[float]
    calories: float
    date: datetime
