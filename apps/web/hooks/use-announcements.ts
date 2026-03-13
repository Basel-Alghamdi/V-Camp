import { useState, useCallback } from "react";

export type AnnouncementPriority = "low" | "medium" | "high";

export interface Announcement {
  id: string;
  title: string;
  priority: AnnouncementPriority;
  description: string;
  date: string;
}

const initialAnnouncements: Announcement[] = [
  {
    id: "1",
    title: "Community Meeting Next Week",
    priority: "high",
    description:
      "Join us for our monthly community meeting on March 15th at 7 PM. We\u2019ll discuss upcoming maintenance and budget allocations.",
    date: "March 10, 2026",
  },
  {
    id: "2",
    title: "Pool Maintenance Schedule",
    priority: "medium",
    description:
      "The pool will be closed for maintenance from March 20-22. Thank you for your patience.",
    date: "March 9, 2026",
  },
  {
    id: "3",
    title: "New Parking Regulations",
    priority: "low",
    description:
      "Please review the updated parking guidelines in your resident portal.",
    date: "March 8, 2026",
  },
];

export function useAnnouncements() {
  const [announcements, setAnnouncements] =
    useState<Announcement[]>(initialAnnouncements);

  const createAnnouncement = useCallback(
    (data: { title: string; description: string; priority: AnnouncementPriority }) => {
      const newAnn: Announcement = {
        id: String(Date.now()),
        title: data.title,
        description: data.description,
        priority: data.priority,
        date: new Date().toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        }),
      };
      setAnnouncements((prev) => [newAnn, ...prev]);
    },
    []
  );

  const deleteAnnouncement = useCallback((id: string) => {
    setAnnouncements((prev) => prev.filter((a) => a.id !== id));
  }, []);

  return {
    data: announcements,
    isLoading: false,
    createAnnouncement,
    deleteAnnouncement,
  };
}
