// Shared TypeScript interfaces and enums

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  details?: Array<{ field: string; message: string }>;
}

export type Role = "owner" | "manager" | "admin";
