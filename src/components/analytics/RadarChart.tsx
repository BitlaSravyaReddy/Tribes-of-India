import React from "react";
import { ResponsiveContainer, RadarChart as ReRadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend, Tooltip } from "recharts";

interface RadarChartProps {
  data: any[];
  labelKey: string;
  valueKeys: string[];
  valueLabels: string[];
  colors?: string[];
}

const defaultColors = ["#5B4FE9", "#1BC6B4", "#F7B801", "#F95D6A", "#6A4C93"];

export default function RadarChart({ data, labelKey, valueKeys, valueLabels, colors = defaultColors }: RadarChartProps) {
  if (!data || data.length === 0) return <div>No data available</div>;
  return (
    <ResponsiveContainer width="100%" height={400}>
      <ReRadarChart data={data} outerRadius={150}>
        <PolarGrid />
        <PolarAngleAxis dataKey={labelKey} />
        <PolarRadiusAxis />
        <Tooltip />
        <Legend />
        {valueKeys.map((key, idx) => (
          <Radar key={key} name={valueLabels[idx] || key} dataKey={key} stroke={colors[idx % colors.length]} fill={colors[idx % colors.length]} fillOpacity={0.5} />
        ))}
      </ReRadarChart>
    </ResponsiveContainer>
  );
} 