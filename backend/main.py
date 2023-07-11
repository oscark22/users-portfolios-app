from fastapi import Depends, FastAPI, HTTPException
from sqlalchemy.orm import Session
import uvicorn

from database import models, schemas
from database.settings import SessionLocal, engine

from routers import users_router
import controllers


models.Base.metadata.create_all(bind=engine)

app = FastAPI()


app.include_router(users_router.router)


@app.get("/")
def read_root():
    return {"Hello": "World"}


if __name__ == "__main__":
    uvicorn.run("main:app", port=9000, reload=True)
