from fastapi import APIRouter
from app.schemas.scenario_schema import ScenarioRequest
from app.services.scenario_manager import run_scenario
from app.services.ai_engine import generate_strategy_analysis
from app.models.strategy_request import StrategyComparisonRequest
from app.services.strategy_engine import compare_strategies
from app.services.strategy_engine import generate_strategy_recommendation

router = APIRouter(
    prefix="/simulation",
    tags=["Simulation"]
)

@router.post("/run")
def run_simulation(request: ScenarioRequest):

    result = run_scenario(
        request.scenario_type,
        request.data
    )

    ai_analysis = generate_strategy_analysis(result)

    return {
        "simulation_result": result,
        "ai_analysis": ai_analysis
    }
    
@router.post("/compare")
def compare_business_strategies(request: StrategyComparisonRequest):

    ranked = compare_strategies(request.strategies)

    recommendation = generate_strategy_recommendation(ranked)

    return {
        "strategy_ranking": ranked,
        "recommendation": recommendation
    }