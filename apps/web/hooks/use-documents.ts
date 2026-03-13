import { useState, useMemo, useCallback } from "react";

export type DocumentCategory = "Invoice" | "Contract" | "Report" | "Vendor" | "Other";

export interface Document {
  id: string;
  name: string;
  category: DocumentCategory;
  relatedTo: string;
  size: string;
  date: string;
}

const initialDocuments: Document[] = [
  {
    id: "1",
    name: "Plumbing Invoice - Unit 302.pdf",
    category: "Invoice",
    relatedTo: "Maintenance Request #1",
    size: "245 KB",
    date: "Oct 24, 2025",
  },
  {
    id: "2",
    name: "Elevator Maintenance Contract.pdf",
    category: "Contract",
    relatedTo: "LiftTech Services",
    size: "1.2 MB",
    date: "Oct 24, 2025",
  },
  {
    id: "3",
    name: "HVAC Inspection Report Q1.pdf",
    category: "Report",
    relatedTo: "Maintenance Request #3",
    size: "890 KB",
    date: "Oct 24, 2025",
  },
  {
    id: "4",
    name: "Vendor List 2026.xlsx",
    category: "Vendor",
    relatedTo: "Maintenance Request #1",
    size: "245 KB",
    date: "Oct 24, 2025",
  },
];

export function useDocuments(search?: string, category?: string) {
  const [documents, setDocuments] = useState<Document[]>(initialDocuments);

  const filtered = useMemo(() => {
    return documents.filter((d) => {
      if (search) {
        const q = search.toLowerCase();
        if (!d.name.toLowerCase().includes(q) && !d.relatedTo.toLowerCase().includes(q)) {
          return false;
        }
      }
      if (category && category !== "All" && d.category !== category) return false;
      return true;
    });
  }, [documents, search, category]);

  const uploadDocument = useCallback(
    (data: { name: string; category: DocumentCategory; relatedTo: string; size: string }) => {
      const newDoc: Document = {
        id: String(Date.now()),
        name: data.name,
        category: data.category,
        relatedTo: data.relatedTo,
        size: data.size,
        date: new Date().toLocaleDateString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        }),
      };
      setDocuments((prev) => [newDoc, ...prev]);
    },
    []
  );

  const deleteDocument = useCallback((id: string) => {
    setDocuments((prev) => prev.filter((d) => d.id !== id));
  }, []);

  return { data: filtered, total: documents.length, isLoading: false, uploadDocument, deleteDocument };
}
