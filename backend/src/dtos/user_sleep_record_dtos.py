from datetime import datetime
from pydantic import BaseModel

# ====================== REQUESTS ====================== #


class UserSleepDataDTO(BaseModel):
    hours_slept: int
    date: datetime
