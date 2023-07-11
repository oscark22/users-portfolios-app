from sqlalchemy.orm import Session
from database.models import Developer
from database.schemas import DeveloperCreate


def get_all_developers(db: Session):
    return db.query(Developer).all()


def get_developer_by_id(db: Session, developer_id: int):
    return db.query(Developer).filter(Developer.id == developer_id).first()


def create_developer(db: Session, developer: DeveloperCreate):
    db_developer = Developer(
        first_name=developer.first_name, last_name=developer.last_name
    )
    db.add(db_developer)
    db.commit()
    db.refresh(db_developer)
    return db_developer


def update_developer(db: Session, developer_data):
    db.merge(developer_data)
    db.commit()


def delete_developer(db: Session, db_developer: Developer):
    db.delete(db_developer)
    db.commit()
