from fastapi import FastAPI
from app.routers import simulation
from dotenv import load_dotenv
from app.database.db import engine
from app.database.models import Base
from fastapi.middleware.cors import CORSMiddleware

Base.metadata.create_all(bind=engine)

load_dotenv()

app = FastAPI(title="StratSim AI")

# ✅ ADD CORS HERE
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
    "https://stratsim.netlify.app"],
    # "*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)   

app.include_router(simulation.router)

@app.get("/")
def root():
    return {"message": "StratSim AI backend is running"}