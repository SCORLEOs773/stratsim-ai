import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

interface ChartProps {
  data: Record<string, number>;
}

export default function SimulationChart({ data }: ChartProps) {
  const chartData = Object.entries(data).map(([key, value]) => ({
    name: key,
    value: Number(value),
  }));

  return (
    <BarChart width={500} height={300} data={chartData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  );
}
