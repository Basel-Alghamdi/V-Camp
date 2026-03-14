const steps = [
  {
    number: 1,
    title: "Set up your association",
    description:
      "Create your account, invite board members, and configure roles and permissions under 5 minutes.",
  },
  {
    number: 2,
    title: "Onboard your team & vendors",
    description:
      "Add building managers, service vendors, and connect owners automatically learn to the platform.",
  },
  {
    number: 3,
    title: "Manage everything in one place",
    description:
      "Residents submit requests, owners vote, managers and owner visibility across all activities.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-[#F8F9FB] py-20 px-6">
      <div className="max-w-3xl mx-auto text-center mb-16">
        <p className="text-sm font-semibold text-[#1E40AF] uppercase tracking-wider">
          How It Works
        </p>
        <h2 className="mt-3 text-3xl lg:text-4xl font-bold text-[#1E3A5F]">
          Up and running in
          <br />
          <span className="text-[#1E40AF]">minutes</span>, not months
        </h2>
      </div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 relative">
        {/* Connector lines between steps (desktop) */}
        <div className="hidden md:block absolute top-7 left-[33.33%] w-[33.33%] h-0.5 bg-gray-200" />

        {steps.map((step) => (
          <div key={step.number} className="text-center">
            <div className="mx-auto w-14 h-14 rounded-full flex items-center justify-center text-xl font-bold text-white mb-6 bg-[#1E40AF]">
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
