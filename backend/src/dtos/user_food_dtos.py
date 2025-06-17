from datetime import datetime
from typing import Optional

from pydantic import BaseModel
from src.repositories.models.food import FoodCategory

# ====================== REQUESTS ====================== #


class UserFoodRequestDataDTO(BaseModel):
    food_name: str
    food_category: FoodCategory
    calories: float
    date: datetime


# ====================== RESPONSES ====================== #


class UserFoodReponseDTO(BaseModel):
    id: int
    food_name: str
    food_category: FoodCategory
    calories: float
    date: datetime
