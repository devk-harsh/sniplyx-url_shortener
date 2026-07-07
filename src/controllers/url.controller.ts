import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { v4 as uuidv4 } from "uuid";
import logger from "../config/logger.config";
import { serverConfig } from "../config";

export const shortenUrl = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { longUrl } = req.body;
    const shortCode = uuidv4().split("-")[0];

    logger.info("Creating shortened URL", {
      longUrl,
      shortCode,
    });

    return res.status(StatusCodes.CREATED).json({
      success: true,
      message: "URL shortened successfully",
      data: {
        longUrl,
        shortCode,
        shortUrl: `http://localhost:${serverConfig.PORT}/s/${shortCode}`,
      },
    });
  } catch (error) {
    logger.error("Error shortening URL", { error });
    next(error);
  }
};
