import { z } from "zod";

export const createTransactionSchema = z.object({
  description: z.string().min(1),
  amount: z.number(),
  category: z.string().min(1),
  status: z.enum(["PAID", "PENDING", "UNPAID"]).optional(),
});

export type CreateTransactionInput = z.infer<typeof createTransactionSchema>;
