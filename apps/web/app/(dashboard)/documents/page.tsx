"use client";

import React, { useState } from "react";
import { Search, Plus } from "lucide-react";
import toast from "react-hot-toast";
import { PageHeader, DataTable } from "@owners-platform/ui";
import type { DataTableColumn } from "@owners-platform/ui";
import { useDocuments, type Document } from "@/hooks/use-documents";
import UploadDocumentModal from "@/components/documents/UploadDocumentModal";

const categoryBadgeColors: Record<string, string> = {
  Invoice: "bg-green-50 text-green-700 border-green-200",
  Contract: "bg-amber-50 text-amber-700 border-amber-200",
  Report: "bg-rose-50 text-rose-700 border-rose-200",
  Vendor: "bg-indigo-50 text-indigo-700 border-indigo-200",
  Other: "bg-gray-50 text-gray-600 border-gray-200",
};

const categories = ["All", "Invoice", "Contract", "Report", "Vendor", "Other"];

const columns: DataTableColumn<Document>[] = [
  { key: "name", label: "Document Name" },
  {
    key: "category",
    label: "Category",
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
  { key: "relatedTo", label: "Related To" },
  { key: "size", label: "Size" },
  { key: "date", label: "Date" },
];

export default function DocumentsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [uploadOpen, setUploadOpen] = useState(false);
  const [page, setPage] = useState(1);

  const { data: documents, total, deleteDocument, uploadDocument } = useDocuments(
    searchQuery,
    activeCategory
  );

  return (
    <div>
      <PageHeader
        title="Documents"
        subtitle="Manage and organize all your important documents"
        action={
          <button
            onClick={() => setUploadOpen(true)}
            className="inline-flex items-center gap-2 rounded-md bg-[#1E40AF] px-4 py-2 text-sm font-semibold text-white hover:bg-[#1a3899] transition-colors"
          >
            <Plus className="h-4 w-4" />
            Add Document
          </button>
        }
      />

      {/* Search Bar */}
      <div className="relative mb-5">
        <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search vendors..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full rounded-lg border border-gray-200 bg-white py-3 pl-12 pr-4 text-sm text-gray-700 placeholder-gray-400 focus:border-[#1E40AF] focus:outline-none focus:ring-1 focus:ring-[#1E40AF]"
        />
      </div>

      {/* Category Filter Tabs */}
      <div className="mb-6 flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              activeCategory === cat
                ? "bg-[#1E40AF] text-white"
                : "border border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Documents Table */}
      <DataTable<Document>
        columns={columns}
        data={documents}
        actions={["Download", "Delete"]}
        onRowAction={(action, row) => {
          if (action === "Delete") {
            deleteDocument(row.id);
            toast.success("Document deleted");
          }
          if (action === "Download") {
            toast.success(`Downloading ${row.name}`);
          }
        }}
        pagination={{
          page,
          total: total > 0 ? 78 : 0,
          perPage: 9,
          onPageChange: setPage,
        }}
      />

      {/* Upload Modal */}
      <UploadDocumentModal
        isOpen={uploadOpen}
        onClose={() => setUploadOpen(false)}
        onSubmit={(data) => {
          uploadDocument(data);
          toast.success("Document uploaded successfully");
        }}
      />
    </div>
  );
}
