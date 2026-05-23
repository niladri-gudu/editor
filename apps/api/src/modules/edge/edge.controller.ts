import { Request, Response, NextFunction } from "express";

import { UnauthorizedError } from "../../errors/app-error.js";
import { EdgeService } from "./edge.service.js";

export class EdgeController {
  private static getUserId(
    req: Request,
  ): string {
    const userId = req.user?.userId;

    if (!userId) {
      throw new UnauthorizedError(
        "User not authenticated",
      );
    }

    return userId;
  }

  static async createEdge(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const userId =
        EdgeController.getUserId(req);

      const boardId = String(
        req.params.boardId,
      );

      const edge =
        await EdgeService.createEdge(
          boardId,
          userId,
          req.body,
        );

      res.status(201).json({
        success: true,
        data: edge,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getEdges(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const userId =
        EdgeController.getUserId(req);

      const boardId = String(
        req.params.boardId,
      );

      const edges =
        await EdgeService.getEdges(
          boardId,
          userId,
        );

      res.status(200).json({
        success: true,
        data: edges,
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateEdge(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const userId =
        EdgeController.getUserId(req);

      const edgeId = String(
        req.params.edgeId,
      );

      const edge =
        await EdgeService.updateEdge(
          edgeId,
          userId,
          req.body,
        );

      res.status(200).json({
        success: true,
        data: edge,
      });
    } catch (error) {
      next(error);
    }
  }

  static async deleteEdge(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const userId =
        EdgeController.getUserId(req);

      const edgeId = String(
        req.params.edgeId,
      );

      await EdgeService.deleteEdge(
        edgeId,
        userId,
      );

      res.status(200).json({
        success: true,
        message:
          "Edge deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  }
}