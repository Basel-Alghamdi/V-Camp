"use client";

import React from "react";
import Link from "next/link";
import { Star } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="bg-[#F8F9FB] py-20 lg:py-28 px-6">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">
        {/* LEFT SIDE */}
        <div className="lg:w-1/2">
          <span className="inline-flex items-center gap-2 rounded-full bg-blue-50 border border-blue-100 px-4 py-1.5 text-sm text-blue-700 font-medium">
            <Star className="h-3.5 w-3.5 fill-blue-600 text-blue-600" />
            Trusted by 500+ Owners Associations
          </span>

          <h1 className="text-4xl lg:text-[52px] font-bold text-[#1E3A5F] leading-tight mt-6">
            Manage your
            <br />
            community
            <br />
            with clarity
          </h1>

          <p className="mt-6 text-lg text-gray-500 max-w-md leading-relaxed">
            A centralized platform that gives Owners Associations complete
            control — from maintenance requests and vendor contracts to budgets,
            voting, and resident communication.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/register"
              className="bg-[#1E40AF] text-white rounded-lg px-8 py-3.5 text-sm font-semibold hover:bg-[#1a3899] transition"
            >
              Start free trial
            </Link>
            <button
              onClick={() =>
                document
                  .getElementById("dashboard-preview")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="border border-gray-300 text-gray-700 rounded-lg px-8 py-3.5 text-sm font-semibold hover:bg-gray-50 transition"
            >
              Schedule a demo
            </button>
          </div>

          <div className="mt-8 flex items-center gap-3">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full border-2 border-white bg-teal-500" />
              <div className="w-8 h-8 rounded-full border-2 border-white bg-blue-500 -ml-2" />
              <div className="w-8 h-8 rounded-full border-2 border-white bg-purple-500 -ml-2" />
              <div className="w-8 h-8 rounded-full border-2 border-white bg-amber-500 -ml-2" />
              <div className="w-8 h-8 rounded-full border-2 border-white bg-rose-500 -ml-2" />
            </div>
            <span className="text-sm text-gray-500">
              <strong className="text-gray-700">2,400+ managers</strong> trust their
              communities on AssociO
            </span>
          </div>
        </div>

        {/* RIGHT SIDE — Dashboard Preview Card */}
        <div className="lg:w-1/2">
          <div className="bg-white rounded-2xl shadow-2xl p-6 border border-gray-100">
            {/* Top stat row */}
            <div className="flex gap-3 mb-4">
              <div className="flex-1 bg-gray-50 rounded-xl p-4">
                <p className="text-xs text-gray-400 mb-1">Maintenance Fees</p>
                <p className="text-2xl font-bold text-[#1E3A5F]">$54.00</p>
                <div className="flex items-center gap-1 mt-1">
                  <span className="text-xs text-green-600 font-medium bg-green-50 px-1.5 py-0.5 rounded">+12%</span>
                  <span className="text-xs text-gray-400">vs last month</span>
                </div>
              </div>
              <div className="flex-1 bg-gray-50 rounded-xl p-4">
                <p className="text-xs text-gray-400 mb-1">Total Expenses</p>
                <p className="text-2xl font-bold text-[#1E3A5F]">$60.00</p>
                <div className="flex items-center gap-1 mt-1">
                  <span className="text-xs text-red-600 font-medium bg-red-50 px-1.5 py-0.5 rounded">-3%</span>
                  <span className="text-xs text-gray-400">vs last month</span>
                </div>
              </div>
            </div>

            {/* Mini chart */}
            <svg
              viewBox="0 0 400 100"
              className="h-24 w-full mb-4"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="heroGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#1E40AF" stopOpacity="0.12" />
                  <stop offset="100%" stopColor="#1E40AF" stopOpacity="0" />
                </linearGradient>
              </defs>
              <polygon
                fill="url(#heroGrad)"
                points="0,80 40,65 80,70 120,50 160,55 200,35 240,40 280,25 320,30 360,15 400,25 400,100 0,100"
              />
              <polyline
                stroke="#1E40AF"
                fill="none"
                strokeWidth="2.5"
                strokeLinecap="round"
                points="0,80 40,65 80,70 120,50 160,55 200,35 240,40 280,25 320,30 360,15 400,25"
              />
            </svg>

            {/* Transaction rows */}
            <div className="space-y-0">
              <div className="flex items-center gap-3 py-3 border-t border-gray-100">
                <div className="w-2 h-2 rounded-full bg-blue-500" />
                <span className="text-sm text-gray-700 flex-1">Pool Maintenance</span>
                <span className="text-sm font-semibold text-gray-800">$1,250</span>
                <span className="bg-green-50 text-green-600 text-xs font-medium px-2.5 py-1 rounded-full">Paid</span>
              </div>
              <div className="flex items-center gap-3 py-3 border-t border-gray-100">
                <div className="w-2 h-2 rounded-full bg-amber-500" />
                <span className="text-sm text-gray-700 flex-1">Garden Service</span>
                <span className="text-sm font-semibold text-gray-800">$250</span>
                <span className="bg-amber-50 text-amber-600 text-xs font-medium px-2.5 py-1 rounded-full">Pending</span>
              </div>
            </div>

            {/* Bottom counter */}
            <div className="mt-4 pt-4 border-t border-gray-100 text-center">
              <p className="text-3xl font-bold text-[#1E3A5F]">78</p>
              <p className="text-xs text-gray-400 mt-0.5">Active requests</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
