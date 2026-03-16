import { useState } from "react";
import API from "../services/api";
import type { SimulationResponse } from "../types/simulation";

function SimulationPage() {
  const [result, setResult] = useState<SimulationResponse | null>(null);

  const runSimulation = async () => {
    const response = await API.post("/simulation/run", {
      scenario_type: "price_change",
      data: {
        current_price: 20,
        new_price: 25,
        users: 5000,
        churn_rate: 0.1,
      },
    });

    setResult(response.data);
  };

  return (
    <div>
      <h2>Run Price Simulation</h2>

      <button onClick={runSimulation}>Run Simulation</button>

      {result && <pre>{JSON.stringify(result, null, 2)}</pre>}
    </div>
  );
}

export default SimulationPage;
