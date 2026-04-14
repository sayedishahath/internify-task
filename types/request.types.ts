import { Request } from "express";
import { Types } from "mongoose";

export interface AuthenticatedRequest extends Request {
  user?: {
    userId: Types.ObjectId;
  };
}
