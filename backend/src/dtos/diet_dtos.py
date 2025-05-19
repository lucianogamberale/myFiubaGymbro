import datetime
from enum import Enum as PyEnum
from typing import List, Optional

from pydantic import BaseModel

# ====================== ENUMS ====================== #


class DayOfWeekDTO(PyEnum):
    """Enum para representar los días de la semana en los DTOs."""

    MONDAY = "MONDAY"
    TUESDAY = "TUESDAY"
    WEDNESDAY = "WEDNESDAY"
    THURSDAY = "THURSDAY"
    FRIDAY = "FRIDAY"
    SATURDAY = "SATURDAY"
    SUNDAY = "SUNDAY"


# ====================== REQUESTS ====================== #


class DietMealEntryCreationDTO(BaseModel):
    """DTO para crear una entrada de comida individual en una dieta."""

    day_of_week: DayOfWeekDTO
    time_of_day: datetime.time
    food_name: str
    food_category: str
    calories: float


class DietCreationDTO(BaseModel):
    """DTO para crear una nueva dieta semanal completa."""

    name: str
    description: Optional[str] = None
    meals: List[DietMealEntryCreationDTO]


class DietUpdateDTO(BaseModel):
    """DTO para actualizar una dieta existente."""

    name: str
    description: Optional[str] = None
    meals: List[DietMealEntryCreationDTO]


# ====================== RESPONSES ====================== #


class DietMealEntryResponseDTO(BaseModel):
    """DTO para la respuesta de una entrada de comida individual de una dieta."""

    id: int
    day_of_week: DayOfWeekDTO
    time_of_day: datetime.time
    food_name: str
    food_category: str
    calories: float


class DietResponseDTO(BaseModel):
    """DTO para la respuesta de una dieta semanal completa."""

    id: int
    name: str
    description: Optional[str] = None
    user_id: int
    meals: List[DietMealEntryResponseDTO]
