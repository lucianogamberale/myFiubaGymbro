from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from .base_model import Base, BigInt, Str
from .user import User


class UserFood(Base):
    __tablename__ = "user_foods"

    id: Mapped[BigInt] = mapped_column(primary_key=True)
    food_name: Mapped[Str] = mapped_column()
    food_category: Mapped[Str] = mapped_column()
    calories: Mapped[float] = mapped_column()
    date_eaten: Mapped[str] = mapped_column()
    user_id: Mapped[BigInt] = mapped_column(
        ForeignKey("users.id", ondelete="CASCADE"), nullable=False
    )

    user: Mapped["User"] = relationship()
