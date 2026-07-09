import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { v4 as uuidv4 } from "uuid";
import logger from "../config/logger.config";
import { serverConfig } from "../config";
import urlStore from "../services/url.store";

export const shortenUrl = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { longUrl } = req.body;
    if (!longUrl || typeof longUrl !== "string") {
      logger.warn("Invalid longUrl in request body", { longUrl });
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "Invalid longUrl",
      });
    }

    const shortCode = uuidv4().split("-")[0];

    // Persist mapping in in-memory store
    urlStore.save(shortCode as string, longUrl as string);

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
