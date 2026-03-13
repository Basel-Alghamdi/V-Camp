import { prisma } from "@owners-platform/database";
import { logActivity } from "./activity.service";
import { uploadFile, deleteFile } from "../lib/cloudinary";
import type { UploadDocumentInput } from "@owners-platform/validators";

interface GetAllOptions {
  category?: string;
  search?: string;
  page?: number;
  limit?: number;
}

export async function getAll(buildingId: string, options: GetAllOptions) {
  const page = options.page || 1;
  const limit = options.limit || 9;
  const where: Record<string, unknown> = { buildingId };

  if (options.category && options.category !== "all") {
    where.category = options.category;
  }
  if (options.search) {
    where.name = { contains: options.search, mode: "insensitive" };
  }

  const [data, total] = await Promise.all([
    prisma.document.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.document.count({ where }),
  ]);

  return { data, total, page, limit };
}

export async function upload(
  buildingId: string,
  userId: string,
  file: Express.Multer.File,
  meta: UploadDocumentInput
) {
  const { url, size } = await uploadFile(file.buffer, file.originalname);

  const document = await prisma.document.create({
    data: {
      name: meta.name,
      category: meta.category,
      relatedTo: meta.relatedTo || null,
      url,
      size,
      buildingId,
    },
  });

  await logActivity({
    userId,
    action: "Document uploaded",
    entityType: "document",
    entityId: document.id,
  });

  return document;
}

export async function remove(id: string, userId: string) {
  const document = await prisma.document.findUnique({ where: { id } });

  if (!document) {
    const err = new Error("Document not found") as Error & {
      statusCode: number;
    };
    err.statusCode = 404;
    throw err;
  }

  // Extract publicId from Cloudinary URL
  const urlParts = document.url.split("/");
  const folderAndFile = urlParts.slice(-3).join("/").replace(/\.[^/.]+$/, "");
  try {
    await deleteFile(folderAndFile);
  } catch {
    // Continue even if Cloudinary delete fails (file may not exist there)
  }

  await prisma.document.delete({ where: { id } });

  await logActivity({
    userId,
    action: "Document deleted",
    entityType: "document",
    entityId: id,
  });
}
