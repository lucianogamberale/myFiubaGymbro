from sqlalchemy.orm import Session
from src.dtos.user_health_data_dtos import UserHealthDataCreationDTO
from src.repositories.user_health_data import UserHealthRepository


class UserHealthDataService:

    def __init__(self, db_session: Session):
        self.users_health_repo = UserHealthRepository(db_session)

    def create_user_health_data(
        self, user_id: float, user_data: UserHealthDataCreationDTO
    ) -> None:
        self.users_health_repo.save_health_data(user_id, user_data)
