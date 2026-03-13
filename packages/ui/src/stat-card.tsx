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
  default: "bg-blue-50 text-[var(--color-action)]",
  warning: "bg-amber-50 text-[var(--color-warning)]",
  success: "bg-green-50 text-[var(--color-success)]",
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
    <div className="relative flex flex-col justify-between rounded-lg bg-white p-5 shadow-sm border border-gray-100 min-h-[120px]">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <p className="mt-1 text-2xl font-bold text-[var(--color-primary)]">
            {value}
          </p>
        </div>
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-full ${variantIconBg[variant]}`}
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
