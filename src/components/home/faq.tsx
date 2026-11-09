import { Plus } from "lucide-react";

const faqs = [
  {
    q: "How do I know which country or program is right for me?",
    a: "Answer a few questions about your background, interests and budget. Uniplanr ranks programs by how well they fit, and explains why.",
  },
  {
    q: "Can Uniplanr help me with visa and travel arrangements?",
    a: "Yes. Visa guidance and travel preparation are part of the journey, alongside your application documents and deadlines.",
  },
  {
    q: "What happens after I arrive in a new country?",
    a: "Uniplanr keeps supporting you with language, accommodation and local culture, so the help doesn't stop at the airport.",
  },
  {
    q: "Is Uniplanr free to use?",
    a: "You can create an account and explore programs for free. Some premium services, such as extra AI features, are paid.",
  },
  {
    q: "Do I need to talk to a consultant or is it all automated?",
    a: "You can do everything on your own with AI assistance, and you can ask a human advisor whenever something important needs a second opinion.",
  },
];

export function Faq() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-20">
      <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">Common questions from students</h2>
      <div className="mt-10 divide-y divide-ink/10 border-y border-ink/10">
        {faqs.map((f) => (
          <details key={f.q} className="group py-5">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-lg font-semibold [&::-webkit-details-marker]:hidden">
              {f.q}
              <Plus size={20} aria-hidden className="shrink-0 transition-transform group-open:rotate-45" />
            </summary>
            <p className="mt-3 leading-relaxed text-muted">{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
