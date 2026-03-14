"use client";

import React, { useState, useRef, useEffect } from "react";
import { Sun, Moon, History, Bell, Menu, LogOut } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { useAuthStore } from "@/store/auth.store";
import { useThemeStore } from "@/store/theme.store";
import { LanguageToggle } from "@/components/shared/LanguageToggle";

interface TopBarProps {
  sidebarCollapsed: boolean;
  onToggleSidebar: () => void;
}

export default function TopBar({
  sidebarCollapsed,
  onToggleSidebar,
}: TopBarProps) {
  const { user, logout } = useAuthStore();
  const { dark, toggle: toggleTheme } = useThemeStore();
  const t = useTranslations("nav");
  const tc = useTranslations("common");
  const locale = useLocale();
  const isRTL = locale === "ar";
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
    <header className="sticky top-0 z-20 flex h-14 md:h-16 items-center justify-between border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 md:px-4">
      {/* Menu / Toggle */}
      <button
        onClick={onToggleSidebar}
        className="rounded-md p-2 text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Center — search (hidden on mobile) */}
      <div className="hidden sm:flex mx-4 max-w-md flex-1">
        <div className="relative w-full">
          <svg
            className={`absolute top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 ${isRTL ? "right-3" : "left-3"}`}
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
            placeholder={tc("search")}
            className={`w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 py-2 text-sm text-gray-700 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 focus:border-[#1E40AF] focus:outline-none focus:ring-1 focus:ring-[#1E40AF] ${
              isRTL ? "pr-10 pl-10" : "pl-10 pr-10"
            }`}
          />
          <kbd className={`absolute top-1/2 -translate-y-1/2 rounded border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 px-1.5 py-0.5 text-[10px] font-medium text-gray-400 ${
            isRTL ? "left-3" : "right-3"
          }`}>
            /
          </kbd>
        </div>
      </div>

      {/* Right — icons + language toggle + avatar */}
      <div className="flex items-center gap-1 md:gap-2">
        <button
          onClick={toggleTheme}
          className="rounded-md p-2 text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
        >
          {dark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </button>
        <button className="hidden sm:block rounded-md p-2 text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-600 dark:hover:text-gray-200 transition-colors">
          <History className="h-5 w-5" />
        </button>
        <button className="relative rounded-md p-2 text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-600 dark:hover:text-gray-200 transition-colors">
          <Bell className="h-5 w-5" />
        </button>

        <LanguageToggle />

        {/* User avatar + dropdown */}
        <div className={`relative ${isRTL ? "mr-1 md:mr-2" : "ml-1 md:ml-2"}`} ref={menuRef}>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex h-8 w-8 md:h-9 md:w-9 items-center justify-center rounded-full bg-[#1E3A5F] text-xs md:text-sm font-semibold text-white hover:bg-[#162d4a] transition-colors"
          >
            {initials}
          </button>

          {menuOpen && (
            <div className={`absolute mt-2 w-56 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 py-2 shadow-lg ${
              isRTL ? "left-0" : "right-0"
            }`}>
              <div className="px-4 py-2 border-b border-gray-100 dark:border-gray-700">
                <p className="text-sm font-medium text-gray-800 dark:text-gray-100">{user?.name || "User"}</p>
                <p className="text-xs text-gray-400">{user?.email || ""}</p>
                <p className="text-xs text-gray-400 mt-0.5">{user?.role || ""}</p>
              </div>
              <button
                onClick={logout}
                className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
              >
                <LogOut className="h-4 w-4" />
                {t("signOut")}
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
