import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import { AppError } from "../errors/app-error.js";
import { env } from "../config/env.js";

export const errorMiddleware: ErrorRequestHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
    return;
  }

  if (err.name === "TokenExpiredError") {
    res.status(401).json({
      success: false,
      message: "Access token expired. Please log in again.",
    });
  }

  if (err.name === "JsonWebTokenError") {
    res.status(401).json({
      success: false,
      message: "Malformed or invalid access signature",
    });
  }

  console.error("💥 Unhandled Exception Critical Log:", err);

  res.status(500).json({
    success: false,
    message:
      env.NODE_ENV === "production"
        ? "Internal server error occurred"
        : err.message,
  });
};
