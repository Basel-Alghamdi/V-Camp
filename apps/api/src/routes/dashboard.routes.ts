import { Router } from "express";
import { authenticate } from "../middleware/auth.middleware";
import { requireRole } from "../middleware/rbac.middleware";
import * as dashboardController from "../controllers/dashboard.controller";

const router = Router();

router.get(
  "/summary",
  authenticate,
  requireRole("OWNER", "MANAGER", "ADMIN"),
  dashboardController.getSummary
);

export default router;
