from sqlalchemy.orm import Session
from database.models import User
from database.schemas import UserCreate


def get_all_users(db: Session):
    return db.query(User).all()


def get_user(db: Session, user_id: int):
    return db.query(User).filter(User.id == user_id).first()


def get_user_by_email(db: Session, email: str):
    return db.query(User).filter(User.email == email).first()


def create_user(db: Session, user: UserCreate):
    new_user = User(email=user.email, password=user.password + "fakehash")
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user
