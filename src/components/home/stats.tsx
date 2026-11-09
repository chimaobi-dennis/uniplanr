const stats = [
  { value: "100+", label: "Countries our students come from" },
  { value: "850+", label: "Swedish master's programmes" },
  { value: "24/7", label: "UniAI study assistant" },
];

export function Stats() {
  return (
    <section className="bg-ink py-16 text-white">
      <dl className="mx-auto grid max-w-6xl gap-10 px-6 text-center sm:grid-cols-3">
        {stats.map((s) => (
          <div key={s.label} className="flex flex-col">
            <dt className="order-2 mt-2 text-sm text-white/60">{s.label}</dt>
            <dd className="order-1 font-display text-5xl font-bold text-brand">{s.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
