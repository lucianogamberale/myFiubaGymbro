from sqlalchemy.orm import Session
from src.repositories.models.user import User
from src.dtos.user_dtos import UserCreationDTO
from src.repositories.users import UsersRepository


class UsersService:

    def __init__(self, db_session: Session):
        self.users_repo = UsersRepository(db_session)

    def create_user(self, user_data: UserCreationDTO) -> None:
        user = User(
            username=user_data.username,
            email=user_data.email,
            password=user_data.password,
            name=user_data.name,
            surname=user_data.surname
        )
        self.users_repo.save(user)
