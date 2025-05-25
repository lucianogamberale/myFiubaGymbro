from pydantic import BaseModel

# ====================== REQUESTS ====================== #


class UserObjectiveDataDTO(BaseModel):
    activity: str
    objective: float
    unit_of_measurement: str
