export interface DashboardSummary {
  totalBudget: number;
  totalExpenses: number;
  openRequests: number;
  feeCollection: number;
  pendingFees: number;
  completedRequests: number;
  totalTransactions: number;
  budgetChangePercent: string;
}

export interface MonthlyDataPoint {
  month: string;
  budget: number;
  expenses: number;
}

export interface RecentTransaction {
  id: string;
  date: string;
  description: string;
  category: string;
  amount: number;
  status: "paid" | "pending" | "unpaid";
}

export interface RecentActivityItem {
  id: string;
  label: string;
  date: string;
  amount: number;
  type: "income" | "expense" | "poll";
}

const mockSummary: DashboardSummary = {
  totalBudget: 40689,
  totalExpenses: 40689,
  openRequests: 3,
  feeCollection: 40689,
  pendingFees: 10000,
  completedRequests: 10,
  totalTransactions: 8,
  budgetChangePercent: "8.5%",
};

const mockMonthlyData: MonthlyDataPoint[] = [
  { month: "Jan", budget: 12000, expenses: 10000 },
  { month: "Feb", budget: 8000, expenses: 6000 },
  { month: "Mar", budget: 14000, expenses: 12000 },
  { month: "Apr", budget: 18000, expenses: 15000 },
  { month: "May", budget: 28000, expenses: 22000 },
  { month: "Jun", budget: 20000, expenses: 18000 },
  { month: "Jul", budget: 22000, expenses: 25000 },
];

const mockTransactions: RecentTransaction[] = [
  {
    id: "1",
    date: "Oct 24, 2025",
    description: "Pool Maintenance",
    category: "Maintenance",
    amount: 1250,
    status: "paid",
  },
  {
    id: "2",
    date: "Oct 24, 2025",
    description: "Garden Maintenance",
    category: "Maintenance",
    amount: 250,
    status: "pending",
  },
];

const mockActivity: RecentActivityItem[] = [
  {
    id: "1",
    label: "Monthly fee collected",
    date: "28 January 2021",
    amount: 2500,
    type: "income",
  },
  {
    id: "2",
    label: "water leak repair",
    date: "25 January 2021",
    amount: -25,
    type: "expense",
  },
  {
    id: "3",
    label: "New poll created",
    date: "21 January 2021",
    amount: 0,
    type: "poll",
  },
  {
    id: "4",
    label: "New poll created",
    date: "21 January 2021",
    amount: 0,
    type: "poll",
  },
];

export function useDashboardSummary() {
  return { data: mockSummary, isLoading: false };
}

export function useMonthlyChartData() {
  return { data: mockMonthlyData, isLoading: false };
}

export function useRecentTransactions() {
  return { data: mockTransactions, isLoading: false };
}

export function useRecentActivity() {
  return { data: mockActivity, isLoading: false };
}
