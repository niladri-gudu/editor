import { Router } from "express";
import { AuthController } from "./auth.controller.js";
import { validate } from "../../middleware/validate.middleware.js";
import { RegisterSchema, LoginSchema } from "@repo/validation";
import { requireAuth } from "../../middleware/auth.middleware.js";

const router = Router();

router.post("/register", validate(RegisterSchema), AuthController.register);
router.post("/login", validate(LoginSchema), AuthController.login);
router.post("/refresh", AuthController.refreshToken);
router.post("/logout", AuthController.logout);

router.post("/logout-all", requireAuth, AuthController.logoutAll);
router.get("/me", requireAuth, AuthController.me);

export const authRoutes = router;
