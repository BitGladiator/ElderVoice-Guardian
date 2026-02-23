require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

// Connect Database
connectDB();

// Middlewaresr 
app.use(express.json());
app.use(cors());
app.use("/api/auth", require("./routes/auth"));

app.get("/", (req, res) => {
  res.send("ElderVoice Guardian Backend is running 🚀");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
