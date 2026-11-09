import Link from "next/link";
import { links } from "@/lib/links";

const columns = [
  {
    title: "For Students",
    items: [
      { label: "Find Programs", href: links.programs },
      { label: "Community", href: links.community },
      { label: "Study Destinations", href: links.studyDestinations },
    ],
  },
  {
    title: "For Universities",
    items: [{ label: "Partner With Us", href: links.partners }],
  },
  {
    title: "Company",
    items: [
      { label: "Blog", href: links.blog },
      { label: "Contact", href: links.contactEmail },
    ],
  },
  {
    title: "Support",
    items: [
      { label: "Privacy Policy", href: links.privacy },
      { label: "Terms of Service", href: links.terms },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="mt-24 bg-ink text-white">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 md:grid-cols-[1.4fr_repeat(4,1fr)]">
        <div>
          <Link href="/" className="font-display text-xl font-bold tracking-[0.18em]">
            UNIPLANR
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">
            Your global study lifetool. From first thought to final graduation, we guide you every step of your study abroad journey.
          </p>
        </div>
        {columns.map((col) => (
          <div key={col.title}>
            <h2 className="text-sm font-semibold text-white">{col.title}</h2>
            <ul className="mt-4 space-y-3">
              {col.items.map((item) => (
                <li key={item.label}>
                  <a href={item.href} className="text-sm text-white/60 transition-colors hover:text-white">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 py-6 text-xs text-white/50 sm:flex-row sm:justify-between">
          <p>© 2026 Uniplanr. All rights reserved.</p>
          <p>Södra Järnvägsgatan 4B, 352 34 Växjö, Sweden · info@uniplanr.com</p>
        </div>
      </div>
    </footer>
  );
}
