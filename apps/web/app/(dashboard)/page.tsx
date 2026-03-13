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
  useMonthlyChartData,
  useRecentTransactions,
  useRecentActivity,
  type RecentTransaction,
} from "@/hooks/use-dashboard";

const transactionColumns: DataTableColumn<RecentTransaction>[] = [
  { key: "date", label: "Date" },
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
      <StatusBadge status={value as "paid" | "pending"} />
    ),
  },
];

export default function DashboardPage() {
  const { data: summary } = useDashboardSummary();
  const { data: chartData } = useMonthlyChartData();
  const { data: transactions } = useRecentTransactions();
  const { data: activity } = useRecentActivity();

  return (
    <div>
      <PageHeader
        title="Overview"
        subtitle="Building financial and operational summary"
      />

      {/* Stat Cards — 4 column grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
        <StatCard
          title="Total Budget"
          value={`$${summary.totalBudget.toLocaleString()}`}
          icon={<DollarSign className="h-5 w-5" />}
          change={`${summary.budgetChangePercent}`}
          changeType="up"
          variant="success"
        />
        <StatCard
          title="Total Expenses"
          value={`$${summary.totalExpenses.toLocaleString()}`}
          icon={<TrendingDown className="h-5 w-5" />}
          change={`${summary.totalTransactions} Transaction`}
          variant="warning"
        />
        <StatCard
          title="Open Request"
          value={summary.openRequests}
          icon={<AlertCircle className="h-5 w-5" />}
          change={`${summary.completedRequests} completed`}
          changeType="up"
        />
        <StatCard
          title="Fee collection"
          value={summary.feeCollection.toLocaleString()}
          icon={<Clock className="h-5 w-5" />}
          change={`${summary.pendingFees.toLocaleString()}$ pending`}
          changeType="down"
        />
      </div>

      {/* Chart + Activity — two column */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_380px] mb-6">
        <BudgetChart data={chartData} />
        <RecentActivity items={activity} />
      </div>

      {/* Transactions + Calendar — two column */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_380px]">
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
          <DataTable<RecentTransaction>
            columns={transactionColumns}
            data={transactions}
          />
        </div>
        <MiniCalendar />
      </div>
    </div>
  );
}
