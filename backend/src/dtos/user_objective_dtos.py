from pydantic import BaseModel
from datetime import datetime

# ====================== REQUESTS ====================== #

class UserObjectiveCreationDTO(BaseModel):
    activity: str
    current_progress: float
    objective: float
    unit_of_measurement: str
    start_date: datetime
    end_date: datetime


class UserObjectiveUpdateDTO(BaseModel):
    activity: str
    current_progress: float
    objective: float
    unit_of_measurement: str
    start_date: datetime
    end_date: datetime


# ====================== RESPONSES ====================== #

class UserObjectiveResponseDTO(BaseModel):
    id: int
    activity: str
    current_progress: float
    objective: float
    unit_of_measurement: str
    start_date: datetime
    end_date: datetime
