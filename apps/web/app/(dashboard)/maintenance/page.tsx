"use client";

import React, { useState } from "react";
import { DollarSign, Plus } from "lucide-react";
import {
  PageHeader,
  StatCard,
  DataTable,
  StatusBadge,
  PriorityBadge,
} from "@owners-platform/ui";
import type { DataTableColumn } from "@owners-platform/ui";
import {
  useMaintenanceRequests,
  useCreateRequest,
  useUpdateRequest,
  type MaintenanceRequest,
  type MaintenanceFilters,
} from "@/hooks/use-maintenance";
import { useAuthStore } from "@/store/auth.store";
import CreateRequestModal from "@/components/maintenance/CreateRequestModal";
import RequestDetailsModal from "@/components/maintenance/RequestDetailsModal";

const columns: DataTableColumn<MaintenanceRequest>[] = [
  {
    key: "priority",
    label: "Priority",
    render: (value) => (
      <PriorityBadge priority={String(value).toLowerCase() as "low" | "medium" | "high"} />
    ),
  },
  {
    key: "createdAt",
    label: "Date",
    render: (value) =>
      new Date(String(value)).toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }),
  },
  {
    key: "status",
    label: "Request Status",
    render: (value) => (
      <StatusBadge status={String(value).toLowerCase() as "pending" | "in_progress" | "completed" | "rejected"} />
    ),
  },
  { key: "title", label: "Request Title" },
  {
    key: "amount",
    label: "Amount",
    render: (value) => (value ? `$${Number(value).toLocaleString()}` : "—"),
  },
  {
    key: "vendor",
    label: "Vendor",
    render: (_value, row) => {
      const req = row as unknown as MaintenanceRequest;
      return req.vendor?.name || "Unassigned";
    },
  },
  {
    key: "paymentStatus",
    label: "Paid Status",
    render: (value) => (
      <StatusBadge status={String(value).toLowerCase() as "paid" | "unpaid" | "pending"} />
    ),
  },
];

export default function MaintenancePage() {
  const user = useAuthStore((s) => s.user);
  const [filters, setFilters] = useState<MaintenanceFilters>({
    search: "",
    status: "",
    category: "",
    priority: "",
  });
  const [createOpen, setCreateOpen] = useState(false);
  const [detailsRequest, setDetailsRequest] = useState<MaintenanceRequest | null>(null);
  const [page, setPage] = useState(1);

  const { data, stats, isLoading } = useMaintenanceRequests(filters);
  const createMutation = useCreateRequest();
  const updateMutation = useUpdateRequest();

  const canCreate = user?.role !== "VENDOR";

  return (
    <div>
      <PageHeader
        title="Maintenance"
        subtitle="Manage and track maintenance requests"
      />

      {/* Stat Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
        {isLoading ? (
          [1, 2, 3, 4].map((i) => (
            <div key={i} className="h-28 animate-pulse rounded-lg bg-gray-100" />
          ))
        ) : (
          <>
            <StatCard title="Total Requests" value={stats.total} icon={<DollarSign className="h-5 w-5" />} change="Request" />
            <StatCard title="In Progress" value={stats.inProgress} icon={<DollarSign className="h-5 w-5" />} change="Request" />
            <StatCard title="Pending" value={stats.pending} icon={<DollarSign className="h-5 w-5" />} change="Request" />
            <StatCard title="Resolved" value={stats.resolved} icon={<DollarSign className="h-5 w-5" />} change="Request" />
          </>
        )}
      </div>

      {/* Section header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-[#1E3A5F]">Recent maintenance</h2>
        {canCreate && (
          <button
            onClick={() => setCreateOpen(true)}
            className="inline-flex items-center gap-2 rounded-md bg-[#1E40AF] px-4 py-2 text-sm font-semibold text-white hover:bg-[#1a3899] transition-colors"
          >
            <Plus className="h-4 w-4" />
            New Request
          </button>
        )}
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap items-end gap-4 mb-4">
        <div className="flex-1 min-w-[250px]">
          <label className="block text-xs font-medium uppercase text-gray-500 mb-1">Search</label>
          <input
            type="text"
            placeholder="Search by title, location, vendor..."
            value={filters.search}
            onChange={(e) => setFilters((f) => ({ ...f, search: e.target.value }))}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm placeholder-gray-400 focus:border-[#1E40AF] focus:outline-none focus:ring-1 focus:ring-[#1E40AF]"
          />
        </div>
        <div className="w-32">
          <label className="block text-xs font-medium uppercase text-gray-500 mb-1">Status</label>
          <select
            value={filters.status}
            onChange={(e) => setFilters((f) => ({ ...f, status: e.target.value }))}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-700 focus:border-[#1E40AF] focus:outline-none focus:ring-1 focus:ring-[#1E40AF]"
          >
            <option value="">All</option>
            <option value="PENDING">Pending</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="COMPLETED">Completed</option>
            <option value="REJECTED">Rejected</option>
          </select>
        </div>
        <div className="w-32">
          <label className="block text-xs font-medium uppercase text-gray-500 mb-1">Category</label>
          <select
            value={filters.category}
            onChange={(e) => setFilters((f) => ({ ...f, category: e.target.value }))}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-700 focus:border-[#1E40AF] focus:outline-none focus:ring-1 focus:ring-[#1E40AF]"
          >
            <option value="">All</option>
            <option value="Plumbing">Plumbing</option>
            <option value="Electrical">Electrical</option>
            <option value="HVAC">HVAC</option>
            <option value="Security">Security</option>
          </select>
        </div>
        <div className="w-32">
          <label className="block text-xs font-medium uppercase text-gray-500 mb-1">Priority</label>
          <select
            value={filters.priority}
            onChange={(e) => setFilters((f) => ({ ...f, priority: e.target.value }))}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-700 focus:border-[#1E40AF] focus:outline-none focus:ring-1 focus:ring-[#1E40AF]"
          >
            <option value="">All</option>
            <option value="LOW">Low</option>
            <option value="MEDIUM">Medium</option>
            <option value="HIGH">High</option>
          </select>
        </div>
      </div>

      {/* Data Table */}
      {isLoading ? (
        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-12 animate-pulse rounded bg-gray-100" />
          ))}
        </div>
      ) : (
        <DataTable<MaintenanceRequest>
          columns={columns}
          data={data}
          actions={["View Details"]}
          onRowAction={(action, row) => {
            if (action === "View Details") {
              setDetailsRequest(row);
            }
          }}
          pagination={{
            page,
            total: data.length,
            perPage: 9,
            onPageChange: setPage,
          }}
        />
      )}

      {/* Create Modal */}
      <CreateRequestModal
        isOpen={createOpen}
        onClose={() => setCreateOpen(false)}
        onSubmit={(formData) => {
          createMutation.mutate(formData);
          setCreateOpen(false);
        }}
      />

      {/* Details Modal */}
      <RequestDetailsModal
        isOpen={!!detailsRequest}
        onClose={() => setDetailsRequest(null)}
        request={detailsRequest}
        onStatusChange={(id, status) => {
          updateMutation.mutate({ id, status });
          setDetailsRequest(null);
        }}
        onPaymentStatusChange={(id, paymentStatus) => {
          updateMutation.mutate({ id, paymentStatus });
          setDetailsRequest(null);
        }}
      />
    </div>
  );
}
