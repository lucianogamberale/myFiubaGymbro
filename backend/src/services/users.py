from sqlalchemy.orm import Session
from src.dtos.user_dtos import UserCreationDTO, UserHealthDataCreationDTO
from src.repositories.models.user import User
from src.repositories.user_health_data import UserHealthRepository
from src.repositories.users import UsersRepository


class UsersService:

    def __init__(self, db_session: Session):
        self.users_repo = UsersRepository(db_session)
        self.users_health_repo = UserHealthRepository(db_session)

    def create_user(self, user_data: UserCreationDTO) -> None:
        user = User(
            username=user_data.username,
            email=user_data.email,
            password=user_data.password,
            name=user_data.name,
            surname=user_data.surname,
        )
        self.users_repo.save(user)

    def create_user_health_data(
        self, user_id: float, user_data: UserHealthDataCreationDTO
    ) -> None:
        self.users_health_repo.save_health_data(user_id, user_data)
