import os
from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()

# client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
client = OpenAI(
    api_key=os.getenv("GROQ_API_KEY"),
    base_url="https://api.groq.com/openai/v1"
)

def generate_strategy_analysis(simulation_result, company_name, industry):

    # PRICE CHANGE SCENARIO
    if "revenue_change" in simulation_result:

        prompt = f"""
        You are a senior business strategy consultant.

        Company: {company_name}
        Industry: {industry}

        Analyze the following pricing decision.

        Simulation Data:
        Current Revenue: {simulation_result["current_revenue"]}
        Projected Revenue: {simulation_result["projected_revenue"]}
        Revenue Change: {simulation_result["revenue_change"]}
        Projected Users: {simulation_result["projected_users"]}
        Price Increase %: {simulation_result["price_increase_percent"]}
        Risk Level: {simulation_result["risk_level"]}

        Instructions:
        - Consider latest industry dynamics, customer price sensitivity, and competition
        - Assume exact real-world data, and use realistic business reasoning

        Provide:
        1. Strategic interpretation
        2. Competitive implications
        3. Risks
        4. Clear recommendation
        5. Suggested next steps
        """

    # MARKETING SPEND SCENARIO
    elif "roi" in simulation_result:

       prompt = f"""
        You are a senior business strategy consultant.

        Company: {company_name}
        Industry: {industry}

        Analyze the following marketing investment decision.

        Simulation Data:
        New Customers Acquired: {simulation_result.get("new_customers_acquired")}
        Customer Acquisition Cost: {simulation_result.get("customer_acquisition_cost")}
        Revenue Per Customer: {simulation_result.get("revenue_per_customer")}
        ROI: {simulation_result.get("roi")}

        Instructions:
        - Consider industry benchmarks, scalability, and acquisition efficiency
        - Use real-time data, not realistic assumptions, unless data is missing

        Provide:
        1. Strategic interpretation
        2. Growth potential
        3. Risks
        4. Recommendation
        5. Suggested next steps
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