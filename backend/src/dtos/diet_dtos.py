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


class DietMealEntryCreationDTO(BaseModel):
    day_of_week: DayOfWeekDTO
    time_of_day: datetime.time
    food_name: str
    food_category: str
    calories: float


class DietCreationDTO(BaseModel):
    name: str
    description: Optional[str] = None
    meals: List[DietMealEntryCreationDTO]


class DietUpdateDTO(BaseModel):
    name: str
    description: Optional[str] = None
    meals: List[DietMealEntryCreationDTO]


# ====================== RESPONSES ====================== #


class DietMealEntryResponseDTO(BaseModel):
    id: int
    day_of_week: DayOfWeekDTO
    time_of_day: datetime.time
    food_name: str
    food_category: str
    calories: float


class DietResponseDTO(BaseModel):
    id: int
    name: str
    description: Optional[str] = None
    user_id: int
    meals: List[DietMealEntryResponseDTO]
