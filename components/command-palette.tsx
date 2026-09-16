"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { searchPortfolio, type SearchHit } from "@/lib/brain/search";
import { cn } from "@/lib/cn";

export function CommandPalette() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const hits = useMemo(() => searchPortfolio(query), [query]);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((value) => !value);
      }
      if (event.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (open) {
      setQuery("");
      setActive(0);
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  function go(hit: SearchHit) {
    setOpen(false);
    router.push(hit.href);
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="mono hidden items-center gap-2 rounded-full border border-line px-3 py-1 text-[11px] text-muted hover:border-line-strong hover:text-fg sm:inline-flex"
        aria-keyshortcuts="Meta+K"
      >
        Search
        <kbd className="text-faint">⌘K</kbd>
      </button>
      {open ? (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center bg-[oklch(0.2_0.02_260/0.4)] p-4 pt-[12vh] backdrop-blur-sm"
          onClick={() => setOpen(false)}
          role="presentation"
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            className="w-full max-w-xl overflow-hidden rounded-2xl border border-line-strong bg-bg-elevated shadow-[var(--shadow)]"
            onClick={(event) => event.stopPropagation()}
          >
            <input
              ref={inputRef}
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setActive(0);
              }}
              onKeyDown={(event) => {
                if (event.key === "ArrowDown") {
                  event.preventDefault();
                  setActive((n) => Math.min(n + 1, hits.length - 1));
                }
                if (event.key === "ArrowUp") {
                  event.preventDefault();
                  setActive((n) => Math.max(n - 1, 0));
                }
                if (event.key === "Enter" && hits[active]) go(hits[active]);
              }}
              placeholder="Search Kafka, reliability, Caspian, RAG…"
              className="w-full border-b border-line bg-transparent px-4 py-3 text-[15px] outline-none"
            />
            <ul className="max-h-80 overflow-auto p-2">
              {hits.length === 0 ? (
                <li className="px-3 py-6 text-sm text-muted">No matching evidence.</li>
              ) : (
                hits.map((hit, index) => (
                  <li key={hit.id}>
                    <button
                      type="button"
                      onClick={() => go(hit)}
                      className={cn(
                        "flex w-full flex-col rounded-xl px-3 py-2 text-left",
                        index === active ? "bg-[var(--accent-soft)]" : "hover:bg-[var(--accent-soft)]",
                      )}
                    >
                      <span className="text-sm text-fg">{hit.title}</span>
                      <span className="line-clamp-1 text-xs text-muted">{hit.subtitle}</span>
                    </button>
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
      ) : null}
    </>
  );
}
