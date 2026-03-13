"use client";

import React, { useState } from "react";
import { Search, Star, Mail, Phone, Calendar } from "lucide-react";
import { PageHeader } from "@owners-platform/ui";
import { useVendors } from "@/hooks/use-vendors";

const categories = ["All", "Cleaning", "Security", "Electrical", "Plumbing", "Other"];

export default function ServiceProvidersPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const { data: vendors = [], isLoading } = useVendors(search, activeCategory);

  return (
    <div>
      <PageHeader
        title="Service Provider"
        subtitle="Manage and create announcements for your community"
      />

      {/* Search Bar */}
      <div className="relative mb-5">
        <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search vendors..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-lg border border-gray-200 bg-white py-3 pl-12 pr-4 text-sm text-gray-700 placeholder-gray-400 focus:border-[#1E40AF] focus:outline-none focus:ring-1 focus:ring-[#1E40AF]"
        />
      </div>

      {/* Category Filter Tabs */}
      <div className="mb-6 flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              activeCategory === cat
                ? "bg-[#1E40AF] text-white"
                : "border border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Vendor Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-48 animate-pulse rounded-xl bg-gray-100" />
          ))}
        </div>
      ) : vendors.length === 0 ? (
        <div className="rounded-lg bg-white p-16 text-center text-gray-400 shadow-sm">
          No vendors found matching your criteria.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {vendors.map((vendor) => (
            <div
              key={vendor.id}
              className="rounded-xl bg-white p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              {/* Header: name + category badge */}
              <div className="flex items-start justify-between gap-2 mb-2">
                <h3 className="text-base font-semibold text-[#1E3A5F]">
                  {vendor.name}
                </h3>
                <span className="shrink-0 rounded-full border border-blue-200 bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700">
                  {vendor.category}
                </span>
              </div>

              {/* Rating */}
              <div className="mb-2 flex items-center gap-1.5">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-4 w-4 ${
                        star <= Math.round(vendor.rating)
                          ? "fill-amber-400 text-amber-400"
                          : "text-gray-200"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs text-gray-500">
                  Rating: {vendor.rating}/5
                </span>
              </div>

              {/* Description */}
              <p className="mb-4 text-sm text-gray-500 leading-relaxed">
                {vendor.description || "No description"}
              </p>

              {/* Contact info */}
              <div className="space-y-2">
                {vendor.email && (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Mail className="h-4 w-4 shrink-0 text-gray-400" />
                    <span className="truncate">{vendor.email}</span>
                  </div>
                )}
                {vendor.phone && (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Phone className="h-4 w-4 shrink-0 text-gray-400" />
                    <span>{vendor.phone}</span>
                  </div>
                )}
                {vendor.contractEndDate && (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="h-4 w-4 shrink-0 text-gray-400" />
                    <span>
                      Contract ends:{" "}
                      {new Date(vendor.contractEndDate).toLocaleDateString("en-US", {
                        month: "short",
                        day: "2-digit",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
