"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
  label: string;
  href: string;
  icon: React.ElementType;
  disabled?: boolean;
  badge?: string;
}

const navItems: NavItem[] = [
  { label: "Dashboard", href: "/", icon: LayoutDashboard },
  { label: "Maintenens", href: "/maintenance", icon: Wrench },
  { label: "Voting", href: "/voting", icon: CheckSquare, disabled: true, badge: "Phase 2" },
  { label: "Announcement", href: "/announcements", icon: Megaphone },
  { label: "Service Provider", href: "/service-providers", icon: Users },
  { label: "Activity log", href: "/activity-log", icon: ClipboardList },
  { label: "Documents", href: "/documents", icon: FileText },
];

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export default function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const pathname = usePathname();

  function isActive(href: string) {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  }

  return (
    <aside
      className={`fixed left-0 top-0 z-30 flex h-screen flex-col bg-[#1E3A5F] transition-all duration-300 ${
        collapsed ? "w-16" : "w-60"
      }`}
    >
      {/* Logo area */}
      <div className="flex h-16 items-center gap-3 border-b border-white/10 px-4">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-[#2B4F7E]">
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

          if (item.disabled) {
            return (
              <div
                key={item.label}
                className={`group relative flex items-center gap-3 rounded-md px-3 py-2.5 text-gray-500 cursor-not-allowed ${
                  collapsed ? "justify-center" : ""
                }`}
              >
                <Icon className="h-5 w-5 shrink-0 opacity-50" />
                {!collapsed && (
                  <span className="text-sm opacity-50">{item.label}</span>
                )}
                {/* Tooltip for collapsed mode */}
                {collapsed && (
                  <div className="absolute left-full ml-2 hidden rounded-md bg-gray-900 px-2 py-1 text-xs text-white group-hover:block whitespace-nowrap z-50">
                    {item.label}
                  </div>
                )}
              </div>
            );
          }

          return (
            <Link
              key={item.label}
              href={item.href}
              className={`group relative flex items-center gap-3 rounded-md px-3 py-2.5 transition-colors ${
                collapsed ? "justify-center" : ""
              } ${
                active
                  ? "border-l-[3px] border-[#1E40AF] bg-white/5 text-[#008080]"
                  : "border-l-[3px] border-transparent text-[#9CA3AF] hover:bg-white/5 hover:text-white"
              }`}
            >
              <Icon className="h-5 w-5 shrink-0" />
              {!collapsed && (
                <span className="text-sm font-medium">{item.label}</span>
              )}
              {/* Tooltip for collapsed mode */}
              {collapsed && (
                <div className="absolute left-full ml-2 hidden rounded-md bg-gray-900 px-2 py-1 text-xs text-white group-hover:block whitespace-nowrap z-50">
                  {item.label}
                </div>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Collapse toggle at bottom */}
      <div className="border-t border-white/10 p-3">
        <button
          onClick={onToggle}
          className="flex w-full items-center justify-center rounded-md p-2 text-[#9CA3AF] hover:bg-white/5 hover:text-white transition-colors"
        >
          <svg
            className={`h-5 w-5 transition-transform ${collapsed ? "rotate-180" : ""}`}
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
