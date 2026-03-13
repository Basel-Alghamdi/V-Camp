import { z } from "zod";

export const uploadDocumentSchema = z.object({
  name: z.string().min(1),
  category: z.enum(["Invoice", "Contract", "Report", "Vendor", "Other"]),
  relatedTo: z.string().optional(),
});

export type UploadDocumentInput = z.infer<typeof uploadDocumentSchema>;
