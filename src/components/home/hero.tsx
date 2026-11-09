import { ArrowRight, Compass, Plane, Sparkles } from "lucide-react";
import { links } from "@/lib/links";
import { ButtonLink } from "@/components/ui/button";

const pills = [
  { icon: Sparkles, label: "AI-powered matching" },
  { icon: Plane, label: "Visa & travel support" },
  { icon: Compass, label: "Lifelong guidance" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute -right-40 -top-24 size-[34rem] rounded-full bg-lilac blur-3xl" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-6 pb-20 pt-16 lg:grid-cols-[1.1fr_1fr] lg:pt-24">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full bg-lilac px-4 py-1.5 text-sm font-medium">
            <span className="size-2 rounded-full bg-ink" /> Built by international students, for students
          </p>
          <h1 className="mt-6 font-display text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl">
            Your global <span className="rounded-xl bg-brand px-2">study</span> lifetool
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
            From first thought to final graduation, Uniplanr guides you every step of your study abroad journey: programs, applications, documents and life after you arrive.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href={links.getStarted}>
              Get Started <ArrowRight size={16} />
            </ButtonLink>
            <ButtonLink href={links.programs} variant="outline">
              Explore programs
            </ButtonLink>
          </div>
          <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium">
            {pills.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-2">
                <Icon size={16} aria-hidden /> {label}
              </li>
            ))}
          </ul>
        </div>

        <HeroCard />
      </div>
    </section>
  );
}

function HeroCard() {
  return (
    <div className="relative mx-auto w-full max-w-md" aria-label="Example of a program match">
      <div className="rounded-3xl border border-ink/10 bg-white p-6 shadow-2xl shadow-ink/10">
        <div className="flex items-center justify-between text-xs font-medium text-muted">
          <span>Your top match</span>
          <span className="rounded-full bg-ink px-2.5 py-1 text-white">Sample</span>
        </div>
        <h2 className="mt-4 font-display text-xl font-semibold">Aquatic Ecology, Master Programme</h2>
        <p className="text-sm text-muted">Linnaeus University · Kalmar, Sweden</p>
        <div className="mt-5">
          <div className="flex justify-between text-sm font-semibold">
            <span>Match score</span>
            <span>94%</span>
          </div>
          <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-ink/10">
            <div className="h-full w-[94%] rounded-full bg-ink" />
          </div>
        </div>
        <ul className="mt-5 grid grid-cols-3 gap-2 text-center text-xs">
          {[
            ["2 years", "Duration"],
            ["SEK 87.5k", "Per year"],
            ["5 docs", "Required"],
          ].map(([v, l]) => (
            <li key={l} className="rounded-xl bg-lilac px-2 py-3">
              <p className="font-semibold">{v}</p>
              <p className="text-muted">{l}</p>
            </li>
          ))}
        </ul>
      </div>
      <div className="absolute -bottom-6 -left-4 hidden rounded-2xl bg-brand px-4 py-3 text-sm font-semibold shadow-lg sm:block">
        Application checklist ready
      </div>
    </div>
  );
}
