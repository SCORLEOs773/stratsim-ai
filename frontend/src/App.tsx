import { useState } from "react";

type ScenarioType = "price_change" | "marketing_spend";

interface PriceChangeData {
  current_price: number;
  new_price: number;
  users: number;
  churn_rate: number;
}

interface MarketingData {
  current_budget: number;
  new_budget: number;
  customer_acquisition_cost: number;
  revenue_per_customer: number;
}

interface SimulationResponse {
  simulation_result: Record<string, unknown>;
  ai_analysis: string;
}

function App() {
  const [scenarioType, setScenarioType] =
    useState<ScenarioType>("price_change");
  const [priceData, setPriceData] = useState<PriceChangeData>({
    current_price: 20,
    new_price: 25,
    users: 5000,
    churn_rate: 0.1,
  });
  const [marketingData, setMarketingData] = useState<MarketingData>({
    current_budget: 10000,
    new_budget: 20000,
    customer_acquisition_cost: 50,
    revenue_per_customer: 120,
  });
  const [result, setResult] = useState<SimulationResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    const payload =
      scenarioType === "price_change"
        ? { scenario_type: scenarioType, data: priceData }
        : { scenario_type: scenarioType, data: marketingData };

    try {
      const res = await fetch("http://127.0.0.1:8000/simulation/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error(`Server responded with status ${res.status}`);
      }

      const json: SimulationResponse = await res.json();
      setResult(json);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        padding: "2rem",
        fontFamily: "sans-serif",
        maxWidth: "700px",
        margin: "auto",
      }}
    >
      <h1 style={{ textAlign: "center" }}>Strategic Simulation</h1>

      <form
        onSubmit={handleSubmit}
        style={{
          marginBottom: "2rem",
          background: "#f9f9f9",
          padding: "1.5rem",
          borderRadius: "8px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}
      >
        <div style={{ marginBottom: "1rem" }}>
          <label
            htmlFor="scenario"
            style={{
              fontWeight: 600,
              display: "block",
              marginBottom: "0.5rem",
            }}
          >
            Select Scenario:
          </label>
          <select
            id="scenario"
            value={scenarioType}
            onChange={(e) => setScenarioType(e.target.value as ScenarioType)}
            style={{
              padding: "0.5rem",
              width: "100%",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          >
            <option value="price_change">Price Change</option>
            <option value="marketing_spend">Marketing Spend</option>
          </select>
        </div>

        {scenarioType === "price_change" && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "1rem",
            }}
          >
            <div>
              <label>Current Price</label>
              <input
                type="number"
                value={priceData.current_price}
                onChange={(e) =>
                  setPriceData({ ...priceData, current_price: +e.target.value })
                }
              />
            </div>
            <div>
              <label>New Price</label>
              <input
                type="number"
                value={priceData.new_price}
                onChange={(e) =>
                  setPriceData({ ...priceData, new_price: +e.target.value })
                }
              />
            </div>
            <div>
              <label>Number of Users</label>
              <input
                type="number"
                value={priceData.users}
                onChange={(e) =>
                  setPriceData({ ...priceData, users: +e.target.value })
                }
              />
            </div>
            <div>
              <label>Churn Rate</label>
              <input
                type="number"
                step="0.01"
                value={priceData.churn_rate}
                onChange={(e) =>
                  setPriceData({ ...priceData, churn_rate: +e.target.value })
                }
              />
            </div>
          </div>
        )}

        {scenarioType === "marketing_spend" && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "1rem",
            }}
          >
            <div>
              <label>Current Budget</label>
              <input
                type="number"
                value={marketingData.current_budget}
                onChange={(e) =>
                  setMarketingData({
                    ...marketingData,
                    current_budget: +e.target.value,
                  })
                }
              />
            </div>
            <div>
              <label>New Budget</label>
              <input
                type="number"
                value={marketingData.new_budget}
                onChange={(e) =>
                  setMarketingData({
                    ...marketingData,
                    new_budget: +e.target.value,
                  })
                }
              />
            </div>
            <div>
              <label>Customer Acquisition Cost</label>
              <input
                type="number"
                value={marketingData.customer_acquisition_cost}
                onChange={(e) =>
                  setMarketingData({
                    ...marketingData,
                    customer_acquisition_cost: +e.target.value,
                  })
                }
              />
            </div>
            <div>
              <label>Revenue Per Customer</label>
              <input
                type="number"
                value={marketingData.revenue_per_customer}
                onChange={(e) =>
                  setMarketingData({
                    ...marketingData,
                    revenue_per_customer: +e.target.value,
                  })
                }
              />
            </div>
          </div>
        )}

        <button
          type="submit"
          style={{
            marginTop: "1rem",
            padding: "0.7rem 1.5rem",
            background: "#4CAF50",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Run Simulation
        </button>
      </form>

      {loading && <p>Running simulation...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {result && (
        <div style={{ marginTop: "2rem" }}>
          <h2>Simulation Result</h2>
          <div
            style={{
              padding: "1rem",
              background: "#eef2f7",
              borderRadius: "6px",
              marginBottom: "1rem",
            }}
          >
            {Object.entries(result.simulation_result).map(([key, value]) => (
              <div key={key} style={{ marginBottom: "0.5rem" }}>
                <strong>{key.replace(/_/g, " ")}:</strong>{" "}
                {typeof value === "object" && value !== null
                  ? JSON.stringify(value, null, 2)
                  : String(value)}
              </div>
            ))}
          </div>

          <h2>AI Analysis</h2>
          <div
            style={{
              padding: "1rem",
              background: "#fff3e0",
              borderRadius: "6px",
              lineHeight: "1.6",
            }}
          >
            {result.ai_analysis.split("\n").map((line, idx) => (
              <p key={idx}>{line}</p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
