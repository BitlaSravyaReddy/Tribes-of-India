import React from "react";
import { ResponsiveContainer, PieChart as RePieChart, Pie, Cell, Tooltip, Legend } from "recharts";

interface PieChartProps {
  data: any[];
  labelKey: string;
  valueKey: string;
  colors?: string[];
}

const defaultColors = ["#5B4FE9", "#1BC6B4", "#F7B801", "#F95D6A", "#6A4C93", "#FFB347", "#A1C349", "#FF6F91", "#6A4C93", "#00C49F"];

export default function PieChart({ data, labelKey, valueKey, colors = defaultColors }: PieChartProps) {
  if (!data || data.length === 0) return <div>No data available</div>;
  return (
    <ResponsiveContainer width="100%" height={400}>
      <RePieChart>
        <Pie
          data={data}
          dataKey={valueKey}
          nameKey={labelKey}
          cx="50%"
          cy="50%"
          outerRadius={150}
          label
        >
          {data.map((entry, idx) => (
            <Cell key={`cell-${idx}`} fill={colors[idx % colors.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </RePieChart>
    </ResponsiveContainer>
  );
} 