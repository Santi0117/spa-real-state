import { stats } from "@/lib/site";

export default function Stats() {
  return (
    <section className="border-b border-charcoal/8 bg-white">
      <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-charcoal/8 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="px-6 py-10 text-center sm:py-12">
            <p className="font-display text-4xl font-semibold text-charcoal sm:text-5xl">
              {stat.value}
            </p>
            <p className="mt-2 text-[11px] font-medium uppercase tracking-[0.16em] text-slate-warm">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
