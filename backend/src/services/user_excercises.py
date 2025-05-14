from sqlalchemy.orm import Session
from src.dtos.user_excercise_dtos import UserExcerciseCreationDTO, UserExcerciseResponseDTO
from src.repositories.user_excercises import UserExcercisesRepository


class UserExcercisesService:

    def __init__(self, db_session: Session):
        self.users_repo = UserExcercisesRepository(db_session)

    def create_user_excercise(self, user_id: float, user_excercise_data: UserExcerciseCreationDTO) -> None:
        self.users_repo.save_new_user_excercise(user_id, user_excercise_data)

    def get_user_excercises(self, user_id: float) -> list[UserExcerciseResponseDTO]:
        user_excercises = self.users_repo.get_all_user_excercises(user_id)
        return [
            UserExcerciseResponseDTO(
                id=user_excercise.id,
                excercise_name=user_excercise.excercise_name,
                duration=user_excercise.duration,
                calories=user_excercise.calories,
                date_done=user_excercise.date_done,
            )
            for user_excercise in user_excercises
        ]
