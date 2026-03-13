import { useMemo } from "react";

export type EntityType =
  | "transaction"
  | "maintenance"
  | "announcement"
  | "vendor"
  | "document"
  | "user";

export type IconType =
  | "dollar"
  | "wrench"
  | "megaphone"
  | "users"
  | "file"
  | "user";

export type IconColor = "green" | "blue" | "purple" | "amber" | "gray" | "teal";

export interface ActivityEntry {
  id: string;
  action: string;
  entityType: EntityType;
  user: string;
  detail?: string;
  amount?: string;
  date: string;
  icon: IconType;
  color: IconColor;
}

export interface ActivityFilters {
  search: string;
  type: string;
  dateFrom: string;
  dateTo: string;
}

const mockEntries: ActivityEntry[] = [
  {
    id: "1",
    action: "Fee collected",
    entityType: "transaction",
    user: "Ahmad Abdullah",
    amount: "+$2,500",
    date: "28 Jan 2026",
    icon: "dollar",
    color: "green",
  },
  {
    id: "2",
    action: "Maintenance request created",
    entityType: "maintenance",
    user: "Bader Al-Rashid",
    detail: "Pool Maintenance",
    date: "27 Jan 2026",
    icon: "wrench",
    color: "blue",
  },
  {
    id: "3",
    action: "Announcement published",
    entityType: "announcement",
    user: "Basel Manager",
    detail: "Community Meeting",
    date: "26 Jan 2026",
    icon: "megaphone",
    color: "purple",
  },
  {
    id: "4",
    action: "Vendor contract updated",
    entityType: "vendor",
    user: "Admin",
    detail: "SecureWatch Ltd.",
    date: "25 Jan 2026",
    icon: "users",
    color: "amber",
  },
  {
    id: "5",
    action: "Document uploaded",
    entityType: "document",
    user: "Basel Manager",
    detail: "HVAC Inspection Report",
    date: "24 Jan 2026",
    icon: "file",
    color: "gray",
  },
  {
    id: "6",
    action: "Maintenance status updated",
    entityType: "maintenance",
    user: "Basel Manager",
    detail: "Elevator Maintenance → Completed",
    date: "23 Jan 2026",
    icon: "wrench",
    color: "green",
  },
  {
    id: "7",
    action: "New owner registered",
    entityType: "user",
    user: "System",
    detail: "Unit 504",
    date: "22 Jan 2026",
    icon: "user",
    color: "blue",
  },
  {
    id: "8",
    action: "Budget updated",
    entityType: "transaction",
    user: "Basel Manager",
    detail: "Q1 2026 Budget Set",
    date: "21 Jan 2026",
    icon: "dollar",
    color: "teal",
  },
];

export function useActivityLog(filters: ActivityFilters) {
  const filtered = useMemo(() => {
    return mockEntries.filter((e) => {
      if (filters.search) {
        const q = filters.search.toLowerCase();
        if (
          !e.action.toLowerCase().includes(q) &&
          !e.user.toLowerCase().includes(q)
        ) {
          return false;
        }
      }
      if (filters.type && filters.type !== "All" && e.entityType !== filters.type) {
        return false;
      }
      return true;
    });
  }, [filters]);

  return { data: filtered, total: mockEntries.length, isLoading: false };
}
