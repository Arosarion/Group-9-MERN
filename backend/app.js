const express = require("express");
const cors = require("cors");
const errorHandler = require("./middleware/errorHandler");

require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// API Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/topics", require("./routes/topicRoutes"));
app.use("/api/quizzes", require("./routes/quizRoutes"));
app.use("/api/game", require("./routes/gameRoutes"));

// Status check
app.get("/", (req, res) => {
  res.json({ message: "API is running" });
});

// Error handler
app.use(errorHandler);

module.exports = app;
