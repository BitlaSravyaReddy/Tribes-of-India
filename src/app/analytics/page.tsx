"use client";
import React, { useEffect, useState, useMemo } from "react";
import {
  Box,
  Container,
  Typography,
  Tabs,
  Tab,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Paper,
} from "@mui/material";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import BarChart from "@/components/analytics/BarChart";
import LineChart from "@/components/analytics/LineChart";
import PieChart from "@/components/analytics/PieChart";
import RadarChart from "@/components/analytics/RadarChart";
import MapChart from "@/components/analytics/MapChart";
import { dataTypeConfig, DataTypeKey } from "@/libs/data/analytics";

const chartTypes = [
  { label: "Bar Chart", value: "bar" },
  { label: "Line Chart", value: "line" },
  { label: "Pie Chart", value: "pie" },
  { label: "Radar Chart", value: "radar" },
  { label: "Map Visualization", value: "map" },
];

export default function Home() {
  const [tab, setTab] = useState(0);
  const [states, setStates] = useState<string[]>([]);
  const [selectedState, setSelectedState] = useState("All States");
  const [dataType, setDataType] = useState<DataTypeKey>("literacy");
  const [chartType, setChartType] = useState("bar");
  const [data, setData] = useState<any[]>([]);
  const [tribeData, setTribeData] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [compareState1, setCompareState1] = useState<string>("Andhra Pradesh");
  const [compareState2, setCompareState2] = useState<string>("Karnataka");

  // Fetch states and tribe data on mount
  useEffect(() => {
    fetch("/api/analytics/analy")
      .then((res) => res.json())
      .then((data) => {
        setTribeData(data);
        const uniqueStates = [
          "All States",
          ...Array.from(new Set(data.map((t: any) => t.state))) as string[],
        ];
        setStates(uniqueStates);
      });
  }, []);

  // Fetch data for the selected data type and state
  useEffect(() => {
    let endpoint = `/api/analytics/analy`;
    if (selectedState !== "All States") {
      endpoint += `?state=${encodeURIComponent(selectedState)}`;
    }
    fetch(endpoint)
      .then((res) => res.json())
      .then((data) => setData(processChartData(data, dataType)));
  }, [selectedState, dataType]);

  // Process data for chart components
  function processChartData(raw: any[], type: DataTypeKey) {
    if (type === "literacy") {
      const stateMap: Record<string, { state: string; avg: number; min: number; max: number }> = {};
      raw.forEach((t) => {
        const state = t.state;
        const edu = t.education || {};
        let avg = Number(edu.average_literacy_rate);
        let min = Number(edu.minimum_literacy_rate);
        let max = Number(edu.maximum_literacy_rate);
        // If any value is missing or not a number, use defaults
        if (isNaN(avg)) avg = 70;
        if (isNaN(min)) min = 60;
        if (isNaN(max)) max = 80;
        // If values are in 0-1 range, convert to percent
        if (avg > 0 && avg <= 1 && min >= 0 && min <= 1 && max >= 0 && max <= 1) {
          avg = avg * 100;
          min = min * 100;
          max = max * 100;
        }
        if (!stateMap[state]) {
          stateMap[state] = { state, avg, min, max };
        } else {
          stateMap[state].avg = (stateMap[state].avg + avg) / 2;
          stateMap[state].min = Math.min(stateMap[state].min, min);
          stateMap[state].max = Math.max(stateMap[state].max, max);
        }
      });
      return Object.values(stateMap);
    }
    if (type === "population") {
      const stateMap: Record<string, { state: string; population: number }> = {};
      raw.forEach((t) => {
        const state = t.state;
        const pop = Number(t.population) || 0;
        if (!stateMap[state]) {
          stateMap[state] = { state, population: pop };
        } else {
          stateMap[state].population += pop;
        }
      });
      return Object.values(stateMap);
    }
    if (type === "livelihood") {
      const typeMap: Record<string, { livelihood: string; count: number }> = {};
      raw.forEach((t) => {
        const l = t.livelihood || "Unknown";
        if (!typeMap[l]) {
          typeMap[l] = { livelihood: l, count: 1 };
        } else {
          typeMap[l].count++;
        }
      });
      return Object.values(typeMap);
    }
    if (type === "employment") {
      let modern = 0, traditional = 0;
      raw.forEach((t) => {
        if (t.modern_employment) modern++;
        else traditional++;
      });
      return [
        { type: "Modern Employment", count: modern },
        { type: "Traditional Employment", count: traditional },
      ];
    }
    if (type === "migration") {
      const trendMap: Record<string, { trend: string; count: number }> = {};
      raw.forEach((t) => {
        const trend = t.distribution?.migration_trend || "Unknown";
        if (!trendMap[trend]) {
          trendMap[trend] = { trend, count: 1 };
        } else {
          trendMap[trend].count++;
        }
      });
      return Object.values(trendMap);
    }
    if (type === "cultural") {
      const practiceMap: Record<string, { practice: string; count: number }> = {};
      raw.forEach((t) => {
        (t.cultural_practices || []).forEach((p: string) => {
          if (!practiceMap[p]) {
            practiceMap[p] = { practice: p, count: 1 };
          } else {
            practiceMap[p].count++;
          }
        });
      });
      return Object.values(practiceMap);
    }
    return [];
  }

  // Dynamic chart rendering
  function renderChart() {
    const config = dataTypeConfig[dataType];
    if (!data || data.length === 0) return <Typography color="text.secondary">No data available</Typography>;
    if (chartType === "bar") {
      return <BarChart data={data} labelKey={config.labelKey} valueKeys={config.valueFields} valueLabels={config.valueLabels} />;
    }
    if (chartType === "line") {
      return <LineChart data={data} labelKey={config.labelKey} valueKeys={config.valueFields} valueLabels={config.valueLabels} />;
    }
    if (chartType === "pie") {
      return <PieChart data={data} labelKey={config.labelKey} valueKey={config.valueFields[0]} />;
    }
    if (chartType === "radar") {
      return <RadarChart data={data} labelKey={config.labelKey} valueKeys={config.valueFields} valueLabels={config.valueLabels} />;
    }
    if (chartType === "map") {
      return <MapChart data={data} labelKey={config.labelKey} valueKeys={config.valueFields} dataType={dataType} />;
    }
    return null;
  }

  // For Comparison View
  const compareData = useMemo(() => {
    return data.filter(
      (d) => d.state === compareState1 || d.state === compareState2
    );
  }, [data, compareState1, compareState2]);

  // For Detailed Analysis
  const detailedRows = data.map((d, i) => ({
    id: i,
    state: d.state,
    avg: d.avg,
    min: d.min,
    max: d.max,
  }));
  const detailedColumns: GridColDef[] = [
    { field: "state", headerName: "State", flex: 1 },
    { field: "avg", headerName: "Average Literacy Rate (%)", flex: 1, type: "number" },
    { field: "min", headerName: "Minimum Literacy Rate (%)", flex: 1, type: "number" },
    { field: "max", headerName: "Maximum Literacy Rate (%)", flex: 1, type: "number" },
  ];

  // For Tribe Database
  const tribeRows = tribeData
    .filter((t) =>
      t.tribe_name?.toLowerCase().includes(search.toLowerCase()) ||
      t.state?.toLowerCase().includes(search.toLowerCase())
    )
    .map((t, i) => ({
      id: i,
      tribe: t.tribe_name,
      state: t.state,
      population: t.population,
      avg: t.education?.average_literacy_rate || "-",
      min: t.education?.minimum_literacy_rate || "-",
      max: t.education?.maximum_literacy_rate || "-",
    }));
  const tribeColumns: GridColDef[] = [
    { field: "tribe", headerName: "Tribe Name", flex: 1 },
    { field: "state", headerName: "State", flex: 1 },
    { field: "population", headerName: "Population", flex: 1, type: "number" },
    { field: "avg", headerName: "Avg Literacy Rate (%)", flex: 1 },
    { field: "min", headerName: "Min Literacy Rate (%)", flex: 1 },
    { field: "max", headerName: "Max Literacy Rate (%)", flex: 1 },
  ];

  function renderTabContent() {
    if (tab === 0) return renderChart();
    if (tab === 1) {
      // Comparison View
      const config = dataTypeConfig[dataType];
      // Filter data for the two selected states
      const compareRows = tribeData.filter(
        (t) => t.state === compareState1 || t.state === compareState2
      );
      // Use the same processChartData function for the selected states
      const compareChartData = processChartData(compareRows, dataType);
      return (
        <Box width="100%">
          <Box display="flex" gap={2} mb={2}>
            <FormControl style={{ minWidth: 200 }}>
              <InputLabel>State 1</InputLabel>
              <Select
                value={compareState1}
                label="State 1"
                onChange={(e) => setCompareState1(e.target.value)}
              >
                {states.filter((s) => s !== "All States").map((state) => (
                  <MenuItem key={state} value={state}>{state}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl style={{ minWidth: 200 }}>
              <InputLabel>State 2</InputLabel>
              <Select
                value={compareState2}
                label="State 2"
                onChange={(e) => setCompareState2(e.target.value)}
              >
                {states.filter((s) => s !== "All States").map((state) => (
                  <MenuItem key={state} value={state}>{state}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          {/* Use BarChart for comparison, with a color palette */}
          <BarChart
            data={compareChartData}
            labelKey={config.labelKey}
            valueKeys={config.valueFields}
            valueLabels={config.valueLabels}
            colors={["#5B4FE9", "#F95D6A", "#1BC6B4", "#F7B801", "#6A4C93"]}
          />
        </Box>
      );
    }
    if (tab === 2) {
      // Detailed Analysis (generalized for all data types)
      const config = dataTypeConfig[dataType];
      // Dynamically build columns based on valueFields and valueLabels
      const columns: GridColDef[] = [
        { field: config.labelKey, headerName: config.label, flex: 1 },
        ...config.valueFields.map((field, idx) => ({
          field,
          headerName: config.valueLabels[idx] || field,
          flex: 1,
          type: 'number' as const,
        })),
      ];
      const rows = data.map((d, i) => ({ id: i, ...d }));
      return (
        <Box width="100%" height={500}>
          <DataGrid
            rows={rows}
            columns={columns}
            pagination
            pageSizeOptions={[10, 25, 50]}
            disableRowSelectionOnClick
            style={{ backgroundColor: "white", borderRadius: 16 }}
          />
        </Box>
      );
    }
    if (tab === 3) {
      // Tribe Database
      return (
        <Box width="100%" height={500}>
          <Box mb={2}>
            <FormControl fullWidth>
              <InputLabel shrink>Search Tribe or State</InputLabel>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search Tribe or State..."
                style={{ padding: 12, borderRadius: 8, border: "1px solid #ccc", width: "100%" }}
              />
            </FormControl>
          <DataGrid
            rows={tribeRows}
            columns={tribeColumns}
            pagination
            pageSizeOptions={[10, 25, 50]}
            disableRowSelectionOnClick
            style={{ backgroundColor: "white", borderRadius: 16 }}
          />
        </Box>
        </Box>
      );
    }
    return null;
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper elevation={3} style={{ padding: 24, marginBottom: 32, borderRadius: 24 }}>
        <Typography variant="h4" fontWeight={700} mb={2}>
          Data Filters
        </Typography>
        <Box display="flex" gap={4}>
          <FormControl style={{ minWidth: 200 }}>
            <InputLabel>Select State</InputLabel>
            <Select
              value={selectedState}
              label="Select State"
              onChange={(e) => setSelectedState(e.target.value)}
            >
              {states.map((state) => (
                <MenuItem key={state} value={state}>
                  {state}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl style={{ minWidth: 200 }}>
            <InputLabel>Data Type</InputLabel>
            <Select
              value={dataType}
              label="Data Type"
              onChange={(e) => setDataType(e.target.value as DataTypeKey)}
            >
              {Object.entries(dataTypeConfig).map(([key, config]) => (
                <MenuItem key={key} value={key}>{config.label}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl style={{ minWidth: 200 }}>
            <InputLabel>Chart Type</InputLabel>
            <Select
              value={chartType}
              label="Chart Type"
              onChange={(e) => setChartType(e.target.value)}
            >
              {chartTypes.map((ct) => (
                <MenuItem key={ct.value} value={ct.value}>
                  {ct.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Paper>
      <Paper elevation={2} style={{ padding: 24, borderRadius: 24 }}>
        <Typography variant="h5" fontWeight={700} align="center" mb={2}>
          {dataTypeConfig[dataType].label} {chartType === "map" ? "Map" : "Distribution"}
        </Typography>
        <Tabs
          value={tab}
          onChange={(_, v) => setTab(v)}
          style={{ marginBottom: 16 }}
          textColor="primary"
          indicatorColor="primary"
        >
          <Tab label="Primary Chart" />
          <Tab label="Comparison View" />
          <Tab label="Detailed Analysis" />
          <Tab label="Tribe Database" />
        </Tabs>
        <Box minHeight={400} display="flex" alignItems="center" justifyContent="center">
          {renderTabContent()}
        </Box>
      </Paper>
    </Container>
  );
}
