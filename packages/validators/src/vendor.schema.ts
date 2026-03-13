import { z } from "zod";

export const createVendorSchema = z.object({
  name: z.string().min(1),
  category: z.enum(["Cleaning", "Security", "Electrical", "Plumbing", "Other"]),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  description: z.string().optional(),
  rating: z.number().min(0).max(5).optional(),
  contractEndDate: z.string().datetime().optional(),
});

export type CreateVendorInput = z.infer<typeof createVendorSchema>;
