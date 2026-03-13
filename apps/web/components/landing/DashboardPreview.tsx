"use client";

import { useState } from "react";
import { Megaphone, Users, FileText } from "lucide-react";

const tabs = ["Overview", "Announcements", "Service Provider", "Documents"] as const;
type Tab = (typeof tabs)[number];

const tableRows = [
  { date: "Mar 12, 2026", description: "Monthly Maintenance Fee", amount: "$1,200.00", status: "Completed" },
  { date: "Mar 10, 2026", description: "Elevator Repair", amount: "$3,450.00", status: "Pending" },
  { date: "Mar 08, 2026", description: "Cleaning Service", amount: "$800.00", status: "Completed" },
];

const tabIcons: Record<string, React.ReactNode> = {
  Announcements: <Megaphone className="w-8 h-8 text-gray-300 mr-3" />,
  "Service Provider": <Users className="w-8 h-8 text-gray-300 mr-3" />,
  Documents: <FileText className="w-8 h-8 text-gray-300 mr-3" />,
};

export default function DashboardPreview() {
  const [activeTab, setActiveTab] = useState<Tab>("Overview");

  return (
    <section id="dashboard-preview" className="bg-white py-20 px-6">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <p className="text-sm font-semibold text-[#008080] uppercase tracking-wider">
          Product Preview
        </p>
        <h2 className="mt-3 text-3xl lg:text-4xl font-bold text-[#1E3A5F]">
          A dashboard for every workflow
        </h2>
        <p className="mt-4 text-gray-500">
          Explore the core modules that power community management at scale.
        </p>
      </div>

      {/* Tab bar */}
      <div className="max-w-2xl mx-auto flex justify-center gap-2 mb-8">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
              activeTab === tab
                ? "bg-[#1E40AF] text-white"
                : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content area */}
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl border border-gray-100 p-8 min-h-[400px]">
        {activeTab === "Overview" ? (
          <>
            {/* Stat cards */}
            <div className="grid grid-cols-4 gap-4 mb-6">
              {[
                { label: "Total Revenue", value: "$45,231" },
                { label: "Active Users", value: "2,350" },
                { label: "Growth", value: "+12.5%" },
                { label: "Tickets", value: "573" },
              ].map((stat) => (
                <div key={stat.label} className="bg-gray-50 rounded-lg p-4">
                  <p className="text-xs text-gray-500">{stat.label}</p>
                  <p className="text-xl font-bold text-[#1E3A5F]">{stat.value}</p>
                </div>
              ))}
            </div>

            {/* Chart placeholder */}
            <div className="h-48 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg flex items-center justify-center text-gray-400 text-sm">
              Revenue Chart
            </div>

            {/* Table */}
            <div className="mt-6">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Date</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Description</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Amount</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {tableRows.map((row, i) => (
                    <tr key={i} className="border-b border-gray-100">
                      <td className="py-3 px-4 text-gray-600">{row.date}</td>
                      <td className="py-3 px-4 text-gray-800">{row.description}</td>
                      <td className="py-3 px-4 text-gray-800">{row.amount}</td>
                      <td className="py-3 px-4">
                        <span
                          className={`text-xs font-medium px-2 py-1 rounded-full ${
                            row.status === "Completed"
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center min-h-[400px]">
            {tabIcons[activeTab]}
            <span className="text-lg text-gray-400">{activeTab} Module Preview</span>
          </div>
        )}
      </div>
    </section>
  );
}
