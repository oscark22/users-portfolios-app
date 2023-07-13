from pydantic import BaseModel


# users
class UserBase(BaseModel):
    email: str
    password: str
    role_id: int


class UserCreate(UserBase):
    pass


class User(UserBase):
    id: int

    class Config:
        from_attributes = True


# roles
class RoleBase(BaseModel):
    name: str


class RoleCreate(RoleBase):
    pass


class Role(RoleBase):
    id: int

    class Config:
        from_attributes = True


# projectDeveloper
class ProjectDeveloperBase(BaseModel):
    project_id: int
    developer_id: int


class ProjectDeveloperCreate(ProjectDeveloperBase):
    pass


class ProjectDeveloper(ProjectDeveloperBase):
    id: int

    class Config:
        from_attributes = True


# project
class ProjectBase(BaseModel):
    name: str
    description: str
    manager_id: int


class ProjectCreate(ProjectBase):
    pass


class Project(ProjectBase):
    id: int

    class Config:
        from_attributes = True


# manager
class ManagerBase(BaseModel):
    first_name: str
    last_name: str


class ManagerCreate(ManagerBase):
    pass


class Manager(ManagerBase):
    id: int

    class Config:
        from_attributes = True


# developer
class DeveloperBase(BaseModel):
    first_name: str
    last_name: str


class DeveloperCreate(DeveloperBase):
    pass


class Developer(DeveloperBase):
    id: int

    class Config:
        from_attributes = True
