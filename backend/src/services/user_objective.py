from fastapi import HTTPException
from sqlalchemy.orm import Session
from src.dtos.user_objective_dtos import UserObjectiveDataDTO
from src.repositories.user_objectives import UserObjectiveRepository


class UserObjectiveService:

    def __init__(self, db_session: Session):
        self.objectives_repo = UserObjectiveRepository(db_session)

    def create_user_objective(
        self, user_id: float, user_objective_data: UserObjectiveDataDTO
    ) -> None:

        activities_in_km = {"Bicicleta", "Correr", "Caminar"}

        if user_objective_data.activity in activities_in_km:
            user_objective_data.unit_of_measurement = "km"
        else:
            user_objective_data.unit_of_measurement = "kcal"

        self.objectives_repo.save_objective_data(user_id, user_objective_data)

    def get_last_user_objective(self, user_id: float) -> UserObjectiveDataDTO:
        user_objective_data = self.objectives_repo.get_last_user_objective_data(user_id)

        if not user_objective_data:
            raise HTTPException(
                status_code=404, detail="No se encontró el objetivo del usuario"
            )

        return UserObjectiveDataDTO(
            activity=user_objective_data.activity,
            objective=user_objective_data.objective,
            unit_of_measurement=user_objective_data.unit_of_measurement,
        )
