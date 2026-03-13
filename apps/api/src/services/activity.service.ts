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
      metadata: input.metadata || null,
    },
  });
}
