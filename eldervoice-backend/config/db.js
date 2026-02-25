const mongoose = require("mongoose");

let isConnected = false;

const connectDB = async () => {
  if (isConnected) return; // reuse connection across warm serverless invocations

  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI environment variable is not set");
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);
    isConnected = true;
    console.log("MongoDB Connected Successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    throw error; // let the route handler catch it and return a proper 500
  }
};

module.exports = connectDB;