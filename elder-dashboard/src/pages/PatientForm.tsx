import { useState } from "react";
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  Autocomplete,
} from "@mui/material";

type Props = {
  onSave: (patient: {
    name: string;
    age: number;
    condition: string;
    caregiver: string;
  }) => void;
};

const conditionOptions = [
  "Hypertension",
  "Diabetes",
  "Cardiac Risk",
  "Respiratory Issue",
  "Normal",
];

export default function PatientForm({ onSave }: Props) {
  const [form, setForm] = useState({
    name: "",
    age: "",
    condition: "",
    caregiver: "",
  });

  const handleSubmit = () => {
    if (!form.name || !form.age) {
      alert("Please enter Name and Age");
      return;
    }

    onSave({
      name: form.name,
      age: Number(form.age),
      condition: form.condition,
      caregiver: form.caregiver,
    });
  };

  return (
    <Box display="flex" justifyContent="center" mt={10}>
      <Paper
        sx={{
          p: 4,
          width: 420,
          borderRadius: 3,
          boxShadow: 4,
        }}
      >
        <Typography variant="h5" fontWeight={600} mb={3}>
          Enter Patient Details
        </Typography>

        {/* Name */}
        <TextField
          fullWidth
          label="Name"
          margin="normal"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />

        {/* Age */}
        <TextField
  fullWidth
  label="Age"
  margin="normal"
  value={form.age}
  onChange={(e) => {
    const value = e.target.value;

    // Allow only numbers
    if (/^\d*$/.test(value)) {
      setForm({ ...form, age: value });
    }
  }}
/>

        {/* Condition (Dropdown + Custom Typing Allowed) */}
        <Autocomplete
          freeSolo
          options={conditionOptions}
          value={form.condition}
          onInputChange={(_, newValue) => {
            setForm({ ...form, condition: newValue });
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Condition"
              margin="normal"
              fullWidth
            />
          )}
        />

        {/* Caregiver */}
        <TextField
          fullWidth
          label="Caregiver"
          margin="normal"
          value={form.caregiver}
          onChange={(e) =>
            setForm({ ...form, caregiver: e.target.value })
          }
        />

        <Button
          variant="contained"
          fullWidth
          sx={{
            mt: 3,
            py: 1.2,
            borderRadius: 2,
            fontWeight: 600,
          }}
          onClick={handleSubmit}
        >
          Save & Continue
        </Button>
      </Paper>
    </Box>
  );
}