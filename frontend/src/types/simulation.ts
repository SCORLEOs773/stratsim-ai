export interface PriceSimulationRequest {
  scenario_type: string;
  data: {
    current_price: number;
    new_price: number;
    users: number;
    churn_rate: number;
  };
}

export interface SimulationResponse {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  simulation_result: any;
  ai_analysis: string;
}
