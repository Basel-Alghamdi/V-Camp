"use client";

import React, { useState, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { useLocale } from "next-intl";
import Sidebar from "@/components/layout/Sidebar";
import TopBar from "@/components/layout/TopBar";
import QueryProvider from "@/components/providers/QueryProvider";
import { useAuthStore } from "@/store/auth.store";
import { useThemeStore } from "@/store/theme.store";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);
  const { initFromStorage } = useAuthStore();
  const { init: initTheme } = useThemeStore();
  const locale = useLocale();
  const isRTL = locale === "ar";

  useEffect(() => {
    initFromStorage();
    initTheme();
  }, [initFromStorage, initTheme]);

  return (
    <QueryProvider>
      <div className="flex min-h-screen bg-[#F3F4F6] dark:bg-gray-950">
        {/* Sidebar */}
        <Sidebar
          collapsed={collapsed}
          onToggle={() => setCollapsed(!collapsed)}
        />

        {/* Main content area */}
        <div
          className={`flex flex-1 flex-col transition-all duration-300 ${
            isRTL
              ? collapsed ? "mr-16" : "mr-60"
              : collapsed ? "ml-16" : "ml-60"
          }`}
        >
          <TopBar
            sidebarCollapsed={collapsed}
            onToggleSidebar={() => setCollapsed(!collapsed)}
          />
          <main className="flex-1 overflow-auto p-6">{children}</main>
        </div>
      </div>
      <Toaster position={isRTL ? "top-left" : "top-right"} />
    </QueryProvider>
  );
}
