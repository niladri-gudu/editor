import { NextFunction, Request, Response } from "express";
import { verifyAccessToken } from "../utils/jwt.js";
import { ACCESS_COOKIE_NAME } from "../constants/auth.js";
import { UnauthorizedError } from "../errors/app-error.js";

export const requireAuth = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const accessToken = req.cookies[ACCESS_COOKIE_NAME];

    if (!accessToken) {
      throw new UnauthorizedError("Access token is missing");
    }

    const decodedPayload = verifyAccessToken(accessToken);

    req.user = {
      userId: decodedPayload.userId,
      email: decodedPayload.email,
    };

    next();
  } catch (error) {
    next(error);
  }
};
