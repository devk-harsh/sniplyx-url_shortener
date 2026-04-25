import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

export const healthCheck = (req: Request, res: Response) => {
  return res.status(StatusCodes.OK).json({
    success: true,
    message: "Sniplyx API is healthy",
    service: "sniplyx-backend"
  });
};