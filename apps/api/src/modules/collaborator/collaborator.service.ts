import {
  ConflictError,
  ForbiddenError,
  NotFoundError,
} from "../../errors/app-error.js";
import { BoardRepository } from "../board/board.repository.js";
import { CollaboratorRepository } from "./collaborator.repository.js";

export class CollaboratorService {
  static async addCollaborator(
    boardId: string,
    ownerId: string,
    email: string,
    role: "EDITOR" | "VIEWER",
  ) {
    const isOwner = await BoardRepository.isBoardOwner(boardId, ownerId);

    if (!isOwner) {
      throw new ForbiddenError("Only board owner can add collaborators");
    }

    const user = await CollaboratorRepository.findUserByEmail(email);

    if (!user) {
      throw new NotFoundError("User not found");
    }

    const existing = await CollaboratorRepository.findCollaborator(
      boardId,
      user.id,
    );

    if (existing) {
      throw new ConflictError("User is already a collaborator");
    }

    return CollaboratorRepository.addCollaborator(boardId, user.id, role);
  }

  static async getCollaborators(boardId: string, userId: string) {
    const board = await BoardRepository.findBoardById(boardId);

    if (!board) {
      throw new NotFoundError("Board not found");
    }

    const isOwner = board.ownerId === userId;

    const collaborator = await CollaboratorRepository.findCollaborator(
      boardId,
      userId,
    );

    if (!isOwner && !collaborator) {
      throw new ForbiddenError("You do not have access to this board");
    }

    return CollaboratorRepository.getBoardCollaborators(boardId);
  }

  static async updateRole(
    boardId: string,
    ownerId: string,
    collaboratorUserId: string,
    role: "EDITOR" | "VIEWER",
  ) {
    const isOwner = await BoardRepository.isBoardOwner(boardId, ownerId);

    if (!isOwner) {
      throw new ForbiddenError(
        "Only board owner can update collaborator roles",
      );
    }

    return CollaboratorRepository.updateCollaboratorRole(
      boardId,
      collaboratorUserId,
      role,
    );
  }

  static async removeCollaborator(
    boardId: string,
    ownerId: string,
    collaboratorUserId: string,
  ) {
    const isOwner = await BoardRepository.isBoardOwner(boardId, ownerId);

    if (!isOwner) {
      throw new ForbiddenError("Only board owner can remove collaborators");
    }

    await CollaboratorRepository.removeCollaborator(
      boardId,
      collaboratorUserId,
    );
  }
}
