import { z } from "zod";

export const createAnnouncementSchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().min(1),
  priority: z.enum(["HIGH", "MEDIUM", "LOW"]),
});

export type CreateAnnouncementInput = z.infer<typeof createAnnouncementSchema>;
