import datetime
from enum import Enum as PyEnum
from typing import List, Optional

from pydantic import BaseModel

# ====================== ENUMS ====================== #


class DayOfWeekDTO(PyEnum):
    MONDAY = "MONDAY"
    TUESDAY = "TUESDAY"
    WEDNESDAY = "WEDNESDAY"
    THURSDAY = "THURSDAY"
    FRIDAY = "FRIDAY"
    SATURDAY = "SATURDAY"
    SUNDAY = "SUNDAY"

# ====================== REQUESTS ====================== #


class RoutineExerciseEntryCreationDTO(BaseModel):
    day_of_week: DayOfWeekDTO
    time_of_day: datetime.time
    exercise_name: str
    exercise_category: str
    duration: float
    calories_burned: float


class RoutineCreationDTO(BaseModel):
    name: str
    description: Optional[str] = None
    exercises: List[RoutineExerciseEntryCreationDTO]


class RoutineUpdateDTO(BaseModel):
    name: str
    description: Optional[str] = None
    exercises: List[RoutineExerciseEntryCreationDTO]


# ====================== RESPONSES ====================== #


class RoutineExerciseEntryResponseDTO(BaseModel):
    id: int
    day_of_week: DayOfWeekDTO
    time_of_day: datetime.time
    exercise_name: str
    exercise_category: str
    duration: float
    calories_burned: float

class RoutineResponseDTO(BaseModel):
    id: int
    name: str
    description: Optional[str] = None
    user_id: int
    exercises: List[RoutineExerciseEntryResponseDTO]
