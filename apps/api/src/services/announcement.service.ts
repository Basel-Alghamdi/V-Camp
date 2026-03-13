import { prisma } from "@owners-platform/database";
import { logActivity } from "./activity.service";
import type { CreateAnnouncementInput } from "@owners-platform/validators";

interface GetAllOptions {
  page?: number;
  limit?: number;
}

export async function getAll(buildingId: string, options: GetAllOptions) {
  const page = options.page || 1;
  const limit = options.limit || 20;

  const [data, total] = await Promise.all([
    prisma.announcement.findMany({
      where: { buildingId },
      include: { createdBy: { select: { id: true, name: true } } },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.announcement.count({ where: { buildingId } }),
  ]);

  return { data, total, page, limit };
}

export async function create(
  buildingId: string,
  userId: string,
  input: CreateAnnouncementInput
) {
  const announcement = await prisma.announcement.create({
    data: {
      title: input.title,
      description: input.description,
      priority: input.priority,
      buildingId,
      createdById: userId,
    },
  });

  await logActivity({
    userId,
    action: "Announcement published",
    entityType: "announcement",
    entityId: announcement.id,
  });

  return announcement;
}

export async function remove(id: string, userId: string) {
  const existing = await prisma.announcement.findUnique({ where: { id } });

  if (!existing) {
    const err = new Error("Announcement not found") as Error & { statusCode: number };
    err.statusCode = 404;
    throw err;
  }

  await prisma.announcement.delete({ where: { id } });

  await logActivity({
    userId,
    action: "Announcement deleted",
    entityType: "announcement",
    entityId: id,
  });
}
