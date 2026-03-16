from sqlalchemy import Column, Integer, String, Float, JSON
from app.database.db import Base


class Simulation(Base):

    __tablename__ = "simulations"

    id = Column(Integer, primary_key=True, index=True)

    scenario_type = Column(String)

    input_data = Column(JSON)

    result_data = Column(JSON)