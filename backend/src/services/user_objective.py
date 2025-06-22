from fastapi import HTTPException
from sqlalchemy.orm import Session
from typing import List
from src.dtos.user_objective_dtos import UserObjectiveCreationDTO, UserObjectiveUpdateDTO, UserObjectiveResponseDTO, UserObjectiveHistoryResponseDTO
from src.repositories.user_objectives import UserObjectiveRepository


class UserObjectiveService:

    def __init__(self, db_session: Session):
        self.objectives_repo = UserObjectiveRepository(db_session)

    def create_user_objective(
        self,
        user_id: float,
        user_objective_data: UserObjectiveCreationDTO,
    ) -> None:
        # Delete any existing objectives
        existing_objectives = self.objectives_repo.get_all_user_objective_data(user_id)
        for objective in existing_objectives:
            self.objectives_repo.delete_objective_data(user_id, objective.id)

        activities_in_km = {"Bicicleta", "Correr", "Caminar"}

        if user_objective_data.activity in activities_in_km:
            user_objective_data.unit_of_measurement = "km"
        else:
            user_objective_data.unit_of_measurement = "cal"

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

    def get_user_objective_history(self, user_id: float) -> list[UserObjectiveHistoryResponseDTO]:
        history_data = self.objectives_repo.get_all_user_objective_history(user_id)
        return [
            UserObjectiveHistoryResponseDTO(
                id=entry.id,
                activity=entry.activity,
                final_progress=entry.final_progress,
                objective=entry.objective,
                unit_of_measurement=entry.unit_of_measurement,
                start_date=entry.start_date,
                end_date=entry.end_date,
                completion_percentage=entry.completion_percentage,
                status=entry.status,
                created_at=entry.created_at,
            )
            for entry in history_data
        ]

    def get_last_user_objective(self, user_id: float) -> UserObjectiveResponseDTO:
        return self.objectives_repo.get_last_user_objective(user_id)


    def update_user_objective(
        self,
        user_id: float,
        user_objective_id: float,
        user_objective_data: UserObjectiveUpdateDTO,
    ) -> None:
        self.objectives_repo.update_objective_data(user_id, user_objective_id, user_objective_data)

    def delete_user_objective(self, user_id: float, user_objective_id: float) -> None:
        self.objectives_repo.delete_objective_data(user_id, user_objective_id)