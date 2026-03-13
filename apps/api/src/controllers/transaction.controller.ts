import { RequestHandler } from "express";
import * as transactionService from "../services/transaction.service";

export const getAll: RequestHandler = async (req, res, next) => {
  try {
    const buildingId =
      (req.query.buildingId as string) || req.user!.buildingId;

    if (!buildingId) {
      res
        .status(400)
        .json({ success: false, error: "buildingId is required" });
      return;
    }

    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const status = req.query.status as string | undefined;

    const result = await transactionService.getAll(buildingId, {
      page,
      limit,
      status,
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
      res
        .status(400)
        .json({ success: false, error: "buildingId is required" });
      return;
    }

    const transaction = await transactionService.create(
      buildingId,
      req.user!.userId,
      req.body
    );
    res.status(201).json({ success: true, data: transaction });
  } catch (err) {
    next(err);
  }
};
