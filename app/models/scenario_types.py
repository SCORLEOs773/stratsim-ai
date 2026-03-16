from enum import Enum

class ScenarioType(str, Enum):

    PRICE_CHANGE = "price_change"
    MARKETING_SPEND = "marketing_spend"
    HIRING = "hiring"