import datetime
import enum
from typing import List, Optional  # Añade List aquí también para la relación

from sqlalchemy import Enum, ForeignKey, Time
from sqlalchemy.orm import Mapped, mapped_column, relationship

# Ajusta las importaciones de tipos para usar los definidos en base_model.py
from .base_model import Base, BigInt, IntPK, Str


# Enum para los días de la semana
class DayOfWeek(enum.Enum):
    MONDAY = "MONDAY"
    TUESDAY = "TUESDAY"
    WEDNESDAY = "WEDNESDAY"
    THURSDAY = "THURSDAY"
    FRIDAY = "FRIDAY"
    SATURDAY = "SATURDAY"
    SUNDAY = "SUNDAY"


class Routine(Base):
    __tablename__ = "routines"

    id: Mapped[IntPK]
    name: Mapped[Str] = mapped_column(unique=True, index=True)
    description: Mapped[Optional[Str]] = mapped_column(nullable=True)
    user_id: Mapped[BigInt] = mapped_column(
        ForeignKey("users.id", ondelete="CASCADE"), nullable=False
    )

    user: Mapped["User"] = relationship(back_populates="routines")
    routine_exercises: Mapped[List["RoutineExercise"]] = relationship(
        back_populates="routine", cascade="all, delete-orphan"
    )


class RoutineExercise(Base):
    __tablename__ = "routine_exercises"

    id: Mapped[IntPK]
    day_of_week: Mapped[DayOfWeek] = mapped_column(Enum(DayOfWeek))
    time_of_day: Mapped[datetime.time] = mapped_column(Time)
    exercise_name: Mapped[Str] = mapped_column()
    exercise_category: Mapped[Str] = mapped_column()
    duration: Mapped[float] = mapped_column()
    calories_burned: Mapped[float] = mapped_column()
    routine_id: Mapped[BigInt] = mapped_column(
        ForeignKey("routines.id", ondelete="CASCADE"), nullable=False
    )

    routine: Mapped["Routine"] = relationship(back_populates="routine_exercises")
