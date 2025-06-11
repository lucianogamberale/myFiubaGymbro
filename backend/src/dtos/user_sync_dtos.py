from pydantic import BaseModel

# ====================== REQUESTS ====================== #


class AppSyncronizationDTO(BaseModel):
    app_name: str


# ====================== RESPONSES ====================== #


class AppSyncronizationResponseDTO(BaseModel):
    id: int
    app_name: str
