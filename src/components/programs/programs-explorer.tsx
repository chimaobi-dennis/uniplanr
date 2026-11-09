"use client";

import { useMemo, useState } from "react";
import { LayoutGrid, List, Search, SearchX } from "lucide-react";
import { samplePrograms } from "@/lib/sample-programs";
import { ProgramCard } from "./program-card";

const unique = (xs: string[]) => [...new Set(xs)].sort();
const fields = unique(samplePrograms.map((p) => p.field));
const cities = unique(samplePrograms.map((p) => p.city));
const durations = unique(samplePrograms.map((p) => p.duration));

const selectClass =
  "w-full rounded-xl border border-ink/15 bg-white px-3 py-2.5 text-sm focus-visible:outline-2 focus-visible:outline-ink";

export function ProgramsExplorer() {
  const [q, setQ] = useState("");
  const [field, setField] = useState("");
  const [city, setCity] = useState("");
  const [duration, setDuration] = useState("");
  const [layout, setLayout] = useState<"grid" | "list">("grid");

  const results = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return samplePrograms.filter(
      (p) =>
        (!needle || `${p.title} ${p.university} ${p.field}`.toLowerCase().includes(needle)) &&
        (!field || p.field === field) &&
        (!city || p.city === city) &&
        (!duration || p.duration === duration),
    );
  }, [q, field, city, duration]);

  const hasFilters = q || field || city || duration;
  const reset = () => {
    setQ("");
    setField("");
    setCity("");
    setDuration("");
  };

  return (
    <div>
      <form role="search" onSubmit={(e) => e.preventDefault()} className="grid gap-3 rounded-3xl bg-lilac/60 p-4 md:grid-cols-[2fr_1fr_1fr_1fr]">
        <label className="relative block">
          <span className="sr-only">Search programs</span>
          <Search size={16} aria-hidden className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search by programme, university or field"
            className={`${selectClass} pl-9`}
          />
        </label>
        <label>
          <span className="sr-only">Field</span>
          <select value={field} onChange={(e) => setField(e.target.value)} className={selectClass}>
            <option value="">All fields</option>
            {fields.map((f) => <option key={f}>{f}</option>)}
          </select>
        </label>
        <label>
          <span className="sr-only">City</span>
          <select value={city} onChange={(e) => setCity(e.target.value)} className={selectClass}>
            <option value="">All cities</option>
            {cities.map((c) => <option key={c}>{c}</option>)}
          </select>
        </label>
        <label>
          <span className="sr-only">Duration</span>
          <select value={duration} onChange={(e) => setDuration(e.target.value)} className={selectClass}>
            <option value="">Any duration</option>
            {durations.map((d) => <option key={d}>{d}</option>)}
          </select>
        </label>
      </form>

      <div className="mt-6 flex items-center justify-between gap-4">
        <p className="text-sm text-muted" aria-live="polite">
          Showing <strong className="text-ink">{results.length}</strong> of {samplePrograms.length} programmes
          {hasFilters && (
            <button type="button" onClick={reset} className="ml-3 font-semibold text-ink underline underline-offset-2">
              Clear filters
            </button>
          )}
        </p>
        <div role="group" aria-label="Layout" className="flex rounded-full border border-ink/15 p-1">
          {([["grid", LayoutGrid, "Grid"], ["list", List, "List"]] as const).map(([key, Icon, label]) => (
            <button
              key={key}
              type="button"
              aria-pressed={layout === key}
              onClick={() => setLayout(key)}
              className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium ${layout === key ? "bg-ink text-white" : "text-muted hover:text-ink"}`}
            >
              <Icon size={14} aria-hidden /> {label}
            </button>
          ))}
        </div>
      </div>

      {results.length === 0 ? (
        <div className="mt-10 flex flex-col items-center rounded-3xl border border-dashed border-ink/20 py-16 text-center">
          <SearchX size={32} aria-hidden className="text-muted" />
          <p className="mt-4 font-display text-lg font-semibold">No programmes match your filters</p>
          <button type="button" onClick={reset} className="mt-3 text-sm font-semibold underline underline-offset-2">
            Clear filters
          </button>
        </div>
      ) : (
        <ul className={layout === "grid" ? "mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" : "mt-6 space-y-4"}>
          {results.map((p) => <ProgramCard key={p.slug} p={p} layout={layout} />)}
        </ul>
      )}
    </div>
  );
}
