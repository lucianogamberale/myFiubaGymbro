from enum import Enum

from sqlalchemy import UniqueConstraint
from sqlalchemy.orm import Mapped, mapped_column

from .base_model import Base, IntPK, Str


class FoodCategory(str, Enum):
    FRUIT = "fruta"
    VEGETABLE = "vegetal"
    PROTEIN = "proteina"
    GRAIN = "grano"
    DAIRY = "lácteo"
    FAT = "graso"
    SWEET = "dulces"


class Food(Base):
    __tablename__ = "foods"

    id: Mapped[IntPK]

    name: Mapped[Str] = mapped_column()
    category: Mapped[Str] = mapped_column()

    __table_args__ = (UniqueConstraint("name", "category", name="uq_food"),)
