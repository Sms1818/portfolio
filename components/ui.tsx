import Link from "next/link";
import type { Classification } from "@/lib/brain/types";
import { cn } from "@/lib/cn";

export function ClassBadge({ value }: { value: Classification | string }) {
  return (
    <span className="mono inline-flex rounded-full border border-line px-2 py-0.5 text-[10px] uppercase tracking-[0.14em] text-muted">
      {value}
    </span>
  );
}

export function ExternalActions({
  links,
}: {
  links: Array<{ label: string; href: string }>;
}) {
  if (!links.length) return null;
  return (
    <div className="flex flex-wrap gap-2">
      {links.map((link) => (
        <a
          key={link.href}
          href={link.href}
          target="_blank"
          rel="noreferrer"
          className="rounded-full border border-line px-3 py-1 text-xs text-muted hover:border-line-strong hover:text-fg"
        >
          {link.label}
        </a>
      ))}
    </div>
  );
}

export function ButtonLink({
  href,
  children,
  variant = "primary",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "ghost";
}) {
  const className = cn(
    "inline-flex items-center rounded-full px-4 py-2 text-sm transition-colors",
    variant === "primary"
      ? "bg-accent text-accent-fg hover:opacity-90"
      : "border border-line text-fg hover:border-line-strong",
  );
  const external = href.startsWith("http") || href.startsWith("mailto:") || href.endsWith(".pdf");
  if (external) {
    return (
      <a
        href={href}
        className={className}
        target={href.startsWith("mailto:") ? undefined : "_blank"}
        rel={href.startsWith("mailto:") ? undefined : "noreferrer"}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}
