from typing import Dict

from fastapi import APIRouter, status
from src.deps.database import DBSessionDependency
from src.dtos.user_auth_dtos import AuthResponseDTO, UserLoginDTO, UserSignUpDTO
from src.services.user_auth import UserAuthService

router = APIRouter(prefix="/auth", tags=["Auth"])

# ====================== MANAGING - USERS ====================== #


@router.post("/signup", status_code=status.HTTP_201_CREATED)
def sign_up_user(user_data: UserSignUpDTO, db: DBSessionDependency) -> AuthResponseDTO:
    return UserAuthService(db).sign_up_user(user_data)


@router.post("/login", status_code=status.HTTP_200_OK)
def login_user(user_data: UserLoginDTO, db: DBSessionDependency) -> AuthResponseDTO:
    return UserAuthService(db).login_user(user_data)
