"use client";

import React, { useState } from "react";
import { Calendar, Plus, X } from "lucide-react";
import { PageHeader, PriorityBadge } from "@owners-platform/ui";
import {
  useAnnouncements,
  useCreateAnnouncement,
  useDeleteAnnouncement,
} from "@/hooks/use-announcements";
import { useAuthStore } from "@/store/auth.store";
import CreateAnnouncementModal from "@/components/announcements/CreateAnnouncementModal";

export default function AnnouncementsPage() {
  const user = useAuthStore((s) => s.user);
  const [createOpen, setCreateOpen] = useState(false);

  const { data: announcements = [], isLoading } = useAnnouncements();
  const createMutation = useCreateAnnouncement();
  const deleteMutation = useDeleteAnnouncement();

  const canCreate = user?.role !== "VENDOR";

  return (
    <div>
      <PageHeader
        title="Announcements"
        subtitle="Manage and create announcements for your community"
        action={
          canCreate ? (
            <button
              onClick={() => setCreateOpen(true)}
              className="inline-flex items-center gap-2 rounded-md bg-[#1E40AF] px-4 py-2 text-sm font-semibold text-white hover:bg-[#1a3899] transition-colors"
            >
              <Plus className="h-4 w-4" />
              Add Announcement
            </button>
          ) : undefined
        }
      />

      {/* Announcement Cards */}
      <div className="rounded-lg bg-white shadow-sm border border-gray-100 divide-y divide-gray-100">
        {isLoading ? (
          [1, 2, 3].map((i) => (
            <div key={i} className="h-24 animate-pulse bg-gray-100 m-4 rounded" />
          ))
        ) : announcements.length === 0 ? (
          <div className="px-6 py-16 text-center text-gray-400">
            No announcements yet. Create one to get started.
          </div>
        ) : (
          announcements.map((announcement) => (
            <div
              key={announcement.id}
              className={`relative px-6 py-5 ${
                announcement.priority === "HIGH"
                  ? "border-l-[3px] border-l-[#EF4444]"
                  : ""
              }`}
            >
              {/* Top row: title + badge + dismiss */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-base font-semibold text-[#1E3A5F]">
                    {announcement.title}
                  </h3>
                  <PriorityBadge priority={announcement.priority.toLowerCase() as "low" | "medium" | "high"} />
                </div>
                <button
                  onClick={() => deleteMutation.mutate(announcement.id)}
                  className="shrink-0 rounded-md p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Description */}
              <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                {announcement.description}
              </p>

              {/* Date */}
              <div className="mt-3 flex items-center gap-1.5 text-xs text-gray-400">
                <Calendar className="h-3.5 w-3.5" />
                {new Date(announcement.createdAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "2-digit",
                  year: "numeric",
                })}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Create Modal */}
      <CreateAnnouncementModal
        isOpen={createOpen}
        onClose={() => setCreateOpen(false)}
        onSubmit={(data) => {
          createMutation.mutate(data);
          setCreateOpen(false);
        }}
      />
    </div>
  );
}
