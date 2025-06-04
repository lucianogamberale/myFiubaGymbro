from datetime import datetime
from typing import Optional

from pydantic import BaseModel
from src.repositories.models.exercise import ExerciseCategory

# ====================== REQUESTS ====================== #


class UserExerciseRequestDataDTO(BaseModel):
    exercise_name: str
    exercise_category: ExerciseCategory
    duration: float
    calories: float
    date: datetime


# ====================== RESPONSES ====================== #


class UserExerciseResponseDTO(BaseModel):
    id: int
    exercise_name: str
    exercise_category: ExerciseCategory
    duration: float
    calories: float
    date: datetime
