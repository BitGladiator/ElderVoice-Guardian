import {
  Paper,
  Typography,
  Box,
} from "@mui/material";
import {
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  ComposedChart,
  Bar,
} from "recharts";
import { useEffect, useState } from "react";

type Vitals = {
  heartRate: number;
  systolic: number;
  oxygen: number;
};

type Props = {
  vitals: Vitals;
};

export default function HealthMonitor({ vitals }: Props) {
  const [history, setHistory] = useState<any[]>([]);

  // Add new vitals to history whenever vitals change
  useEffect(() => {
    setHistory((prev) => {
      const updated = [
        ...prev,
        {
          time: new Date().toLocaleTimeString(),
          heartRate: vitals.heartRate,
          bloodPressure: vitals.systolic,
          oxygen: vitals.oxygen,
        },
      ];

      // Keep only last 10 readings
      return updated.slice(-10);
    });
  }, [vitals]);

  return (
    <Paper sx={{ p: 2, borderRadius: 3 }}>
      <Typography variant="subtitle1" fontWeight={600} mb={1}>
        Health Monitoring
      </Typography>

    <Box
  sx={{
    width: "100%",
    minHeight: 260,   // 🔥 IMPORTANT (minHeight works better than height)
  }}
>
  <ResponsiveContainer width="100%" height={200}>
    <ComposedChart data={history}>
      <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
      <XAxis dataKey="time" stroke="#9e9e9e" />
      <YAxis yAxisId="left" stroke="#9e9e9e" />
<YAxis yAxisId="right" orientation="right" stroke="#9e9e9e" />
      <Tooltip />
      <Legend />
    <Bar
  yAxisId="right"
  dataKey="oxygen"
  fill="#90caf9"
  radius={[6, 6, 0, 0]}
/>

<Line
  yAxisId="left"
  type="monotone"
  dataKey="heartRate"
  stroke="#2e7d32"
  strokeWidth={2}
/>

<Line
  yAxisId="left"
  type="monotone"
  dataKey="bloodPressure"
  stroke="#1565c0"
  strokeWidth={2}
/>
    </ComposedChart>
  </ResponsiveContainer>
</Box>
    </Paper>
  );
}