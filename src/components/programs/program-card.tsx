import { Clock, MapPin } from "lucide-react";
import type { SampleProgram } from "@/lib/sample-programs";

export function ProgramCard({ p, layout }: { p: SampleProgram; layout: "grid" | "list" }) {
  const meta = (
    <p className="flex flex-wrap gap-x-4 gap-y-1 text-sm">
      <span className="flex items-center gap-1.5"><MapPin size={14} aria-hidden /> {p.city}</span>
      <span className="flex items-center gap-1.5"><Clock size={14} aria-hidden /> {p.duration}</span>
    </p>
  );
  const docs = (
    <ul className="flex flex-wrap gap-1.5">
      {p.documents.map((d) => (
        <li key={d} className="rounded-full bg-ink/5 px-2.5 py-1 text-xs font-medium">{d}</li>
      ))}
    </ul>
  );
  const price = (
    <p className="text-sm text-muted">
      <span className="text-base font-semibold text-ink">{p.tuitionPerYear}</span> / year
    </p>
  );

  if (layout === "list") {
    return (
      <li className="grid gap-4 rounded-3xl border border-ink/10 bg-white p-5 md:grid-cols-[1.6fr_1fr_auto] md:items-center">
        <div>
          <p className="text-sm font-medium text-muted">{p.university} · {p.field}</p>
          <h3 className="mt-1 font-display text-lg font-semibold leading-snug">{p.title}</h3>
          <div className="mt-3 space-y-3">{meta}{docs}</div>
        </div>
        <div className="md:text-right">{price}</div>
        <span className="w-fit rounded-full bg-brand px-3 py-1 text-xs font-bold">{p.match}% match</span>
      </li>
    );
  }

  return (
    <li className="flex flex-col rounded-3xl border border-ink/10 bg-white p-6">
      <div className="flex items-start justify-between gap-3">
        <p className="text-sm font-medium text-muted">{p.university}</p>
        <span className="shrink-0 rounded-full bg-brand px-2.5 py-1 text-xs font-bold">{p.match}% match</span>
      </div>
      <h3 className="mt-3 font-display text-lg font-semibold leading-snug">{p.title}</h3>
      <p className="mt-1 text-sm text-muted">{p.field}</p>
      <div className="mt-4 space-y-4">{meta}{docs}</div>
      <div className="mt-auto pt-6">{price}</div>
    </li>
  );
}
