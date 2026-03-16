from pydantic import BaseModel
from typing import Dict, Any


class Strategy(BaseModel):
    scenario_type: str
    data: Dict[str, Any]


class StrategyComparisonRequest(BaseModel):
    strategies: list[Strategy]