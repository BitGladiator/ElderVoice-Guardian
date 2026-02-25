require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

// Connect Database
connectDB();

// Build allowed origins list
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  ...(process.env.ALLOWED_ORIGINS
    ? process.env.ALLOWED_ORIGINS.split(",").map((o) => o.trim())
    : []),
];

const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (curl, mobile, Vercel health checks)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    // Also allow any *.vercel.app subdomain as a safe fallback during development
    if (/^https:\/\/[a-z0-9-]+\.vercel\.app$/.test(origin)) return callback(null, true);
    callback(new Error(`CORS: origin ${origin} not allowed`));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

// Handle preflight (OPTIONS) for all routes BEFORE other middleware
app.options("*", cors(corsOptions));

// Apply CORS to all routes
app.use(cors(corsOptions));

app.use(express.json());

app.use("/api/auth", require("./routes/auth"));

app.get("/", (req, res) => {
  res.send("ElderVoice Guardian Backend is running");
});

const PORT = process.env.PORT || 5500;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
