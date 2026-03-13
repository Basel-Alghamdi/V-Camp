import { RequestHandler } from "express";
import { verifyToken } from "../lib/jwt";

export const authenticate: RequestHandler = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ success: false, error: "Unauthorized" });
    return;
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = verifyToken(token);

    req.user = {
      userId: decoded.userId,
      role: decoded.role,
      buildingId: decoded.buildingId,
    };

    next();
  } catch {
    res.status(401).json({ success: false, error: "Unauthorized" });
  }
};
