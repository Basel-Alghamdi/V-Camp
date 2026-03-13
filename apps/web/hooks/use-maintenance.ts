import { useState, useMemo, useCallback } from "react";

export type RequestStatus = "pending" | "in_progress" | "completed" | "rejected";
export type PaymentStatus = "paid" | "unpaid" | "pending";
export type Priority = "low" | "medium" | "high";

export interface MaintenanceRequest {
  id: string;
  priority: Priority;
  date: string;
  status: RequestStatus;
  title: string;
  description?: string;
  location?: string;
  category?: string;
  amount: number;
  vendor: string;
  paymentStatus: PaymentStatus;
}

export interface MaintenanceFilters {
  search: string;
  status: string;
  category: string;
  priority: string;
}

const initialRequests: MaintenanceRequest[] = [
  {
    id: "1",
    priority: "high",
    date: "Oct 24, 2025",
    status: "in_progress",
    title: "Pool Maintenance",
    description: "Pool filter needs replacement",
    location: "Building A - Pool",
    category: "Plumbing",
    amount: 1250,
    vendor: "Pool Maintenance",
    paymentStatus: "paid",
  },
  {
    id: "2",
    priority: "low",
    date: "Oct 24, 2025",
    status: "completed",
    title: "Elevator Maintenance",
    description: "Elevator door malfunction",
    location: "Building B - Elevator",
    category: "Electrical",
    amount: 250,
    vendor: "Garden Maintenance",
    paymentStatus: "paid",
  },
  {
    id: "3",
    priority: "medium",
    date: "Oct 24, 2025",
    status: "pending",
    title: "Garden Maintenance",
    description: "Lawn mowing and trimming",
    location: "Building C - Garden",
    category: "Landscaping",
    amount: 250,
    vendor: "Garden Maintenance",
    paymentStatus: "unpaid",
  },
  {
    id: "4",
    priority: "low",
    date: "Oct 24, 2025",
    status: "pending",
    title: "Garden Maintenance",
    description: "Tree pruning",
    location: "Building D - Garden",
    category: "Landscaping",
    amount: 250,
    vendor: "Garden Maintenance",
    paymentStatus: "pending",
  },
  {
    id: "5",
    priority: "high",
    date: "Oct 24, 2025",
    status: "pending",
    title: "Garden Maintenance",
    description: "Irrigation system repair",
    location: "Building E - Garden",
    category: "Plumbing",
    amount: 250,
    vendor: "Garden Maintenance",
    paymentStatus: "pending",
  },
];

export function useMaintenanceRequests(filters: MaintenanceFilters) {
  const [requests, setRequests] = useState<MaintenanceRequest[]>(initialRequests);

  const filtered = useMemo(() => {
    return requests.filter((r) => {
      if (filters.search) {
        const q = filters.search.toLowerCase();
        if (
          !r.title.toLowerCase().includes(q) &&
          !r.vendor.toLowerCase().includes(q) &&
          !(r.location?.toLowerCase().includes(q))
        ) {
          return false;
        }
      }
      if (filters.status && r.status !== filters.status) return false;
      if (filters.category && r.category !== filters.category) return false;
      if (filters.priority && r.priority !== filters.priority) return false;
      return true;
    });
  }, [requests, filters]);

  const stats = useMemo(() => {
    const total = requests.length;
    const inProgress = requests.filter((r) => r.status === "in_progress").length;
    const pending = requests.filter((r) => r.status === "pending").length;
    const resolved = requests.filter((r) => r.status === "completed").length;
    return { total, inProgress, pending, resolved };
  }, [requests]);

  const createRequest = useCallback(
    (data: {
      title: string;
      location: string;
      description: string;
      category: string;
      priority: Priority;
    }) => {
      const newReq: MaintenanceRequest = {
        id: String(Date.now()),
        priority: data.priority,
        date: new Date().toLocaleDateString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        }),
        status: "pending",
        title: data.title,
        description: data.description,
        location: data.location,
        category: data.category,
        amount: 0,
        vendor: "Unassigned",
        paymentStatus: "pending",
      };
      setRequests((prev) => [newReq, ...prev]);
    },
    []
  );

  const updateRequestStatus = useCallback(
    (id: string, status: RequestStatus) => {
      setRequests((prev) =>
        prev.map((r) => (r.id === id ? { ...r, status } : r))
      );
    },
    []
  );

  const updatePaymentStatus = useCallback(
    (id: string, paymentStatus: PaymentStatus) => {
      setRequests((prev) =>
        prev.map((r) => (r.id === id ? { ...r, paymentStatus } : r))
      );
    },
    []
  );

  return {
    data: filtered,
    stats,
    isLoading: false,
    createRequest,
    updateRequestStatus,
    updatePaymentStatus,
  };
}
