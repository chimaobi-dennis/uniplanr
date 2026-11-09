import type { Metadata } from "next";
import { ProgramsExplorer } from "@/components/programs/programs-explorer";

export const metadata: Metadata = {
  title: "Programs – Uniplanr",
  description: "Explore master's programmes with tuition, duration and required documents in one place.",
};

export default function ProgramsPage() {
  return (
    <section className="mx-auto max-w-6xl px-6 pb-8 pt-16">
      <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">Explore all academic programs</h1>
      <p className="mt-4 max-w-2xl text-lg text-muted">
        Let Uniplanr match you to programs aligned with your goals, with tuition, duration and required documents in one place.
      </p>
      <p className="mt-4 inline-block rounded-full bg-brand px-3 py-1 text-xs font-semibold">
        Preview: sample data. The live catalogue is at uniplanr.com
      </p>
      <div className="mt-10">
        <ProgramsExplorer />
      </div>
    </section>
  );
}
