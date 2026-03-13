import { ErrorRequestHandler } from "express";
import logger from "../lib/logger";

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  logger.error(err, "Unhandled error");

  const statusCode = err.statusCode || 500;
  const message =
    process.env.NODE_ENV === "production"
      ? "Internal server error"
      : err.message || "Internal server error";

  res.status(statusCode).json({
    success: false,
    error: message,
  });
};
