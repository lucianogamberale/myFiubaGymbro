import sqlalchemy as sa
from src.dtos.user_auth_dtos import UserSignUpDTO

from .base import BaseRepository
from .models.user import User


class UsersRepository(BaseRepository):

    def save_new_user(self, user_data: UserSignUpDTO) -> User:
        user = User(
            username=user_data.username,
            email=user_data.email,
            password=user_data.password,
            name=user_data.name,
            surname=user_data.surname,
        )

        self.db_session.add(user)
        self.db_session.commit()
        self.db_session.refresh(user)
        return user

    def get_user_by_email(self, email: str) -> User | None:
        return self.db_session.query(User).filter(sa.and_(User.email == email)).first()
