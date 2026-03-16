from pydantic import BaseModel
from app.models.scenario_types import ScenarioType


class ScenarioRequest(BaseModel):

    scenario_type: ScenarioType
    data: dict