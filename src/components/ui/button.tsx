import Link from "next/link";
import type { ComponentProps } from "react";

type Variant = "primary" | "dark" | "outline";

const styles: Record<Variant, string> = {
  primary: "bg-brand text-ink hover:bg-brand-strong",
  dark: "bg-ink text-white hover:bg-ink-soft",
  outline: "border border-ink/20 bg-white text-ink hover:border-ink hover:bg-ink/[.03]",
};

type Props = ComponentProps<typeof Link> & { variant?: Variant };

export function ButtonLink({ variant = "primary", className = "", ...props }: Props) {
  return (
    <Link
      {...props}
      className={`inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink ${styles[variant]} ${className}`}
    />
  );
}
