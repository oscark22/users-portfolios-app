from sqlalchemy.orm import Session
from database.models import Role
from database.schemas import RoleCreate


def get_all_roles(db: Session):
    return db.query(Role).all()


def get_role_by_id(db: Session, role_id: int):
    return db.query(Role).filter(Role.id == role_id).first()


def create_role(db: Session, role: RoleCreate):
    db_role = Role(name=role.name)
    db.add(db_role)
    db.commit()
    db.refresh(db_role)
    return db_role


def update_role(db: Session, role_data):
    db.merge(role_data)
    db.commit()


def delete_role(db: Session, db_role: Role):
    db.delete(db_role)
    db.commit()
