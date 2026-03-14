"use client";

import { useTranslations } from "next-intl";

export default function StatsBar() {
  const t = useTranslations("landing");

  const stats = [
    {
      value: "500+",
      label: t("statsBuildings"),
      sublabel: t("statsUsingPlatform"),
    },
    {
      value: "$2.4M",
      label: t("statsMoney"),
      sublabel: t("statsMonthly"),
    },
    {
      value: "98%",
      label: t("statsRate"),
      sublabel: t("statsForRequests"),
    },
    {
      value: "12K+",
      label: t("statsResidents"),
      sublabel: t("statsManaged"),
    },
  ];

  return (
    <section className="bg-[#1E3A5F] py-14">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, i) => (
            <div
              key={i}
              className={
                i < 3 ? "md:border-r md:border-white/20" : ""
              }
            >
              <p className="text-3xl lg:text-4xl font-bold text-white">
                {stat.value}
              </p>
              <p className="text-sm text-gray-300 mt-1">{stat.label}</p>
              <p className="text-xs text-gray-400">{stat.sublabel}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
