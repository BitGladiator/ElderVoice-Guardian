import { Paper, Typography, Box } from "@mui/material";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

export default function EmotionChart({
  riskScore,
}: {
  riskScore: number;
}) {

  // 🔥 First define moodData
  let moodData;

  if (riskScore < 30) {
    moodData = [
      { name: "Happy", value: 60, color: "#4caf50" },
      { name: "Neutral", value: 25, color: "#2196f3" },
      { name: "Sad", value: 10, color: "#ff9800" },
      { name: "Stress", value: 5, color: "#f44336" },
    ];
  } else if (riskScore < 60) {
    moodData = [
      { name: "Happy", value: 30, color: "#4caf50" },
      { name: "Neutral", value: 40, color: "#2196f3" },
      { name: "Sad", value: 20, color: "#ff9800" },
      { name: "Stress", value: 10, color: "#f44336" },
    ];
  } else {
    moodData = [
      { name: "Happy", value: 10, color: "#4caf50" },
      { name: "Neutral", value: 20, color: "#2196f3" },
      { name: "Sad", value: 30, color: "#ff9800" },
      { name: "Stress", value: 40, color: "#f44336" },
    ];
  }

  // 🔥 Now calculate AFTER moodData exists
  const total = moodData.reduce((sum, item) => sum + item.value, 0);

  const highest = moodData.reduce((prev, current) =>
    prev.value > current.value ? prev : current
  );

 return (
  <Paper
    sx={{
      p: 2,
      borderRadius: 3,
      boxShadow: 2,
    }}
  >
    <Typography
      variant="subtitle2"
      fontWeight={600}
      sx={{ mb: 1 }}
    >
      Voice Emotion Analysis
    </Typography>

    <Box
  sx={{
    width: "100%",
    minheight: 200,   // 🔥 give FIXED HEIGHT
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  }}
>
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={moodData}
            dataKey="value"
            innerRadius={50}
            outerRadius={75}
            paddingAngle={3}
            cornerRadius={8}
          >
            {moodData.map((entry, index) => (
              <Cell key={index} fill={entry.color} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>

      {/* Center Content */}
      <Box
    position="absolute"
    top="50%"
    left="50%"
    sx={{ transform: "translate(-50%, -50%)" }}
    textAlign="center"
  >
    <Typography variant="body2" color="text.secondary">
      Mood
    </Typography>

    <Typography fontWeight={700}>
      {highest.name}
    </Typography>

    <Typography variant="caption" color="text.secondary">
      {Math.round((highest.value / total) * 100)}%
    </Typography>
  </Box>
</Box>
  </Paper>
);
}