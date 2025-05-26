from typing import List

import sqlalchemy as sa
from src.dtos.user_health_data_dtos import UserHealthDataCreationDTO
from src.repositories.models.user_health_data import UserHealthData

from .base import BaseRepository


class UserHealthRepository(BaseRepository):
    def save_health_data(
        self, user_id: float, user_data: UserHealthDataCreationDTO
    ) -> UserHealthData:
        user_healt_data = UserHealthData(
            user_id=user_id,
            weight=user_data.weight,
            height=user_data.height,
            date=user_data.date,
        )

        self.db_session.add(user_healt_data)
        self.db_session.commit()
        self.db_session.refresh(user_healt_data)
        return user_healt_data

    def get_historical_user_health_data(self, user_id: float) -> List[UserHealthData]:
        return (
            self.db_session.query(UserHealthData)
            .filter(UserHealthData.user_id == user_id)
            .order_by(sa.desc(UserHealthData.date))
            .all()
        )

    def get_last_user_health_data(self, user_id: float) -> UserHealthData | None:
        return (
            self.db_session.query(UserHealthData)
            .filter(UserHealthData.user_id == user_id)
            .order_by(sa.desc(UserHealthData.date))
            .first()
        )
