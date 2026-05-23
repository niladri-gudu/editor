import { Request, Response, NextFunction } from "express";

import { UnauthorizedError } from "../../errors/app-error.js";
import { NodeService } from "./node.service.js";

export class NodeController {
  private static getUserId(req: Request): string {
    const userId = req.user?.userId;

    if (!userId) {
      throw new UnauthorizedError("User not authenticated");
    }

    return userId;
  }

  static async createNode(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = NodeController.getUserId(req);

      const boardId = String(req.params.boardId);

      const node = await NodeService.createNode(boardId, userId, req.body);

      res.status(201).json({
        success: true,
        data: node,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getNodes(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = NodeController.getUserId(req);

      const boardId = String(req.params.boardId);

      const nodes = await NodeService.getNodes(boardId, userId);

      res.status(200).json({
        success: true,
        data: nodes,
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateNode(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = NodeController.getUserId(req);

      const nodeId = String(req.params.nodeId);

      const node = await NodeService.updateNode(nodeId, userId, req.body);

      res.status(200).json({
        success: true,
        data: node,
      });
    } catch (error) {
      next(error);
    }
  }

  static async deleteNode(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = NodeController.getUserId(req);

      const nodeId = String(req.params.nodeId);

      await NodeService.deleteNode(nodeId, userId);

      res.status(200).json({
        success: true,
        message: "Node deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  }
}
