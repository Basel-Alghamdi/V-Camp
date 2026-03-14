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
  const [mobileOpen, setMobileOpen] = useState(false);
  const { initFromStorage } = useAuthStore();
  const { init: initTheme } = useThemeStore();
  const locale = useLocale();
  const isRTL = locale === "ar";

  useEffect(() => {
    initFromStorage();
    initTheme();
  }, [initFromStorage, initTheme]);

  // Close mobile sidebar on route change (resize)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <QueryProvider>
      <div className="flex min-h-screen bg-[#F3F4F6] dark:bg-gray-950">
        {/* Mobile overlay */}
        {mobileOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/50 md:hidden"
            onClick={() => setMobileOpen(false)}
          />
        )}

        {/* Sidebar — hidden on mobile unless mobileOpen */}
        <div
          className={`fixed top-0 z-50 h-screen transition-transform duration-300 md:translate-x-0 md:z-30 ${
            isRTL ? "right-0" : "left-0"
          } ${
            mobileOpen
              ? "translate-x-0"
              : isRTL
                ? "translate-x-full"
                : "-translate-x-full"
          } md:block`}
        >
          <Sidebar
            collapsed={collapsed}
            onToggle={() => setCollapsed(!collapsed)}
            onNavigate={() => setMobileOpen(false)}
          />
        </div>

        {/* Main content area */}
        <div
          className={`flex min-w-0 flex-1 flex-col overflow-hidden transition-all duration-300 ${
            isRTL
              ? collapsed ? "md:mr-16" : "md:mr-60"
              : collapsed ? "md:ml-16" : "md:ml-60"
          }`}
        >
          <TopBar
            sidebarCollapsed={collapsed}
            onToggleSidebar={() => {
              // On mobile: toggle drawer. On desktop: collapse sidebar.
              if (window.innerWidth < 768) {
                setMobileOpen(!mobileOpen);
              } else {
                setCollapsed(!collapsed);
              }
            }}
          />
          <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 md:p-6">{children}</main>
        </div>
      </div>
      <Toaster position={isRTL ? "top-left" : "top-right"} />
    </QueryProvider>
  );
}
