from sqlalchemy.orm import Mapped, mapped_column

from .base_model import Base, Str


class User(Base):
    __tablename__ = "users"

    username: Mapped[Str] = mapped_column(unique=True)
    email: Mapped[Str] = mapped_column(unique=True)
    password: Mapped[Str]
    name: Mapped[Str]
    surname: Mapped[Str]
