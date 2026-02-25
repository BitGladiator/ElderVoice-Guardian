require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("../config/db");

const app = express();

// Allowed origins
const allowedOrigins = [
    "http://localhost:5173",
    "http://localhost:5174",
    ...(process.env.ALLOWED_ORIGINS
        ? process.env.ALLOWED_ORIGINS.split(",").map((o) => o.trim())
        : []),
];

const corsOptions = {
    origin: (origin, callback) => {
        if (!origin) return callback(null, true);
        if (allowedOrigins.includes(origin)) return callback(null, true);

        if (/^https:\/\/[a-z0-9-]+\.vercel\.app$/.test(origin))
            return callback(null, true);
        callback(new Error(`CORS: origin ${origin} not allowed`));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
};

// Preflight is handled by vercel.json -> so we just apply CORS middleware
app.use(cors(corsOptions));
app.use(express.json());

// Health check
app.get("/health", async (req, res) => {
    const status = {
        mongo_uri_set: !!process.env.MONGO_URI,
        jwt_secret_set: !!process.env.JWT_SECRET,
        mongo_uri_is_atlas: process.env.MONGO_URI
            ? process.env.MONGO_URI.includes("mongodb+srv")
            : false,
        db_connected: false,
        db_error: null,
    };
    try {
        await connectDB();
        status.db_connected = true;
    } catch (err) {
        status.db_error = err.message;
    }
    res.json(status);
});

app.use("/api/auth", require("../routes/auth"));

app.get("/", (req, res) => {
    res.send("ElderVoice Guardian Backend is running");
});


module.exports = app;
