def price_simulation(current_price, new_price, users, churn_rate):

    projected_users = users * (1 - churn_rate)

    current_revenue = current_price * users

    projected_revenue = new_price * projected_users

    revenue_change = projected_revenue - current_revenue

    price_increase_percent = ((new_price - current_price) / current_price) * 100


    # Risk scoring logic
    if price_increase_percent > 50:
        risk_level = "High"
    elif price_increase_percent > 25:
        risk_level = "Medium"
    else:
        risk_level = "Low"


    return {
        "current_revenue": current_revenue,
        "projected_revenue": projected_revenue,
        "revenue_change": revenue_change,
        "projected_users": projected_users,
        "price_increase_percent": price_increase_percent,
        "risk_level": risk_level
    }
    

def marketing_simulation(current_budget, new_budget, customer_acquisition_cost, revenue_per_customer):

    additional_budget = new_budget - current_budget

    if additional_budget <= 0:
        return {
            "error": "New marketing budget must be greater than current budget"
        }

    new_customers = additional_budget / customer_acquisition_cost

    additional_revenue = new_customers * revenue_per_customer

    roi = (additional_revenue - additional_budget) / additional_budget

    return {
        "additional_budget": additional_budget,
        "new_customers_acquired": new_customers,
        "additional_revenue": additional_revenue,
        "roi": roi
    }