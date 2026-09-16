"use client";

import { useState } from "react";
import { getWork } from "@/lib/brain";

type AskResponse = {
  status?: string;
  answer?: string;
  caveats?: string[];
  evidence?: Array<{ id: string; claim: string; href: string; sourceType: string }>;
  error?: string;
};

const starters = [
  "What is Sahil strongest at?",
  "What are his weaknesses?",
  "Does he have production Java experience?",
  "What evidence supports Kafka experience?",
  "Has he worked at scale?",
  "Does he have AWS production experience?",
];

export function AskSahil({ about }: { about?: string }) {
  const context = about ? getWork(about) : undefined;
  const [question, setQuestion] = useState(
    context ? `Why does this matter in ${context.name}?` : "",
  );
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AskResponse | null>(null);

  async function submit(next = question) {
    if (!next.trim()) return;
    setLoading(true);
    setResult(null);
    try {
      const response = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: next, contextObjectId: about }),
      });
      const data = (await response.json()) as AskResponse;
      setResult(data);
    } catch {
      setResult({ error: "Ask Sahil is temporarily unavailable. Evidence navigation still works." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-2xl">
      <p className="mono text-[11px] uppercase tracking-[0.18em] text-muted">Ask Sahil</p>
      <h1 className="mt-3 text-3xl tracking-tight">Evidence-grounded portfolio intelligence.</h1>
      <p className="mt-3 text-sm text-muted">
        Not a generic chatbot. Answers stay inside Sahil&apos;s portfolio evidence.
        {context ? ` Context: ${context.name}.` : ""}
      </p>
      <form
        className="mt-8"
        onSubmit={(event) => {
          event.preventDefault();
          void submit();
        }}
      >
        <label className="sr-only" htmlFor="ask">
          Question
        </label>
        <textarea
          id="ask"
          value={question}
          onChange={(event) => setQuestion(event.target.value)}
          rows={4}
          className="w-full rounded-2xl border border-line bg-bg-elevated p-4 text-sm outline-none focus:border-accent"
          placeholder="Does Sahil know Kafka?"
        />
        <button
          type="submit"
          disabled={loading}
          className="mt-3 rounded-full bg-accent px-4 py-2 text-sm text-accent-fg disabled:opacity-60"
        >
          {loading ? "Retrieving evidence…" : "Ask"}
        </button>
      </form>
      <div className="mt-4 flex flex-wrap gap-2">
        {starters.map((item) => (
          <button
            key={item}
            type="button"
            className="rounded-full border border-line px-3 py-1 text-xs text-muted hover:text-fg"
            onClick={() => {
              setQuestion(item);
              void submit(item);
            }}
          >
            {item}
          </button>
        ))}
      </div>
      {result?.error ? (
        <p className="mt-8 rounded-2xl border border-line p-4 text-sm text-muted">{result.error}</p>
      ) : null}
      {result?.answer ? (
        <div className="mt-8 rounded-2xl border border-line bg-bg-elevated p-5">
          <p className="mono text-[10px] uppercase tracking-[0.16em] text-faint">{result.status}</p>
          <p className="mt-3 leading-7">{result.answer}</p>
          {result.caveats?.length ? (
            <ul className="mt-4 space-y-1 text-sm text-[var(--warn)]">
              {result.caveats.map((caveat) => (
                <li key={caveat}>{caveat}</li>
              ))}
            </ul>
          ) : null}
          {result.evidence?.length ? (
            <details className="mt-4">
              <summary className="cursor-pointer text-sm text-accent">Why this answer?</summary>
              <ul className="mt-3 space-y-2">
                {result.evidence.map((item) => (
                  <li key={item.id}>
                    <a href={item.href} className="text-sm hover:text-accent">
                      {item.claim}
                    </a>
                  </li>
                ))}
              </ul>
            </details>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
