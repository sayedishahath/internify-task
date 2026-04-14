import dotenv from "dotenv";
import { EnvConfig } from "../types/env.types";

dotenv.config();

const port = Number(process.env.PORT || 5000);
const mongoUri = process.env.MONGODB_URI;
const jwtSecret = process.env.JWT_SECRET;

if (!mongoUri) {
  throw new Error("MONGODB_URI is not defined in .env");
}

if (!jwtSecret) {
  throw new Error("JWT_SECRET is not defined in .env");
}

export const env: EnvConfig = {
  port,
  mongoUri,
  jwtSecret
};
