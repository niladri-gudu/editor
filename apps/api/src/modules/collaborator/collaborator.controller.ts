import { Request, Response, NextFunction } from "express";
import { UnauthorizedError } from "../../errors/app-error.js";
import { CollaboratorService } from "./collaborator.service.js";

export class CollaboratorController {
  private static getUserId(req: Request): string {
    const userId = req.user?.userId;

    if (!userId) {
      throw new UnauthorizedError("User not authenticated");
    }

    return userId;
  }

  static async addCollaborator(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const userId = CollaboratorController.getUserId(req);

      const boardId = String(req.params.boardId);

      const collaborator = await CollaboratorService.addCollaborator(
        boardId,
        userId,
        req.body.email,
        req.body.role,
      );

      res.status(201).json({
        success: true,
        data: collaborator,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getCollaborators(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const userId = CollaboratorController.getUserId(req);

      const boardId = String(req.params.boardId);

      const collaborators = await CollaboratorService.getCollaborators(
        boardId,
        userId,
      );

      res.status(200).json({
        success: true,
        data: collaborators,
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateRole(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = CollaboratorController.getUserId(req);

      const boardId = String(req.params.boardId);
      const collaboratorUserId = String(req.params.userId);

      const collaborator = await CollaboratorService.updateRole(
        boardId,
        userId,
        collaboratorUserId,
        req.body.role,
      );

      res.status(200).json({
        success: true,
        data: collaborator,
      });
    } catch (error) {
      next(error);
    }
  }

  static async removeCollaborator(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const userId = CollaboratorController.getUserId(req);

      const boardId = String(req.params.boardId);
      const collaboratorUserId = String(req.params.userId);

      await CollaboratorService.removeCollaborator(
        boardId,
        userId,
        collaboratorUserId,
      );

      res.status(200).json({
        success: true,
        message: "Collaborator removed successfully",
      });
    } catch (error) {
      next(error);
    }
  }
}
