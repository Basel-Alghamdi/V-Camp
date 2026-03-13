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

const iconMap: Record<IconType, React.ElementType> = {
  dollar: DollarSign,
  wrench: Wrench,
  megaphone: Megaphone,
  users: Users,
  file: FileText,
  user: User,
};

const colorMap: Record<IconColor, { bg: string; text: string }> = {
  green: { bg: "bg-green-50", text: "text-green-600" },
  blue: { bg: "bg-blue-50", text: "text-blue-600" },
  purple: { bg: "bg-purple-50", text: "text-purple-600" },
  amber: { bg: "bg-amber-50", text: "text-amber-600" },
  gray: { bg: "bg-gray-100", text: "text-gray-500" },
  teal: { bg: "bg-teal-50", text: "text-teal-600" },
};

const typeOptions = [
  { value: "All", label: "All" },
  { value: "transaction", label: "Transaction" },
  { value: "maintenance", label: "Maintenance" },
  { value: "announcement", label: "Announcement" },
  { value: "vendor", label: "Vendor" },
  { value: "document", label: "Document" },
  { value: "user", label: "User" },
];

export default function ActivityLogPage() {
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
        title="Activity Log"
        subtitle="Full audit trail of all platform actions"
      />

      {/* Filter Bar */}
      <div className="flex flex-wrap items-end gap-4 mb-6">
        <div className="flex-1 min-w-[220px]">
          <label className="block text-xs font-medium uppercase text-gray-500 mb-1">
            Search
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by action or user..."
              value={filters.search}
              onChange={(e) =>
                setFilters((f) => ({ ...f, search: e.target.value }))
              }
              className="w-full rounded-md border border-gray-300 py-2 pl-10 pr-3 text-sm placeholder-gray-400 focus:border-[#1E40AF] focus:outline-none focus:ring-1 focus:ring-[#1E40AF]"
            />
          </div>
        </div>

        <div className="w-40">
          <label className="block text-xs font-medium uppercase text-gray-500 mb-1">
            Type
          </label>
          <select
            value={filters.type}
            onChange={(e) =>
              setFilters((f) => ({ ...f, type: e.target.value }))
            }
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-700 focus:border-[#1E40AF] focus:outline-none focus:ring-1 focus:ring-[#1E40AF]"
          >
            {typeOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        <div className="w-40">
          <label className="block text-xs font-medium uppercase text-gray-500 mb-1">
            From
          </label>
          <input
            type="date"
            value={filters.dateFrom}
            onChange={(e) =>
              setFilters((f) => ({ ...f, dateFrom: e.target.value }))
            }
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-700 focus:border-[#1E40AF] focus:outline-none focus:ring-1 focus:ring-[#1E40AF]"
          />
        </div>

        <div className="w-40">
          <label className="block text-xs font-medium uppercase text-gray-500 mb-1">
            To
          </label>
          <input
            type="date"
            value={filters.dateTo}
            onChange={(e) =>
              setFilters((f) => ({ ...f, dateTo: e.target.value }))
            }
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-700 focus:border-[#1E40AF] focus:outline-none focus:ring-1 focus:ring-[#1E40AF]"
          />
        </div>
      </div>

      {/* Activity Timeline */}
      <div className="rounded-lg bg-white shadow-sm border border-gray-100">
        {isLoading ? (
          <div className="space-y-1 p-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-14 animate-pulse rounded bg-gray-100" />
            ))}
          </div>
        ) : paginatedEntries.length === 0 ? (
          <div className="px-6 py-16 text-center text-gray-400">
            No activity entries found.
          </div>
        ) : (
          <div className="divide-y divide-gray-50">
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
                    <p className="text-sm font-medium text-gray-800">
                      {entry.action}
                    </p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs text-gray-400">
                        {entry.user.name}
                      </span>
                      <span className="text-xs text-gray-300">&middot;</span>
                      <span className="text-xs text-gray-400">
                        {entry.user.role}
                      </span>
                    </div>
                  </div>

                  {/* Date */}
                  <div className="shrink-0 text-right">
                    <p className="text-xs text-gray-400">
                      {new Date(entry.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "2-digit",
                        year: "numeric",
                      })}
                    </p>
                    <p className="text-xs text-gray-300">
                      {new Date(entry.createdAt).toLocaleTimeString("en-US", {
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
          <div className="flex items-center justify-between border-t border-gray-100 px-5 py-3">
            <p className="text-sm text-gray-500">
              Showing {startItem}-{String(endItem).padStart(2, "0")} of {total}
            </p>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page <= 1}
                className="rounded p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page >= totalPages}
                className="rounded p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600 disabled:opacity-40 disabled:cursor-not-allowed"
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
