import { links } from "@/lib/links";
import { ButtonLink } from "@/components/ui/button";

export function Cta() {
  return (
    <section className="mx-auto max-w-6xl px-6">
      <div className="rounded-[2rem] bg-brand px-8 py-14 text-center sm:px-16">
        <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">Start your journey today</h2>
        <p className="mx-auto mt-3 max-w-xl text-lg">No pressure, just real support from students like you.</p>
        <ButtonLink href={links.getStarted} variant="dark" className="mt-8">
          Get Started
        </ButtonLink>
      </div>
    </section>
  );
}
