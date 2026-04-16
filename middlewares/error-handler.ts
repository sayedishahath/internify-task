import { NextFunction, Request, Response } from "express";
import { sendError } from "../utils/api-response";

interface AppError extends Error {
  statusCode?: number;
  code?: number;
}

export const notFoundHandler = (_req: Request, res: Response): Response => {
  return sendError(res, 404, "Route not found");
};

export const errorHandler = (
  err: AppError,
  _req: Request,
  res: Response,
  _next: NextFunction
): Response => {
  if (err.code === 11000) {
    return sendError(res, 409, "Duplicate value error", [
      { field: "email", message: "Email already in use" }
    ]);
  }

  const statusCode = err.statusCode || 500;
  return sendError(res, statusCode, err.message || "Internal server error");
};
