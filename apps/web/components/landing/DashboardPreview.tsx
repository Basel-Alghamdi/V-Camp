"use client";

import { useState } from "react";
import { Megaphone, Users, FileText } from "lucide-react";

const tabs = ["Maintenance", "Announcements", "Service Providers", "Documents"] as const;
type Tab = (typeof tabs)[number];

const maintenanceRows = [
  { date: "Mar 12, 2026", description: "Pool Maintenance", assignee: "Pool Administration", status: "Completed", priority: "High" },
  { date: "Mar 10, 2026", description: "Fire Administration", assignee: "Ansari Maintenance", status: "Paid Maintenance", priority: "Medium" },
  { date: "Mar 08, 2026", description: "Cleaning Service", assignee: "Eagle Maintenance", status: "Completed", priority: "Low" },
  { date: "Mar 06, 2026", description: "Garden Maintenance", assignee: "Garden Maintenance", status: "Pending", priority: "Medium" },
];

const tabIcons: Record<string, React.ReactNode> = {
  Announcements: <Megaphone className="w-8 h-8 text-gray-300 mr-3" />,
  "Service Providers": <Users className="w-8 h-8 text-gray-300 mr-3" />,
  Documents: <FileText className="w-8 h-8 text-gray-300 mr-3" />,
};

export default function DashboardPreview() {
  const [activeTab, setActiveTab] = useState<Tab>("Maintenance");

  return (
    <section id="dashboard-preview" className="bg-white py-20 px-6">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <p className="text-sm font-semibold text-[#1E40AF] uppercase tracking-wider">
          Product Preview
        </p>
        <h2 className="mt-3 text-3xl lg:text-4xl font-bold text-[#1E3A5F]">
          A dashboard for <span className="text-[#1E40AF]">every workflow</span>
        </h2>
        <p className="mt-4 text-gray-500">
          Explore the core modules that power community management at scale.
        </p>
      </div>

      {/* Tab bar */}
      <div className="max-w-3xl mx-auto flex flex-wrap justify-center gap-2 mb-8">
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
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        {activeTab === "Maintenance" ? (
          <>
            {/* Header */}
            <div className="flex items-center justify-between px-8 pt-8 pb-4">
              <h3 className="text-lg font-semibold text-[#1E3A5F]">Maintenance</h3>
              <button className="text-sm font-medium text-[#1E40AF] border border-[#1E40AF] rounded-lg px-4 py-2 hover:bg-blue-50 transition">
                Live Report
              </button>
            </div>

            {/* Stat cards */}
            <div className="grid grid-cols-4 gap-4 px-8 pb-6">
              {[
                { label: "connected", value: "2" },
                { label: "total", value: "13" },
                { label: "active", value: "3" },
                { label: "resolved", value: "2" },
              ].map((stat) => (
                <div key={stat.label} className="bg-gray-50 rounded-xl p-4 text-center">
                  <p className="text-2xl font-bold text-[#1E3A5F]">{stat.value}</p>
                  <p className="text-xs text-gray-400 mt-1 capitalize">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Table */}
            <div className="px-8 pb-8">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-500 text-xs uppercase">Date</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-500 text-xs uppercase">Description</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-500 text-xs uppercase">Assignee</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-500 text-xs uppercase">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {maintenanceRows.map((row, i) => (
                    <tr key={i} className="border-b border-gray-50">
                      <td className="py-3 px-4 text-gray-500">{row.date}</td>
                      <td className="py-3 px-4 text-gray-800 font-medium">{row.description}</td>
                      <td className="py-3 px-4 text-gray-500">{row.assignee}</td>
                      <td className="py-3 px-4">
                        <span
                          className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                            row.status === "Completed"
                              ? "bg-green-100 text-green-700"
                              : row.status === "Pending"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-blue-100 text-blue-700"
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
          <div className="flex items-center justify-center min-h-[400px] p-8">
            {tabIcons[activeTab]}
            <span className="text-lg text-gray-400">{activeTab} Module Preview</span>
          </div>
        )}
      </div>
    </section>
  );
}
