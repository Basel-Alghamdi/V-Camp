"use client";

import {
  Wrench,
  Megaphone,
  Users,
  FileText,
  CheckSquare,
  DollarSign,
} from "lucide-react";
import { useTranslations } from "next-intl";

const featureKeys = [
  {
    icon: Wrench,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
    titleKey: "featureMaintenance",
    descKey: "featureMaintenanceDesc",
    linkKey: "featureMaintenanceLink",
  },
  {
    icon: Megaphone,
    iconBg: "bg-purple-50",
    iconColor: "text-purple-600",
    titleKey: "featureCommunication",
    descKey: "featureCommunicationDesc",
    linkKey: "featureCommunicationLink",
  },
  {
    icon: Users,
    iconBg: "bg-green-50",
    iconColor: "text-green-600",
    titleKey: "featureServiceProviders",
    descKey: "featureServiceProvidersDesc",
    linkKey: "featureServiceProvidersLink",
  },
  {
    icon: FileText,
    iconBg: "bg-amber-50",
    iconColor: "text-amber-600",
    titleKey: "featureDocuments",
    descKey: "featureDocumentsDesc",
    linkKey: "featureDocumentsLink",
  },
  {
    icon: CheckSquare,
    iconBg: "bg-red-50",
    iconColor: "text-red-600",
    titleKey: "featureVoting",
    descKey: "featureVotingDesc",
    linkKey: "featureVotingLink",
  },
  {
    icon: DollarSign,
    iconBg: "bg-teal-50",
    iconColor: "text-teal-600",
    titleKey: "featureBudget",
    descKey: "featureBudgetDesc",
    linkKey: "featureBudgetLink",
  },
];

export default function FeaturesSection() {
  const t = useTranslations("landing");

  return (
    <section className="bg-white py-20 px-6" id="features">
      <div className="max-w-3xl mx-auto text-center mb-16">
        <p className="text-sm font-semibold text-[#1E40AF] uppercase tracking-wider">
          {t("featuresEyebrow")}
        </p>
        <h2 className="mt-3 text-3xl lg:text-4xl font-bold text-[#1E3A5F]">
          {t("featuresTitle1")}
          <br />
          <span className="text-[#1E40AF]">{t("featuresTitle2")}</span>
        </h2>
        <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
          {t("featuresSubtitle")}
        </p>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {featureKeys.map((feature) => {
          const Icon = feature.icon;
          return (
            <div
              key={feature.titleKey}
              className="bg-white border border-gray-100 rounded-xl p-6 hover:shadow-md transition-shadow group"
            >
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${feature.iconBg}`}
              >
                <Icon className={`w-6 h-6 ${feature.iconColor}`} />
              </div>
              <h3 className="text-lg font-semibold text-[#1E3A5F] mb-2">
                {t(feature.titleKey)}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed mb-4">
                {t(feature.descKey)}
              </p>
              <span className="text-sm font-medium text-[#1E40AF] group-hover:underline cursor-pointer">
                {t(feature.linkKey)} &rarr;
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
