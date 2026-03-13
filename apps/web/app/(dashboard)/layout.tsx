"use client";

import React, { useState, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import Sidebar from "@/components/layout/Sidebar";
import TopBar from "@/components/layout/TopBar";
import QueryProvider from "@/components/providers/QueryProvider";
import { useAuthStore } from "@/store/auth.store";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);
  const { initFromStorage } = useAuthStore();

  useEffect(() => {
    initFromStorage();
  }, [initFromStorage]);

  return (
    <QueryProvider>
      <div className="flex min-h-screen bg-[#F3F4F6]">
        {/* Sidebar */}
        <Sidebar
          collapsed={collapsed}
          onToggle={() => setCollapsed(!collapsed)}
        />

        {/* Main content area */}
        <div
          className={`flex flex-1 flex-col transition-all duration-300 ${
            collapsed ? "ml-16" : "ml-60"
          }`}
        >
          <TopBar
            sidebarCollapsed={collapsed}
            onToggleSidebar={() => setCollapsed(!collapsed)}
          />
          <main className="flex-1 overflow-auto p-6">{children}</main>
        </div>
      </div>
      <Toaster position="top-right" />
    </QueryProvider>
  );
}
