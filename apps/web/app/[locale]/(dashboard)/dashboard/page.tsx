"use client";

import React from "react";
import Link from "next/link";
import {
  DollarSign,
  TrendingDown,
  AlertCircle,
  Clock,
} from "lucide-react";
import { PageHeader, StatCard, DataTable, StatusBadge } from "@owners-platform/ui";
import type { DataTableColumn } from "@owners-platform/ui";
import BudgetChart from "@/components/dashboard/BudgetChart";
import RecentActivity from "@/components/dashboard/RecentActivity";
import MiniCalendar from "@/components/dashboard/MiniCalendar";
import {
  useDashboardSummary,
  useRecentTransactions,
  useRecentActivity,
  type RecentTransaction,
} from "@/hooks/use-dashboard";
import { useTranslations, useLocale } from "next-intl";

// Static monthly chart data — matches Figma design
const chartData = [
  { month: "Jan", budget: 8000, expenses: 6500 },
  { month: "Feb", budget: 9500, expenses: 7200 },
  { month: "Mar", budget: 11500, expenses: 14000 },
  { month: "Apr", budget: 15000, expenses: 11000 },
  { month: "May", budget: 18000, expenses: 16500 },
  { month: "Jun", budget: 16000, expenses: 14800 },
  { month: "Jul", budget: 19000, expenses: 17000 },
];

function mapActivityType(entityType: string): { type: string; amount: number } {
  switch (entityType) {
    case "transaction":
      return { type: "income", amount: 2500 };
    case "maintenance":
      return { type: "expense", amount: -850 };
    case "announcement":
    case "vendor":
    case "document":
    case "building":
      return { type: "poll", amount: 0 };
    default:
      return { type: "income", amount: 0 };
  }
}

export default function DashboardPage() {
  const t = useTranslations("dashboard");
  const locale = useLocale();
  const { data: summary, isLoading: summaryLoading } = useDashboardSummary();
  const { data: transactions, isLoading: txLoading } = useRecentTransactions();
  const { data: activity, isLoading: actLoading } = useRecentActivity();

  const transactionColumns: DataTableColumn<RecentTransaction>[] = [
    {
      key: "createdAt",
      label: t("date"),
      render: (value) =>
        new Date(String(value)).toLocaleDateString(locale === "ar" ? "ar-SA" : "en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        }),
    },
    { key: "description", label: t("description") },
    {
      key: "category",
      label: t("category"),
      render: (value) => (
        <span className="inline-flex items-center rounded-full bg-blue-50 dark:bg-blue-900/30 px-2.5 py-0.5 text-xs font-medium text-blue-700 dark:text-blue-400">
          {String(value)}
        </span>
      ),
    },
    {
      key: "amount",
      label: t("amount"),
      render: (value) => `$${Number(value).toLocaleString()}`,
    },
    {
      key: "status",
      label: t("status"),
      render: (value) => (
        <StatusBadge status={String(value).toLowerCase() as "paid" | "pending"} />
      ),
    },
  ];

  return (
    <div>
      <PageHeader
        title={t("title")}
        subtitle={t("subtitle")}
      />

      {/* Stat Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
        {summaryLoading ? (
          <>
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-28 animate-pulse rounded-lg bg-gray-100 dark:bg-gray-700" />
            ))}
          </>
        ) : (
          <>
            <StatCard
              title={t("totalBudget")}
              value={`$${(summary?.totalBudget || 0).toLocaleString()}`}
              icon={<DollarSign className="h-5 w-5" />}
              variant="success"
            />
            <StatCard
              title={t("totalExpenses")}
              value={`$${(summary?.totalExpenses || 0).toLocaleString()}`}
              icon={<TrendingDown className="h-5 w-5" />}
              variant="warning"
            />
            <StatCard
              title={t("openRequests")}
              value={summary?.openRequests || 0}
              icon={<AlertCircle className="h-5 w-5" />}
            />
            <StatCard
              title={t("feeCollection")}
              value={`$${(summary?.feeCollection || 0).toLocaleString()}`}
              icon={<Clock className="h-5 w-5" />}
              change={`$${(summary?.pendingFees || 0).toLocaleString()} ${t("pending")}`}
              changeType="down"
            />
          </>
        )}
      </div>

      {/* Budget Chart + Recent Activity (matches Figma layout) */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_340px] mb-6">
        <BudgetChart data={chartData} />
        {actLoading ? (
          <div className="rounded-lg bg-white dark:bg-gray-900 p-5 shadow-sm dark:shadow-gray-900/30 border border-gray-100 dark:border-gray-800">
            <div className="space-y-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-10 animate-pulse rounded bg-gray-100 dark:bg-gray-700" />
              ))}
            </div>
          </div>
        ) : (
          <RecentActivity
            items={(activity || []).slice(0, 5).map((a) => {
              const mapped = mapActivityType(a.entityType);
              return {
                id: a.id,
                label: a.action,
                date: new Date(a.createdAt).toLocaleDateString(
                  locale === "ar" ? "ar-SA" : "en-US",
                  { day: "numeric", month: "long", year: "numeric" }
                ),
                amount: mapped.amount,
                type: mapped.type,
              };
            })}
          />
        )}
      </div>

      {/* Recent Transactions + Mini Calendar */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_340px]">
        <div className="rounded-lg bg-white dark:bg-gray-900 p-5 shadow-sm dark:shadow-gray-900/30 border border-gray-100 dark:border-gray-800">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-[#1E3A5F] dark:text-white">
              {t("recentTransactions")}
            </h3>
            <Link
              href={`/${locale}/maintenance`}
              className="text-sm font-medium text-[#1E40AF] hover:underline"
            >
              {t("more")}
            </Link>
          </div>
          {txLoading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-10 animate-pulse rounded bg-gray-100 dark:bg-gray-700" />
              ))}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <DataTable<RecentTransaction>
                columns={transactionColumns}
                data={transactions || []}
              />
            </div>
          )}
        </div>
        <MiniCalendar />
      </div>
    </div>
  );
}
