import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import routes from "./routes";
import { errorHandler } from "./middleware/error";

const app = express();

// Core middleware
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  })
);
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// Routes
app.use("/api", routes);

// 404 handler
app.use((_req, res) => {
  res.status(404).json({ success: false, error: "Route not found" });
});

// Global error handler
app.use(errorHandler);

export default app;
