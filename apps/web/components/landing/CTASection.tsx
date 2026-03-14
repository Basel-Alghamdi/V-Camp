"use client";

import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";

export default function CTASection() {
  const t = useTranslations("landing");
  const locale = useLocale();

  return (
    <section className="bg-[#1E3A5F] py-20 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl lg:text-4xl font-bold text-white leading-tight">
          {t("ctaTitle1")}
          <br />
          {t("ctaTitle2")}
        </h2>
        <p className="mt-4 text-lg text-gray-300 max-w-xl mx-auto">
          {t("ctaSubtitle")}
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href={`/${locale}/register`}
            className="bg-white text-[#1E3A5F] rounded-lg px-8 py-3.5 text-sm font-semibold hover:bg-gray-100 transition"
          >
            {t("ctaStart")}
          </Link>
          <button className="border border-white text-white rounded-lg px-8 py-3.5 text-sm font-semibold hover:bg-white/10 transition">
            {t("ctaDemo")}
          </button>
        </div>
      </div>
    </section>
  );
}
