import { Router } from "express";
import { BoardController } from "./board.controller.js";
import { validate } from "../../middleware/validate.middleware.js";
import {
  AddCollaboratorSchema,
  CreateBoardSchema,
  CreateNodeSchema,
  UpdateBoardSchema,
  UpdateCollaboratorRoleSchema,
} from "@repo/validation";
import { requireAuth } from "../../middleware/auth.middleware.js";
import { CollaboratorController } from "../collaborator/collaborator.controller.js";
import { NodeController } from "../node/node.controller.js";

const router = Router();

router.use(requireAuth);

router.post("/", validate(CreateBoardSchema), BoardController.createBoard);
router.get("/", BoardController.getBoards);
router.get("/:id", BoardController.getBoardById);
router.patch("/:id", validate(UpdateBoardSchema), BoardController.updateBoard);
router.delete("/:id", BoardController.deleteBoard);

router.post(
  "/:boardId/collaborators",
  validate(AddCollaboratorSchema),
  CollaboratorController.addCollaborator,
);

router.get("/:boardId/collaborators", CollaboratorController.getCollaborators);

router.patch(
  "/:boardId/collaborators/:userId",
  validate(UpdateCollaboratorRoleSchema),
  CollaboratorController.updateRole,
);

router.delete(
  "/:boardId/collaborators/:userId",
  CollaboratorController.removeCollaborator,
);

router.post(
  "/:boardId/nodes",
  validate(CreateNodeSchema),
  NodeController.createNode,
);

router.get("/:boardId/nodes", NodeController.getNodes);

export const boardRoutes = router;
