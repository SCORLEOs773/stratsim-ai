from fastapi import FastAPI
from app.routers import simulation
from dotenv import load_dotenv
from app.database.db import engine
from app.database.models import Base

Base.metadata.create_all(bind=engine)

load_dotenv()

app = FastAPI(title="StratSim AI")

app.include_router(simulation.router)

@app.get("/")
def root():
    return {"message": "StratSim AI backend is running"}