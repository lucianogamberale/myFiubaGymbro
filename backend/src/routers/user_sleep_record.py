from typing import List
from fastapi import APIRouter, status
from src.deps.database import DBSessionDependency
from src.dtos.user_sleep_record_dtos import UserSleepDataDTO
from src.services.user_sleep_record import UserSleepRecordService

router = APIRouter(prefix="/user-sleep-record", tags=["UserSleepRecord"])

# ====================== MANAGING - USER OBJECTIVES ====================== #


@router.post("/{user_id}", status_code=status.HTTP_201_CREATED)
def create_user_sleep_record(
    user_id: float,
    user_sleep_data: UserSleepDataDTO,
    db: DBSessionDependency,
) -> None:
    UserSleepRecordService(db).create_user_sleep_data(user_id, user_sleep_data)


@router.get(
    "/{user_id}",
    response_model=List[UserSleepDataDTO],
    status_code=status.HTTP_200_OK,
)
def get_user_sleep_records(
    user_id: float, db: DBSessionDependency
) -> List[UserSleepDataDTO]:
    return UserSleepRecordService(db).get_user_sleep_records(user_id)
