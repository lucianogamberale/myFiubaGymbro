import sqlalchemy as sa

from .base import BaseRepository
from .models.user import User


class UsersRepository(BaseRepository):
    def save(self, user: User) -> User:
        self.db_session.add(user)
        self.db_session.commit()
        return user
