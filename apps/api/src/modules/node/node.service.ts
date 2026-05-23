import { ForbiddenError, NotFoundError } from "../../errors/app-error.js";

import { BoardRepository } from "../board/board.repository.js";
import { CollaboratorRepository } from "../collaborator/collaborator.repository.js";
import { NodeRepository } from "./node.repository.js";

export class NodeService {
  private static async canEditBoard(boardId: string, userId: string) {
    const isOwner = await BoardRepository.isBoardOwner(boardId, userId);

    if (isOwner) {
      return true;
    }

    const collaborator = await CollaboratorRepository.findCollaborator(
      boardId,
      userId,
    );

    return collaborator?.role === "EDITOR";
  }

  static async createNode(boardId: string, userId: string, data: any) {
    const canEdit = await NodeService.canEditBoard(boardId, userId);

    if (!canEdit) {
      throw new ForbiddenError("You do not have permission to edit this board");
    }

    return NodeRepository.createNode(boardId, data);
  }

  static async getNodes(boardId: string, userId: string) {
    const board = await BoardRepository.findBoardById(boardId);

    if (!board) {
      throw new NotFoundError("Board not found");
    }

    const isOwner = board.ownerId === userId;

    const collaborator = await CollaboratorRepository.findCollaborator(
      boardId,
      userId,
    );

    const canView = isOwner || collaborator || board.visibility === "PUBLIC";

    if (!canView) {
      throw new ForbiddenError("You do not have access to this board");
    }

    return NodeRepository.findNodesByBoard(boardId);
  }

  static async updateNode(nodeId: string, userId: string, data: any) {
    const node = await NodeRepository.findNodeById(nodeId);

    if (!node) {
      throw new NotFoundError("Node not found");
    }

    const canEdit = await NodeService.canEditBoard(node.boardId, userId);

    if (!canEdit) {
      throw new ForbiddenError("You do not have permission to edit this board");
    }

    return NodeRepository.updateNode(nodeId, data);
  }

  static async deleteNode(nodeId: string, userId: string) {
    const node = await NodeRepository.findNodeById(nodeId);

    if (!node) {
      throw new NotFoundError("Node not found");
    }

    const canEdit = await NodeService.canEditBoard(node.boardId, userId);

    if (!canEdit) {
      throw new ForbiddenError("You do not have permission to edit this board");
    }

    await NodeRepository.deleteNode(nodeId);
  }
}
