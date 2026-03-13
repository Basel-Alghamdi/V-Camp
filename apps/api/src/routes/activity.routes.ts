import { Router } from "express";
import { authenticate } from "../middleware/auth.middleware";
import { requireRole } from "../middleware/rbac.middleware";
import * as activityController from "../controllers/activity.controller";

const router = Router();

router.get(
  "/",
  authenticate,
  requireRole("OWNER", "MANAGER", "ADMIN"),
  activityController.getAll
);

export default router;
