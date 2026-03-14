"use client";

import { Building2 } from "lucide-react";
import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("landing");

  return (
    <footer className="bg-[#0F172A] text-white py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1 — Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#1E40AF]">
                <Building2 className="h-4 w-4 text-white" />
              </div>
              <span className="font-bold text-lg">AssociO</span>
            </div>
            <p className="text-sm text-gray-400 mb-6 max-w-xs leading-relaxed">
              {t("footerDesc")}
            </p>
          </div>

          {/* Col 2 — Product */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              {t("footerProduct")}
            </h4>
            <div className="space-y-3">
              <p className="text-sm text-gray-400 hover:text-white transition-colors cursor-pointer">{t("footerFeatures")}</p>
              <p className="text-sm text-gray-400 hover:text-white transition-colors cursor-pointer">{t("footerPricing")}</p>
              <p className="text-sm text-gray-400 hover:text-white transition-colors cursor-pointer">{t("footerDashboard")}</p>
              <p className="text-sm text-gray-400 hover:text-white transition-colors cursor-pointer">{t("footerAPI")}</p>
            </div>
          </div>

          {/* Col 3 — Company */}
          <div>
            <h4
              id="resources"
              className="text-sm font-semibold text-white uppercase tracking-wider mb-4"
            >
              {t("footerCompany")}
            </h4>
            <div className="space-y-3">
              <p className="text-sm text-gray-400 hover:text-white transition-colors cursor-pointer">{t("footerBlog")}</p>
              <p className="text-sm text-gray-400 hover:text-white transition-colors cursor-pointer">{t("footerHelp")}</p>
              <p className="text-sm text-gray-400 hover:text-white transition-colors cursor-pointer">{t("footerAbout")}</p>
              <p className="text-sm text-gray-400 hover:text-white transition-colors cursor-pointer">{t("footerCareers")}</p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-700 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-400">
            &copy; 2026 AssociO. {t("footerRights")}
          </p>
          <div className="flex gap-6">
            <span className="text-sm text-gray-400 hover:text-white cursor-pointer">{t("footerPrivacy")}</span>
            <span className="text-sm text-gray-400 hover:text-white cursor-pointer">{t("footerTerms")}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
