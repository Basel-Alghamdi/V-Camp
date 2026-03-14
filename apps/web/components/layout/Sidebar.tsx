"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import {
  LayoutDashboard,
  Wrench,
  CheckSquare,
  Megaphone,
  Users,
  ClipboardList,
  FileText,
  CreditCard,
} from "lucide-react";

interface NavItem {
  labelKey: string;
  href: string;
  icon: React.ElementType;
  disabled?: boolean;
}

const navItems: NavItem[] = [
  { labelKey: "dashboard", href: "/dashboard", icon: LayoutDashboard },
  { labelKey: "maintenance", href: "/maintenance", icon: Wrench },
  { labelKey: "voting", href: "/voting", icon: CheckSquare, disabled: true },
  { labelKey: "announcements", href: "/announcements", icon: Megaphone },
  { labelKey: "serviceProviders", href: "/service-providers", icon: Users },
  { labelKey: "activityLog", href: "/activity-log", icon: ClipboardList },
  { labelKey: "documents", href: "/documents", icon: FileText },
];

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  onNavigate?: () => void;
}

export default function Sidebar({ collapsed, onToggle, onNavigate }: SidebarProps) {
  const pathname = usePathname();
  const t = useTranslations("nav");
  const locale = useLocale();
  const isRTL = locale === "ar";

  function isActive(href: string) {
    const localizedHref = `/${locale}${href}`;
    if (href === "/dashboard") return pathname === localizedHref;
    return pathname.startsWith(localizedHref);
  }

  return (
    <aside
      className={`flex h-screen flex-col bg-[#1E3A5F] dark:bg-gray-900 transition-all duration-300 ${
        collapsed ? "w-16" : "w-60"
      }`}
    >
      {/* Logo area */}
      <div className="flex h-16 items-center gap-3 border-b border-white/10 px-4">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-[#2B4F7E] dark:bg-gray-700">
          <CreditCard className="h-4 w-4 text-white" />
        </div>
        {!collapsed && (
          <span className="text-lg font-bold text-white">S</span>
        )}
      </div>

      {/* Navigation */}
      <nav className="mt-4 flex flex-1 flex-col gap-1 px-2">
        {navItems.map((item) => {
          const active = isActive(item.href);
          const Icon = item.icon;
          const label = t(item.labelKey);
          const localizedHref = `/${locale}${item.href}`;

          if (item.disabled) {
            return (
              <div
                key={item.labelKey}
                className={`group relative flex items-center gap-3 rounded-md px-3 py-2.5 text-gray-500 cursor-not-allowed ${
                  collapsed ? "justify-center" : ""
                }`}
              >
                <Icon className="h-5 w-5 shrink-0 opacity-50" />
                {!collapsed && (
                  <span className="text-sm opacity-50">{label}</span>
                )}
                {collapsed && (
                  <div className={`absolute hidden rounded-md bg-gray-900 dark:bg-gray-700 px-2 py-1 text-xs text-white group-hover:block whitespace-nowrap z-50 ${
                    isRTL ? "right-full mr-2" : "left-full ml-2"
                  }`}>
                    {label}
                  </div>
                )}
              </div>
            );
          }

          return (
            <Link
              key={item.labelKey}
              href={localizedHref}
              onClick={onNavigate}
              className={`group relative flex items-center gap-3 rounded-md px-3 py-2.5 transition-colors ${
                collapsed ? "justify-center" : ""
              } ${
                active
                  ? isRTL
                    ? "border-r-[3px] border-[#1E40AF] bg-white/5 text-[#008080] dark:text-teal-400"
                    : "border-l-[3px] border-[#1E40AF] bg-white/5 text-[#008080] dark:text-teal-400"
                  : isRTL
                    ? "border-r-[3px] border-transparent text-[#9CA3AF] hover:bg-white/5 hover:text-white"
                    : "border-l-[3px] border-transparent text-[#9CA3AF] hover:bg-white/5 hover:text-white"
              }`}
            >
              <Icon className="h-5 w-5 shrink-0" />
              {!collapsed && (
                <span className="text-sm font-medium">{label}</span>
              )}
              {collapsed && (
                <div className={`absolute hidden rounded-md bg-gray-900 dark:bg-gray-700 px-2 py-1 text-xs text-white group-hover:block whitespace-nowrap z-50 ${
                  isRTL ? "right-full mr-2" : "left-full ml-2"
                }`}>
                  {label}
                </div>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Collapse toggle at bottom — hidden on mobile */}
      <div className="hidden md:block border-t border-white/10 p-3">
        <button
          onClick={onToggle}
          className="flex w-full items-center justify-center rounded-md p-2 text-[#9CA3AF] hover:bg-white/5 hover:text-white transition-colors"
        >
          <svg
            className={`h-5 w-5 transition-transform ${
              isRTL
                ? collapsed ? "" : "rotate-180"
                : collapsed ? "rotate-180" : ""
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
            />
          </svg>
        </button>
      </div>
    </aside>
  );
}
