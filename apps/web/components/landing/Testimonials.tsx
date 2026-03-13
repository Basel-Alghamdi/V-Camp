import { Star } from "lucide-react";

const testimonials = [
  {
    quote:
      "Our building management transformed completely. Maintenance requests are handled automatically and residents are notified instantly.",
    name: "Sarah Al-Mutairi",
    role: "Board Member in Riyadh",
    initials: "SM",
    avatarColor: "bg-teal-500",
  },
  {
    quote:
      "The vendor management and document center made our 120-unit building run like clockwork. Contracts are accessible and everything is documented.",
    name: "Omar Khalid",
    role: "Building Manager",
    initials: "OK",
    avatarColor: "bg-blue-500",
  },
  {
    quote:
      "The association voted on the new pool renovation completely online. Every owner participated and the result was documented instantly.",
    name: "Nora Fahad",
    role: "Unit Owner, Tower B",
    initials: "NF",
    avatarColor: "bg-purple-500",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-[#F3F4F6] py-20 px-6">
      <div className="text-center mb-16">
        <h2 className="text-3xl lg:text-4xl font-bold text-[#1E3A5F]">
          Loved by community managers everywhere
        </h2>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((t) => (
          <div
            key={t.name}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
          >
            <div className="flex gap-1 mb-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className="h-4 w-4 fill-amber-400 text-amber-400"
                />
              ))}
            </div>

            <p className="text-sm text-gray-600 leading-relaxed mb-6 italic">
              &ldquo;{t.quote}&rdquo;
            </p>

            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white ${t.avatarColor}`}
              >
                {t.initials}
              </div>
              <div>
                <p className="text-sm font-semibold text-[#1E3A5F]">
                  {t.name}
                </p>
                <p className="text-xs text-gray-400">{t.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
