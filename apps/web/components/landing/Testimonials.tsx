import { Star } from "lucide-react";

const testimonials = [
  {
    quote:
      "This saves from buying maintenance to a standalone tool. Everything is in one place, from the tracker to vendor management.",
    name: "Ahmad Al-Masoudi",
    role: "Riyadh, SA",
    initials: "AM",
    avatarColor: "bg-teal-500",
  },
  {
    quote:
      "The vendor management and document center which saved countless hours — all contracts are accessible and everything is documented.",
    name: "Sara Lopez",
    role: "Dubai, Sector Twelve",
    initials: "SL",
    avatarColor: "bg-blue-500",
  },
  {
    quote:
      "The association/co module keeps our 200+ members engaged. Last vote had 85% participation — we didn't know about this kind of involvement.",
    name: "Nora Rashid",
    role: "Cityville, Masr",
    initials: "NR",
    avatarColor: "bg-purple-500",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-[#F8F9FB] py-20 px-6">
      <div className="text-center mb-16">
        <p className="text-sm font-semibold text-[#1E40AF] uppercase tracking-wider">
          Community Stories
        </p>
        <h2 className="mt-3 text-3xl lg:text-4xl font-bold text-[#1E3A5F]">
          Loved by community
          <br />
          managers everywhere
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

            <p className="text-sm text-gray-600 leading-relaxed mb-6">
              &ldquo;{t.quote}&rdquo;
            </p>

            <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
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
