import { Router } from "express";
import authRouter from "./auth.routes";
import dashboardRouter from "./dashboard.routes";
import transactionRouter from "./transaction.routes";
import maintenanceRouter from "./maintenance.routes";
import announcementRouter from "./announcement.routes";

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

export default router;
