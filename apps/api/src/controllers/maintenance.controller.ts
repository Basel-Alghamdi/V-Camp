import { RequestHandler } from "express";
import * as maintenanceService from "../services/maintenance.service";

export const getAll: RequestHandler = async (req, res, next) => {
  try {
    const buildingId =
      (req.query.buildingId as string) || req.user!.buildingId;

    if (!buildingId) {
      res.status(400).json({ success: false, error: "buildingId is required" });
      return;
    }

    const result = await maintenanceService.getAll(buildingId, {
      status: req.query.status as string | undefined,
      priority: req.query.priority as string | undefined,
      category: req.query.category as string | undefined,
      page: parseInt(req.query.page as string) || 1,
      limit: parseInt(req.query.limit as string) || 10,
    });

    res.status(200).json({ success: true, ...result });
  } catch (err) {
    next(err);
  }
};

export const getById: RequestHandler = async (req, res, next) => {
  try {
    const request = await maintenanceService.getById(req.params.id as string);
    res.status(200).json({ success: true, data: request });
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

    const request = await maintenanceService.create(
      buildingId,
      req.user!.userId,
      req.body
    );
    res.status(201).json({ success: true, data: request });
  } catch (err) {
    next(err);
  }
};

export const update: RequestHandler = async (req, res, next) => {
  try {
    const request = await maintenanceService.update(
      req.params.id as string,
      req.user!.userId,
      req.body
    );
    res.status(200).json({ success: true, data: request });
  } catch (err) {
    next(err);
  }
};

export const remove: RequestHandler = async (req, res, next) => {
  try {
    await maintenanceService.remove(req.params.id as string, req.user!.userId);
    res.status(200).json({ success: true, message: "Request deleted" });
  } catch (err) {
    next(err);
  }
};
