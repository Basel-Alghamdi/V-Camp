"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { DollarSign, TrendingDown, CheckSquare } from "lucide-react";

interface ActivityDisplayItem {
  id: string;
  label: string;
  date: string;
  amount: number;
  type: string;
}

interface RecentActivityProps {
  items: ActivityDisplayItem[];
}

const iconConfig: Record<
  string,
  { icon: React.ElementType; bg: string; text: string }
> = {
  income: { icon: DollarSign, bg: "bg-green-50 dark:bg-green-900/30", text: "text-green-600" },
  expense: { icon: TrendingDown, bg: "bg-amber-50 dark:bg-amber-900/30", text: "text-amber-600" },
  poll: { icon: CheckSquare, bg: "bg-purple-50 dark:bg-purple-900/30", text: "text-purple-600" },
};

export default function RecentActivity({ items }: RecentActivityProps) {
  const t = useTranslations("dashboard");

  return (
    <div className="rounded-lg bg-white dark:bg-gray-900 p-5 shadow-sm dark:shadow-gray-900/30 border border-gray-100 dark:border-gray-800 h-full">
      <h3 className="mb-4 text-lg font-semibold text-[#1E3A5F] dark:text-white">
        {t("recentActivity")}
      </h3>

      <div className="space-y-4">
        {items.map((item) => {
          const config = iconConfig[item.type] || iconConfig.income;
          const Icon = config.icon;

          return (
            <div key={item.id} className="flex items-center gap-3">
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${config.bg}`}
              >
                <Icon className={`h-5 w-5 ${config.text}`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-800 dark:text-gray-100 truncate">
                  {item.label}
                </p>
                <p className="text-xs text-gray-400 dark:text-gray-500">{item.date}</p>
              </div>
              {item.amount !== 0 && (
                <span
                  className={`text-sm font-semibold whitespace-nowrap ${
                    item.amount > 0 ? "text-green-600" : "text-red-500"
                  }`}
                >
                  {item.amount > 0 ? "+" : ""}${Math.abs(item.amount).toLocaleString()}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
