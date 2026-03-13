import { z } from "zod";

export const createMaintenanceSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  location: z.string().min(1),
  category: z.string().min(1),
  priority: z.enum(["LOW", "MEDIUM", "HIGH"]).optional(),
});

export const updateMaintenanceSchema = z.object({
  status: z.enum(["PENDING", "IN_PROGRESS", "COMPLETED", "REJECTED"]).optional(),
  paymentStatus: z.enum(["PENDING", "UNPAID", "PAID"]).optional(),
  vendorId: z.string().uuid().optional(),
  amount: z.number().optional(),
});

export type CreateMaintenanceInput = z.infer<typeof createMaintenanceSchema>;
export type UpdateMaintenanceInput = z.infer<typeof updateMaintenanceSchema>;
