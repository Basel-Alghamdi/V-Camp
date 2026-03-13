import { Router } from "express";
import { authenticate } from "../middleware/auth.middleware";
import { requireRole } from "../middleware/rbac.middleware";
import { validate } from "../middleware/validate";
import { createAnnouncementSchema } from "@owners-platform/validators";
import * as announcementController from "../controllers/announcement.controller";

const router = Router();

router.get("/", authenticate, announcementController.getAll);

router.post(
  "/",
  authenticate,
  requireRole("MANAGER", "ADMIN"),
  validate(createAnnouncementSchema),
  announcementController.create
);

router.delete(
  "/:id",
  authenticate,
  requireRole("MANAGER", "ADMIN"),
  announcementController.remove
);

export default router;
