"use client";

import { Check } from "lucide-react";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";

const plans = [
  {
    label: "STARTER",
    name: "Free",
    price: "Free",
    priceSuffix: "",
    subtext: "Perfect for small associations getting started with digital management",
    features: [
      "Up to 10 units",
      "Maintenance requests",
      "Announcements",
      "Document Storage",
      "2 Admin users",
      "Email Support",
    ],
    cta: "Get started",
    href: "/register",
    highlighted: false,
  },
  {
    label: "POPULAR",
    name: "Pro",
    price: "$149",
    priceSuffix: "/mo",
    subtext: "Advanced features for growing associations & managing complexes",
    features: [
      "Multiple properties",
      "All tools included",
      "Budget & expenses",
      "Custom integrations",
      "SSL & advanced security",
      "Priority support",
    ],
    cta: "Start 14-day free trial",
    ctaSubtext: "No credit card required",
    href: "/register",
    highlighted: true,
  },
  {
    label: "ENTERPRISE",
    name: "Custom",
    price: "Custom",
    priceSuffix: "",
    subtext: "For property management companies with complex needs",
    features: [
      "Custom integrations",
      "Single Sign-On (SSO)",
      "Advanced Analytics",
      "Priority 24/7 support",
    ],
    cta: "Contact sales",
    href: "/register",
    highlighted: false,
  },
];

export default function PricingSection() {
  const t = useTranslations("landing");
  const locale = useLocale();

  return (
    <section className="bg-white py-20 px-6" id="pricing">
      <div className="max-w-3xl mx-auto text-center mb-16">
        <p className="text-sm font-semibold text-[#1E40AF] uppercase tracking-wider">
          {t("pricingEyebrow")}
        </p>
        <h2 className="mt-3 text-3xl lg:text-4xl font-bold text-[#1E3A5F]">
          {t("pricingTitle")}
        </h2>
        <p className="mt-4 text-lg text-gray-500">
          {t("pricingSubtitle")}
        </p>
      </div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
        {plans.map((plan) => (
          <div
            key={plan.label}
            className={`rounded-2xl p-8 border flex flex-col ${
              plan.highlighted
                ? "bg-white border-2 border-[#1E40AF] relative shadow-lg"
                : "bg-white border-gray-200"
            }`}
          >
            {plan.highlighted && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-400 text-amber-900 text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap">
                {t("mostPopular")}
              </span>
            )}

            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              {plan.label}
            </p>

            <div className="mt-4">
              <span className="text-4xl font-bold text-[#1E3A5F]">
                {plan.price}
              </span>
              {plan.priceSuffix && (
                <span className="text-lg font-normal text-gray-400">
                  {plan.priceSuffix}
                </span>
              )}
            </div>
            <p className="text-sm text-gray-400 mt-2 leading-relaxed">{plan.subtext}</p>

            <ul className="mt-8 space-y-3 flex-1">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-center gap-2.5">
                  <Check className="h-4 w-4 text-green-500 shrink-0" />
                  <span className="text-sm text-gray-600">{feature}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <Link
                href={`/${locale}${plan.href}`}
                className={`w-full block text-center rounded-lg py-3 text-sm font-semibold transition ${
                  plan.highlighted
                    ? "bg-[#1E40AF] text-white hover:bg-[#1a3899]"
                    : "border border-[#1E40AF] text-[#1E40AF] hover:bg-blue-50"
                }`}
              >
                {plan.cta}
              </Link>
              {"ctaSubtext" in plan && plan.ctaSubtext && (
                <p className="text-xs text-gray-400 text-center mt-2">
                  {plan.ctaSubtext}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
