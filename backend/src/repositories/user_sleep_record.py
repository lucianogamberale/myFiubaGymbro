from typing import Sequence
from src.dtos.user_sleep_record_dtos import UserSleepDataDTO
from src.repositories.models.user_sleep_record import UserSleepRecord
import sqlalchemy as sa

from .base import BaseRepository


class UserSleepRecordRepository(BaseRepository):
    def save_sleep_data(
        self, user_id: float, user_sleep_data: UserSleepDataDTO
    ) -> UserSleepRecord:
        user_sleep_record = UserSleepRecord(
            user_id=user_id,
            hours_slept=user_sleep_data.hours_slept,
            date=user_sleep_data.date,
        )

        self.db_session.add(user_sleep_record)
        self.db_session.commit()
        self.db_session.refresh(user_sleep_record)
        return user_sleep_record

    # def get_user_sleep_data(self, user_id: float) -> Optional[UserSleepRecord]:
    #     return self.db_session.execute(
    #         sa.select(UserSleepRecord).where(UserSleepRecord.user_id == user_id)
    #     ).scalar_one_or_none()

    def get_user_sleep_data(self, user_id: float) -> Sequence[UserSleepRecord]:
        return (
            self.db_session.execute(
                sa.select(UserSleepRecord).where(UserSleepRecord.user_id == user_id)
            )
            .scalars()
            .all()
        )
