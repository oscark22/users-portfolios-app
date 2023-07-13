from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, Text
from sqlalchemy.orm import Mapped
from sqlalchemy.orm import relationship
from sqlalchemy.orm import mapped_column
from typing import List

from .settings import Base


class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(primary_key=True)
    username: Mapped[str] = mapped_column(
        String(60), unique=True, index=True, nullable=False
    )
    password: Mapped[str] = mapped_column(String(60), nullable=False)
    role_id: Mapped[int] = mapped_column(ForeignKey("role.id"))

    roles: Mapped["Role"] = relationship(back_populates="users")


class Role(Base):
    __tablename__ = "role"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(20), nullable=False)

    users: Mapped["User"] = relationship(back_populates="roles")


class Project(Base):
    __tablename__ = "project"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(100), nullable=False)
    description: Mapped[str] = mapped_column(Text, nullable=False)
    manager_id: Mapped[int] = mapped_column(ForeignKey("manager.id"))

    manager: Mapped["Manager"] = relationship(back_populates="projects")
    projectDevelopers: Mapped[List["ProjectDeveloper"]] = relationship(
        back_populates="project"
    )


class Manager(Base):
    __tablename__ = "manager"

    id: Mapped[int] = mapped_column(primary_key=True)
    first_name: Mapped[str] = mapped_column(String(60), nullable=False)
    last_name: Mapped[str] = mapped_column(String(60), nullable=False)

    projects: Mapped[List["Project"]] = relationship(back_populates="manager")


class ProjectDeveloper(Base):
    __tablename__ = "projectDeveloper"

    id: Mapped[int] = mapped_column(primary_key=True)
    project_id: Mapped[int] = mapped_column(ForeignKey("project.id"))
    developer_id: Mapped[int] = mapped_column(ForeignKey("developer.id"))

    project: Mapped["Project"] = relationship(back_populates="projectDevelopers")
    developer: Mapped["Developer"] = relationship(back_populates="projectDevelopers")


class Developer(Base):
    __tablename__ = "developer"

    id: Mapped[int] = mapped_column(primary_key=True)
    first_name: Mapped[str] = mapped_column(String(60), nullable=False)
    last_name: Mapped[str] = mapped_column(String(60), nullable=False)

    projectDevelopers: Mapped[List["ProjectDeveloper"]] = relationship(
        back_populates="developer"
    )
