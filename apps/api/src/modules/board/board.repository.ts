import { prisma, BoardRole, BoardVisibility } from "@repo/db";

export class BoardRepository {
  static createBoard = (
    title: string,
    ownerId: string,
    description?: string,
    visibility?: BoardVisibility,
  ) => {
    return prisma.board.create({
      data: {
        title,
        description,
        visibility,
        ownerId,
      },
    });
  };

  static createOwnerCollaborator = (boardId: string, userId: string) => {
    return prisma.collaborator.create({
      data: {
        boardId,
        userId,
        role: BoardRole.OWNER,
      },
    });
  };

  static findBoardById = (boardId: string) => {
    return prisma.board.findUnique({
      where: { id: boardId },
      include: {
        owner: {
          select: {
            id: true,
            email: true,
          },
        },
        collaborators: {
          include: {
            user: {
              select: {
                id: true,
                email: true,
              },
            },
          },
        },
      },
    });
  };

  static findOwnedBoards = (userId: string) => {
    return prisma.board.findMany({
      where: { ownerId: userId },
      include: {
        owner: {
          select: {
            id: true,
            email: true,
          },
        },
      },
      orderBy: { updatedAt: "desc" },
    });
  };

  static findCollaborativeBoards = (userId: string) => {
    return prisma.collaborator.findMany({
      where: {
        userId,
        role: {
          not: BoardRole.OWNER,
        },
      },
      select: { board: true },
    });
  };

  static updateBoard = (
    boardId: string,
    data: {
      title?: string;
      description?: string;
      visibility?: BoardVisibility;
    },
  ) => {
    return prisma.board.update({
      where: { id: boardId },
      data,
    });
  };

  static deleteBoard = (boardId: string) => {
    return prisma.board.delete({
      where: { id: boardId },
    });
  };

  static isBoardOwner = async (boardId: string, userId: string) => {
    return prisma.board.findFirst({
      where: { id: boardId, ownerId: userId },
      select: { id: true },
    });
  };

  static findCollaborator = (boardId: string, userId: string) => {
    return prisma.collaborator.findUnique({
      where: { userId_boardId: { boardId, userId } },
    });
  };

  static findBoardDiagram = (boardId: string) => {
    return prisma.board.findUnique({
      where: {
        id: boardId,
      },
      include: {
        owner: {
          select: {
            id: true,
            email: true,
          },
        },

        collaborators: {
          include: {
            user: {
              select: {
                id: true,
                email: true,
              },
            },
          },
        },

        nodes: true,
        edges: true,
      },
    });
  };
}
