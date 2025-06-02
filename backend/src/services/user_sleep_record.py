from datetime import datetime
from typing import List
from fastapi import HTTPException
from sqlalchemy.orm import Session
from src.dtos.user_sleep_record_dtos import UserSleepDataDTO
from src.repositories.user_sleep_record import UserSleepRecordRepository


class UserSleepRecordService:

    def __init__(self, db_session: Session):
        self.sleep_record_repo = UserSleepRecordRepository(db_session)

    def create_user_sleep_data(
        self, user_id: float, user_sleep_data: UserSleepDataDTO
    ) -> None:
        user_sleep_data.date = datetime.today()
        self.sleep_record_repo.save_sleep_data(user_id, user_sleep_data)

    def get_user_sleep_records(self, user_id: float) -> List[UserSleepDataDTO]:
        user_sleep_records = self.sleep_record_repo.get_user_sleep_data(user_id)

        if not user_sleep_records:
            raise HTTPException(
                status_code=404, detail="No se cargaron registros de sueño"
            )

        return [
            UserSleepDataDTO(
                hours_slept=user_sleep_data.hours_slept,
                date=user_sleep_data.date,
            )
            for user_sleep_data in user_sleep_records
        ]
