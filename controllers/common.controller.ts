import { NextFunction, Request, Response } from "express";

type AsyncHandler = (req: Request, res: Response, next: NextFunction) => Promise<unknown>;

export const controller = (handler: AsyncHandler) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await handler(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};
