from datetime import datetime

from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from .base_model import Base, BigInt, IntPK
from .user import User


class UserHealthData(Base):
    __tablename__ = "user_health_data"

    id: Mapped[IntPK]

    user_id: Mapped[BigInt] = mapped_column(
        ForeignKey("users.id", ondelete="CASCADE"), nullable=False
    )

    weight: Mapped[int] = mapped_column()
    height: Mapped[int] = mapped_column()
    age: Mapped[float] = mapped_column()
    date: Mapped[datetime] = mapped_column()  # this should be a date

    user: Mapped["User"] = relationship()
