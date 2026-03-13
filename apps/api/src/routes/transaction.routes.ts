import { Router } from "express";
import { authenticate } from "../middleware/auth.middleware";
import { requireRole } from "../middleware/rbac.middleware";
import { validate } from "../middleware/validate";
import { createTransactionSchema } from "@owners-platform/validators";
import * as transactionController from "../controllers/transaction.controller";

const router = Router();

router.get("/", authenticate, transactionController.getAll);

router.post(
  "/",
  authenticate,
  requireRole("MANAGER", "ADMIN"),
  validate(createTransactionSchema),
  transactionController.create
);

export default router;
