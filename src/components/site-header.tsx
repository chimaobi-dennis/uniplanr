"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { links, nav } from "@/lib/links";
import { ButtonLink } from "@/components/ui/button";
import { SmartLink } from "@/components/ui/smart-link";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 px-4 pt-4">
      <div className="mx-auto max-w-6xl rounded-full bg-ink px-5 py-2.5 text-white shadow-lg shadow-ink/10">
        <div className="flex items-center justify-between">
          <Link href="/" className="font-display text-lg font-bold tracking-[0.18em]" onClick={() => setOpen(false)}>
            UNIPLANR
          </Link>

          <nav aria-label="Main" className="hidden items-center gap-8 md:flex">
            {nav.map((item) => (
              <SmartLink key={item.label} href={item.href} className="text-sm font-medium text-white/80 transition-colors hover:text-white">
                {item.label}
              </SmartLink>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <ButtonLink href={links.getStarted} className="hidden !px-5 !py-2 sm:inline-flex">
              Get Started
            </ButtonLink>
            <button
              type="button"
              className="grid size-10 place-items-center rounded-full hover:bg-white/10 md:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {open && (
          <nav id="mobile-menu" aria-label="Mobile" className="mt-3 flex flex-col gap-1 border-t border-white/10 pb-2 pt-3 md:hidden">
            {nav.map((item) => (
              <SmartLink key={item.label} href={item.href} className="rounded-xl px-3 py-2.5 text-sm font-medium text-white/90 hover:bg-white/10">
                {item.label}
              </SmartLink>
            ))}
            <ButtonLink href={links.getStarted} className="mt-2">
              Get Started
            </ButtonLink>
          </nav>
        )}
      </div>
    </header>
  );
}
