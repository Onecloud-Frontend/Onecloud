import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export interface WonLostChartData {
  name: string;
  won: number;
  lost: number;
}

interface WonLostChartProps {
  data: WonLostChartData[];
}

export default function WonLostChart({ data }: WonLostChartProps) {
  return (
    <div className="rounded-lg border bg-white p-4 shadow-sm">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-gray-900">
          Won vs Lost Opportunities
        </h2>

        <p className="text-sm text-gray-500">
          Opportunity performance by stage
        </p>
      </div>

      <div className="h-[350px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="name" />

            <YAxis allowDecimals={false} />

            <Tooltip />

            <Legend />

            <Bar dataKey="won" name="Won" />

            <Bar dataKey="lost" name="Lost" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
