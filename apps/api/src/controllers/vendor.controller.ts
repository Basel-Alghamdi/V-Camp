import { RequestHandler } from "express";
import * as vendorService from "../services/vendor.service";

export const getAll: RequestHandler = async (req, res, next) => {
  try {
    const result = await vendorService.getAll({
      search: req.query.search as string | undefined,
      category: req.query.category as string | undefined,
      page: parseInt(req.query.page as string) || 1,
      limit: parseInt(req.query.limit as string) || 12,
    });
    res.status(200).json({ success: true, ...result });
  } catch (err) {
    next(err);
  }
};

export const getById: RequestHandler = async (req, res, next) => {
  try {
    const vendor = await vendorService.getById(req.params.id as string);
    res.status(200).json({ success: true, data: vendor });
  } catch (err) {
    next(err);
  }
};

export const create: RequestHandler = async (req, res, next) => {
  try {
    const vendor = await vendorService.create(req.user!.userId, req.body);
    res.status(201).json({ success: true, data: vendor });
  } catch (err) {
    next(err);
  }
};
