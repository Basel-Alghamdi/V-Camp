import { useQuery } from "@tanstack/react-query";
import apiClient from "@/lib/api-client";
import { useAuthStore } from "@/store/auth.store";

export type EntityType =
  | "transaction"
  | "maintenance"
  | "announcement"
  | "vendor"
  | "document"
  | "user";

export type IconType = "dollar" | "wrench" | "megaphone" | "users" | "file" | "user";
export type IconColor = "green" | "blue" | "purple" | "amber" | "gray" | "teal";

export interface ActivityEntry {
  id: string;
  action: string;
  entityType: EntityType;
  entityId: string | null;
  metadata: Record<string, unknown> | null;
  createdAt: string;
  user: { id: string; name: string; role: string };
}

export interface ActivityFilters {
  search: string;
  type: string;
  dateFrom: string;
  dateTo: string;
}

function getIconForType(type: string): IconType {
  switch (type) {
    case "transaction": return "dollar";
    case "maintenance": return "wrench";
    case "announcement": return "megaphone";
    case "vendor": return "users";
    case "document": return "file";
    default: return "user";
  }
}

function getColorForType(type: string): IconColor {
  switch (type) {
    case "transaction": return "green";
    case "maintenance": return "blue";
    case "announcement": return "purple";
    case "vendor": return "amber";
    case "document": return "gray";
    default: return "teal";
  }
}

export function useActivityLog(filters: ActivityFilters) {
  const user = useAuthStore((s) => s.user);
  const params = new URLSearchParams();
  if (filters.type && filters.type !== "All") params.set("entityType", filters.type);
  if (filters.search) params.set("search", filters.search);
  if (filters.dateFrom) params.set("from", filters.dateFrom);
  if (filters.dateTo) params.set("to", filters.dateTo);

  const query = useQuery({
    queryKey: ["activities", filters.type, filters.search, filters.dateFrom, filters.dateTo],
    queryFn: async () => {
      const res = await apiClient.get(`/activities?${params.toString()}`);
      return res.data;
    },
    enabled: !!user,
  });

  const entries: (ActivityEntry & { icon: IconType; color: IconColor })[] = (
    query.data?.data || []
  ).map((e: ActivityEntry) => ({
    ...e,
    icon: getIconForType(e.entityType),
    color: getColorForType(e.entityType),
  }));

  return {
    data: entries,
    total: query.data?.total || 0,
    isLoading: query.isLoading,
    isError: query.isError,
  };
}
