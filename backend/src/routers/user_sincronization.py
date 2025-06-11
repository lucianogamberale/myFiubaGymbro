from typing import List
from fastapi import APIRouter, status
from src.deps.database import DBSessionDependency
from src.dtos.user_sync_dtos import AppSyncronizationDTO, AppSyncronizationResponseDTO
from src.services.user_sync import AppSyncService

router = APIRouter(prefix="/sync", tags=["UserAppSync"])

# ====================== MANAGING - USER APP SYNC ====================== #


@router.post("/{user_id}", status_code=status.HTTP_201_CREATED)
def synchronize(
    user_id: float,
    app_sync_data: AppSyncronizationDTO,
    db: DBSessionDependency,
) -> None:
    AppSyncService(db).sync(user_id, app_sync_data)


@router.get(
    "/{user_id}",
    response_model=List[AppSyncronizationResponseDTO],
    status_code=status.HTTP_200_OK,
)
def get_all_user_objectives(
    user_id: float, db: DBSessionDependency
) -> List[AppSyncronizationResponseDTO]:
    return AppSyncService(db).get_all_app_synced(user_id)
