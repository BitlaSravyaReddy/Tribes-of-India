import React from "react";
import { ResponsiveContainer, BarChart as ReBarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";

interface BarChartProps {
  data: any[];
  labelKey: string;
  valueKeys: string[];
  valueLabels: string[];
  colors?: string[];
}

const defaultColors = ["#5B4FE9", "#1BC6B4", "#F7B801", "#F95D6A", "#6A4C93"];

export default function BarChart({ data, labelKey, valueKeys, valueLabels, colors = defaultColors }: BarChartProps) {
  if (!data || data.length === 0) return <div>No data available</div>;
  return (
    <ResponsiveContainer width="100%" height={400}>
      <ReBarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 60 }}>
        <XAxis dataKey={labelKey} angle={-30} textAnchor="end" interval={0} height={80} />
        <YAxis />
        <Tooltip />
        <Legend />
        {valueKeys.map((key, idx) => (
          <Bar key={key} dataKey={key} name={valueLabels[idx] || key} fill={colors[idx % colors.length]} />
        ))}
      </ReBarChart>
    </ResponsiveContainer>
  );
} 