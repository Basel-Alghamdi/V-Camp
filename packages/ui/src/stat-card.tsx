"use client";

import React from "react";

export interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  change?: string;
  changeType?: "up" | "down";
  variant?: "default" | "warning" | "success";
}

const variantIconBg: Record<string, string> = {
  default: "bg-blue-50 dark:bg-blue-900/30 text-[var(--color-action)]",
  warning: "bg-amber-50 dark:bg-amber-900/30 text-[var(--color-warning)]",
  success: "bg-green-50 dark:bg-green-900/30 text-[var(--color-success)]",
};

export function StatCard({
  title,
  value,
  icon,
  change,
  changeType,
  variant = "default",
}: StatCardProps) {
  return (
    <div className="relative flex flex-col justify-between rounded-lg bg-white dark:bg-gray-900 p-3 sm:p-5 shadow-sm dark:shadow-gray-900/30 border border-gray-100 dark:border-gray-800">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
          <p className="mt-1 text-xl sm:text-2xl font-bold text-[var(--color-primary)]">
            {value}
          </p>
        </div>
        <div
          className={`flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full ${variantIconBg[variant]}`}
        >
          {icon}
        </div>
      </div>

      {change && (
        <div className="mt-3">
          <span
            className={`inline-flex items-center text-xs font-medium ${
              changeType === "up"
                ? "text-[var(--color-success)]"
                : changeType === "down"
                  ? "text-[var(--color-error)]"
                  : "text-gray-500"
            }`}
          >
            {changeType === "up" && (
              <svg
                className="mr-1 h-3 w-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 15l7-7 7 7"
                />
              </svg>
            )}
            {changeType === "down" && (
              <svg
                className="mr-1 h-3 w-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            )}
            {change}
          </span>
        </div>
      )}
    </div>
  );
}
