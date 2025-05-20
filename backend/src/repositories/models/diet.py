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


class Diet(Base):
    __tablename__ = "diets"

    id: Mapped[IntPK]
    name: Mapped[Str] = mapped_column(unique=True, index=True)
    description: Mapped[Optional[Str]] = mapped_column(nullable=True)
    user_id: Mapped[BigInt] = mapped_column(
        ForeignKey("users.id", ondelete="CASCADE"), nullable=False
    )

    user: Mapped["User"] = relationship(back_populates="diets")
    diet_meals: Mapped[List["DietMeal"]] = relationship(
        back_populates="diet", cascade="all, delete-orphan"
    )


class DietMeal(Base):
    __tablename__ = "diet_meals"

    id: Mapped[IntPK]
    day_of_week: Mapped[DayOfWeek] = mapped_column(Enum(DayOfWeek))
    time_of_day: Mapped[datetime.time] = mapped_column(Time)
    food_name: Mapped[Str] = mapped_column()
    food_category: Mapped[Str] = mapped_column()
    calories: Mapped[float] = mapped_column()
    diet_id: Mapped[BigInt] = mapped_column(
        ForeignKey("diets.id", ondelete="CASCADE"), nullable=False
    )

    diet: Mapped["Diet"] = relationship(back_populates="diet_meals")
