from sqlalchemy.orm import Session
from database.models import User
from database.schemas import UserCreate


def get_all_users(db: Session):
    return db.query(User).all()


def get_user_by_id(db: Session, user_id: int):
    return db.query(User).filter(User.id == user_id).first()


def get_user_by_email(db: Session, email: str):
    return db.query(User).filter(User.email == email).first()


def create_user(db: Session, user: UserCreate):
    db_user = User(
        email=user.email, password=user.password + "fakehash", role_id=user.role_id
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
