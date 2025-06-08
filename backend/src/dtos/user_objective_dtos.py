from pydantic import BaseModel
from datetime import datetime

# ====================== REQUESTS ====================== #

class UserObjectiveDataDTO(BaseModel):
    activity: str
    current_progress: float
    objective: float
    unit_of_measurement: str
    start_date: datetime
    end_date: datetime
