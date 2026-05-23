import { Router } from "express";

import { requireAuth } from "../../middleware/auth.middleware.js";
import { validate } from "../../middleware/validate.middleware.js";

import { CreateEdgeSchema, UpdateEdgeSchema } from "@repo/validation";

import { EdgeController } from "./edge.controller.js";

const router = Router();

router.use(requireAuth);

router.patch("/:edgeId", validate(UpdateEdgeSchema), EdgeController.updateEdge);

router.delete("/:edgeId", EdgeController.deleteEdge);

export const edgeRoutes = router;
