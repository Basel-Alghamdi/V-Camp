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
import RecentActivity from "@/components/dashboard/RecentActivity";
import MiniCalendar from "@/components/dashboard/MiniCalendar";
import {
  useDashboardSummary,
  useRecentTransactions,
  useRecentActivity,
  type RecentTransaction,
} from "@/hooks/use-dashboard";

const transactionColumns: DataTableColumn<RecentTransaction>[] = [
  {
    key: "createdAt",
    label: "Date",
    render: (value) =>
      new Date(String(value)).toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }),
  },
  { key: "description", label: "Description" },
  {
    key: "category",
    label: "Category",
    render: (value) => (
      <span className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700">
        {String(value)}
      </span>
    ),
  },
  {
    key: "amount",
    label: "Amount",
    render: (value) => `$${Number(value).toLocaleString()}`,
  },
  {
    key: "status",
    label: "Status",
    render: (value) => (
      <StatusBadge status={String(value).toLowerCase() as "paid" | "pending"} />
    ),
  },
];

export default function DashboardPage() {
  const { data: summary, isLoading: summaryLoading } = useDashboardSummary();
  const { data: transactions, isLoading: txLoading } = useRecentTransactions();
  const { data: activity, isLoading: actLoading } = useRecentActivity();

  return (
    <div>
      <PageHeader
        title="Overview"
        subtitle="Building financial and operational summary"
      />

      {/* Stat Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
        {summaryLoading ? (
          <>
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-28 animate-pulse rounded-lg bg-gray-100" />
            ))}
          </>
        ) : (
          <>
            <StatCard
              title="Total Budget"
              value={`$${(summary?.totalBudget || 0).toLocaleString()}`}
              icon={<DollarSign className="h-5 w-5" />}
              variant="success"
            />
            <StatCard
              title="Total Expenses"
              value={`$${(summary?.totalExpenses || 0).toLocaleString()}`}
              icon={<TrendingDown className="h-5 w-5" />}
              variant="warning"
            />
            <StatCard
              title="Open Requests"
              value={summary?.openRequests || 0}
              icon={<AlertCircle className="h-5 w-5" />}
            />
            <StatCard
              title="Fee Collection"
              value={`$${(summary?.feeCollection || 0).toLocaleString()}`}
              icon={<Clock className="h-5 w-5" />}
              change={`$${(summary?.pendingFees || 0).toLocaleString()} pending`}
              changeType="down"
            />
          </>
        )}
      </div>

      {/* Activity */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_380px] mb-6">
        <div className="rounded-lg bg-white p-5 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-[#1E3A5F]">
              Recent transaction
            </h3>
            <Link
              href="/maintenance"
              className="text-sm font-medium text-[#1E40AF] hover:underline"
            >
              More
            </Link>
          </div>
          {txLoading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-10 animate-pulse rounded bg-gray-100" />
              ))}
            </div>
          ) : (
            <DataTable<RecentTransaction>
              columns={transactionColumns}
              data={transactions || []}
            />
          )}
        </div>
        <div className="space-y-6">
          {actLoading ? (
            <div className="rounded-lg bg-white p-5 shadow-sm border border-gray-100">
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-10 animate-pulse rounded bg-gray-100" />
                ))}
              </div>
            </div>
          ) : (
            <RecentActivity
              items={(activity || []).map((a) => ({
                id: a.id,
                label: a.action,
                date: new Date(a.createdAt).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                }),
                amount: 0,
                type: "income" as const,
              }))}
            />
          )}
          <MiniCalendar />
        </div>
      </div>
    </div>
  );
}
