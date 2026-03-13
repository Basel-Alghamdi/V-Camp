import { RequestHandler } from "express";
import { ZodSchema, ZodError } from "zod";

export function validate(schema: ZodSchema): RequestHandler {
  return (req, res, next) => {
    try {
      schema.parse(req.body);
      next();
    } catch (err) {
      if (err instanceof ZodError) {
        res.status(400).json({
          success: false,
          error: "Validation failed",
          details: err.errors.map((e) => ({
            field: e.path.join("."),
            message: e.message,
          })),
        });
        return;
      }
      next(err);
    }
  };
}
