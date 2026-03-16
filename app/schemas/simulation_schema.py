from pydantic import BaseModel

class PriceSimulationInput(BaseModel):
    current_price: float
    new_price: float
    users: int
    churn_rate: float