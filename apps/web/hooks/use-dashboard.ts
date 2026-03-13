import { useQuery } from "@tanstack/react-query";
import apiClient from "@/lib/api-client";
import { useAuthStore } from "@/store/auth.store";

export interface DashboardSummary {
  totalBudget: number;
  totalExpenses: number;
  openRequests: number;
  feeCollection: number;
  pendingFees: number;
}

export interface RecentTransaction {
  id: string;
  description: string;
  category: string;
  amount: string;
  status: string;
  createdAt: string;
}

export interface RecentActivityItem {
  id: string;
  action: string;
  entityType: string;
  createdAt: string;
  user: { id: string; name: string; role: string };
}

export function useDashboardSummary() {
  const user = useAuthStore((s) => s.user);
  return useQuery<DashboardSummary>({
    queryKey: ["dashboard", "summary"],
    queryFn: async () => {
      const res = await apiClient.get("/dashboard/summary");
      return res.data.data;
    },
    enabled: !!user,
  });
}

export function useRecentTransactions() {
  const user = useAuthStore((s) => s.user);
  return useQuery<RecentTransaction[]>({
    queryKey: ["dashboard", "transactions"],
    queryFn: async () => {
      const res = await apiClient.get("/transactions?limit=5");
      return res.data.data;
    },
    enabled: !!user,
  });
}

export function useRecentActivity() {
  const user = useAuthStore((s) => s.user);
  return useQuery<RecentActivityItem[]>({
    queryKey: ["dashboard", "activity"],
    queryFn: async () => {
      const res = await apiClient.get("/activities?limit=5");
      return res.data.data;
    },
    enabled: !!user,
  });
}
