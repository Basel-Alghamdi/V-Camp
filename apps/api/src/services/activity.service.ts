import { prisma } from "@owners-platform/database";

interface LogActivityInput {
  userId: string;
  action: string;
  entityType: string;
  entityId?: string;
  metadata?: Record<string, unknown>;
}

export async function logActivity(input: LogActivityInput) {
  return prisma.activityLog.create({
    data: {
      userId: input.userId,
      action: input.action,
      entityType: input.entityType,
      entityId: input.entityId || null,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      metadata: input.metadata ? (input.metadata as any) : undefined,
    },
  });
}

interface GetAllOptions {
  entityType?: string;
  search?: string;
  from?: string;
  to?: string;
  page?: number;
  limit?: number;
}

export async function getAll(buildingId: string, options: GetAllOptions) {
  const page = options.page || 1;
  const limit = options.limit || 20;
  const where: Record<string, unknown> = {
    user: { buildingId },
  };

  if (options.entityType && options.entityType !== "all") {
    where.entityType = options.entityType;
  }
  if (options.search) {
    where.action = { contains: options.search, mode: "insensitive" };
  }
  if (options.from && options.to) {
    where.createdAt = {
      gte: new Date(options.from),
      lte: new Date(options.to),
    };
  }

  const [data, total] = await Promise.all([
    prisma.activityLog.findMany({
      where,
      include: { user: { select: { id: true, name: true, role: true } } },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.activityLog.count({ where }),
  ]);

  return { data, total, page, limit };
}
