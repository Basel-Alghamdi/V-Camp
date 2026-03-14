"use client";

import React, { useState } from "react";
import { Search, Plus } from "lucide-react";
import { PageHeader, DataTable } from "@owners-platform/ui";
import type { DataTableColumn } from "@owners-platform/ui";
import {
  useDocuments,
  useUploadDocument,
  useDeleteDocument,
  type Document,
} from "@/hooks/use-documents";
import { useAuthStore } from "@/store/auth.store";
import UploadDocumentModal from "@/components/documents/UploadDocumentModal";
import { useTranslations, useLocale } from "next-intl";

const categoryBadgeColors: Record<string, string> = {
  Invoice: "bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800",
  Contract: "bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800",
  Report: "bg-rose-50 dark:bg-rose-900/30 text-rose-700 dark:text-rose-400 border-rose-200 dark:border-rose-800",
  Vendor: "bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800",
  Other: "bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700",
};

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function DocumentsPage() {
  const t = useTranslations("documents");
  const locale = useLocale();
  const user = useAuthStore((s) => s.user);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [uploadOpen, setUploadOpen] = useState(false);
  const [page, setPage] = useState(1);

  const { data: docsResult, isLoading } = useDocuments(searchQuery, activeCategory, page);
  const uploadMutation = useUploadDocument();
  const deleteMutation = useDeleteDocument();

  const documents = docsResult?.data || [];
  const total = docsResult?.total || 0;

  const canUpload = user?.role !== "VENDOR";

  const columns: DataTableColumn<Document>[] = [
    { key: "name", label: t("documentName") },
    {
      key: "category",
      label: t("category"),
      render: (value) => {
        const cat = String(value);
        return (
          <span
            className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${
              categoryBadgeColors[cat] || categoryBadgeColors.Other
            }`}
          >
            {cat}
          </span>
        );
      },
    },
    { key: "relatedTo", label: t("relatedTo"), render: (value) => String(value || "—") },
    {
      key: "size",
      label: t("size"),
      render: (value) => formatFileSize(Number(value) || 0),
    },
    {
      key: "createdAt",
      label: t("date"),
      render: (value) =>
        new Date(String(value)).toLocaleDateString(locale === "ar" ? "ar-SA" : "en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        }),
    },
  ];

  const categories = [
    { value: "All", label: t("all") },
    { value: "Invoice", label: t("invoice") },
    { value: "Contract", label: t("contract") },
    { value: "Report", label: t("report") },
    { value: "Vendor", label: t("vendorDoc") },
    { value: "Other", label: t("other") },
  ];

  return (
    <div>
      <PageHeader
        title={t("title")}
        subtitle={t("subtitle")}
        action={
          canUpload ? (
            <button
              onClick={() => setUploadOpen(true)}
              className="inline-flex items-center justify-center gap-2 rounded-md bg-[#1E40AF] px-4 py-2 text-sm font-semibold text-white hover:bg-[#1a3899] transition-colors w-full sm:w-auto"
            >
              <Plus className="h-4 w-4" />
              {t("addDocument")}
            </button>
          ) : undefined
        }
      />

      {/* Search Bar */}
      <div className="relative mb-5">
        <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
        <input
          type="text"
          placeholder={t("searchPlaceholder")}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 py-3 pl-12 pr-4 text-sm text-gray-700 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 focus:border-[#1E40AF] focus:outline-none focus:ring-1 focus:ring-[#1E40AF]"
        />
      </div>

      {/* Category Filter Tabs */}
      <div className="mb-6 flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setActiveCategory(cat.value)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              activeCategory === cat.value
                ? "bg-[#1E40AF] text-white"
                : "border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Documents Table */}
      {isLoading ? (
        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-12 animate-pulse rounded bg-gray-100 dark:bg-gray-700" />
          ))}
        </div>
      ) : (
        <div className="overflow-x-auto">
          <DataTable<Document>
            columns={columns}
            data={documents}
            actions={[t("download"), t("delete")]}
            onRowAction={(action, row) => {
              if (action === t("delete")) {
                deleteMutation.mutate(row.id);
              }
              if (action === t("download") && row.url) {
                window.open(row.url, "_blank");
              }
            }}
            pagination={{
              page,
              total,
              perPage: 9,
              onPageChange: setPage,
            }}
          />
        </div>
      )}

      {/* Upload Modal */}
      <UploadDocumentModal
        isOpen={uploadOpen}
        onClose={() => setUploadOpen(false)}
        onSubmit={(data) => {
          uploadMutation.mutate(data);
          setUploadOpen(false);
        }}
      />
    </div>
  );
}
