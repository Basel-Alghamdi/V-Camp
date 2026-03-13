import { RequestHandler } from "express";
import * as activityService from "../services/activity.service";

export const getAll: RequestHandler = async (req, res, next) => {
  try {
    const buildingId =
      (req.query.buildingId as string) || req.user!.buildingId;

    if (!buildingId) {
      res.status(400).json({ success: false, error: "buildingId is required" });
      return;
    }

    const result = await activityService.getAll(buildingId, {
      entityType: req.query.entityType as string | undefined,
      search: req.query.search as string | undefined,
      from: req.query.from as string | undefined,
      to: req.query.to as string | undefined,
      page: parseInt(req.query.page as string) || 1,
      limit: parseInt(req.query.limit as string) || 20,
    });

    res.status(200).json({ success: true, ...result });
  } catch (err) {
    next(err);
  }
};
