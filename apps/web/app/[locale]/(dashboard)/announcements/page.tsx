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
import { useTranslations, useLocale } from "next-intl";

export default function AnnouncementsPage() {
  const t = useTranslations("announcements");
  const locale = useLocale();
  const user = useAuthStore((s) => s.user);
  const [createOpen, setCreateOpen] = useState(false);

  const { data: announcements = [], isLoading } = useAnnouncements();
  const createMutation = useCreateAnnouncement();
  const deleteMutation = useDeleteAnnouncement();

  const canCreate = user?.role !== "VENDOR";

  return (
    <div>
      <PageHeader
        title={t("title")}
        subtitle={t("subtitle")}
        action={
          canCreate ? (
            <button
              onClick={() => setCreateOpen(true)}
              className="inline-flex items-center gap-2 rounded-md bg-[#1E40AF] px-4 py-2 text-sm font-semibold text-white hover:bg-[#1a3899] transition-colors"
            >
              <Plus className="h-4 w-4" />
              {t("addAnnouncement")}
            </button>
          ) : undefined
        }
      />

      {/* Announcement Cards */}
      <div className="rounded-lg bg-white dark:bg-gray-900 shadow-sm dark:shadow-gray-900/30 border border-gray-100 dark:border-gray-800 divide-y divide-gray-100 dark:divide-gray-800">
        {isLoading ? (
          [1, 2, 3].map((i) => (
            <div key={i} className="h-24 animate-pulse bg-gray-100 dark:bg-gray-700 m-4 rounded" />
          ))
        ) : announcements.length === 0 ? (
          <div className="px-6 py-16 text-center text-gray-400 dark:text-gray-500">
            {t("noAnnouncements")}
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
                  <h3 className="text-base font-semibold text-[#1E3A5F] dark:text-white">
                    {announcement.title}
                  </h3>
                  <PriorityBadge priority={announcement.priority.toLowerCase() as "low" | "medium" | "high"} />
                </div>
                <button
                  onClick={() => deleteMutation.mutate(announcement.id)}
                  className="shrink-0 rounded-md p-1 text-gray-400 dark:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Description */}
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                {announcement.description}
              </p>

              {/* Date */}
              <div className="mt-3 flex items-center gap-1.5 text-xs text-gray-400 dark:text-gray-500">
                <Calendar className="h-3.5 w-3.5" />
                {new Date(announcement.createdAt).toLocaleDateString(locale === "ar" ? "ar-SA" : "en-US", {
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
