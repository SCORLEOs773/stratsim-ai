from app.services.scenario_manager import run_scenario


def compare_strategies(strategies):

    results = []

    for strategy in strategies:

        scenario_type = strategy.scenario_type
        data = strategy.data

        result = run_scenario(scenario_type, data)

        score = calculate_strategy_score(result)

        results.append({
            "strategy": scenario_type,
            "result": result,
            "score": score
        })

    ranked = sorted(results, key=lambda x: x["score"], reverse=True)

    return ranked


def calculate_strategy_score(result):

    score = 0

    if "revenue_change" in result:
        score += result["revenue_change"]

    if "additional_revenue" in result:
        score += result["additional_revenue"]

    if "risk_simulation" in result:
        probability = result["risk_simulation"]["probability_revenue_increase"]
        score *= probability

    return score


def generate_strategy_recommendation(ranked_strategies):

    if not ranked_strategies:
        return "No strategies available for recommendation."

    best = ranked_strategies[0]

    strategy_name = best["strategy"]
    score = best["score"]

    reason = ""

    result = best["result"]

    if "revenue_change" in result:
        reason = f"This strategy increases revenue by approximately {result['revenue_change']}."

    elif "additional_revenue" in result:
        reason = f"This strategy generates approximately {result['additional_revenue']} in additional revenue."

    if "risk_simulation" in result:
        probability = result["risk_simulation"]["probability_revenue_increase"]
        reason += f" The probability of revenue growth is {round(probability*100,1)}%."

    return {
        "recommended_strategy": strategy_name,
        "score": score,
        "reason": reason
    }