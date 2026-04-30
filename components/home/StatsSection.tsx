import { useTranslations } from "next-intl";

const stats = [
  { value: "10+", key: "years" },
  { value: "50+", key: "countries" },
  { value: "500+", key: "clients" },
  { value: "24/7", key: "support" },
];

export function StatsSection() {
  const t = useTranslations("home.stats");

  return (
    <section className="bg-zinc-950 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.key} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-zinc-500 font-medium tracking-wide">
                {t(stat.key as "years" | "countries" | "clients" | "support")}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
