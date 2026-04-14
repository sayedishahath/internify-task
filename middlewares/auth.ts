import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import { Types } from "mongoose";
import { env } from "../config/env";
import { AuthenticatedRequest } from "../types/request.types";

interface JwtPayload {
  userId: string;
}

export const authenticateUser = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Response | void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized: Missing token" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, env.jwtSecret) as JwtPayload;
    req.user = { userId: new Types.ObjectId(decoded.userId) };
    next();
  } catch (_error) {
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};
