"use client";

import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface MonthlyDataPoint {
  month: string;
  budget: number;
  expenses: number;
}

interface BudgetChartProps {
  data: MonthlyDataPoint[];
}

function formatYAxis(value: number) {
  if (value === 0) return "0";
  return `${value / 1000}K`;
}

export default function BudgetChart({ data }: BudgetChartProps) {
  return (
    <div className="rounded-lg bg-white dark:bg-gray-900 p-5 shadow-sm dark:shadow-gray-900/30 border border-gray-100 dark:border-gray-800">
      <div className="mb-4 flex items-center gap-6">
        <h3 className="text-sm font-semibold text-[#1E3A5F] dark:text-white">
          Monthly Budget vs. Actual expenses
        </h3>
        <div className="flex items-center gap-4 ml-auto">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#1E3A5F]" />
            <span className="text-xs text-gray-500 dark:text-gray-400">Budget</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#93C5FD]" />
            <span className="text-xs text-gray-500 dark:text-gray-400">expenses</span>
          </div>
        </div>
      </div>

      <div className="h-48 sm:h-64 lg:h-72">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
          <defs>
            <linearGradient id="budgetGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#1E3A5F" stopOpacity={0.1} />
              <stop offset="95%" stopColor="#1E3A5F" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" vertical={false} />
          <XAxis
            dataKey="month"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: "#9CA3AF" }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tickFormatter={formatYAxis}
            tick={{ fontSize: 12, fill: "#9CA3AF" }}
            domain={[0, 30000]}
            ticks={[0, 10000, 20000, 30000]}
          />
          <Tooltip
            contentStyle={{
              borderRadius: 8,
              border: "1px solid #E5E7EB",
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            }}
            formatter={(value) => [`$${Number(value).toLocaleString()}`]}
          />
          <Legend content={() => null} />
          <Area
            type="monotone"
            dataKey="budget"
            stroke="#1E3A5F"
            strokeWidth={2}
            fill="url(#budgetGradient)"
            dot={false}
          />
          <Area
            type="monotone"
            dataKey="expenses"
            stroke="#93C5FD"
            strokeWidth={2}
            strokeDasharray="6 4"
            fill="transparent"
            dot={false}
          />
        </AreaChart>
      </ResponsiveContainer>
      </div>
    </div>
  );
}
