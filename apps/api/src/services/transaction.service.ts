import { prisma } from "@owners-platform/database";
import { logActivity } from "./activity.service";
import type { CreateTransactionInput } from "@owners-platform/validators";

interface GetAllOptions {
  page?: number;
  limit?: number;
  status?: string;
}

export async function getAll(buildingId: string, options: GetAllOptions) {
  const page = options.page || 1;
  const limit = options.limit || 10;
  const where: Record<string, unknown> = { buildingId };

  if (options.status) {
    where.status = options.status;
  }

  const [data, total] = await Promise.all([
    prisma.transaction.findMany({
      where,
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { createdAt: "desc" },
    }),
    prisma.transaction.count({ where }),
  ]);

  return { data, total, page, limit };
}

export async function create(
  buildingId: string,
  userId: string,
  input: CreateTransactionInput
) {
  const transaction = await prisma.transaction.create({
    data: {
      description: input.description,
      amount: input.amount,
      category: input.category,
      status: input.status || "PENDING",
      buildingId,
    },
  });

  await logActivity({
    userId,
    action: "Transaction created",
    entityType: "transaction",
    entityId: transaction.id,
  });

  return transaction;
}
