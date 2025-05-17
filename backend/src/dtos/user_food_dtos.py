import datetime
from enum import Enum
from typing import Optional

from pydantic import BaseModel
from src.repositories.models.food import FoodCategory

# ====================== REQUESTS ====================== #


class UserFoodCreationDTO(BaseModel):
    food_name: str
    food_category: FoodCategory
    calories: float
    date_eaten: datetime.date


# ====================== RESPONSES ====================== #


class UserFoodReponseDTO(BaseModel):
    id: Optional[int]
    food_name: str
    food_category: str
    calories: float
    date_eaten: datetime.date
