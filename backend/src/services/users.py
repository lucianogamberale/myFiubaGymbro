from sqlalchemy.orm import Session
from src.dtos.user_dtos import UserCreationDTO, UserHealthDataCreationDTO
from src.repositories.user_health_data import UserHealthRepository
from src.repositories.users import UsersRepository


class UsersService:

    def __init__(self, db_session: Session):
        self.users_repo = UsersRepository(db_session)
        self.users_health_repo = UserHealthRepository(db_session)

    def create_user(self, user_data: UserCreationDTO) -> None:
        self.users_repo.save_new_user(user_data)

    def create_user_health_data(
        self, user_id: float, user_data: UserHealthDataCreationDTO
    ) -> None:
        self.users_health_repo.save_health_data(user_id, user_data)
