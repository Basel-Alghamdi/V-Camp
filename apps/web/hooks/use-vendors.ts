import { useQuery } from "@tanstack/react-query";
import apiClient from "@/lib/api-client";
import { useAuthStore } from "@/store/auth.store";

export interface Vendor {
  id: string;
  name: string;
  category: string;
  rating: number;
  description: string | null;
  email: string | null;
  phone: string | null;
  contractEndDate: string | null;
  createdAt: string;
}

export function useVendors(search?: string, category?: string) {
  const user = useAuthStore((s) => s.user);
  const params = new URLSearchParams();
  if (search) params.set("search", search);
  if (category && category !== "All") params.set("category", category);

  return useQuery<Vendor[]>({
    queryKey: ["vendors", search, category],
    queryFn: async () => {
      const res = await apiClient.get(`/vendors?${params.toString()}`);
      return res.data.data;
    },
    enabled: !!user,
  });
}
