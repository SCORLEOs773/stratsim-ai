from app.database.db import SessionLocal
from app.database.models import Simulation


def save_simulation(scenario_type, input_data, result_data):

    db = SessionLocal()

    simulation = Simulation(
        scenario_type=scenario_type,
        input_data=input_data,
        result_data=result_data
    )

    db.add(simulation)
    db.commit()
    db.refresh(simulation)

    db.close()

    return simulation.id