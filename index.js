// index.js
// Entry point for the Express backend server.

import express from "express";
import cors from "cors";
import config from "./config/config.js";
import weatherRoutes from "./routes/weatherRoutes.js";
import errorHandler from "./middleware/errorHandler.js";

const app = express();

// ----- Middleware -----
app.use(cors()); // Allow the React frontend (different port) to call this API
app.use(express.json()); // Parse incoming JSON request bodies

// ----- Health check -----
app.get("/", (req, res) => {
  res.json({ status: "ok", message: "Weather API server is running 🌤️" });
});

// ----- Routes -----
app.use("/api", weatherRoutes);

// ----- 404 handler (must come after all valid routes) -----
app.use((req, res) => {
  res.status(404).json({ message: "Route not found." });
});

// ----- Centralized error handler (must be last) -----
app.use(errorHandler);

app.listen(config.port, () => {
  console.log(`✅ Server running on http://localhost:${config.port}`);
});
