import { NextFunction, Request, Response } from "express";
import { BoardService } from "./board.service.js";
import { UnauthorizedError } from "../../errors/app-error.js";

export class BoardController {
  private static getAuthenticatedUserId(req: Request): Promise<string> {
    const userId = req.user?.userId;

    if (!userId) {
      throw new UnauthorizedError("User not authenticated");
    }

    return userId;
  }

  static async createBoard(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const userId = await BoardController.getAuthenticatedUserId(req);

      const board = await BoardService.createBoard(userId, req.body);

      res.status(201).json({
        success: true,
        data: board,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getBoards(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const userId = await BoardController.getAuthenticatedUserId(req);

      const boards = await BoardService.getBoards(userId);

      res.status(200).json({
        success: true,
        data: boards,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getBoardById(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const userId = await BoardController.getAuthenticatedUserId(req);

      const boardId = String(req.params.id);

      const board = await BoardService.getBoard(userId, boardId);

      res.status(200).json({
        success: true,
        data: board,
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateBoard(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const userId = await BoardController.getAuthenticatedUserId(req);

      const boardId = String(req.params.id);

      const board = await BoardService.updateBoard(boardId, userId, req.body);

      res.status(200).json({
        success: true,
        data: board,
      });
    } catch (error) {
      next(error);
    }
  }

  static async deleteBoard(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const userId = await BoardController.getAuthenticatedUserId(req);

      const boardId = String(req.params.id);

      await BoardService.deleteBoard(boardId, userId);

      res.status(200).json({
        success: true,
        message: "Board deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  }

  static async getDiagram(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = await BoardController.getAuthenticatedUserId(req);

      const boardId = String(req.params.boardId);

      const diagram = await BoardService.getDiagram(boardId, userId);

      res.status(200).json({
        success: true,
        data: diagram,
      });
    } catch (error) {
      next(error);
    }
  }
}
