import { prisma } from "@repo/db";

export class CollaboratorRepository {
  static findUserByEmail = (email: string) => {
    return prisma.user.findUnique({
      where: {
        email,
      },
    });
  };

  static findBoardById = (boardId: string) => {
    return prisma.board.findUnique({
      where: {
        id: boardId,
      },
    });
  };

  static findCollaborator = (boardId: string, userId: string) => {
    return prisma.collaborator.findUnique({
      where: {
        userId_boardId: {
          userId,
          boardId,
        },
      },
    });
  };

  static addCollaborator = (
    boardId: string,
    userId: string,
    role: "EDITOR" | "VIEWER",
  ) => {
    return prisma.collaborator.create({
      data: {
        boardId,
        userId,
        role,
      },
    });
  };

  static updateCollaboratorRole = (
    boardId: string,
    userId: string,
    role: "EDITOR" | "VIEWER",
  ) => {
    return prisma.collaborator.update({
      where: {
        userId_boardId: {
          boardId,
          userId,
        },
      },
      data: {
        role,
      },
    });
  };

  static removeCollaborator = (boardId: string, userId: string) => {
    return prisma.collaborator.delete({
      where: {
        userId_boardId: {
          boardId,
          userId,
        },
      },
    });
  };

  static getBoardCollaborators = (boardId: string) => {
    return prisma.collaborator.findMany({
      where: {
        boardId,
      },
      include: {
        user: {
          select: {
            id: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: "asc",
      },
    });
  };
}
