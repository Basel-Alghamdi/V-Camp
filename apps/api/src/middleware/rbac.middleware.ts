import { RequestHandler } from "express";
import type { Role } from "../types/express";

export function requireRole(...roles: Role[]): RequestHandler {
  return (req, res, next) => {
    if (!req.user) {
      res.status(401).json({ success: false, error: "Unauthorized" });
      return;
    }

    if (!roles.includes(req.user.role)) {
      res.status(403).json({ success: false, error: "Forbidden" });
      return;
    }

    next();
  };
}
