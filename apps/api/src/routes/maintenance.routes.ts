import { Router } from "express";
import { authenticate } from "../middleware/auth.middleware";
import { requireRole } from "../middleware/rbac.middleware";
import { validate } from "../middleware/validate";
import {
  createMaintenanceSchema,
  updateMaintenanceSchema,
} from "@owners-platform/validators";
import * as maintenanceController from "../controllers/maintenance.controller";

const router = Router();

router.get("/", authenticate, maintenanceController.getAll);

router.post(
  "/",
  authenticate,
  requireRole("OWNER", "MANAGER", "ADMIN"),
  validate(createMaintenanceSchema),
  maintenanceController.create
);

router.get("/:id", authenticate, maintenanceController.getById);

router.patch(
  "/:id",
  authenticate,
  requireRole("MANAGER", "ADMIN"),
  validate(updateMaintenanceSchema),
  maintenanceController.update
);

router.delete(
  "/:id",
  authenticate,
  requireRole("MANAGER", "ADMIN"),
  maintenanceController.remove
);

export default router;
