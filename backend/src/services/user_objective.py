from fastapi import HTTPException
from sqlalchemy.orm import Session
from typing import List
from src.dtos.user_objective_dtos import UserObjectiveCreationDTO, UserObjectiveUpdateDTO, UserObjectiveResponseDTO
from src.repositories.user_objectives import UserObjectiveRepository


class UserObjectiveService:

    def __init__(self, db_session: Session):
        self.objectives_repo = UserObjectiveRepository(db_session)

    def create_user_objective(
        self,
        user_id: float,
        user_objective_data: UserObjectiveCreationDTO,
    ) -> None:

        activities_in_km = {"Bicicleta", "Correr", "Caminar"}

        if user_objective_data.activity in activities_in_km:
            user_objective_data.unit_of_measurement = "km"
        else:
            user_objective_data.unit_of_measurement = "kcal"

        self.objectives_repo.save_objective_data(user_id, user_objective_data)

    def get_all_user_objectives(self, user_id: float) -> list[UserObjectiveResponseDTO]:
        user_objective_data = self.objectives_repo.get_all_user_objective_data(user_id)
        return [
            UserObjectiveResponseDTO(
                id=user_objective.id,
                activity=user_objective.activity,
                current_progress=user_objective.current_progress,
                objective=user_objective.objective,
                unit_of_measurement=user_objective.unit_of_measurement,
                start_date=user_objective.start_date,
                end_date=user_objective.end_date,
            )
            for user_objective in user_objective_data
        ]

    def update_user_objective(
        self,
        user_id: float,
        user_objective_id: float,
        user_objective_data: UserObjectiveUpdateDTO,
    ) -> None:
        self.objectives_repo.update_objective_data(user_id, user_objective_id, user_objective_data)

    def delete_user_objective(self, user_id: float, user_objective_id: float) -> None:
        self.objectives_repo.delete_objective_data(user_id, user_objective_id)