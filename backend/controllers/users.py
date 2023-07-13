from sqlalchemy.orm import Session
from helpers.hashing import get_password_hash
from database.models import User
from database.schemas import UserCreate


def get_all_users(db: Session):
    return db.query(User).all()


def get_user_by_id(db: Session, user_id: int):
    return db.query(User).filter(User.id == user_id).first()


def get_user_by_username(db: Session, username: str):
    return db.query(User).filter(User.username == username).first()


def create_user(db: Session, user: UserCreate):
    hashed_password = get_password_hash(user.password)

    db_user = User(
        username=user.email,
        password=hashed_password,
        role_id=user.role_id,
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


def update_user(db: Session, user_data):
    db.merge(user_data)
    db.commit()


def delete_user(db: Session, db_user: User):
    db.delete(db_user)
    db.commit()
