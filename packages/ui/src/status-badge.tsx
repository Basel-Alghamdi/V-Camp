"use client";

import React from "react";

export type StatusType =
  | "pending"
  | "in_progress"
  | "completed"
  | "rejected"
  | "paid"
  | "unpaid";

export interface StatusBadgeProps {
  status: StatusType;
}

const statusStyles: Record<StatusType, string> = {
  pending: "bg-amber-50 text-amber-700 border-amber-200",
  in_progress: "bg-blue-50 text-blue-700 border-blue-200",
  completed: "bg-green-50 text-green-700 border-green-200",
  rejected: "bg-red-50 text-red-700 border-red-200",
  paid: "bg-green-50 text-green-700 border-green-200",
  unpaid: "bg-red-50 text-red-700 border-red-200",
};

const statusLabels: Record<StatusType, string> = {
  pending: "Pending",
  in_progress: "In Progress",
  completed: "Completed",
  rejected: "Rejected",
  paid: "Paid",
  unpaid: "Unpaid",
};

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${statusStyles[status]}`}
    >
      {statusLabels[status]}
    </span>
  );
}
