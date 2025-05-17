import sqlalchemy as sa
from src.dtos.user_dtos import UserHealthDataCreationDTO
from src.repositories.models.user_health_data import UserHealthData

from .base import BaseRepository


class UserHealthRepository(BaseRepository):
    def save_health_data(
        self, user_id, user_data: UserHealthDataCreationDTO
    ) -> UserHealthData:
        user_healt_data = UserHealthData(
            user_id=user_id,
            weight=user_data.weight,
            height=user_data.height,
            age=user_data.age,
        )

        self.db_session.add(user_healt_data)
        self.db_session.commit()
        self.db_session.refresh(user_healt_data)
        return user_healt_data
