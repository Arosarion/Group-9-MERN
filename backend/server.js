// Core dependencies
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const errorHandler = require("./middleware/errorHandler");

// Load environment variables from .env
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// API Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/topics", require("./routes/topicRoutes"));

// status check route
app.get("/", (req, res) => {
  res.json({ message: "API is running" });
});

app.use(errorHandler); // this goes last

// Start the server at the specified port
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
