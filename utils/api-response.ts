import { Response } from "express";

export interface ApiFieldError {
  field: string;
  message: string;
}

interface ApiResponsePayload<T> {
  success: boolean;
  message: string;
  data?: T;
  statusCode: number;
  errors?: ApiFieldError[];
}

export const sendSuccess = <T>(
  res: Response,
  statusCode: number,
  message: string,
  data?: T
): Response<ApiResponsePayload<T>> => {
  return res.status(statusCode).json({
    success: true,
    message,
    statusCode,
    ...(data !== undefined ? { data } : {})
  });
};

export const sendError = (
  res: Response,
  statusCode: number,
  message: string,
  errors?: ApiFieldError[]
): Response<ApiResponsePayload<never>> => {
  return res.status(statusCode).json({
    success: false,
    message,
    statusCode,
    ...(errors ? { errors } : {})
  });
};
