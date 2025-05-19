from sqlalchemy.orm import Session
from src.dtos.user_auth import AuthResponseDTO, UserLoginDTO, UserSignUpDTO
from src.repositories.users import UsersRepository


class UserAuthService:

    def __init__(self, db_session: Session):
        self.users_repo = UsersRepository(db_session)

    def sign_up_user(self, user_data: UserSignUpDTO) -> AuthResponseDTO:
        user = self.users_repo.save_new_user(user_data)
        return AuthResponseDTO(
            id=user.id,
            name=user.name,
            surname=user.surname,
            username=user.username,
            email=user.email,
            status=True,
        )

    def login_user(self, user_data: UserLoginDTO) -> AuthResponseDTO:
        user = self.users_repo.get_user_by_email(user_data.email)
        if not user or not user.check_password(user_data.password):
            raise ValueError("Invalid credentials")
        return AuthResponseDTO(
            id=user.id,
            name=user.name,
            surname=user.surname,
            username=user.username,
            email=user.email,
            status=True,
        )
