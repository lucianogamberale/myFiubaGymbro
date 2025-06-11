from typing import Sequence
from src.repositories.models.app_sync import AppSynced
import sqlalchemy as sa
from .base import BaseRepository
from sqlalchemy.orm import Session


class AppSyncRepository(BaseRepository):
    def __init__(self, db_session: Session):
        super().__init__(db_session)

    def save_synced_app(self, user_id: float, app_name: str) -> AppSynced:
        app_synced = AppSynced(
            user_id=user_id,
            app_name=app_name,
        )

        self.db_session.add(app_synced)
        self.db_session.commit()
        self.db_session.refresh(app_synced)
        return app_synced

    def get_all_apps_synced_data(self, user_id: float) -> Sequence[AppSynced]:
        return (
            self.db_session.execute(
                sa.select(AppSynced)
                .where(AppSynced.user_id == user_id)
                .order_by(sa.desc(AppSynced.id))
            )
            .scalars()
            .all()
        )
