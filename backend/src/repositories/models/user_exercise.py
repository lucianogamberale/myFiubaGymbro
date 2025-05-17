from datetime import datetime

from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from src.repositories.models.exercise import Exercise

from .base_model import Base, BigInt, IntPK, Str
from .user import User


class UserExercise(Base):
    __tablename__ = "user_exercises"

    id: Mapped[IntPK]

    user_id: Mapped[BigInt] = mapped_column(
        ForeignKey("users.id", ondelete="CASCADE"), nullable=False
    )
    exercise_id: Mapped[BigInt] = mapped_column(
        ForeignKey("exercises.id", ondelete="CASCADE"), nullable=False
    )

    duration: Mapped[float] = mapped_column()
    calories: Mapped[float] = mapped_column()
    date: Mapped[datetime] = mapped_column()

    user: Mapped["User"] = relationship()
    exercise: Mapped["Exercise"] = relationship()
