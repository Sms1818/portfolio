"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { searchPortfolio, type SearchHit } from "@/lib/brain/search";

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
        style={{
          display: 'flex', alignItems: 'center', gap: '8px', padding: '4px 12px',
          borderRadius: '20px', border: '1px solid var(--line)', background: 'transparent',
          fontFamily: 'var(--mono)', fontSize: '0.75rem', color: 'var(--muted)', cursor: 'pointer'
        }}
        title="Search (Cmd+K)"
      >
        Search
        <kbd style={{ opacity: 0.5 }}>⌘K</kbd>
      </button>
      {open ? (
        <div
          style={{
            position: 'fixed', inset: 0, zIndex: 50, display: 'flex', alignItems: 'flex-start',
            justifyContent: 'center', background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)',
            padding: '12vh 20px 20px'
          }}
          onClick={() => setOpen(false)}
          role="presentation"
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            style={{
              width: '100%', maxWidth: '600px', background: 'var(--panel-strong)',
              borderRadius: '16px', border: '1px solid var(--line)', boxShadow: 'var(--shadow)',
              overflow: 'hidden'
            }}
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
              style={{
                width: '100%', border: 'none', borderBottom: '1px solid var(--line)',
                background: 'transparent', padding: '16px 20px', fontSize: '1rem',
                color: 'var(--text)', outline: 'none'
              }}
            />
            <ul style={{ maxHeight: '320px', overflow: 'auto', padding: '8px', margin: 0, listStyle: 'none' }}>
              {hits.length === 0 ? (
                <li style={{ padding: '24px 16px', fontSize: '0.9rem', color: 'var(--muted)' }}>No matching evidence.</li>
              ) : (
                hits.map((hit, index) => (
                  <li key={hit.id}>
                    <button
                      type="button"
                      onClick={() => go(hit)}
                      style={{
                        width: '100%', display: 'flex', flexDirection: 'column', textAlign: 'left',
                        padding: '12px 16px', borderRadius: '12px', border: 'none',
                        background: index === active ? 'var(--accent-soft)' : 'transparent',
                        cursor: 'pointer'
                      }}
                    >
                      <span style={{ fontSize: '0.9rem', color: 'var(--text)', fontWeight: 500 }}>{hit.title}</span>
                      <span style={{ fontSize: '0.8rem', color: 'var(--muted)', marginTop: '4px' }}>{hit.subtitle}</span>
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
