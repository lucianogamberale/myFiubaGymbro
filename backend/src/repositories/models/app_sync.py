from datetime import datetime
from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from .base_model import Base, BigInt, IntPK, Str
from .user import User


class AppSynced(Base):
    __tablename__ = "apps_synced_data"

    id: Mapped[IntPK]

    user_id: Mapped[BigInt] = mapped_column(
        ForeignKey("users.id", ondelete="CASCADE"), nullable=False
    )
    app_name: Mapped[Str] = mapped_column()

    user: Mapped["User"] = relationship()
