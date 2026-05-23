import { ForbiddenError, NotFoundError } from "../../errors/app-error.js";
import { BoardRepository } from "./board.repository.js";
import { prisma } from "@repo/db";

export class BoardService {
  static async createBoard(
    userId: string,
    data: {
      title: string;
      description?: string;
      visibility?: "PRIVATE" | "SHARED" | "PUBLIC";
    },
  ) {
    const board = await prisma.$transaction(async () => {
      const createtBoard = await BoardRepository.createBoard(
        data.title,
        userId,
        data.description,
        data.visibility,
      );

      await BoardRepository.createOwnerCollaborator(createtBoard.id, userId);

      return createtBoard;
    });

    return board;
  }

  static async getBoard(userId: string, boardId: string) {
    const board = await BoardRepository.findBoardById(boardId);

    if (!board) {
      throw new NotFoundError("Board not found");
    }

    const isOwner = board.ownerId === userId;

    const isCollaborator = await BoardRepository.findCollaborator(
      boardId,
      userId,
    );

    const canAccess =
      isOwner || isCollaborator || board.visibility === "PUBLIC";

    if (!canAccess) {
      throw new ForbiddenError("You do not have access to this board");
    }

    return board;
  }

  static async getBoards(userId: string) {
    const ownedBoards = await BoardRepository.findOwnedBoards(userId);

    const collaborativeBoards =
      await BoardRepository.findCollaborativeBoards(userId);

    return {
      ownedBoards,
      collaborativeBoards: collaborativeBoards.map((c) => c.board),
    };
  }

  static async updateBoard(
    boardId: string,
    userId: string,
    data: {
      title?: string;
      description?: string;
      visibility?: "PRIVATE" | "SHARED" | "PUBLIC";
    },
  ) {
    const isOwner = await BoardRepository.isBoardOwner(boardId, userId);

    if (!isOwner) {
      throw new ForbiddenError("Only board owner can update this board");
    }

    return BoardRepository.updateBoard(boardId, data);
  }

  static async deleteBoard(boardId: string, userId: string) {
    const isOwner = await BoardRepository.isBoardOwner(boardId, userId);

    if (!isOwner) {
      throw new ForbiddenError("Only board owner can delete this board");
    }

    return BoardRepository.deleteBoard(boardId);
  }

  static async getDiagram(boardId: string, userId: string) {
    const boardData = await BoardRepository.findBoardDiagram(boardId);

    if (!boardData) {
      throw new NotFoundError("Board not found");
    }

    const isOwner = boardData.ownerId === userId;

    const isCollaborator = await BoardRepository.findCollaborator(
      boardId,
      userId,
    );

    const canView =
      isOwner || isCollaborator || boardData.visibility === "PUBLIC";

    if (!canView) {
      throw new ForbiddenError("You do not have access to this board");
    }

    const { nodes, edges, collaborators, owner, ...board } = boardData;

    return {
      board: {
        ...board,
        owner,
      },

      collaborators: collaborators.map((c) => ({
        id: c.user.id,
        email: c.user.email,
        role: c.role,
      })),

      nodes,
      edges,
    };
  }
}
