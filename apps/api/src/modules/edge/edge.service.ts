import {
  ForbiddenError,
  NotFoundError,
} from "../../errors/app-error.js";

import { BoardRepository } from "../board/board.repository.js";
import { CollaboratorRepository } from "../collaborator/collaborator.repository.js";
import { NodeRepository } from "../node/node.repository.js";
import { EdgeRepository } from "./edge.repository.js";

export class EdgeService {
  private static async canEditBoard(
    boardId: string,
    userId: string,
  ) {
    const isOwner = await BoardRepository.isBoardOwner(
      boardId,
      userId,
    );

    if (isOwner) {
      return true;
    }

    const collaborator =
      await CollaboratorRepository.findCollaborator(
        boardId,
        userId,
      );

    return collaborator?.role === "EDITOR";
  }

  static async createEdge(
    boardId: string,
    userId: string,
    data: {
      sourceId: string;
      targetId: string;
      type?: string;
      label?: string;
      data?: object;
      style?: object;
    },
  ) {
    const canEdit = await EdgeService.canEditBoard(
      boardId,
      userId,
    );

    if (!canEdit) {
      throw new ForbiddenError(
        "You do not have permission to edit this board",
      );
    }

    const source =
      await NodeRepository.findNodeById(
        data.sourceId,
      );

    const target =
      await NodeRepository.findNodeById(
        data.targetId,
      );

    if (!source || !target) {
      throw new NotFoundError(
        "Source or target node not found",
      );
    }

    return EdgeRepository.createEdge(
      boardId,
      data,
    );
  }

  static async getEdges(
    boardId: string,
    userId: string,
  ) {
    const board =
      await BoardRepository.findBoardById(
        boardId,
      );

    if (!board) {
      throw new NotFoundError(
        "Board not found",
      );
    }

    const isOwner =
      board.ownerId === userId;

    const collaborator =
      await CollaboratorRepository.findCollaborator(
        boardId,
        userId,
      );

    const canView =
      isOwner ||
      collaborator ||
      board.visibility === "PUBLIC";

    if (!canView) {
      throw new ForbiddenError(
        "You do not have access to this board",
      );
    }

    return EdgeRepository.findEdgesByBoard(
      boardId,
    );
  }

  static async updateEdge(
    edgeId: string,
    userId: string,
    data: {
      type?: string;
      label?: string;
      data?: object;
      style?: object;
    },
  ) {
    const edge =
      await EdgeRepository.findEdgeById(
        edgeId,
      );

    if (!edge) {
      throw new NotFoundError(
        "Edge not found",
      );
    }

    const canEdit = await EdgeService.canEditBoard(
      edge.boardId,
      userId,
    );

    if (!canEdit) {
      throw new ForbiddenError(
        "You do not have permission to edit this board",
      );
    }

    return EdgeRepository.updateEdge(
      edgeId,
      data,
    );
  }

  static async deleteEdge(
    edgeId: string,
    userId: string,
  ) {
    const edge =
      await EdgeRepository.findEdgeById(
        edgeId,
      );

    if (!edge) {
      throw new NotFoundError(
        "Edge not found",
      );
    }

    const canEdit = await EdgeService.canEditBoard(
      edge.boardId,
      userId,
    );

    if (!canEdit) {
      throw new ForbiddenError(
        "You do not have permission to edit this board",
      );
    }

    await EdgeRepository.deleteEdge(edgeId);
  }
}