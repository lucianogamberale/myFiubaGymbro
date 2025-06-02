from datetime import datetime
from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from .base_model import Base, BigInt, IntPK, Str
from .user import User


class UserSleepRecord(Base):
    __tablename__ = "user_sleep_record_data"

    id: Mapped[IntPK]

    user_id: Mapped[BigInt] = mapped_column(
        ForeignKey("users.id", ondelete="CASCADE"), nullable=False
    )

    hours_slept: Mapped[int] = mapped_column()
    date: Mapped[datetime] = mapped_column()

    user: Mapped["User"] = relationship()
