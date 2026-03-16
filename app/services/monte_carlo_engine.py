import random


def run_price_monte_carlo(
    current_price,
    new_price,
    users,
    churn_rate,
    simulations=5000
):

    revenues = []

    for _ in range(simulations):

        # simulate churn variability (+/-5%)
        simulated_churn = churn_rate + random.uniform(-0.05, 0.05)

        if simulated_churn < 0:
            simulated_churn = 0

        remaining_users = users * (1 - simulated_churn)

        revenue = remaining_users * new_price

        revenues.append(revenue)

    expected_revenue = sum(revenues) / len(revenues)

    best_case = max(revenues)
    worst_case = min(revenues)

    probability_increase = sum(1 for r in revenues if r > users * current_price) / simulations

    return {
        "expected_revenue": expected_revenue,
        "best_case": best_case,
        "worst_case": worst_case,
        "probability_revenue_increase": probability_increase
    }