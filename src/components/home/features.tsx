import { BookOpenCheck, Globe2, HeartHandshake, UserRoundCheck } from "lucide-react";

const features = [
  {
    icon: UserRoundCheck,
    title: "Personalized journeys",
    body: "Program and country recommendations based on your personality, interests and goals.",
  },
  {
    icon: BookOpenCheck,
    title: "Stress-free applications",
    body: "Never miss a step: from SOPs and visas to documentation and deadlines, it's sorted.",
  },
  {
    icon: HeartHandshake,
    title: "Real integration support",
    body: "Help adapting to your new life: language, accommodation, local culture and more.",
  },
  {
    icon: Globe2,
    title: "Built for global students",
    body: "Whether you're in Lagos, Lahore or London, the platform speaks your language.",
  },
];

export function Features() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <div className="max-w-2xl">
        <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">Not just a consultancy. Your lifetool.</h2>
        <p className="mt-4 text-lg text-muted">
          Traditional agents leave you at the airport. Uniplanr stays by your side from day one, and every day after.
        </p>
      </div>
      <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {features.map(({ icon: Icon, title, body }) => (
          <li key={title} className="rounded-3xl border border-ink/10 p-6 transition-shadow hover:shadow-xl hover:shadow-ink/5">
            <span className="grid size-11 place-items-center rounded-2xl bg-brand">
              <Icon size={20} aria-hidden />
            </span>
            <h3 className="mt-5 font-display text-lg font-semibold">{title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{body}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
