"use client";

import { useState } from "react";
import { Megaphone, FileText, Star, Calendar, Download } from "lucide-react";
import { useTranslations } from "next-intl";

const maintenanceRows = [
  { date: "Mar 12, 2026", description: "Pool Maintenance", assignee: "Pool Administration", status: "Completed" },
  { date: "Mar 10, 2026", description: "Fire Administration", assignee: "Ansari Maintenance", status: "Paid Maintenance" },
  { date: "Mar 08, 2026", description: "Cleaning Service", assignee: "Eagle Maintenance", status: "Completed" },
  { date: "Mar 06, 2026", description: "Garden Maintenance", assignee: "Garden Maintenance", status: "Pending" },
];

const announcementRows = [
  { title: "Annual General Meeting", priority: "HIGH", date: "Mar 14, 2026", description: "All owners are invited to attend the AGM on March 20th at the community hall." },
  { title: "Pool Maintenance Schedule", priority: "MEDIUM", date: "Mar 11, 2026", description: "The pool will be closed for maintenance from March 15-17." },
  { title: "New Parking Policy", priority: "LOW", date: "Mar 08, 2026", description: "Updated parking regulations will take effect starting April 1st." },
];

const vendorRows = [
  { name: "Eagle Maintenance", category: "Cleaning", rating: 4.8, email: "eagle@maintenance.com", phone: "+966 50 123 4567" },
  { name: "Ansari Services", category: "Electrical", rating: 4.5, email: "info@ansari.com", phone: "+966 50 234 5678" },
  { name: "Green Gardens", category: "Plumbing", rating: 4.2, email: "hello@greengardens.sa", phone: "+966 50 345 6789" },
];

const documentRows = [
  { name: "Q1 Financial Report.pdf", category: "Report", size: "2.4 MB", date: "Mar 12, 2026" },
  { name: "Vendor Contract - Eagle.pdf", category: "Contract", size: "1.1 MB", date: "Mar 10, 2026" },
  { name: "Invoice #2024-032.pdf", category: "Invoice", size: "340 KB", date: "Mar 08, 2026" },
  { name: "Insurance Policy.pdf", category: "Other", size: "5.2 MB", date: "Mar 05, 2026" },
];

const priorityColors: Record<string, string> = {
  HIGH: "bg-red-100 text-red-700",
  MEDIUM: "bg-amber-100 text-amber-700",
  LOW: "bg-gray-100 text-gray-600",
};

const categoryColors: Record<string, string> = {
  Report: "bg-rose-50 text-rose-700",
  Contract: "bg-amber-50 text-amber-700",
  Invoice: "bg-green-50 text-green-700",
  Other: "bg-gray-50 text-gray-600",
};

export default function DashboardPreview() {
  const t = useTranslations("landing");
  const tn = useTranslations("nav");

  const tabs = [tn("maintenance"), tn("announcements"), tn("serviceProviders"), tn("documents")] as const;
  type Tab = (typeof tabs)[number];

  const [activeTab, setActiveTab] = useState<Tab>(tabs[0]);

  return (
    <section id="dashboard-preview" className="bg-white py-20 px-6">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <p className="text-sm font-semibold text-[#1E40AF] uppercase tracking-wider">
          {t("previewEyebrow")}
        </p>
        <h2 className="mt-3 text-3xl lg:text-4xl font-bold text-[#1E3A5F]">
          {t("previewTitle1")} <span className="text-[#1E40AF]">{t("previewTitle2")}</span>
        </h2>
        <p className="mt-4 text-gray-500">
          {t("previewSubtitle")}
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

        {/* Maintenance Tab */}
        {activeTab === tabs[0] && (
          <>
            <div className="flex items-center justify-between px-8 pt-8 pb-4">
              <h3 className="text-lg font-semibold text-[#1E3A5F]">{tn("maintenance")}</h3>
              <button className="text-sm font-medium text-[#1E40AF] border border-[#1E40AF] rounded-lg px-4 py-2 hover:bg-blue-50 transition">
                {t("previewLiveReport")}
              </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 px-8 pb-6">
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
            <div className="px-8 pb-8 overflow-x-auto">
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
        )}

        {/* Announcements Tab */}
        {activeTab === tabs[1] && (
          <>
            <div className="flex items-center justify-between px-8 pt-8 pb-4">
              <h3 className="text-lg font-semibold text-[#1E3A5F]">{tn("announcements")}</h3>
              <button className="text-sm font-medium text-white bg-[#1E40AF] rounded-lg px-4 py-2 hover:bg-[#1a3899] transition">
                + {t("previewNewAnnouncement")}
              </button>
            </div>
            <div className="px-8 pb-8 space-y-4">
              {announcementRows.map((row, i) => (
                <div
                  key={i}
                  className={`rounded-lg border border-gray-100 p-5 ${
                    row.priority === "HIGH" ? "border-l-[3px] border-l-red-500" : ""
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Megaphone className="h-4 w-4 text-[#1E40AF] shrink-0" />
                    <h4 className="text-sm font-semibold text-[#1E3A5F]">{row.title}</h4>
                    <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${priorityColors[row.priority]}`}>
                      {row.priority}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed">{row.description}</p>
                  <div className="flex items-center gap-1.5 mt-3 text-xs text-gray-400">
                    <Calendar className="h-3 w-3" />
                    {row.date}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Service Providers Tab */}
        {activeTab === tabs[2] && (
          <>
            <div className="flex items-center justify-between px-8 pt-8 pb-4">
              <h3 className="text-lg font-semibold text-[#1E3A5F]">{tn("serviceProviders")}</h3>
            </div>
            <div className="px-8 pb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
              {vendorRows.map((vendor, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-gray-100 p-5 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="text-sm font-semibold text-[#1E3A5F]">{vendor.name}</h4>
                    <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                      {vendor.category}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 mb-3">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        className={`h-3.5 w-3.5 ${
                          s <= Math.round(vendor.rating)
                            ? "fill-amber-400 text-amber-400"
                            : "text-gray-200"
                        }`}
                      />
                    ))}
                    <span className="text-xs text-gray-400 ms-1">{vendor.rating}</span>
                  </div>
                  <div className="space-y-1.5 text-xs text-gray-500">
                    <p>{vendor.email}</p>
                    <p>{vendor.phone}</p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Documents Tab */}
        {activeTab === tabs[3] && (
          <>
            <div className="flex items-center justify-between px-8 pt-8 pb-4">
              <h3 className="text-lg font-semibold text-[#1E3A5F]">{tn("documents")}</h3>
              <button className="text-sm font-medium text-white bg-[#1E40AF] rounded-lg px-4 py-2 hover:bg-[#1a3899] transition">
                + {t("previewUploadDoc")}
              </button>
            </div>
            <div className="px-8 pb-8 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-500 text-xs uppercase">Name</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-500 text-xs uppercase">Category</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-500 text-xs uppercase">Size</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-500 text-xs uppercase">Date</th>
                    <th className="py-3 px-4 w-10" />
                  </tr>
                </thead>
                <tbody>
                  {documentRows.map((row, i) => (
                    <tr key={i} className="border-b border-gray-50">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-gray-400 shrink-0" />
                          <span className="text-gray-800 font-medium">{row.name}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${categoryColors[row.category]}`}>
                          {row.category}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-gray-500">{row.size}</td>
                      <td className="py-3 px-4 text-gray-500">{row.date}</td>
                      <td className="py-3 px-4">
                        <Download className="h-4 w-4 text-gray-400 hover:text-[#1E40AF] cursor-pointer transition-colors" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

      </div>
    </section>
  );
}
