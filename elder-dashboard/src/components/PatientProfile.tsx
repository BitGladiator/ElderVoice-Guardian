import {
  Paper,
  Typography,
  Box,
  Avatar,
  Chip,
  Divider,
} from "@mui/material";

type Props = {
  name: string;
  age: number;
  condition: string;
  caregiver: string;
};

export default function PatientProfile({
  name,
  age,
  condition,
  caregiver,
}: Props) {
  return (
    <Paper sx={{ p: 3 }}>
      <Box display="flex" alignItems="center" mb={2}>
        <Avatar sx={{ width: 56, height: 56, mr: 2 }}>
          {name.charAt(0)}
        </Avatar>

        <Box>
          <Typography variant="h6">{name}</Typography>
          <Typography variant="body2" color="text.secondary">
            Age {age}
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ my: 2 }} />

      <Typography variant="body2" color="text.secondary">
        Condition
      </Typography>
      <Chip
        label={condition}
        color="warning"
        sx={{ mt: 1, mb: 2 }}
      />

      <Typography variant="body2" color="text.secondary">
        Caregiver
      </Typography>
      <Typography variant="body1" fontWeight={500} mt={1}>
        {caregiver}
      </Typography>
    </Paper>
  );
}