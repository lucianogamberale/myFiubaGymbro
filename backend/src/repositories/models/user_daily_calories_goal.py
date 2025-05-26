from datetime import datetime

from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from .base_model import Base, BigInt, IntPK, Str
from .user import User


class UserDailyCaloriesGoal(Base):
    __tablename__ = "user_daily_calories_goals"

    id: Mapped[IntPK]

    user_id: Mapped[BigInt] = mapped_column(
        ForeignKey("users.id", ondelete="CASCADE"), nullable=False
    )

    amount_of_calories: Mapped[float] = mapped_column()
    date: Mapped[datetime] = mapped_column()

    user: Mapped["User"] = relationship()
