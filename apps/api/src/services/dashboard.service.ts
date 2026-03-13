import { prisma } from "@owners-platform/database";

export async function getSummary(buildingId: string) {
  const [totalBudget, totalExpenses, openRequests, feeCollection, pendingFees] =
    await Promise.all([
      prisma.transaction.aggregate({
        where: { buildingId, status: "PAID" },
        _sum: { amount: true },
      }),
      prisma.transaction.aggregate({
        where: { buildingId, amount: { lt: 0 } },
        _sum: { amount: true },
      }),
      prisma.maintenanceRequest.count({
        where: {
          buildingId,
          status: { in: ["PENDING", "IN_PROGRESS"] },
        },
      }),
      prisma.transaction.aggregate({
        where: { buildingId, category: "fee" },
        _sum: { amount: true },
      }),
      prisma.transaction.aggregate({
        where: { buildingId, category: "fee", status: "PENDING" },
        _sum: { amount: true },
      }),
    ]);

  return {
    totalBudget: totalBudget._sum.amount?.toNumber() || 0,
    totalExpenses: totalExpenses._sum.amount?.toNumber() || 0,
    openRequests,
    feeCollection: feeCollection._sum.amount?.toNumber() || 0,
    pendingFees: pendingFees._sum.amount?.toNumber() || 0,
  };
}
