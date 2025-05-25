from fastapi import APIRouter, status
from src.deps.database import DBSessionDependency
from src.dtos.user_health_data_dtos import UserHealthDataCreationDTO
from src.services.users_health_data import UserHealthDataService

router = APIRouter(prefix="/user-health-data", tags=["Users"])

# ====================== MANAGING - USERS ====================== #


@router.post("/{user_id}", status_code=status.HTTP_201_CREATED)
def create_user_health_data(
    user_id: float, health_data: UserHealthDataCreationDTO, db: DBSessionDependency
) -> None:
    UserHealthDataService(db).create_user_health_data(user_id, health_data)
