import { RequestHandler } from "express";
import * as announcementService from "../services/announcement.service";

export const getAll: RequestHandler = async (req, res, next) => {
  try {
    const buildingId =
      (req.query.buildingId as string) || req.user!.buildingId;

    if (!buildingId) {
      res.status(400).json({ success: false, error: "buildingId is required" });
      return;
    }

    const result = await announcementService.getAll(buildingId, {
      page: parseInt(req.query.page as string) || 1,
      limit: parseInt(req.query.limit as string) || 20,
    });

    res.status(200).json({ success: true, ...result });
  } catch (err) {
    next(err);
  }
};

export const create: RequestHandler = async (req, res, next) => {
  try {
    const buildingId =
      (req.query.buildingId as string) || req.user!.buildingId;

    if (!buildingId) {
      res.status(400).json({ success: false, error: "buildingId is required" });
      return;
    }

    const announcement = await announcementService.create(
      buildingId,
      req.user!.userId,
      req.body
    );
    res.status(201).json({ success: true, data: announcement });
  } catch (err) {
    next(err);
  }
};

export const remove: RequestHandler = async (req, res, next) => {
  try {
    await announcementService.remove(req.params.id, req.user!.userId);
    res.status(200).json({ success: true, message: "Announcement deleted" });
  } catch (err) {
    next(err);
  }
};
