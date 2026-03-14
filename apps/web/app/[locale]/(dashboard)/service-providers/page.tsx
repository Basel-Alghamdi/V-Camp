"use client";

import React, { useState } from "react";
import { Search, Star, Mail, Phone, Calendar } from "lucide-react";
import { PageHeader } from "@owners-platform/ui";
import { useVendors } from "@/hooks/use-vendors";
import { useTranslations, useLocale } from "next-intl";

export default function ServiceProvidersPage() {
  const t = useTranslations("vendors");
  const locale = useLocale();
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const { data: vendors = [], isLoading } = useVendors(search, activeCategory);

  const categories = [
    { value: "All", label: t("all") },
    { value: "Cleaning", label: t("cleaning") },
    { value: "Security", label: t("security") },
    { value: "Electrical", label: t("electrical") },
    { value: "Plumbing", label: t("plumbing") },
    { value: "Other", label: t("other") },
  ];

  return (
    <div>
      <PageHeader
        title={t("title")}
        subtitle={t("subtitle")}
      />

      {/* Search Bar */}
      <div className="relative mb-5">
        <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
        <input
          type="text"
          placeholder={t("searchPlaceholder")}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 py-3 pl-12 pr-4 text-sm text-gray-700 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 focus:border-[#1E40AF] focus:outline-none focus:ring-1 focus:ring-[#1E40AF]"
        />
      </div>

      {/* Category Filter Tabs */}
      <div className="mb-6 flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setActiveCategory(cat.value)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              activeCategory === cat.value
                ? "bg-[#1E40AF] text-white"
                : "border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Vendor Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-48 animate-pulse rounded-xl bg-gray-100 dark:bg-gray-700" />
          ))}
        </div>
      ) : vendors.length === 0 ? (
        <div className="rounded-lg bg-white dark:bg-gray-900 p-16 text-center text-gray-400 dark:text-gray-500 shadow-sm dark:shadow-gray-900/30">
          {t("noVendors")}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {vendors.map((vendor) => (
            <div
              key={vendor.id}
              className="rounded-xl bg-white dark:bg-gray-900 p-5 shadow-sm dark:shadow-gray-900/30 border border-gray-100 dark:border-gray-800 hover:shadow-md transition-shadow"
            >
              {/* Header: name + category badge */}
              <div className="flex items-start justify-between gap-2 mb-2">
                <h3 className="text-base font-semibold text-[#1E3A5F] dark:text-white">
                  {vendor.name}
                </h3>
                <span className="shrink-0 rounded-full border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/30 px-2.5 py-0.5 text-xs font-medium text-blue-700 dark:text-blue-400">
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
                          : "text-gray-200 dark:text-gray-600"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {t("rating")}: {vendor.rating}/5
                </span>
              </div>

              {/* Description */}
              <p className="mb-4 text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                {vendor.description || t("noDescription")}
              </p>

              {/* Contact info */}
              <div className="space-y-2">
                {vendor.email && (
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                    <Mail className="h-4 w-4 shrink-0 text-gray-400 dark:text-gray-500" />
                    <span className="truncate">{vendor.email}</span>
                  </div>
                )}
                {vendor.phone && (
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                    <Phone className="h-4 w-4 shrink-0 text-gray-400 dark:text-gray-500" />
                    <span>{vendor.phone}</span>
                  </div>
                )}
                {vendor.contractEndDate && (
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                    <Calendar className="h-4 w-4 shrink-0 text-gray-400 dark:text-gray-500" />
                    <span>
                      {t("contractEnds")}{" "}
                      {new Date(vendor.contractEndDate).toLocaleDateString(locale === "ar" ? "ar-SA" : "en-US", {
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
