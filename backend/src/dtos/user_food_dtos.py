from datetime import datetime
from typing import Optional

from pydantic import BaseModel
from src.repositories.models.food import FoodCategory

# ====================== REQUESTS ====================== #


class UserFoodCreationDTO(BaseModel):
    food_name: str
    food_category: FoodCategory
    calories: float
    date: datetime


# ====================== RESPONSES ====================== #


class UserFoodReponseDTO(BaseModel):
    id: Optional[int]
    food_name: str
    food_category: str
    calories: float
    date: datetime
