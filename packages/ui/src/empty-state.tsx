"use client";

import React from "react";

export interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  action?: React.ReactNode;
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="mb-4 text-gray-300 dark:text-gray-600">{icon}</div>
      <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">{title}</h3>
      <p className="mt-1 text-sm text-gray-400 dark:text-gray-500 text-center max-w-sm">
        {description}
      </p>
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
