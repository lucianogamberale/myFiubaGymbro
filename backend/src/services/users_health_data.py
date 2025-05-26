from typing import List, Optional

from sqlalchemy.orm import Session
from src.dtos.user_health_data_dtos import (
    UserHealthDataCreationDTO,
    UserHealthDataReponseDTO,
)
from src.repositories.user_health_data import UserHealthRepository


class UserHealthDataService:

    def __init__(self, db_session: Session):
        self.users_health_repo = UserHealthRepository(db_session)

    def create_user_health_data(
        self, user_id: float, user_data: UserHealthDataCreationDTO
    ) -> None:
        self.users_health_repo.save_health_data(user_id, user_data)

    def get_historical_user_health_data(
        self, user_id: float
    ) -> List[UserHealthDataReponseDTO]:
        historical_user_health_data = (
            self.users_health_repo.get_historical_user_health_data(user_id)
        )

        return [
            UserHealthDataReponseDTO(
                id=user_health_data.id,
                weight=user_health_data.weight,
                height=user_health_data.height,
                date=user_health_data.date,
            )
            for user_health_data in historical_user_health_data
        ]

    def get_last_user_health_data(
        self, user_id: float
    ) -> Optional[UserHealthDataReponseDTO]:
        last_user_health_data = self.users_health_repo.get_last_user_health_data(
            user_id
        )

        if last_user_health_data is None:
            return None
        else:
            return UserHealthDataReponseDTO(
                id=last_user_health_data.id,
                weight=last_user_health_data.weight,
                height=last_user_health_data.height,
                date=last_user_health_data.date,
            )
