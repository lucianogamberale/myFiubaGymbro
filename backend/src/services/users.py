from sqlalchemy.orm import Session

from backend.src.repositories.users import UsersRepository


class UsersService:

    def __init__(self, db_session: Session):
        self.users_repo = UsersRepository(db_session)
