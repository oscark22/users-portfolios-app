from sqlalchemy.orm import Session
from database.models import Manager
from database.schemas import ManagerCreate


def get_all_managers(db: Session):
    return db.query(Manager).all()


def get_manager_by_id(db: Session, manager_id: int):
    return db.query(Manager).filter(Manager.id == manager_id).first()


def create_manager(db: Session, manager: ManagerCreate):
    db_manager = Manager(first_name=manager.first_name, last_name=manager.last_name)
    db.add(db_manager)
    db.commit()
    db.refresh(db_manager)
    return db_manager


def update_manager(db: Session, manager_data):
    db.merge(manager_data)
    db.commit()


def delete_manager(db: Session, db_manager: Manager):
    db.delete(db_manager)
    db.commit()
