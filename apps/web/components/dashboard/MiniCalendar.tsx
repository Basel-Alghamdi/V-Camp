"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const MONTHS = [
  "JANUARI", "FEBRUARI", "MARCH", "APRIL", "MAY", "JUNE",
  "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER",
];
const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function MiniCalendar() {
  const [month, setMonth] = useState(0); // January
  const [year, setYear] = useState(2023);

  // Get first day of month (0=Sun) and total days
  const firstDay = new Date(year, month, 1).getDay();
  // Convert so Mon=0
  const startOffset = firstDay === 0 ? 6 : firstDay - 1;
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  function prev() {
    if (month === 0) {
      setMonth(11);
      setYear(year - 1);
    } else {
      setMonth(month - 1);
    }
  }

  function next() {
    if (month === 11) {
      setMonth(0);
      setYear(year + 1);
    } else {
      setMonth(month + 1);
    }
  }

  const cells: (number | null)[] = [];
  for (let i = 0; i < startOffset; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  return (
    <div className="rounded-lg bg-white p-4 shadow-sm border border-gray-100">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-bold text-[#1E3A5F]">
          {MONTHS[month]} {year}
        </h3>
        <div className="flex items-center gap-1">
          <button
            onClick={prev}
            className="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={next}
            className="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7 gap-1 mb-1">
        {DAYS.map((d) => (
          <div
            key={d}
            className="text-center text-[10px] font-medium text-gray-400 py-1"
          >
            {d}
          </div>
        ))}
      </div>

      {/* Day numbers */}
      <div className="grid grid-cols-7 gap-1">
        {cells.map((day, i) => (
          <div
            key={i}
            className={`flex h-7 w-7 items-center justify-center rounded text-xs mx-auto ${
              day
                ? "text-gray-700 hover:bg-blue-50 cursor-pointer"
                : ""
            }`}
          >
            {day}
          </div>
        ))}
      </div>
    </div>
  );
}
