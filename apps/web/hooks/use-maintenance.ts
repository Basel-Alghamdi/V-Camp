import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "@/lib/api-client";
import { useAuthStore } from "@/store/auth.store";
import toast from "react-hot-toast";

export type RequestStatus = "PENDING" | "IN_PROGRESS" | "COMPLETED" | "REJECTED";
export type PaymentStatus = "PAID" | "UNPAID" | "PENDING";
export type Priority = "LOW" | "MEDIUM" | "HIGH";

export interface MaintenanceRequest {
  id: string;
  title: string;
  description: string;
  location: string;
  category: string;
  priority: Priority;
  status: RequestStatus;
  paymentStatus: PaymentStatus;
  amount: string | null;
  vendorId: string | null;
  vendor: { id: string; name: string; category: string } | null;
  createdBy: { id: string; name: string; email: string };
  createdAt: string;
  updatedAt: string;
}

export interface MaintenanceFilters {
  search: string;
  status: string;
  category: string;
  priority: string;
}

export function useMaintenanceRequests(filters: MaintenanceFilters) {
  const user = useAuthStore((s) => s.user);
  const params = new URLSearchParams();
  if (filters.status) params.set("status", filters.status);
  if (filters.category) params.set("category", filters.category);
  if (filters.priority) params.set("priority", filters.priority);

  const query = useQuery({
    queryKey: ["maintenance", filters.status, filters.category, filters.priority],
    queryFn: async () => {
      const res = await apiClient.get(`/maintenance?${params.toString()}&limit=50`);
      return res.data;
    },
    enabled: !!user,
  });

  const requests: MaintenanceRequest[] = query.data?.data || [];

  // Client-side search filter
  const filtered = filters.search
    ? requests.filter((r) => {
        const q = filters.search.toLowerCase();
        return (
          r.title.toLowerCase().includes(q) ||
          r.location.toLowerCase().includes(q) ||
          r.vendor?.name.toLowerCase().includes(q)
        );
      })
    : requests;

  const stats = {
    total: query.data?.total || 0,
    inProgress: requests.filter((r) => r.status === "IN_PROGRESS").length,
    pending: requests.filter((r) => r.status === "PENDING").length,
    resolved: requests.filter((r) => r.status === "COMPLETED").length,
  };

  return {
    data: filtered,
    stats,
    isLoading: query.isLoading,
    isError: query.isError,
  };
}

export function useCreateRequest() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      title: string;
      location: string;
      description: string;
      category: string;
      priority: string;
    }) => {
      const res = await apiClient.post("/maintenance", data);
      return res.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["maintenance"] });
      toast.success("Request created successfully");
    },
    onError: () => {
      toast.error("Failed to create request");
    },
  });
}

export function useUpdateRequest() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      ...data
    }: {
      id: string;
      status?: string;
      paymentStatus?: string;
      vendorId?: string;
      amount?: number;
    }) => {
      const res = await apiClient.patch(`/maintenance/${id}`, data);
      return res.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["maintenance"] });
      toast.success("Request updated successfully");
    },
    onError: () => {
      toast.error("Failed to update request");
    },
  });
}

export function useDeleteRequest() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await apiClient.delete(`/maintenance/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["maintenance"] });
      toast.success("Request deleted");
    },
    onError: () => {
      toast.error("Failed to delete request");
    },
  });
}
