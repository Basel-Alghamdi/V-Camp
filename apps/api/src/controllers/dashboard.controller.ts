import { RequestHandler } from "express";
import * as dashboardService from "../services/dashboard.service";

export const getSummary: RequestHandler = async (req, res, next) => {
  try {
    const buildingId =
      (req.query.buildingId as string) || req.user!.buildingId;

    if (!buildingId) {
      res
        .status(400)
        .json({ success: false, error: "buildingId is required" });
      return;
    }

    const summary = await dashboardService.getSummary(buildingId);
    res.status(200).json({ success: true, data: summary });
  } catch (err) {
    next(err);
  }
};
