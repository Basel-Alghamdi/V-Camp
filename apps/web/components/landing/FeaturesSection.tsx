import {
  Wrench,
  Megaphone,
  Users,
  FileText,
  CheckSquare,
  DollarSign,
} from "lucide-react";

const features = [
  {
    icon: Wrench,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
    title: "Maintenance Management",
    desc: "Track every request from submission to resolution. Assign vendors, set deadlines, and keep residents informed at every step.",
    link: "Explore Maintenance →",
  },
  {
    icon: Megaphone,
    iconBg: "bg-purple-50",
    iconColor: "text-purple-600",
    title: "Community Announcements",
    desc: "From urgent alerts to routine updates, keep every resident informed instantly with priority-tagged broadcasts.",
    link: "Transparent updates →",
  },
  {
    icon: Users,
    iconBg: "bg-green-50",
    iconColor: "text-green-600",
    title: "Service Provider Directory",
    desc: "Manage your trusted vendors — electricians, plumbers, security and cleaning — with ratings, contracts, and scheduling.",
    link: "Verified Contractors →",
  },
  {
    icon: FileText,
    iconBg: "bg-amber-50",
    iconColor: "text-amber-600",
    title: "Document Center",
    desc: "Organize invoices, contracts, inspection reports, and vendor files in a searchable, categorized vault.",
    link: "Find files instantly →",
  },
  {
    icon: CheckSquare,
    iconBg: "bg-red-50",
    iconColor: "text-red-600",
    title: "Community Voting",
    desc: "Create polls and let unit owners vote on important decisions digitally — fully documented with timestamps.",
    link: "Transparent voting →",
  },
  {
    icon: DollarSign,
    iconBg: "bg-teal-50",
    iconColor: "text-teal-600",
    title: "Budget & Finance Overview",
    desc: "Get a clear view of your association finances — collected fees, monthly expenses, and full transaction history.",
    link: "Always in control →",
  },
];

export default function FeaturesSection() {
  return (
    <section className="bg-white py-20 px-6" id="features">
      <div className="max-w-3xl mx-auto text-center mb-16">
        <p className="text-sm font-semibold text-[#008080] uppercase tracking-wider">
          Everything you need
        </p>
        <h2 className="mt-3 text-3xl lg:text-4xl font-bold text-[#1E3A5F]">
          Powerful tools for modern property management
        </h2>
        <p className="mt-4 text-lg text-gray-500">
          Streamline operations, improve communication, and keep your community
          running smoothly — all from one platform.
        </p>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <div
              key={feature.title}
              className="bg-white border border-gray-100 rounded-xl p-6 hover:shadow-md transition-shadow group"
            >
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${feature.iconBg}`}
              >
                <Icon className={`w-6 h-6 ${feature.iconColor}`} />
              </div>
              <h3 className="text-lg font-semibold text-[#1E3A5F] mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed mb-4">
                {feature.desc}
              </p>
              <span className="text-sm font-medium text-[#008080] group-hover:underline">
                {feature.link}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
