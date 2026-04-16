import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { env } from "../config/env";
import { User } from "../models/user.model";
import { sendError, sendSuccess } from "../utils/api-response";

const createToken = (userId: string): string =>
  jwt.sign({ userId }, env.jwtSecret, { expiresIn: "7d" });

export const registerUser = async (req: Request, res: Response): Promise<Response> => {
  const { name, email, password } = req.body as {
    name?: string;
    email?: string;
    password?: string;
  };

  if (!name || !email || !password) {
    return sendError(res, 400, "name, email, and password are required");
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return sendError(res, 409, "Email already in use");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashedPassword });

  return sendSuccess(res, 201, "User registered successfully", {
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt
    }
  });
};

export const loginUser = async (req: Request, res: Response): Promise<Response> => {
  const { email, password } = req.body as { email?: string; password?: string };

  if (!email || !password) {
    return sendError(res, 400, "email and password are required");
  }

  const user = await User.findOne({ email });
  if (!user) {
    return sendError(res, 401, "Invalid credentials");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return sendError(res, 401, "Invalid credentials");
  }

  const token = createToken(String(user._id));
  return sendSuccess(res, 200, "Login successful", { token });
};

export const getUsers = async (req: Request, res: Response): Promise<Response> => {
  const page = Math.max(1, Number(req.query.page) || 1);
  const limit = Math.min(100, Math.max(1, Number(req.query.limit) || 10));
  const skip = (page - 1) * limit;

  const [users, totalItems] = await Promise.all([
    User.find().select("-password").skip(skip).limit(limit),
    User.countDocuments()
  ]);

  const totalPages = Math.max(1, Math.ceil(totalItems / limit));

  return sendSuccess(res, 200, "Users fetched successfully", {
    items: users,
    pagination: {
      page,
      limit,
      totalItems,
      totalPages,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1
    }
  });
};
