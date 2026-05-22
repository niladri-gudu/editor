import { Router } from "express";
import { BoardController } from "./board.controller.js";
import { validate } from "../../middleware/validate.middleware.js";
import { CreateBoardSchema, UpdateBoardSchema } from "@repo/validation";
import { requireAuth } from "../../middleware/auth.middleware.js";

const router = Router();

router.use(requireAuth);

router.post("/", validate(CreateBoardSchema), BoardController.createBoard);
router.get("/", BoardController.getBoards);
router.get("/:id", BoardController.getBoardById);
router.patch("/:id", validate(UpdateBoardSchema), BoardController.updateBoard);
router.delete("/:id", BoardController.deleteBoard);

export const boardRoutes = router;
