"use client";

import React from "react";
import Link from "next/link";

export default function HeroSection() {
  const scrollToDashboard = () => {
    const el = document.getElementById("dashboard-preview");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="bg-[#F3F4F6] py-20 lg:py-28 px-6">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">
        {/* LEFT SIDE */}
        <div className="lg:w-1/2">
          <span className="inline-flex items-center gap-2 rounded-full bg-blue-50 border border-blue-100 px-4 py-1.5 text-sm text-blue-700 font-medium">
            Trusted by 500+ Owners Associations
          </span>

          <h1 className="text-4xl lg:text-5xl font-bold text-[#1E3A5F] leading-tight mt-6">
            Manage your
            <br />
            community
            <br />
            <span className="text-[#008080]">with clarity</span>
          </h1>

          <p className="mt-6 text-lg text-gray-500 max-w-md leading-relaxed">
            A centralized platform that gives Owners Associations complete
            control — from maintenance requests to financial transparency and
            resident communications.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/register"
              className="bg-[#1E40AF] text-white rounded-lg px-8 py-4 text-sm font-semibold hover:bg-[#1a3899] transition"
            >
              Get Started
            </Link>
            <button
              onClick={scrollToDashboard}
              className="border border-[#1E40AF] text-[#1E40AF] rounded-lg px-8 py-4 text-sm font-semibold hover:bg-blue-50 transition"
            >
              See the platform
            </button>
          </div>

          <div className="mt-6 flex items-center gap-3">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full border-2 border-white bg-teal-500" />
              <div className="w-8 h-8 rounded-full border-2 border-white bg-blue-500 -ml-2" />
              <div className="w-8 h-8 rounded-full border-2 border-white bg-purple-500 -ml-2" />
              <div className="w-8 h-8 rounded-full border-2 border-white bg-amber-500 -ml-2" />
              <div className="w-8 h-8 rounded-full border-2 border-white bg-rose-500 -ml-2" />
            </div>
            <span className="text-sm text-gray-500">
              1,400+ managers use our platform
            </span>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="lg:w-1/2">
          <div className="bg-white rounded-2xl shadow-2xl p-6 border border-gray-100">
            {/* Stat Cards */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-gray-500">Total Budget</p>
                <p className="text-lg font-bold text-[#1E3A5F]">
                  $40,684{" "}
                  <span className="inline-flex bg-green-50 text-green-600 text-xs px-1.5 py-0.5 rounded">
                    +8.5%
                  </span>
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-gray-500">Total Expenses</p>
                <p className="text-lg font-bold text-[#1E3A5F]">$40,684</p>
              </div>
            </div>

            {/* Mini SVG Chart */}
            <svg
              viewBox="0 0 400 100"
              className="h-24 w-full mb-4"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient
                  id="chartGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="0%" stopColor="#1E40AF" stopOpacity="0.15" />
                  <stop offset="100%" stopColor="#1E40AF" stopOpacity="0" />
                </linearGradient>
              </defs>
              <polygon
                fill="url(#chartGradient)"
                points="0,80 50,60 100,70 150,40 200,50 250,30 300,45 350,20 400,35 400,100 0,100"
              />
              <polyline
                stroke="#1E40AF"
                fill="none"
                strokeWidth="2"
                points="0,80 50,60 100,70 150,40 200,50 250,30 300,45 350,20 400,35"
              />
            </svg>

            {/* Transaction Rows */}
            <div className="flex items-center gap-3 py-2 border-t border-gray-100">
              <div className="w-2 h-2 rounded-full bg-blue-500" />
              <span className="text-sm text-gray-700 flex-1">
                Pool Maintenance
              </span>
              <span className="text-sm font-semibold">$1,250</span>
              <span className="bg-green-50 text-green-600 text-xs px-2 py-0.5 rounded-full">
                Paid
              </span>
            </div>
            <div className="flex items-center gap-3 py-2 border-t border-gray-100">
              <div className="w-2 h-2 rounded-full bg-amber-500" />
              <span className="text-sm text-gray-700 flex-1">
                Garden Maintenance
              </span>
              <span className="text-sm font-semibold">$250</span>
              <span className="bg-amber-50 text-amber-600 text-xs px-2 py-0.5 rounded-full">
                Pending
              </span>
            </div>

            {/* Bottom */}
            <div className="mt-3 text-center">
              <p className="text-3xl font-bold text-[#1E3A5F]">78</p>
              <p className="text-xs text-gray-400">Active requests</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
