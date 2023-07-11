from fastapi import Depends, FastAPI, HTTPException
from sqlalchemy.orm import Session

from database import models, schemas
from database.settings import SessionLocal, engine

from routers import users
import controllers


models.Base.metadata.create_all(bind=engine)

app = FastAPI()


app.include_router(users.router)


@app.get("/")
def read_root():
    return {"Hello": "World"}
