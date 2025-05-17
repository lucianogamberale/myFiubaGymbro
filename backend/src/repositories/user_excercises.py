import sqlalchemy as sa
from src.dtos.user_excercise_dtos import UserExcerciseCreationDTO
from src.repositories.models.user_excercise import UserExcercise

from .base import BaseRepository


class UserExcercisesRepository(BaseRepository):
    def save_new_user_excercise(self, user_id, user_excercise_data: UserExcerciseCreationDTO) -> UserExcercise:
        user_excercise = UserExcercise(
            user_id=user_id,
            excercise_name=user_excercise_data.excercise_name,
            duration=user_excercise_data.duration,
            calories=user_excercise_data.calories,
            date_done=user_excercise_data.date_done,
        )

        self.db_session.add(user_excercise)
        self.db_session.commit()
        self.db_session.refresh(user_excercise)
        return user_excercise

    def get_all_user_excercises(self, user_id: float):
        query = sa.select(UserExcercise).where(
            UserExcercise.user_id == user_id)
        result = self.db_session.execute(query)
        return result.scalars().all()
