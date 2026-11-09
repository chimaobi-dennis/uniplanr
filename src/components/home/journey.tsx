const steps = [
  { title: "Tell us about you", body: "Share your background, interests and budget in a short onboarding." },
  { title: "Get matched", body: "See programs ranked by how well they fit your profile and requirements." },
  { title: "Apply with confidence", body: "Track documents and deadlines, and draft your SOP and CV with AI help." },
  { title: "Land and thrive", body: "Visa, travel and settling-in support so you arrive ready." },
];

export function Journey() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <h2 className="max-w-2xl font-display text-3xl font-bold tracking-tight sm:text-4xl">From first thought to final graduation</h2>
      <ol className="mt-12 grid gap-6 md:grid-cols-4">
        {steps.map((s, i) => (
          <li key={s.title} className="relative">
            <span className="grid size-12 place-items-center rounded-full bg-ink font-display text-lg font-bold text-brand">{i + 1}</span>
            <h3 className="mt-5 font-display text-lg font-semibold">{s.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{s.body}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
