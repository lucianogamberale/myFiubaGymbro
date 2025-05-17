from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from .base_model import Base, BigInt, Str
from .user import User


class UserHealthData(Base):
    __tablename__ = "user_health_data"

    id: Mapped[BigInt] = mapped_column(primary_key=True)
    weight: Mapped[int] = mapped_column()
    height: Mapped[Str] = mapped_column()
    age: Mapped[float] = mapped_column()
    user_id: Mapped[BigInt] = mapped_column(
        ForeignKey("users.id", ondelete="CASCADE"), nullable=False
    )

    user: Mapped["User"] = relationship()
