import { ArrowRight } from "lucide-react";
import { samplePrograms } from "@/lib/sample-programs";
import { ButtonLink } from "@/components/ui/button";
import { ProgramCard } from "@/components/programs/program-card";

export function ProgramsPreview() {
  return (
    <section className="bg-lilac/60 py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">Explore programs in minutes</h2>
            <p className="mt-4 text-lg text-muted">
              Browse hundreds of Swedish master&apos;s programmes with tuition, duration and required documents in one place.
            </p>
          </div>
          <ButtonLink href="/programs" variant="dark">
            Browse all programs <ArrowRight size={16} />
          </ButtonLink>
        </div>

        <ul className="mt-12 grid gap-5 md:grid-cols-3">
          {samplePrograms.slice(0, 3).map((p) => (
            <ProgramCard key={p.slug} p={p} layout="grid" />
          ))}
        </ul>
        <p className="mt-4 text-xs text-muted">Sample programmes shown for illustration; see the full catalogue for current details.</p>
      </div>
    </section>
  );
}
