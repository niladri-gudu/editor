import { Router } from "express";

import { requireAuth } from "../../middleware/auth.middleware.js";
import { validate } from "../../middleware/validate.middleware.js";

import { CreateNodeSchema, UpdateNodeSchema } from "@repo/validation";

import { NodeController } from "./node.controller.js";

const router = Router();

router.use(requireAuth);

router.patch("/:nodeId", validate(UpdateNodeSchema), NodeController.updateNode);

router.delete("/:nodeId", NodeController.deleteNode);

export const nodeRoutes = router;
