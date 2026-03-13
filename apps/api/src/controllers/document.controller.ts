import { RequestHandler } from "express";
import * as documentService from "../services/document.service";
import { uploadDocumentSchema } from "@owners-platform/validators";

export const getAll: RequestHandler = async (req, res, next) => {
  try {
    const buildingId =
      (req.query.buildingId as string) || req.user!.buildingId;

    if (!buildingId) {
      res.status(400).json({ success: false, error: "buildingId is required" });
      return;
    }

    const result = await documentService.getAll(buildingId, {
      category: req.query.category as string | undefined,
      search: req.query.search as string | undefined,
      page: parseInt(req.query.page as string) || 1,
      limit: parseInt(req.query.limit as string) || 9,
    });

    res.status(200).json({ success: true, ...result });
  } catch (err) {
    next(err);
  }
};

export const upload: RequestHandler = async (req, res, next) => {
  try {
    const buildingId =
      (req.query.buildingId as string) || req.user!.buildingId;

    if (!buildingId) {
      res.status(400).json({ success: false, error: "buildingId is required" });
      return;
    }

    if (!req.file) {
      res.status(400).json({ success: false, error: "File is required" });
      return;
    }

    // Validate metadata from body
    const parsed = uploadDocumentSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({
        success: false,
        error: "Validation failed",
        details: parsed.error.errors.map((e) => ({
          field: e.path.join("."),
          message: e.message,
        })),
      });
      return;
    }

    const document = await documentService.upload(
      buildingId,
      req.user!.userId,
      req.file,
      parsed.data
    );

    res.status(201).json({ success: true, data: document });
  } catch (err) {
    next(err);
  }
};

export const remove: RequestHandler = async (req, res, next) => {
  try {
    await documentService.remove(req.params.id as string, req.user!.userId);
    res.status(200).json({ success: true, message: "Document deleted" });
  } catch (err) {
    next(err);
  }
};
