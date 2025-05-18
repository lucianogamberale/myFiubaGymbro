from typing import List, Optional

from fastapi import APIRouter, status, HTTPException
from src.deps.database import DBSessionDependency
from src.dtos.diet_dtos import DietCreationDTO, DietResponseDTO, DietUpdateDTO # Importa DietUpdateDTO
from src.services.diets import DietsService

router = APIRouter(prefix="/api", tags=["Diets"])

# ====================== GESTIÓN DE DIETAS ====================== #

@router.post("/users/{user_id}/diets", response_model=DietResponseDTO, status_code=status.HTTP_201_CREATED)
def create_user_diet(user_id: float, diet_data: DietCreationDTO, db: DBSessionDependency):
    """
    Crea una nueva dieta semanal para un usuario.
    """
    return DietsService(db).create_user_diet(user_id, diet_data)

# ¡NUEVO! Ruta para actualizar una dieta
@router.put("/users/{user_id}/diets/{diet_id}", response_model=DietResponseDTO, status_code=status.HTTP_200_OK)
def update_user_diet(user_id: float, diet_id: float, diet_data: DietUpdateDTO, db: DBSessionDependency):
    """
    Actualiza una dieta existente para un usuario.
    """
    updated_diet = DietsService(db).update_user_diet(user_id, diet_id, diet_data)
    if not updated_diet:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Diet with ID {diet_id} not found for user {user_id}",
        )
    return updated_diet

@router.delete("/users/{user_id}/diets/{diet_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_user_diet(user_id: float, diet_id: float, db: DBSessionDependency):
    """
    Elimina una dieta existente para un usuario.
    """
    success = DietsService(db).delete_user_diet(user_id, diet_id)
    if not success:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Diet with ID {diet_id} not found for user {user_id}",
        )
    return


# ====================== CONSULTA DE DIETAS ====================== #

@router.get(
    "/users/{user_id}/diets",
    response_model=List[DietResponseDTO],
    status_code=status.HTTP_200_OK,
)
def get_user_diets(user_id: float, db: DBSessionDependency):
    """
    Obtiene todas las dietas creadas por un usuario.
    """
    return DietsService(db).get_user_diets(user_id)

@router.get(
    "/users/{user_id}/diets/{diet_id}",
    response_model=DietResponseDTO,
    status_code=status.HTTP_200_OK,
)
def get_user_diet_details(user_id: float, diet_id: float, db: DBSessionDependency):
    """
    Obtiene los detalles de una dieta específica para un usuario.
    """
    diet = DietsService(db).get_user_diet_details(user_id, diet_id)
    if not diet:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Diet with ID {diet_id} not found for user {user_id}",
        )
    return diet
