from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from .base_model import Base, BigInt, IntPK, Str
from .user import User


class UserObjective(Base):
    __tablename__ = "user_objective_data"

    id: Mapped[IntPK]

    user_id: Mapped[BigInt] = mapped_column(
        ForeignKey("users.id", ondelete="CASCADE"), nullable=False
    )

    activity: Mapped[Str] = mapped_column()
    objective: Mapped[float] = mapped_column()
    unit_of_measurement: Mapped[Str] = mapped_column()

    user: Mapped["User"] = relationship()
