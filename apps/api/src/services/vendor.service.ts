import { prisma } from "@owners-platform/database";
import { logActivity } from "./activity.service";
import type { CreateVendorInput } from "@owners-platform/validators";

interface GetAllOptions {
  search?: string;
  category?: string;
  page?: number;
  limit?: number;
}

export async function getAll(options: GetAllOptions) {
  const page = options.page || 1;
  const limit = options.limit || 12;
  const where: Record<string, unknown> = {};

  if (options.category && options.category !== "all") {
    where.category = options.category;
  }
  if (options.search) {
    where.name = { contains: options.search, mode: "insensitive" };
  }

  const [data, total] = await Promise.all([
    prisma.vendor.findMany({
      where,
      orderBy: { rating: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.vendor.count({ where }),
  ]);

  return { data, total, page, limit };
}

export async function getById(id: string) {
  const vendor = await prisma.vendor.findUnique({ where: { id } });

  if (!vendor) {
    const err = new Error("Vendor not found") as Error & { statusCode: number };
    err.statusCode = 404;
    throw err;
  }

  return vendor;
}

export async function create(userId: string, input: CreateVendorInput) {
  const vendor = await prisma.vendor.create({
    data: {
      name: input.name,
      category: input.category,
      email: input.email || null,
      phone: input.phone || null,
      description: input.description || null,
      rating: input.rating ?? 0,
      contractEndDate: input.contractEndDate
        ? new Date(input.contractEndDate)
        : null,
    },
  });

  await logActivity({
    userId,
    action: "Vendor added",
    entityType: "vendor",
    entityId: vendor.id,
  });

  return vendor;
}
