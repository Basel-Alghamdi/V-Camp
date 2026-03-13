"use client";

import React, { useState, useRef, useEffect } from "react";
import { Sun, History, Bell, PanelLeftClose, PanelLeft, LogOut, User } from "lucide-react";
import { useAuthStore } from "@/store/auth.store";

interface TopBarProps {
  sidebarCollapsed: boolean;
  onToggleSidebar: () => void;
}

export default function TopBar({
  sidebarCollapsed,
  onToggleSidebar,
}: TopBarProps) {
  const { user, logout } = useAuthStore();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "U";

  // Close menu on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    if (menuOpen) {
      document.addEventListener("mousedown", handleClick);
      return () => document.removeEventListener("mousedown", handleClick);
    }
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4">
      {/* Left — toggle */}
      <button
        onClick={onToggleSidebar}
        className="rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
      >
        {sidebarCollapsed ? (
          <PanelLeft className="h-5 w-5" />
        ) : (
          <PanelLeftClose className="h-5 w-5" />
        )}
      </button>

      {/* Center — search */}
      <div className="mx-4 flex max-w-md flex-1">
        <div className="relative w-full">
          <svg
            className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            placeholder="Search"
            className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2 pl-10 pr-10 text-sm text-gray-700 placeholder-gray-400 focus:border-[#1E40AF] focus:outline-none focus:ring-1 focus:ring-[#1E40AF]"
          />
          <kbd className="absolute right-3 top-1/2 -translate-y-1/2 rounded border border-gray-200 bg-white px-1.5 py-0.5 text-[10px] font-medium text-gray-400">
            /
          </kbd>
        </div>
      </div>

      {/* Right — icons + avatar */}
      <div className="flex items-center gap-2">
        <button className="rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors">
          <Sun className="h-5 w-5" />
        </button>
        <button className="rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors">
          <History className="h-5 w-5" />
        </button>
        <button className="relative rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors">
          <Bell className="h-5 w-5" />
        </button>

        {/* User avatar + dropdown */}
        <div className="relative ml-2" ref={menuRef}>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-[#1E3A5F] text-sm font-semibold text-white hover:bg-[#162d4a] transition-colors"
          >
            {initials}
          </button>

          {menuOpen && (
            <div className="absolute right-0 mt-2 w-56 rounded-lg border border-gray-200 bg-white py-2 shadow-lg">
              <div className="px-4 py-2 border-b border-gray-100">
                <p className="text-sm font-medium text-gray-800">{user?.name || "User"}</p>
                <p className="text-xs text-gray-400">{user?.email || ""}</p>
                <p className="text-xs text-gray-400 mt-0.5">{user?.role || ""}</p>
              </div>
              <button
                onClick={logout}
                className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
              >
                <LogOut className="h-4 w-4" />
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
