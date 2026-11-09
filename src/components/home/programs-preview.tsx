import { ArrowRight, Clock, MapPin } from "lucide-react";
import { links } from "@/lib/links";
import { samplePrograms } from "@/lib/sample-programs";
import { ButtonLink } from "@/components/ui/button";

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
          <ButtonLink href={links.programs} variant="dark">
            Browse all programs <ArrowRight size={16} />
          </ButtonLink>
        </div>

        <ul className="mt-12 grid gap-5 md:grid-cols-3">
          {samplePrograms.map((p) => (
            <li key={p.title} className="flex flex-col rounded-3xl bg-white p-6 shadow-sm">
              <div className="flex items-start justify-between gap-3">
                <p className="text-sm font-medium text-muted">{p.university}</p>
                <span className="shrink-0 rounded-full bg-brand px-2.5 py-1 text-xs font-bold">{p.match}% match</span>
              </div>
              <h3 className="mt-3 font-display text-lg font-semibold leading-snug">{p.title}</h3>
              <p className="mt-1 text-sm text-muted">{p.field}</p>
              <p className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-sm">
                <span className="flex items-center gap-1.5"><MapPin size={14} aria-hidden /> {p.city}</span>
                <span className="flex items-center gap-1.5"><Clock size={14} aria-hidden /> {p.duration}</span>
              </p>
              <ul className="mt-4 flex flex-wrap gap-1.5">
                {p.documents.map((d) => (
                  <li key={d} className="rounded-full bg-ink/5 px-2.5 py-1 text-xs font-medium">{d}</li>
                ))}
              </ul>
              <p className="mt-auto pt-6 text-sm text-muted">
                <span className="text-base font-semibold text-ink">{p.tuitionPerYear}</span> / year
              </p>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-xs text-muted">Sample programmes shown for illustration; see the full catalogue for current details.</p>
      </div>
    </section>
  );
}
