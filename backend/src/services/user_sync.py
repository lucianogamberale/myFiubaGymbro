from sqlalchemy.orm import Session
from src.dtos.user_sync_dtos import AppSyncronizationDTO, AppSyncronizationResponseDTO
from src.repositories.user_synchronizations import AppSyncRepository


class AppSyncService:

    def __init__(self, db_session: Session):
        self.sync_repo = AppSyncRepository(db_session)

    def sync(
        self,
        user_id: float,
        app_sync_data: AppSyncronizationDTO,
    ) -> None:
        self.sync_repo.save_synced_app(user_id, app_sync_data.app_name)

    def get_all_app_synced(self, user_id: float) -> list[AppSyncronizationResponseDTO]:
        apps_synced_data = self.sync_repo.get_all_apps_synced_data(user_id)
        return [
            AppSyncronizationResponseDTO(
                id=app_data.id,
                app_name=app_data.app_name,
            )
            for app_data in apps_synced_data
        ]
