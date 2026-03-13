const stats = [
  { value: "500+", label: "Buildings managed" },
  { value: "$2.4M", label: "Monthly fees handled" },
  { value: "98%", label: "On-time maintenance" },
  { value: "12K+", label: "Residents served" },
];

export default function StatsBar() {
  return (
    <section className="bg-[#1E3A5F] py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={
                i < 3
                  ? "md:border-r md:border-white/20"
                  : ""
              }
            >
              <p className="text-3xl lg:text-4xl font-bold text-white">
                {stat.value}
              </p>
              <p className="text-sm text-gray-300 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
