import { Router } from "express";
import multer from "multer";
import { authenticate } from "../middleware/auth.middleware";
import { requireRole } from "../middleware/rbac.middleware";
import * as documentController from "../controllers/document.controller";

const ALLOWED_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "image/jpeg",
  "image/png",
];

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter: (_req, file, cb) => {
    if (ALLOWED_TYPES.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("File type not allowed"));
    }
  },
});

const router = Router();

router.get("/", authenticate, documentController.getAll);

router.post(
  "/",
  authenticate,
  requireRole("MANAGER", "ADMIN"),
  upload.single("file"),
  documentController.upload
);

router.delete(
  "/:id",
  authenticate,
  requireRole("MANAGER", "ADMIN"),
  documentController.remove
);

export default router;
