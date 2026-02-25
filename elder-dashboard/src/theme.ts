import { createTheme } from "@mui/material/styles";

export default function getTheme(mode: "light" | "dark") {
  return createTheme({
    palette: {
      mode,
      background: {
        default: mode === "light" ? "#f4f6f9" : "#0f172a",
        paper: mode === "light" ? "#ffffff" : "#1e293b",
      },
    },
    shape: {
      borderRadius: 12,
    },
  });
}