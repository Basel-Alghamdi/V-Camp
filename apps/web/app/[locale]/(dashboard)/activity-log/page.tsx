"use client";

import React, { useState } from "react";
import {
  DollarSign,
  Wrench,
  Megaphone,
  Users,
  FileText,
  User,
  Search,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { PageHeader } from "@owners-platform/ui";
import {
  useActivityLog,
  type ActivityFilters,
  type IconType,
  type IconColor,
} from "@/hooks/use-activity";
import { useTranslations, useLocale } from "next-intl";

const iconMap: Record<IconType, React.ElementType> = {
  dollar: DollarSign,
  wrench: Wrench,
  megaphone: Megaphone,
  users: Users,
  file: FileText,
  user: User,
};

const colorMap: Record<IconColor, { bg: string; text: string }> = {
  green: { bg: "bg-green-50 dark:bg-green-900/30", text: "text-green-600 dark:text-green-400" },
  blue: { bg: "bg-blue-50 dark:bg-blue-900/30", text: "text-blue-600 dark:text-blue-400" },
  purple: { bg: "bg-purple-50 dark:bg-purple-900/30", text: "text-purple-600 dark:text-purple-400" },
  amber: { bg: "bg-amber-50 dark:bg-amber-900/30", text: "text-amber-600 dark:text-amber-400" },
  gray: { bg: "bg-gray-100 dark:bg-gray-700", text: "text-gray-500 dark:text-gray-400" },
  teal: { bg: "bg-teal-50 dark:bg-teal-900/30", text: "text-teal-600 dark:text-teal-400" },
};

export default function ActivityLogPage() {
  const t = useTranslations("activity");
  const locale = useLocale();

  const typeOptions = [
    { value: "All", label: t("all") },
    { value: "transaction", label: t("transaction") },
    { value: "maintenance", label: t("maintenance") },
    { value: "announcement", label: t("announcement") },
    { value: "vendor", label: t("vendor") },
    { value: "document", label: t("document") },
    { value: "user", label: t("user") },
  ];

  const [filters, setFilters] = useState<ActivityFilters>({
    search: "",
    type: "All",
    dateFrom: "",
    dateTo: "",
  });
  const [page, setPage] = useState(1);
  const perPage = 8;

  const { data: entries, total, isLoading } = useActivityLog(filters);

  const paginatedEntries = entries.slice((page - 1) * perPage, page * perPage);
  const totalPages = Math.ceil(entries.length / perPage);
  const startItem = entries.length > 0 ? (page - 1) * perPage + 1 : 0;
  const endItem = Math.min(page * perPage, entries.length);

  return (
    <div>
      <PageHeader
        title={t("title")}
        subtitle={t("subtitle")}
      />

      {/* Filter Bar */}
      <div className="flex flex-wrap items-end gap-4 mb-6">
        <div className="flex-1 min-w-[220px]">
          <label className="block text-xs font-medium uppercase text-gray-500 dark:text-gray-400 mb-1">
            {t("search")}
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
            <input
              type="text"
              placeholder={t("searchPlaceholder")}
              value={filters.search}
              onChange={(e) =>
                setFilters((f) => ({ ...f, search: e.target.value }))
              }
              className="w-full rounded-md border border-gray-300 dark:border-gray-600 py-2 pl-10 pr-3 text-sm placeholder-gray-400 dark:placeholder-gray-500 dark:bg-gray-900 dark:text-gray-100 focus:border-[#1E40AF] focus:outline-none focus:ring-1 focus:ring-[#1E40AF]"
            />
          </div>
        </div>

        <div className="w-40">
          <label className="block text-xs font-medium uppercase text-gray-500 dark:text-gray-400 mb-1">
            {t("type")}
          </label>
          <select
            value={filters.type}
            onChange={(e) =>
              setFilters((f) => ({ ...f, type: e.target.value }))
            }
            className="w-full rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 text-sm text-gray-700 dark:text-gray-200 dark:bg-gray-900 focus:border-[#1E40AF] focus:outline-none focus:ring-1 focus:ring-[#1E40AF]"
          >
            {typeOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        <div className="w-40">
          <label className="block text-xs font-medium uppercase text-gray-500 dark:text-gray-400 mb-1">
            {t("from")}
          </label>
          <input
            type="date"
            value={filters.dateFrom}
            onChange={(e) =>
              setFilters((f) => ({ ...f, dateFrom: e.target.value }))
            }
            className="w-full rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 text-sm text-gray-700 dark:text-gray-200 dark:bg-gray-900 focus:border-[#1E40AF] focus:outline-none focus:ring-1 focus:ring-[#1E40AF]"
          />
        </div>

        <div className="w-40">
          <label className="block text-xs font-medium uppercase text-gray-500 dark:text-gray-400 mb-1">
            {t("to")}
          </label>
          <input
            type="date"
            value={filters.dateTo}
            onChange={(e) =>
              setFilters((f) => ({ ...f, dateTo: e.target.value }))
            }
            className="w-full rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 text-sm text-gray-700 dark:text-gray-200 dark:bg-gray-900 focus:border-[#1E40AF] focus:outline-none focus:ring-1 focus:ring-[#1E40AF]"
          />
        </div>
      </div>

      {/* Activity Timeline */}
      <div className="rounded-lg bg-white dark:bg-gray-900 shadow-sm dark:shadow-gray-900/30 border border-gray-100 dark:border-gray-800">
        {isLoading ? (
          <div className="space-y-1 p-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-14 animate-pulse rounded bg-gray-100 dark:bg-gray-700" />
            ))}
          </div>
        ) : paginatedEntries.length === 0 ? (
          <div className="px-6 py-16 text-center text-gray-400 dark:text-gray-500">
            {t("noActivity")}
          </div>
        ) : (
          <div className="divide-y divide-gray-50 dark:divide-gray-800">
            {paginatedEntries.map((entry) => {
              const Icon = iconMap[entry.icon];
              const colors = colorMap[entry.color];

              return (
                <div
                  key={entry.id}
                  className="flex items-center gap-4 px-5 py-4"
                >
                  {/* Icon */}
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${colors.bg}`}
                  >
                    <Icon className={`h-5 w-5 ${colors.text}`} />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800 dark:text-gray-100">
                      {entry.action}
                    </p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs text-gray-400 dark:text-gray-500">
                        {entry.user.name}
                      </span>
                      <span className="text-xs text-gray-300 dark:text-gray-600">&middot;</span>
                      <span className="text-xs text-gray-400 dark:text-gray-500">
                        {entry.user.role}
                      </span>
                    </div>
                  </div>

                  {/* Date */}
                  <div className="shrink-0 text-right">
                    <p className="text-xs text-gray-400 dark:text-gray-500">
                      {new Date(entry.createdAt).toLocaleDateString(locale === "ar" ? "ar-SA" : "en-US", {
                        month: "short",
                        day: "2-digit",
                        year: "numeric",
                      })}
                    </p>
                    <p className="text-xs text-gray-300 dark:text-gray-600">
                      {new Date(entry.createdAt).toLocaleTimeString(locale === "ar" ? "ar-SA" : "en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Pagination */}
        {entries.length > 0 && (
          <div className="flex items-center justify-between border-t border-gray-100 dark:border-gray-800 px-5 py-3">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {t("showing")} {startItem}-{String(endItem).padStart(2, "0")} {t("of")} {total}
            </p>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page <= 1}
                className="rounded p-1.5 text-gray-400 dark:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-600 dark:hover:text-gray-300 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page >= totalPages}
                className="rounded p-1.5 text-gray-400 dark:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-600 dark:hover:text-gray-300 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
