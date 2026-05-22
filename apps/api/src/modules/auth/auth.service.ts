import { hashPassword, comparePasswords } from "../../utils/hash.js";
import { generateAccessToken } from "../../utils/jwt.js";
import { generateToken, hashToken } from "../../utils/token.js";
import { ConflictError, UnauthorizedError } from "../../errors/app-error.js";
import { REFRESH_COOKIE_MAX_AGE } from "../../constants/auth.js";
import { AuthRepository } from "./auth.repository.js";

interface RegisterInputBody {
  email: string;
  password: string;
}

interface AuthTokens {
  accessToken: string;
  opaqueRefreshToken: string;
}

export class AuthService {
  static async register(input: RegisterInputBody): Promise<AuthTokens> {
    const existingUser = await AuthRepository.findUserByEmail(input.email);

    if (existingUser) {
      throw new ConflictError("A user with this email address already exists");
    }

    const hashedPassword = await hashPassword(input.password);

    const user = await AuthRepository.createUser(input.email, hashedPassword);

    return this.createSession(user.id, user.email);
  }

  static async login(email: string, password: string): Promise<AuthTokens> {
    const user = await AuthRepository.findUserByEmail(email);

    if (!user) {
      throw new UnauthorizedError("Invalid credentials provided");
    }

    const isPasswordValid = await comparePasswords(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedError("Invalid credentials provided");
    }

    return this.createSession(user.id, user.email);
  }

  static async refreshToken(opaqueRefreshToken: string): Promise<AuthTokens> {
    const tokenHash = hashToken(opaqueRefreshToken);

    const storedToken = await AuthRepository.findRefreshTokenByHash(tokenHash);

    if (!storedToken) {
      throw new UnauthorizedError("Invalid or expired session context");
    }

    await AuthRepository.deleteRefreshToken(storedToken.id);

    return this.createSession(storedToken.user.id, storedToken.user.email);
  }

  static async logout(opaqueRefreshToken: string): Promise<void> {
    const tokenHash = hashToken(opaqueRefreshToken);

    await AuthRepository.deleteRefreshTokensByHash(tokenHash);
  }

  static async logoutAll(userId: string): Promise<void> {
    await AuthRepository.deleteAllUserRefreshTokens(userId);
  }

  static async getCurrentUser(userId: string) {
    const user = await AuthRepository.getCurrentUser(userId);

    if (!user) {
      throw new UnauthorizedError(
        "User profile no longer exists in our database",
      );
    }

    return user;
  }

  private static async createSession(
    userId: string,
    email: string,
  ): Promise<AuthTokens> {
    const payload = { userId, email };

    const accessToken = generateAccessToken(payload);
    const opaqueRefreshToken = generateToken();
    const refreshTokenHash = hashToken(opaqueRefreshToken);

    const expiresAt = new Date(Date.now() + REFRESH_COOKIE_MAX_AGE);
    await AuthRepository.createRefreshToken(userId, refreshTokenHash, expiresAt);

    return { accessToken, opaqueRefreshToken };
  }
}
