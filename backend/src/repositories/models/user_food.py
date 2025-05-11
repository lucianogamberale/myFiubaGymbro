from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column
from src.repositories.models.user import User

from .base_model import Base, Str


class UserFood(Base):
    __tablename__ = "user_foods"

    id: Mapped[int] = mapped_column(primary_key=True)
    food_name: Mapped[Str] = mapped_column()
    food_category: Mapped[Str] = mapped_column()
    calories: Mapped[float] = mapped_column()
    date_eaten: Mapped[str] = mapped_column()
    user_id: Mapped[int] = mapped_column()
    