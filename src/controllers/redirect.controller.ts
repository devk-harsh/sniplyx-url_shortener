import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import logger from "../config/logger.config";
import urlStore from "../services/url.store";

export const redirectHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { shortCode } = req.params;
    if (!shortCode || typeof shortCode !== "string") {
      logger.warn("Invalid shortCode in params", { shortCode });
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "Invalid short code",
      });
    }

    const longUrl = urlStore.get(shortCode);

    if (!longUrl) {
      logger.warn("Short code not found", { shortCode });
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "Short URL not found",
      });
    }

    logger.info("Redirecting short URL", { shortCode, longUrl });
    return res.redirect(longUrl);
  } catch (error) {
    next(error);
  }
};
