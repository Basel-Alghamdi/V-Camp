import { Check } from "lucide-react";
import Link from "next/link";

const plans = [
  {
    label: "STARTER",
    price: "Free",
    priceSuffix: "",
    subtext: "Up to 20 units",
    features: [
      "Up to 20 units",
      "Maintenance requests",
      "Announcements",
      "2 admin users",
    ],
    cta: "Get Started Free",
    href: "/register",
    highlighted: false,
  },
  {
    label: "PROFESSIONAL",
    price: "$149",
    priceSuffix: "/month",
    subtext: "Up to 200 units",
    features: [
      "Unlimited maintenance requests",
      "Service provider directory",
      "Document vault",
      "Digital voting",
      "Financial dashboard",
      "Activity log & audit trail",
      "Unlimited admin users",
    ],
    cta: "Start Free Trial",
    href: "/register",
    highlighted: true,
  },
  {
    label: "ENTERPRISE",
    price: "Custom",
    priceSuffix: "",
    subtext: "Unlimited units",
    features: [
      "Everything in Professional",
      "Multiple buildings",
      "Custom integrations",
      "Dedicated account manager",
      "Unlimited storage",
      "Priority 24/7 support",
    ],
    cta: "Talk to Sales",
    href: "/register",
    highlighted: false,
  },
];

export default function PricingSection() {
  return (
    <section className="bg-white py-20 px-6" id="pricing">
      <div className="max-w-3xl mx-auto text-center mb-16">
        <p className="text-sm font-semibold text-[#008080] uppercase tracking-wider">
          Pricing
        </p>
        <h2 className="mt-3 text-3xl lg:text-4xl font-bold text-[#1E3A5F]">
          Simple, transparent pricing
        </h2>
        <p className="mt-4 text-lg text-gray-500">
          Start free today, no credit card required. Scale as your community
          grows.
        </p>
      </div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        {plans.map((plan) => (
          <div
            key={plan.label}
            className={`rounded-xl p-8 border ${
              plan.highlighted
                ? "bg-white border-2 border-[#1E40AF] relative shadow-lg scale-105"
                : "bg-white border-gray-200"
            }`}
          >
            {plan.highlighted && (
              <span className="absolute -top-3 right-6 bg-amber-400 text-amber-900 text-xs font-bold px-3 py-1 rounded-full">
                Most Popular
              </span>
            )}

            <p className="text-sm font-semibold text-gray-500 uppercase">
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
            <p className="text-sm text-gray-400 mt-1">{plan.subtext}</p>

            <ul className="mt-8 space-y-3">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="text-sm text-gray-600">{feature}</span>
                </li>
              ))}
            </ul>

            <Link
              href={plan.href}
              className={`mt-8 w-full block text-center rounded-lg py-3 text-sm font-semibold transition ${
                plan.highlighted
                  ? "bg-[#1E40AF] text-white hover:bg-[#1a3899]"
                  : "border border-[#1E40AF] text-[#1E40AF] hover:bg-blue-50"
              }`}
            >
              {plan.cta}
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
