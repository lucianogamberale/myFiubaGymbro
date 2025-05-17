import datetime

from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from .base_model import Base, BigInt
from .food import Food
from .user import User


class UserFood(Base):
    __tablename__ = "user_foods"

    id: Mapped[BigInt] = mapped_column(primary_key=True)
    user_id: Mapped[BigInt] = mapped_column(
        ForeignKey("users.id", ondelete="CASCADE"), nullable=False
    )
    food_id: Mapped[BigInt] = mapped_column(
        ForeignKey("foods.id", ondelete="CASCADE"), nullable=False
    )
    calories: Mapped[float] = mapped_column()
    date_eaten: Mapped[datetime.date] = mapped_column()  # this should be a date

    user: Mapped["User"] = relationship()
    food: Mapped["Food"] = relationship()
