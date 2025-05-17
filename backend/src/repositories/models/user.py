from sqlalchemy.orm import Mapped, mapped_column

from .base_model import Base, IntPK, Str


class User(Base):
    __tablename__ = "users"

    id: Mapped[IntPK]
    username: Mapped[Str] = mapped_column(unique=True)
    email: Mapped[Str] = mapped_column(unique=True)
    password: Mapped[Str]
    name: Mapped[Str]
    surname: Mapped[Str]
