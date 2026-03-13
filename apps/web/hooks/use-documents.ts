import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "@/lib/api-client";
import { useAuthStore } from "@/store/auth.store";
import toast from "react-hot-toast";

export type DocumentCategory = "Invoice" | "Contract" | "Report" | "Vendor" | "Other";

export interface Document {
  id: string;
  name: string;
  category: string;
  relatedTo: string | null;
  url: string;
  size: number;
  createdAt: string;
}

export function useDocuments(search?: string, category?: string, page?: number) {
  const user = useAuthStore((s) => s.user);
  const params = new URLSearchParams();
  if (search) params.set("search", search);
  if (category && category !== "All") params.set("category", category);
  if (page) params.set("page", String(page));

  return useQuery({
    queryKey: ["documents", search, category, page],
    queryFn: async () => {
      const res = await apiClient.get(`/documents?${params.toString()}`);
      return res.data as { data: Document[]; total: number; page: number; limit: number };
    },
    enabled: !!user,
  });
}

export function useUploadDocument() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      name: string;
      category: string;
      relatedTo?: string;
      file: File;
    }) => {
      const formData = new FormData();
      formData.append("file", data.file);
      formData.append("name", data.name);
      formData.append("category", data.category);
      if (data.relatedTo) formData.append("relatedTo", data.relatedTo);

      const res = await apiClient.post("/documents", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["documents"] });
      toast.success("Document uploaded");
    },
    onError: () => {
      toast.error("Failed to upload document");
    },
  });
}

export function useDeleteDocument() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await apiClient.delete(`/documents/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["documents"] });
      toast.success("Document deleted");
    },
    onError: () => {
      toast.error("Failed to delete document");
    },
  });
}
