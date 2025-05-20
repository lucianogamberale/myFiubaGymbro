from typing import List

from sqlalchemy.orm import Mapped, mapped_column, relationship

from .base_model import Base, IntPK, Str
from .diet import Diet


class User(Base):
    __tablename__ = "users"

    id: Mapped[IntPK]
    username: Mapped[Str] = mapped_column(unique=True)
    email: Mapped[Str] = mapped_column(unique=True)
    password: Mapped[Str]
    name: Mapped[Str]
    surname: Mapped[Str]

    diets: Mapped[List["Diet"]] = relationship(
        back_populates="user", cascade="all, delete-orphan"
    )

    def check_password(self, password: str) -> bool:
        # Implement password checking logic here
        return self.password == password
