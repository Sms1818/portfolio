import Link from "next/link";
import { person } from "@/lib/brain/content";
import { CommandPalette } from "./command-palette";
import { ThemeToggle } from "./theme-toggle";
import { cn } from "@/lib/cn";

const depths = [
  { href: "/", label: "30 seconds" },
  { href: "/story", label: "2 minutes" },
  { href: "/explore", label: "Let me explore" },
];

export function SiteHeader({ current }: { current: "home" | "story" | "explore" }) {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3">
        <Link href="/" className="min-w-0">
          <div className="text-sm font-medium tracking-tight">{person.name}</div>
          <div className="mono text-[11px] text-muted">{person.positioning}</div>
        </Link>
        <nav aria-label="Reading depth" className="hidden items-center gap-1 md:flex">
          {depths.map((depth) => {
            const active =
              (current === "home" && depth.href === "/") ||
              (current === "story" && depth.href === "/story") ||
              (current === "explore" && depth.href === "/explore");
            return (
              <Link
                key={depth.href}
                href={depth.href}
                className={cn(
                  "rounded-full px-3 py-1 text-xs",
                  active ? "bg-[var(--accent-soft)] text-accent" : "text-muted hover:text-fg",
                )}
              >
                {depth.label}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-3">
          <CommandPalette />
          <a className="hidden text-xs text-muted hover:text-fg lg:inline" href={person.resumePath} target="_blank" rel="noreferrer">
            Resume
          </a>
          <a className="hidden text-xs text-muted hover:text-fg lg:inline" href={person.github} target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a className="hidden text-xs text-muted hover:text-fg lg:inline" href={person.linkedin} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
