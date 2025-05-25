from datetime import datetime
from typing import Optional

from pydantic import BaseModel

# ====================== REQUESTS ====================== #


class UserHealthDataCreationDTO(BaseModel):
    weight: int
    height: int
    date: datetime


# ====================== RESPONSES ====================== #


class UserHealthDataReponseDTO(BaseModel):
    id: Optional[int]
    weight: int
    height: int
    date: datetime
