import { Router } from "express";
import { authenticate } from "../middleware/auth.middleware";
import { requireRole } from "../middleware/rbac.middleware";
import { validate } from "../middleware/validate";
import { createVendorSchema } from "@owners-platform/validators";
import * as vendorController from "../controllers/vendor.controller";

const router = Router();

router.get("/", authenticate, vendorController.getAll);
router.get("/:id", authenticate, vendorController.getById);

router.post(
  "/",
  authenticate,
  requireRole("ADMIN"),
  validate(createVendorSchema),
  vendorController.create
);

export default router;
