import { prisma } from "@repo/db";

export class AuthRepository {
  static findUserByEmail = (email: string) => {
    return prisma.user.findUnique({
      where: { email },
    });
  };

  static getCurrentUser = (id: string) => {
    return prisma.user.findUnique({
      where: { id },
      select: { id: true, email: true },
    });
  };

  static createUser = (email: string, hashedPassword: string) => {
    return prisma.user.create({
      data: {
        email: email,
        password: hashedPassword,
      },
    });
  };

  static findRefreshTokenByHash = (tokenHash: string) => {
    return prisma.refreshToken.findUnique({
      where: { tokenHash },
      include: { user: true },
    });
  };

  static createRefreshToken = (
    userId: string,
    tokenHash: string,
    expiresAt: Date,
  ) => {
    return prisma.refreshToken.create({
      data: {
        userId,
        tokenHash,
        expiresAt,
      },
    });
  };

  static deleteRefreshToken = (id: string) => {
    return prisma.refreshToken.delete({
      where: { id },
    });
  };

  static deleteRefreshTokensByHash = (tokenHash: string) => {
    return prisma.refreshToken.deleteMany({
      where: { tokenHash },
    });
  };

  static deleteAllUserRefreshTokens = (userId: string) => {
    return prisma.refreshToken.deleteMany({
      where: { userId },
    });
  };
}
