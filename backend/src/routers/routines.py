from typing import List, Optional

from fastapi import APIRouter, HTTPException, status
from src.deps.database import DBSessionDependency
from src.dtos.routine_dtos import RoutineCreationDTO, RoutineResponseDTO, RoutineUpdateDTO
from src.services.routines import RoutinesService

router = APIRouter(prefix="", tags=["Routines"])

# ====================== GESTIÓN DE RUTINAS ====================== #


@router.post(
    "/users/{user_id}/routines",
    status_code=status.HTTP_201_CREATED,
)
def create_user_routine(
    user_id: float, routine_data: RoutineCreationDTO, db: DBSessionDependency
) -> RoutineResponseDTO:
    return RoutinesService(db).create_user_routine(user_id, routine_data)


# ¡NUEVO! Ruta para actualizar una rutina
@router.put(
    "/users/{user_id}/routines/{routine_id}",
    status_code=status.HTTP_200_OK,
)
def update_user_routine(
    user_id: float, routine_id: float, routine_data: RoutineUpdateDTO, db: DBSessionDependency
) -> RoutineResponseDTO:
    updated_routine = RoutinesService(db).update_user_routine(user_id, routine_id, routine_data)
    if not updated_routine:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Routine with ID {routine_id} not found for user {user_id}",
        )
    return updated_routine


@router.delete(
    "/users/{user_id}/routines/{routine_id}", status_code=status.HTTP_204_NO_CONTENT
)
def delete_user_routine(user_id: float, routine_id: float, db: DBSessionDependency) -> None:
    success = RoutinesService(db).delete_user_routine(user_id, routine_id)
    if not success:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Routine with ID {routine_id} not found for user {user_id}",
        )
    return


# ====================== CONSULTA DE RUTINAS ====================== #


@router.get(
    "/users/{user_id}/routines",
    status_code=status.HTTP_200_OK,
)
def get_user_routines(user_id: float, db: DBSessionDependency) -> List[RoutineResponseDTO]:
    return RoutinesService(db).get_user_routines(user_id)


@router.get(
    "/users/{user_id}/routines/{routine_id}",
    status_code=status.HTTP_200_OK,
)
def get_user_routine_details(
    user_id: float, routine_id: float, db: DBSessionDependency
) -> RoutineResponseDTO:
    routine = RoutinesService(db).get_user_routine_details(user_id, routine_id)
    if not routine:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Routine with ID {routine_id} not found for user {user_id}",
        )
    return routine
