from app.models.scenario_types import ScenarioType
from app.services.simulation_engine import price_simulation, marketing_simulation
from app.services.monte_carlo_engine import run_price_monte_carlo

def run_scenario(scenario_type, data):

    if scenario_type == ScenarioType.PRICE_CHANGE:

        result = price_simulation(
            data["current_price"],
            data["new_price"],
            data["users"],
            data["churn_rate"]
        )

        risk_simulation = run_price_monte_carlo(
            data["current_price"],
            data["new_price"],
            data["users"],
            data["churn_rate"]
        )

        result["risk_simulation"] = risk_simulation

        return result

    elif scenario_type == ScenarioType.MARKETING_SPEND:
        return marketing_simulation(
            data["current_budget"],
            data["new_budget"],
            data["customer_acquisition_cost"],
            data["revenue_per_customer"]
        )

    return {"error": "Scenario not implemented yet"}