import { Request, Response, NextFunction } from "express";
import { AuthService } from "./auth.service.js";
import {
  setAccessCookie,
  setRefreshCookie,
  clearAuthCookies,
} from "../../utils/cookies.js";
import { REFRESH_COOKIE_NAME } from "../../constants/auth.js";
import { UnauthorizedError } from "../../errors/app-error.js";

export class AuthController {
  static async register(req: Request, res: Response, next: NextFunction) {
    try {
      const tokens = await AuthService.register(req.body);

      setAccessCookie(res, tokens.accessToken);
      setRefreshCookie(res, tokens.opaqueRefreshToken);

      res
        .status(201)
        .json({ success: true, message: "User registered successfully" });
    } catch (error) {
      next(error);
    }
  }

  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const tokens = await AuthService.login(email, password);

      setAccessCookie(res, tokens.accessToken);
      setRefreshCookie(res, tokens.opaqueRefreshToken);

      res
        .status(200)
        .json({ success: true, message: "Logged in successfully" });
    } catch (error) {
      next(error);
    }
  }

  static async refreshToken(req: Request, res: Response, next: NextFunction) {
    try {
      const currentRefreshToken = req.cookies[REFRESH_COOKIE_NAME];
      if (!currentRefreshToken) {
        throw new UnauthorizedError("Session expired or refresh token missing");
      }

      const tokens = await AuthService.refreshToken(currentRefreshToken);

      setAccessCookie(res, tokens.accessToken);
      setRefreshCookie(res, tokens.opaqueRefreshToken);

      res
        .status(200)
        .json({ success: true, message: "Token refreshed successfully" });
    } catch (error) {
      clearAuthCookies(res);
      next(error);
    }
  }

  static async logout(req: Request, res: Response, next: NextFunction) {
    try {
      const currentRefreshToken = req.cookies[REFRESH_COOKIE_NAME];
      if (currentRefreshToken) {
        await AuthService.logout(currentRefreshToken);
      }

      clearAuthCookies(res);

      res
        .status(200)
        .json({ success: true, message: "Logged out successfully" });
    } catch (error) {
      next(error);
    }
  }

  static async logoutAll(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        throw new UnauthorizedError("User not authenticated");
      }

      await AuthService.logoutAll(userId);
      clearAuthCookies(res);

      res.status(200).json({
        success: true,
        message: "Logged out from all devices successfully",
      });
    } catch (error) {
      next(error);
    }
  }

  static async me(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        throw new UnauthorizedError();
      }

      const user = await AuthService.getCurrentUser(userId);
      res.status(200).json({ success: true, data: user });
    } catch (error) {
      next(error);
    }
  }
}
