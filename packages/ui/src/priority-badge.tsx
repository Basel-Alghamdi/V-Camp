"use client";

import React from "react";

export type PriorityType = "low" | "medium" | "high";

export interface PriorityBadgeProps {
  priority: PriorityType;
}

const priorityStyles: Record<PriorityType, string> = {
  high: "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400",
  medium: "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400",
  low: "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300",
};

const priorityLabels: Record<PriorityType, string> = {
  high: "High",
  medium: "Medium",
  low: "Low",
};

export function PriorityBadge({ priority }: PriorityBadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${priorityStyles[priority]}`}
    >
      {priorityLabels[priority]}
    </span>
  );
}
