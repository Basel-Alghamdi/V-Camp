import { Router } from "express";
import { validate } from "../middleware/validate";
import { authenticate } from "../middleware/auth.middleware";
import { registerSchema, loginSchema } from "@owners-platform/validators";
import * as authController from "../controllers/auth.controller";

const router = Router();

router.post("/register", validate(registerSchema), authController.register);
router.post("/login", validate(loginSchema), authController.login);
router.post("/logout", authenticate, authController.logout);
router.get("/me", authenticate, authController.getMe);

export default router;
