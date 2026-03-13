const steps = [
  {
    number: 1,
    bg: "bg-[#1E40AF]",
    title: "Set up your association",
    description:
      "Enter your building details, add unit count, invite board members, and configure vendors in under 10 minutes.",
  },
  {
    number: 2,
    bg: "bg-[#008080]",
    title: "Onboard your team & vendors",
    description:
      "Send invite links to building managers and service providers. Set roles and permissions instantly.",
  },
  {
    number: 3,
    bg: "bg-[#1E3A5F]",
    title: "Manage everything in one place",
    description:
      "Residents can submit requests, owners can vote, managers can track everything — all from one dashboard.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-[#F3F4F6] py-20 px-6">
      <div className="max-w-3xl mx-auto text-center mb-16">
        <p className="text-sm font-semibold text-[#008080] uppercase tracking-wider">
          Getting Started
        </p>
        <h2 className="mt-3 text-3xl lg:text-4xl font-bold text-[#1E3A5F]">
          Up and running in minutes, not months
        </h2>
      </div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 relative">
        {/* Connector arrow between step 1 and step 2 */}
        <svg
          className="hidden md:block absolute top-7 left-[33.33%] -translate-x-1/2"
          width="40"
          height="16"
          viewBox="0 0 40 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 8H36M36 8L28 1M36 8L28 15"
            stroke="#CBD5E1"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        {/* Connector arrow between step 2 and step 3 */}
        <svg
          className="hidden md:block absolute top-7 left-[66.66%] -translate-x-1/2"
          width="40"
          height="16"
          viewBox="0 0 40 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 8H36M36 8L28 1M36 8L28 15"
            stroke="#CBD5E1"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        {steps.map((step) => (
          <div key={step.number} className="text-center">
            <div
              className={`mx-auto w-14 h-14 rounded-full flex items-center justify-center text-xl font-bold text-white mb-6 ${step.bg}`}
            >
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
