# def generate_strategy_analysis(simulation_result):

#     # Price change scenario
#     if "revenue_change" in simulation_result:

#         revenue_change = simulation_result["revenue_change"]
#         risk = simulation_result.get("risk_level", "Unknown")

#         return f"""
# Strategic Interpretation:
# The pricing change leads to a revenue change of {revenue_change}.
# This suggests that the pricing adjustment may influence profitability depending on customer retention.

# Risk Assessment:
# The estimated risk level is {risk}.
# Significant price changes may trigger churn if competitors offer better pricing.

# Recommendation:
# Consider testing the new pricing with a smaller user segment before full rollout.
# """

#     # Marketing scenario
#     elif "roi" in simulation_result:

#         roi = simulation_result["roi"]
#         customers = simulation_result["new_customers_acquired"]

#         return f"""
# Strategic Interpretation:
# The increased marketing spend could acquire approximately {customers:.0f} new customers.

# Financial Impact:
# The projected ROI of the campaign is {roi:.2f}.

# Recommendation:
# Monitor acquisition channels carefully to ensure customer acquisition cost remains stable.
# Scaling the campaign gradually may reduce risk.
# """

#     return "AI analysis unavailable for this scenario."



import os
from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()

# client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
client = OpenAI(
    api_key=os.getenv("GROQ_API_KEY"),
    base_url="https://api.groq.com/openai/v1"
)

def generate_strategy_analysis(simulation_result):

    # PRICE CHANGE SCENARIO
    if "revenue_change" in simulation_result:

        prompt = f"""
You are a business strategy consultant.

Analyze the following pricing simulation results.

Simulation Data:
Current Revenue: {simulation_result["current_revenue"]}
Projected Revenue: {simulation_result["projected_revenue"]}
Revenue Change: {simulation_result["revenue_change"]}
Projected Users: {simulation_result["projected_users"]}
Price Increase %: {simulation_result["price_increase_percent"]}
Risk Level: {simulation_result["risk_level"]}

Provide:
1. Strategic interpretation
2. Potential risks
3. Recommendations
"""

    # MARKETING SPEND SCENARIO
    elif "roi" in simulation_result:

        prompt = f"""
    You are a business strategy consultant.

    Analyze the following marketing simulation results.

    Simulation Data:
    New Customers Acquired: {simulation_result.get("new_customers_acquired")}
    Customer Acquisition Cost: {simulation_result.get("customer_acquisition_cost", "N/A")}
    Revenue Per Customer: {simulation_result.get("revenue_per_customer", "N/A")}
    ROI: {simulation_result.get("roi")}

    Provide:
    1. Strategic interpretation
    2. Potential risks
    3. Recommendations
    """
    else:
        return "Unsupported simulation type"

    try:
        response = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[{"role": "user", "content": prompt}]
        )

        return response.choices[0].message.content

    except Exception as e:
        print("AI ERROR:", e)
        return "AI analysis temporarily unavailable"