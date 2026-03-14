import Link from "next/link";

export default function CTASection() {
  return (
    <section className="bg-[#1E3A5F] py-20 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl lg:text-4xl font-bold text-white leading-tight">
          Ready to transform
          <br />
          how you manage your community?
        </h2>
        <p className="mt-4 text-lg text-gray-300 max-w-xl mx-auto">
          Join 500+ associations who trust our platform with safety, shared
          finances, and great value — with one powerful platform.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href="/register"
            className="bg-white text-[#1E3A5F] rounded-lg px-8 py-3.5 text-sm font-semibold hover:bg-gray-100 transition"
          >
            Start free trial
          </Link>
          <button className="border border-white text-white rounded-lg px-8 py-3.5 text-sm font-semibold hover:bg-white/10 transition">
            Schedule a demo
          </button>
        </div>
      </div>
    </section>
  );
}
