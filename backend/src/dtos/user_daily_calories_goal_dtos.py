from datetime import datetime
from typing import Optional

from pydantic import BaseModel

# ====================== REQUESTS ====================== #


class UserDailyCaloriesGoalCreationDTO(BaseModel):
    amount_of_calories: int
    date: datetime


# ====================== RESPONSES ====================== #


class UserDailyCaloriesGoalReponseDTO(BaseModel):
    id: Optional[int]
    amount_of_calories: int
    date: datetime
