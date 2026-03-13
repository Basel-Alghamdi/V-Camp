import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "@/lib/api-client";
import { useAuthStore } from "@/store/auth.store";
import toast from "react-hot-toast";

export type AnnouncementPriority = "LOW" | "MEDIUM" | "HIGH";

export interface Announcement {
  id: string;
  title: string;
  description: string;
  priority: AnnouncementPriority;
  createdAt: string;
  createdBy: { id: string; name: string };
}

export function useAnnouncements() {
  const user = useAuthStore((s) => s.user);
  return useQuery<Announcement[]>({
    queryKey: ["announcements"],
    queryFn: async () => {
      const res = await apiClient.get("/announcements");
      return res.data.data;
    },
    enabled: !!user,
  });
}

export function useCreateAnnouncement() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      title: string;
      description: string;
      priority: string;
    }) => {
      const res = await apiClient.post("/announcements", data);
      return res.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["announcements"] });
      toast.success("Announcement published");
    },
    onError: () => {
      toast.error("Failed to create announcement");
    },
  });
}

export function useDeleteAnnouncement() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await apiClient.delete(`/announcements/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["announcements"] });
      toast.success("Announcement deleted");
    },
    onError: () => {
      toast.error("Failed to delete announcement");
    },
  });
}
