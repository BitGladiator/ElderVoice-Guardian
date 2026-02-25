import {
  Box,
  Grid,
  Paper,
  Typography,
  Button,
  Avatar,
} from "@mui/material";
import TopStats from "../components/TopStats";
import HealthMonitor from "../components/HealthMonitor";
import EmotionChart from "../components/EmotionChart";
import PatientProfile from "../components/PatientProfile";
import type { Alert } from "../data/mockEngine";
import CircularProgress from "@mui/material/CircularProgress";
import { useEffect, useRef } from "react";

type Props = {
  alerts: Alert[];
  riskScore: number;
  vitals: {
    heartRate: number;
    systolic: number;
    oxygen: number;
  };
  patient: {
    name: string;
    age: number;
    condition: string;
    caregiver: string;
  };
  generateAlert: () => void;
  simulateEmergency: () => void;
  updateStatus: (
    id: number,
    status: "Pending" | "Escalated" | "Dismissed"
  ) => void;
  exportReport: () => void;
  toggleTheme: () => void;
  clearPatient: () => void;
};

export default function DashboardPage({
  alerts,
  riskScore,
  patient,
  generateAlert,
  simulateEmergency,
  updateStatus,
  exportReport,
  toggleTheme,
  clearPatient,
  vitals,
}: Props) {
  const alertRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
  const hasPending = alerts.some(
    alert => alert.status === "Pending"
  );

  if (riskScore > 70 && hasPending && alertRef.current) {
    alertRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
}, [riskScore, alerts]);

  return (
    <Box
  sx={{
    p: 2,
    width: "100%",
    overflowX: "hidden",
    minHeight: "100vh",
    background: "linear-gradient(180deg, #f8fbff 0%, #eef4ff 100%)",
  }}
>
  <Box
  sx={{
    maxWidth: 1200,
    mx: "auto",
  }}
></Box>

      {/* ================= HEADER ================= */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 2,
          mb: 2,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Avatar
            src="/logo.png"
            sx={{ width: 40, height: 40 }}
          />
          <Typography
  variant="h4"
  fontWeight={800}
  sx={{
    letterSpacing: 0.5,
    background: "linear-gradient(90deg, #1565c0, #42a5f5)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  }}
>
  Elder Voice Guardian
</Typography>
        </Box>

        <Box sx={{ display: "flex", gap: 1 }}>
          <Button size="small" variant="outlined" onClick={toggleTheme}>
            Theme
          </Button>

          <Button size="small" variant="outlined" onClick={exportReport}>
            Report
          </Button>

          <Button
            size="small"
            variant="contained"
            color="error"
            onClick={generateAlert}
          >
            Alert
          </Button>

          <Button
            size="small"
            color="error"
            onClick={clearPatient}
          >
            Reset
          </Button>
        </Box>
      </Box>

    {/* ================= CIRCULAR RISK ================= */}
<Paper
  sx={{
    p: 3,
    mb: 2,
    borderRadius: 4,
    textAlign: "center",
  }}
>
  <Typography
    variant="subtitle1"
    fontWeight={600}
    mb={2}
  >
    Patient Risk Assessment
  </Typography>

  <Box
    sx={{
      position: "relative",
      display: "inline-flex",
    }}
  >
    {/* Background Circle */}
    <CircularProgress
      variant="determinate"
      value={100}
      size={120}
      thickness={4}
      sx={{ color: "#eee" }}
    />

    {/* Foreground Progress */}
    <CircularProgress
      variant="determinate"
      value={riskScore === 0 ? 5 : riskScore}
      size={120}
      thickness={4}
      sx={{
        position: "absolute",
        left: 0,
        color:
          riskScore > 70
            ? "#d32f2f"
            : riskScore > 40
            ? "#ed6c02"
            : "#2e7d32",
      }}
    />

    {/* Center Text */}
    <Box
      sx={{
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        position: "absolute",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: 700,
        fontSize: "1.4rem",
        color:
          riskScore > 70
            ? "#d32f2f"
            : riskScore > 40
            ? "#ed6c02"
            : "#2e7d32",
      }}
    >
      {riskScore}%
    </Box>
  </Box>

  <Typography
    variant="body2"
    mt={2}
    color="text.secondary"
  >
    {riskScore > 70
      ? "Critical Condition"
      : riskScore > 40
      ? "Moderate Risk"
      : "Stable"}
  </Typography>
</Paper>
      {/* ================= TOP STATS ================= */}
      <TopStats alerts={alerts} riskScore={riskScore} />

      {/* ================= MAIN GRID ================= */}
      <Grid container spacing={2} mt={1}>
          <Grid size={{ xs: 12, md: 7 }}>
          <HealthMonitor vitals={vitals} />
        </Grid>

        <Grid size={{ xs: 12, md: 5 }}>
          <EmotionChart riskScore={riskScore} />
        </Grid>
      </Grid>

      {/* ================= ALERTS ================= */}
      <Box mt={2} ref={alertRef}>
        <Paper sx={{ p: 2, borderRadius: 3 }}>
          <Typography variant="subtitle1" fontWeight={600} mb={2}>
            Live Alerts
          </Typography>

          <Box
            sx={{
              display: "flex",
              gap: 1,
              flexDirection: { xs: "column", sm: "row" },
              mb: 2,
            }}
          >
            <Button
              fullWidth
              variant="contained"
              color="warning"
              onClick={simulateEmergency}
            >
              Simulate Emergency
            </Button>

            <Button
              fullWidth
              variant="contained"
              color="error"
              onClick={generateAlert}
            >
              Generate Alert
            </Button>
          </Box>

          {alerts.length === 0 ? (
            <Typography color="text.secondary">
              No alerts generated
            </Typography>
          ) : (
            alerts.map(alert => (
              <Paper
                key={alert.id}
                sx={{
                  p: 1.5,
                  mb: 1,
                  borderRadius: 2,
                  borderLeft: "4px solid",
                  borderColor:
                    alert.status === "Escalated"
                      ? "error.main"
                      : alert.status === "Pending"
                      ? "warning.main"
                      : "success.main",
                }}
              >
                <Typography fontWeight={600}>
                  {alert.title}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                  {alert.location} • {alert.timestamp}
                </Typography>

                {alert.status === "Pending" && (
                  <Box mt={1} display="flex" gap={1}>
                    <Button
                      size="small"
                      color="error"
                      onClick={() =>
                        updateStatus(alert.id, "Escalated")
                      }
                    >
                      Escalate
                    </Button>

                    <Button
                      size="small"
                      color="success"
                      onClick={() =>
                        updateStatus(alert.id, "Dismissed")
                      }
                    >
                      Dismiss
                    </Button>
                  </Box>
                )}
              </Paper>
            ))
          )}
        </Paper>
      </Box>

      {/* ================= PATIENT PROFILE ================= */}
      <Box mt={2}>
        <PatientProfile
          name={patient.name}
          age={patient.age}
          condition={patient.condition}
          caregiver={patient.caregiver}
        />
      </Box>

    </Box> 
);
}