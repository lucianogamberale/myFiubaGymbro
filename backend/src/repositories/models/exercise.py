from enum import Enum

from sqlalchemy import UniqueConstraint
from sqlalchemy.orm import Mapped, mapped_column

from .base_model import Base, IntPK, Str


class ExerciseCategory(str, Enum):
    STRENGTH = "Fuerza"
    CARDIO = "Cardio"
    FLEXIBILITY = "Flexibilidad"
    BALANCE = "Equilibrio"
    ENDURANCE = "Resistencia"
    SPEED = "Velocidad"
    AGILITY = "Agilidad"
    COORDINATION = "Coordinación"
    POWER = "Potencia"


class Exercise(Base):
    __tablename__ = "exercises"

    id: Mapped[IntPK]

    name: Mapped[Str] = mapped_column()
    category: Mapped[Str] = mapped_column()

    __table_args__ = (UniqueConstraint("name", "category", name="uq_exercise"),)
