import { CookieOptions, Response } from "express";
import { env } from "../config/env.js";
import {
  ACCESS_COOKIE_NAME,
  REFRESH_COOKIE_NAME,
  ACCESS_COOKIE_MAX_AGE,
  REFRESH_COOKIE_MAX_AGE,
} from "../constants/auth.js";

const getBaseCookieOptions = (): CookieOptions => ({
  httpOnly: true,
  secure: env.NODE_ENV === "production",
  sameSite: env.NODE_ENV === "production" ? "strict" : "lax",
  path: "/",
});

export const setAccessCookie = (res: Response, token: string) => {
  res.cookie(ACCESS_COOKIE_NAME, token, {
    ...getBaseCookieOptions(),
    maxAge: ACCESS_COOKIE_MAX_AGE,
  });
};

export const setRefreshCookie = (res: Response, token: string) => {
  res.cookie(REFRESH_COOKIE_NAME, token, {
    ...getBaseCookieOptions(),
    maxAge: REFRESH_COOKIE_MAX_AGE,
  });
};

export const clearAuthCookies = (res: Response): void => {
  const options = { ...getBaseCookieOptions() };

  res.clearCookie(ACCESS_COOKIE_NAME, options);
  res.clearCookie(REFRESH_COOKIE_NAME, options);
};
