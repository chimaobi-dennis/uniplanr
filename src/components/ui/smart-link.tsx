import Link from "next/link";
import type { ComponentProps } from "react";

// Internal paths use client-side navigation; everything else is a plain anchor (legacy site, mailto).
export function SmartLink({ href, ...props }: Omit<ComponentProps<"a">, "href"> & { href: string }) {
  return href.startsWith("/") ? <Link href={href} {...props} /> : <a href={href} {...props} />;
}
