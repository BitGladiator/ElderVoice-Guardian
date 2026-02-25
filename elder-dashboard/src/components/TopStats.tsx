import { Grid, Paper, Typography } from "@mui/material";
import type { Alert } from "../data/mockEngine";

type Props = {
  alerts: Alert[];
  riskScore: number;
};

export default function TopStats({ alerts, riskScore }: Props) {
  const pending = alerts.filter(a => a.status === "Pending").length;
  const escalated = alerts.filter(a => a.status === "Escalated").length;

  return (
    <Grid container spacing={3}>
      {/* Health Score */}
      <Grid size={{ xs: 12, md: 3 }}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="body2" color="text.secondary">
            Health Score
          </Typography>
          <Typography variant="h5" fontWeight={700}>
            {riskScore}%
          </Typography>
        </Paper>
      </Grid>

      {/* Medications */}
      <Grid size={{ xs: 12, md: 3 }}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="body2" color="text.secondary">
            Medications Today
          </Typography>
          <Typography variant="h5" fontWeight={700}>
            5 / 6
          </Typography>
        </Paper>
      </Grid>

      {/* Voice Check-ins */}
      <Grid size={{ xs: 12, md: 3 }}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="body2" color="text.secondary">
            Voice Check-ins
          </Typography>
          <Typography variant="h5" fontWeight={700}>
            3 Completed
          </Typography>
        </Paper>
      </Grid>

      {/* Emergency Alerts */}
      <Grid size={{ xs: 12, md: 3 }}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="body2" color="text.secondary">
            Emergency Alerts
          </Typography>
          <Typography variant="h5" fontWeight={700}>
            {pending + escalated}
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  );
}