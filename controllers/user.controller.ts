import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { env } from "../config/env";
import { User } from "../models/user.model";

const createToken = (userId: string): string =>
  jwt.sign({ userId }, env.jwtSecret, { expiresIn: "7d" });

export const registerUser = async (req: Request, res: Response): Promise<Response> => {
  const { name, email, password } = req.body as {
    name?: string;
    email?: string;
    password?: string;
  };

  if (!name || !email || !password) {
    return res.status(400).json({ message: "name, email, and password are required" });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(409).json({ message: "Email already in use" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashedPassword });

  return res.status(201).json({
    message: "User registered successfully",
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
    return res.status(400).json({ message: "email and password are required" });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = createToken(String(user._id));
  return res.status(200).json({ message: "Login successful", token });
};

export const getUsers = async (_req: Request, res: Response): Promise<Response> => {
  const users = await User.find().select("-password");
  return res.status(200).json(users);
};
