const stats = [
  {
    value: "500+",
    label: "Owners Associations",
    sublabel: "using AssociO",
  },
  {
    value: "$2.4M",
    label: "Transactions Processed",
    sublabel: "Monthly",
  },
  {
    value: "98%",
    label: "On-Time Vendor Due",
    sublabel: "for requests",
  },
  {
    value: "12K+",
    label: "Maintenance Activity",
    sublabel: "Managed using the platform",
  },
];

export default function StatsBar() {
  return (
    <section className="bg-[#1E3A5F] py-14">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={
                i < 3 ? "md:border-r md:border-white/20" : ""
              }
            >
              <p className="text-3xl lg:text-4xl font-bold text-white">
                {stat.value}
              </p>
              <p className="text-sm text-gray-300 mt-1">{stat.label}</p>
              <p className="text-xs text-gray-400">{stat.sublabel}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
