"use client";

import { useTranslations } from "next-intl";

export default function HowItWorks() {
  const t = useTranslations("landing");

  const steps = [
    {
      number: 1,
      title: t("howStep1"),
      description: t("howStep1Desc"),
    },
    {
      number: 2,
      title: t("howStep2"),
      description: t("howStep2Desc"),
    },
    {
      number: 3,
      title: t("howStep3"),
      description: t("howStep3Desc"),
    },
  ];

  return (
    <section id="how-it-works" className="bg-[#F8F9FB] py-20 px-6">
      <div className="max-w-3xl mx-auto text-center mb-16">
        <p className="text-sm font-semibold text-[#1E40AF] uppercase tracking-wider">
          {t("howItWorksEyebrow")}
        </p>
        <h2 className="mt-3 text-3xl lg:text-4xl font-bold text-[#1E3A5F]">
          {t("howItWorksTitle1")}
          <br />
          <span className="text-[#1E40AF]">{t("howItWorksTitle2")}</span>{t("howItWorksTitle3")}
        </h2>
      </div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 relative">
        {/* Connector line between step circles (desktop) */}
        <div className="hidden md:block absolute top-7 left-[16.67%] right-[16.67%] h-0.5 bg-gray-200 z-0" />

        {steps.map((step) => (
          <div key={step.number} className="text-center">
            <div className="relative z-10 mx-auto w-14 h-14 rounded-full flex items-center justify-center text-xl font-bold text-white mb-6 bg-[#1E40AF]">
              {step.number}
            </div>
            <h3 className="text-lg font-semibold text-[#1E3A5F] mb-3">
              {step.title}
            </h3>
            <p className="text-sm text-gray-500 leading-relaxed max-w-xs mx-auto">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
