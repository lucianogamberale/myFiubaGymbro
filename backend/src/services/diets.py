from sqlalchemy.orm import Session
from typing import List, Optional

from src.dtos.diet_dtos import DietCreationDTO, DietResponseDTO, DietMealEntryResponseDTO, DayOfWeekDTO, DietUpdateDTO
from src.repositories.diets import DietsRepository
from src.repositories.models.diet import Diet

class DietsService:
    """
    Servicio para manejar la lógica de negocio relacionada con las dietas.
    """
    def __init__(self, db_session: Session):
        self.diets_repo = DietsRepository(db_session)

    def create_user_diet(self, user_id: float, diet_data: DietCreationDTO) -> DietResponseDTO:
        """
        Crea una nueva dieta para un usuario y devuelve su DTO de respuesta.
        """
        new_diet = self.diets_repo.save_new_diet(user_id, diet_data)
        return DietResponseDTO(
            id=new_diet.id,
            name=new_diet.name,
            description=new_diet.description,
            user_id=new_diet.user_id,
            meals=[
                DietMealEntryResponseDTO(
                    id=meal.id,
                    day_of_week=DayOfWeekDTO(meal.day_of_week.value),
                    time_of_day=meal.time_of_day,
                    food_name=meal.food_name,
                    food_category=meal.food_category,
                    calories=meal.calories
                )
                for meal in new_diet.diet_meals
            ]
        )

    def get_user_diets(self, user_id: float) -> list[DietResponseDTO]:
        """
        Obtiene todas las dietas de un usuario y las mapea a DTOs de respuesta.
        """
        user_diets = self.diets_repo.get_all_user_diets(user_id)
        return [
            DietResponseDTO(
                id=diet.id,
                name=diet.name,
                description=diet.description,
                user_id=diet.user_id,
                meals=[
                    DietMealEntryResponseDTO(
                        id=meal.id,
                        day_of_week=DayOfWeekDTO(meal.day_of_week.value),
                        time_of_day=meal.time_of_day,
                        food_name=meal.food_name,
                        food_category=meal.food_category,
                        calories=meal.calories
                    )
                    for meal in diet.diet_meals
                ]
            )
            for diet in user_diets
        ]

    def get_user_diet_details(self, user_id: float, diet_id: float) -> Optional[DietResponseDTO]:
        """
        Obtiene los detalles de una dieta específica de un usuario.
        """
        diet = self.diets_repo.get_user_diet_by_id(user_id, diet_id)
        if not diet:
            return None
        return DietResponseDTO(
            id=diet.id,
            name=diet.name,
            description=diet.description,
            user_id=diet.user_id,
            meals=[
                DietMealEntryResponseDTO(
                    id=meal.id,
                    day_of_week=DayOfWeekDTO(meal.day_of_week.value),
                    time_of_day=meal.time_of_day,
                    food_name=meal.food_name,
                    food_category=meal.food_category,
                    calories=meal.calories
                )
                for meal in diet.diet_meals
            ]
        )

    def update_user_diet(self, user_id: float, diet_id: float, diet_data: DietUpdateDTO) -> Optional[DietResponseDTO]:
        """
        Actualiza una dieta existente para un usuario.
        """
        diet_to_update = self.diets_repo.get_user_diet_by_id(user_id, diet_id)
        if not diet_to_update:
            return None

        updated_diet = self.diets_repo.update_diet(diet_to_update, diet_data)

        return DietResponseDTO(
            id=updated_diet.id,
            name=updated_diet.name,
            description=updated_diet.description,
            user_id=updated_diet.user_id,
            meals=[
                DietMealEntryResponseDTO(
                    id=meal.id,
                    day_of_week=DayOfWeekDTO(meal.day_of_week.value),
                    time_of_day=meal.time_of_day,
                    food_name=meal.food_name,
                    food_category=meal.food_category,
                    calories=meal.calories
                )
                for meal in updated_diet.diet_meals
            ]
        )

    def delete_user_diet(self, user_id: float, diet_id: float) -> bool:
        """
        Elimina una dieta existente para un usuario.
        Retorna True si se eliminó, False si no se encontró o no pertenece al usuario.
        """
        diet_to_delete = self.diets_repo.get_user_diet_by_id(user_id, diet_id)
        if not diet_to_delete:
            return False

        self.diets_repo.delete_diet(diet_to_delete)
        return True

