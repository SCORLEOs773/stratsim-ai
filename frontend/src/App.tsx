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
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f4f6f9",
        padding: "2rem",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ maxWidth: "900px", margin: "auto" }}>
        {/* HEADER */}
        <div
          style={{
            background: "#fff",
            padding: "1.5rem",
            borderRadius: "10px",
            marginBottom: "1.5rem",
            boxShadow: "0 3px 10px rgba(0,0,0,0.08)",
            textAlign: "center",
          }}
        >
          <h1>Strategic Simulation</h1>
          <p style={{ color: "#666" }}>
            Analyze business decisions with AI insights
          </p>
        </div>

        {/* FORM CARD */}
        <form
          onSubmit={handleSubmit}
          style={{
            background: "#fff",
            padding: "1.5rem",
            borderRadius: "10px",
            boxShadow: "0 3px 10px rgba(0,0,0,0.08)",
            marginBottom: "2rem",
          }}
        >
          <h2 style={{ marginBottom: "1rem" }}>Scenario Configuration</h2>

          {/* Scenario Box */}
          <div
            style={{
              background: "#f9fafb",
              padding: "1rem",
              borderRadius: "8px",
              marginBottom: "1rem",
              border: "1px solid #eee",
            }}
          >
            <label style={{ fontWeight: 600 }}>Select Scenario</label>
            <select
              value={scenarioType}
              onChange={(e) => setScenarioType(e.target.value as ScenarioType)}
              style={{
                width: "100%",
                padding: "0.6rem",
                marginTop: "0.5rem",
                borderRadius: "6px",
                border: "1px solid #ccc",
              }}
            >
              <option value="price_change">Price Change</option>
              <option value="marketing_spend">Marketing Spend</option>
            </select>
          </div>

          {/* Inputs Box */}
          <div
            style={{
              background: "#f9fafb",
              padding: "1rem",
              borderRadius: "8px",
              border: "1px solid #eee",
            }}
          >
            <h3 style={{ marginBottom: "1rem" }}>Input Parameters</h3>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "1rem",
              }}
            >
              {scenarioType === "price_change" && (
                <>
                  <Input
                    label="Current Price"
                    value={priceData.current_price}
                    onChange={(v) =>
                      setPriceData({ ...priceData, current_price: v })
                    }
                  />
                  <Input
                    label="New Price"
                    value={priceData.new_price}
                    onChange={(v) =>
                      setPriceData({ ...priceData, new_price: v })
                    }
                  />
                  <Input
                    label="Users"
                    value={priceData.users}
                    onChange={(v) => setPriceData({ ...priceData, users: v })}
                  />
                  <Input
                    label="Churn Rate"
                    step="0.01"
                    value={priceData.churn_rate}
                    onChange={(v) =>
                      setPriceData({ ...priceData, churn_rate: v })
                    }
                  />
                </>
              )}

              {scenarioType === "marketing_spend" && (
                <>
                  <Input
                    label="Current Budget"
                    value={marketingData.current_budget}
                    onChange={(v) =>
                      setMarketingData({
                        ...marketingData,
                        current_budget: v,
                      })
                    }
                  />
                  <Input
                    label="New Budget"
                    value={marketingData.new_budget}
                    onChange={(v) =>
                      setMarketingData({
                        ...marketingData,
                        new_budget: v,
                      })
                    }
                  />
                  <Input
                    label="Customer Acquisition Cost"
                    value={marketingData.customer_acquisition_cost}
                    onChange={(v) =>
                      setMarketingData({
                        ...marketingData,
                        customer_acquisition_cost: v,
                      })
                    }
                  />
                  <Input
                    label="Revenue Per Customer"
                    value={marketingData.revenue_per_customer}
                    onChange={(v) =>
                      setMarketingData({
                        ...marketingData,
                        revenue_per_customer: v,
                      })
                    }
                  />
                </>
              )}
            </div>
          </div>

          {/* Button */}
          <button
            type="submit"
            style={{
              marginTop: "1.2rem",
              width: "100%",
              padding: "0.8rem",
              background: "#4CAF50",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            {loading ? "Running Simulation..." : "Run Simulation"}
          </button>
        </form>

        {/* STATES */}
        {loading && <p>Running simulation...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        {/* RESULTS */}
        {result && (
          <>
            {/* RESULTS CARD */}
            <div
              style={{
                background: "#fff",
                padding: "1.5rem",
                borderRadius: "10px",
                marginBottom: "1rem",
                boxShadow: "0 3px 10px rgba(0,0,0,0.08)",
              }}
            >
              <h2>Simulation Results</h2>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "1rem",
                  marginTop: "1rem",
                }}
              >
                {Object.entries(result.simulation_result).map(
                  ([key, value]) => (
                    <div
                      key={key}
                      style={{
                        background: "#f4f6f9",
                        padding: "0.8rem",
                        borderRadius: "6px",
                        border: "1px solid #eee",
                      }}
                    >
                      <div style={{ fontSize: "0.85rem", color: "#666" }}>
                        {key.replace(/_/g, " ")}
                      </div>
                      <div style={{ fontWeight: 600 }}>{String(value)}</div>
                    </div>
                  ),
                )}
              </div>
            </div>

            {/* AI ANALYSIS */}
            <div
              style={{
                background: "#fff",
                padding: "1.5rem",
                borderRadius: "10px",
                boxShadow: "0 3px 10px rgba(0,0,0,0.08)",
              }}
            >
              <h2>AI Analysis</h2>

              <div
                style={{
                  marginTop: "1rem",
                  background: "#fff3e0",
                  padding: "1rem",
                  borderRadius: "6px",
                  lineHeight: "1.6",
                }}
              >
                {result.ai_analysis.split("\n").map((line, idx) => (
                  <p key={idx}>{line}</p>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function Input({
  label,
  value,
  onChange,
  step,
}: {
  label: string;
  value: number;
  onChange: (val: number) => void;
  step?: string;
}) {
  return (
    <div>
      <label style={{ fontWeight: 500 }}>{label}</label>
      <input
        type="number"
        step={step}
        value={value}
        onChange={(e) => onChange(+e.target.value)}
        style={{
          width: "100%",
          padding: "0.5rem",
          marginTop: "0.3rem",
          borderRadius: "6px",
          border: "1px solid #ccc",
        }}
      />
    </div>
  );
}

export default App;
