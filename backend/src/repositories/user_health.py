import sqlalchemy as sa
from src.dtos.user_dtos import HealthDataDTO
from src.repositories.models.user_health import UserHealth

from .base import BaseRepository


class UserHealthRepository(BaseRepository):
    def save_health_data(self, user_id, user_data: HealthDataDTO) -> UserHealth:
        user_healt_data = UserHealth(
            user_id=user_id,
            weight=user_data.weight,
            height=user_data.height,
            age=user_data.age,
        )

        self.db_session.add(user_healt_data)
        self.db_session.commit()
        self.db_session.refresh(user_healt_data)
        return user_healt_data
