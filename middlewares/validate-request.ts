import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { sendError } from "../utils/api-response";

export const validateRequest = (
  req: Request,
  res: Response,
  next: NextFunction
): Response | void => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    return next();
  }

  return sendError(
    res,
    422,
    "Validation failed",
    errors.array().map((error) => ({
      field: "path" in error ? error.path : "unknown",
      message: error.msg
    }))
  );
};
