import { useMemo } from "react";

export interface Vendor {
  id: string;
  name: string;
  category: string;
  rating: number;
  description: string;
  email: string;
  phone: string;
  contractEnd: string;
}

const mockVendors: Vendor[] = [
  {
    id: "1",
    name: "SecureWatch Ltd.",
    category: "Security",
    rating: 4.8,
    description: "24/7 security guard services and surveillance systems",
    email: "ops@securewatch.com",
    phone: "+966543239765",
    contractEnd: "3/31/2027",
  },
  {
    id: "2",
    name: "LiftTech Services",
    category: "Electrical",
    rating: 4.8,
    description: "Specialized in elevator maintenance and electrical systems",
    email: "ops@securewatch.com",
    phone: "+966543239765",
    contractEnd: "3/31/2027",
  },
  {
    id: "3",
    name: "SecureWatch Ltd.",
    category: "Security",
    rating: 4.8,
    description: "24/7 security guard services and surveillance systems",
    email: "ops@securewatch.com",
    phone: "+966543239765",
    contractEnd: "3/31/2027",
  },
  {
    id: "4",
    name: "SecureWatch Ltd.",
    category: "Security",
    rating: 4.8,
    description: "24/7 security guard services and surveillance systems",
    email: "ops@securewatch.com",
    phone: "+966543239765",
    contractEnd: "3/31/2027",
  },
  {
    id: "5",
    name: "SecureWatch Ltd.",
    category: "Security",
    rating: 4.8,
    description: "24/7 security guard services and surveillance systems",
    email: "ops@securewatch.com",
    phone: "+966543239765",
    contractEnd: "3/31/2027",
  },
  {
    id: "6",
    name: "SecureWatch Ltd.",
    category: "Security",
    rating: 4.8,
    description: "24/7 security guard services and surveillance systems",
    email: "ops@securewatch.com",
    phone: "+966543239765",
    contractEnd: "3/31/2027",
  },
];

export function useVendors(search?: string, category?: string) {
  const filtered = useMemo(() => {
    return mockVendors.filter((v) => {
      if (search) {
        const q = search.toLowerCase();
        if (!v.name.toLowerCase().includes(q)) return false;
      }
      if (category && category !== "All" && v.category !== category) return false;
      return true;
    });
  }, [search, category]);

  return { data: filtered, isLoading: false };
}
