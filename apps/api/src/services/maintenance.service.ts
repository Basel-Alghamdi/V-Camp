import { prisma } from "@owners-platform/database";
import { logActivity } from "./activity.service";
import type {
  CreateMaintenanceInput,
  UpdateMaintenanceInput,
} from "@owners-platform/validators";

interface GetAllOptions {
  status?: string;
  priority?: string;
  category?: string;
  page?: number;
  limit?: number;
}

export async function getAll(buildingId: string, options: GetAllOptions) {
  const page = options.page || 1;
  const limit = options.limit || 10;
  const where: Record<string, unknown> = { buildingId };

  if (options.status) where.status = options.status;
  if (options.priority) where.priority = options.priority;
  if (options.category) where.category = options.category;

  const [data, total] = await Promise.all([
    prisma.maintenanceRequest.findMany({
      where,
      include: {
        vendor: true,
        createdBy: { select: { id: true, name: true, email: true } },
      },
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { createdAt: "desc" },
    }),
    prisma.maintenanceRequest.count({ where }),
  ]);

  return { data, total, page, limit };
}

export async function getById(id: string) {
  const request = await prisma.maintenanceRequest.findUnique({
    where: { id },
    include: {
      vendor: true,
      createdBy: { select: { id: true, name: true, email: true } },
      building: true,
    },
  });

  if (!request) {
    const err = new Error("Maintenance request not found") as Error & {
      statusCode: number;
    };
    err.statusCode = 404;
    throw err;
  }

  return request;
}

export async function create(
  buildingId: string,
  userId: string,
  input: CreateMaintenanceInput
) {
  const request = await prisma.maintenanceRequest.create({
    data: {
      title: input.title,
      description: input.description,
      location: input.location,
      category: input.category,
      priority: input.priority || "MEDIUM",
      buildingId,
      createdById: userId,
    },
  });

  await logActivity({
    userId,
    action: "Maintenance request created",
    entityType: "maintenance",
    entityId: request.id,
  });

  return request;
}

export async function update(
  id: string,
  userId: string,
  input: UpdateMaintenanceInput
) {
  const existing = await prisma.maintenanceRequest.findUnique({
    where: { id },
  });

  if (!existing) {
    const err = new Error("Maintenance request not found") as Error & {
      statusCode: number;
    };
    err.statusCode = 404;
    throw err;
  }

  const request = await prisma.maintenanceRequest.update({
    where: { id },
    data: input,
  });

  await logActivity({
    userId,
    action: "Maintenance request updated",
    entityType: "maintenance",
    entityId: id,
    metadata: { changes: input },
  });

  return request;
}

export async function remove(id: string, userId: string) {
  const existing = await prisma.maintenanceRequest.findUnique({
    where: { id },
  });

  if (!existing) {
    const err = new Error("Maintenance request not found") as Error & {
      statusCode: number;
    };
    err.statusCode = 404;
    throw err;
  }

  await prisma.maintenanceRequest.delete({ where: { id } });

  await logActivity({
    userId,
    action: "Maintenance request deleted",
    entityType: "maintenance",
    entityId: id,
  });
}
