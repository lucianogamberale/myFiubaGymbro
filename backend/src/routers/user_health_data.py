from typing import List

from fastapi import APIRouter, HTTPException, status
from src.deps.database import DBSessionDependency
from src.dtos.user_health_data_dtos import (
    UserHealthDataCreationDTO,
    UserHealthDataReponseDTO,
)
from src.services.users_health_data import UserHealthDataService

router = APIRouter(prefix="/user-health-data", tags=["UserHealthData"])

# ====================== MANAGING - USERS ====================== #


@router.post("/{user_id}", status_code=status.HTTP_201_CREATED)
def create_user_health_data(
    user_id: float, health_data: UserHealthDataCreationDTO, db: DBSessionDependency
) -> None:
    UserHealthDataService(db).create_user_health_data(user_id, health_data)


# ====================== QUERYING - USER FOODS ====================== #


@router.get("/{user_id}", status_code=status.HTTP_200_OK)
def get_historical_user_health_data(
    user_id: float, db: DBSessionDependency
) -> List[UserHealthDataReponseDTO]:
    return UserHealthDataService(db).get_historical_user_health_data(user_id)


@router.get("/{user_id}/last", status_code=status.HTTP_200_OK)
def get_last_user_health_data(
    user_id: float, db: DBSessionDependency
) -> UserHealthDataReponseDTO:
    user_health_data = UserHealthDataService(db).get_last_user_health_data(user_id)
    if user_health_data is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User health data not found",
        )
    else:
        return user_health_data
