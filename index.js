const express = require("express");
const mongoose = require("mongoose");
const keys = require("./config/keys");
const authRoutes = require("./routes/auth");
const mentorRoutes = require("./routes/mentor");
const classroomRoutes = require("./routes/classroom");
const exerciseRoutes = require("./routes/exercise");
const leaderboardRoutes = require("./routes/leaderboard");
const userRoutes = require("./routes/user");

const app = express();

if (!keys.mongoURI) {
  console.log("DB_CONNECTION not found");
  process.exit(1);
}

if (!keys.jwtSecret) {
  console.log("JWT_SECRET not found");
  process.exit(1);
}

// Connect to MongoDB
mongoose
  .connect(keys.mongoURI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Middleware
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/mentor", mentorRoutes);
app.use("/api/classroom", classroomRoutes);
app.use("/api/exercise", exerciseRoutes);
app.use("/api/leaderboard", leaderboardRoutes);
app.use("/api/users", userRoutes);

// Start the server
const port = keys.port || 8080;
app.listen(port, () => console.log(`Server running on port ${port}`));
