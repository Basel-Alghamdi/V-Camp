import { RequestHandler } from "express";
import * as authService from "../services/auth.service";

export const register: RequestHandler = async (req, res, next) => {
  try {
    const result = await authService.register(req.body);
    res.status(201).json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
};

export const login: RequestHandler = async (req, res, next) => {
  try {
    const result = await authService.login(req.body.email, req.body.password);
    res.status(200).json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
};

export const logout: RequestHandler = (_req, res) => {
  res.status(200).json({ success: true, message: "Logged out successfully" });
};

export const getMe: RequestHandler = async (req, res, next) => {
  try {
    const user = await authService.getMe(req.user!.userId);
    res.status(200).json({ success: true, data: user });
  } catch (err) {
    next(err);
  }
};
