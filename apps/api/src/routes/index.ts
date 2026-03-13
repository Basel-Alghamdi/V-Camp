import { Router } from "express";
import authRouter from "./auth.routes";
import dashboardRouter from "./dashboard.routes";
import transactionRouter from "./transaction.routes";
import maintenanceRouter from "./maintenance.routes";
import announcementRouter from "./announcement.routes";
import vendorRouter from "./vendor.routes";
import documentRouter from "./document.routes";
import activityRouter from "./activity.routes";

const router = Router();

// Health check
router.get("/health", (_req, res) => {
  res.json({ success: true, message: "OK" });
});

// Routes
router.use("/auth", authRouter);
router.use("/dashboard", dashboardRouter);
router.use("/transactions", transactionRouter);
router.use("/maintenance", maintenanceRouter);
router.use("/announcements", announcementRouter);
router.use("/vendors", vendorRouter);
router.use("/documents", documentRouter);
router.use("/activities", activityRouter);

export default router;
