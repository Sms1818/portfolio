"use client";

import { useState } from "react";

type MatchResult = {
  title?: string;
  score?: number;
  formula?: string;
  weightedPoints?: number;
  possiblePoints?: number;
  strong?: Requirement[];
  transferable?: Requirement[];
  gaps?: Requirement[];
  caveats?: string[];
  requirements?: Requirement[];
  error?: string;
};

type Requirement = {
  id: string;
  rawText: string;
  normalizedSkill?: string;
  importance: string;
  evidenceStatus: string;
  evidenceScore: number;
  caveat?: string;
  evidence?: Array<{ id: string; claim: string; href: string }>;
};

function Group({ title, items }: { title: string; items?: Requirement[] }) {
  if (!items?.length) return null;
  return (
    <section className="mt-8">
      <h2 className="text-lg tracking-tight">{title}</h2>
      <ul className="mt-3 space-y-3">
        {items.map((item) => (
          <li key={item.id} className="rounded-2xl border border-line p-4">
            <div className="flex flex-wrap items-center gap-2 text-xs text-muted">
              <span className="mono uppercase">{item.importance}</span>
              <span>{item.evidenceStatus}</span>
              <span>{item.normalizedSkill}</span>
            </div>
            <p className="mt-2 text-sm">{item.rawText}</p>
            {item.caveat ? <p className="mt-2 text-sm text-[var(--warn)]">{item.caveat}</p> : null}
            <div className="mt-2 flex flex-wrap gap-2">
              {item.evidence?.map((ev) => (
                <a key={ev.id} href={ev.href} className="text-xs text-accent">
                  {ev.claim}
                </a>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function MatchRole() {
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<MatchResult | null>(null);

  async function submit() {
    setLoading(true);
    setResult(null);
    try {
      const response = await fetch("/api/match", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobDescription }),
      });
      const data = (await response.json()) as MatchResult;
      setResult(data);
    } catch {
      setResult({ error: "Match Role extraction failed. No score was invented." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-2xl">
      <p className="mono text-[11px] uppercase tracking-[0.18em] text-muted">Match Role</p>
      <h1 className="mt-3 text-3xl tracking-tight">Evidence matching, not score gaming.</h1>
      <p className="mt-3 text-sm text-muted">
        Groq extracts requirements. Software scores them. Missing required skills lower the number.
      </p>
      <form
        className="mt-8"
        onSubmit={(event) => {
          event.preventDefault();
          void submit();
        }}
      >
        <label className="sr-only" htmlFor="jd">
          Job description
        </label>
        <textarea
          id="jd"
          value={jobDescription}
          onChange={(event) => setJobDescription(event.target.value)}
          rows={10}
          className="w-full rounded-2xl border border-line bg-bg-elevated p-4 text-sm outline-none focus:border-accent"
          placeholder="Paste a job description…"
        />
        <button
          type="submit"
          disabled={loading}
          className="mt-3 rounded-full bg-accent px-4 py-2 text-sm text-accent-fg disabled:opacity-60"
        >
          {loading ? "Extracting requirements…" : "Match to evidence"}
        </button>
      </form>
      {result?.error ? (
        <p className="mt-8 rounded-2xl border border-line p-4 text-sm text-muted">{result.error}</p>
      ) : null}
      {typeof result?.score === "number" ? (
        <div className="mt-8">
          <div className="rounded-2xl border border-line bg-bg-elevated p-6">
            <p className="mono text-[11px] text-muted">{result.title}</p>
            <p className="mt-2 text-5xl tracking-tight">{result.score}%</p>
            <p className="mt-3 text-sm text-muted">
              {result.weightedPoints} / {result.possiblePoints} weighted points. {result.formula}
            </p>
          </div>
          <Group title="Strong alignment / direct evidence" items={result.strong} />
          <Group title="Transferable evidence" items={result.transferable} />
          <Group title="Gaps" items={result.gaps} />
          {result.caveats?.length ? (
            <section className="mt-8">
              <h2 className="text-lg tracking-tight">Caveats / risks</h2>
              <ul className="mt-3 space-y-2 text-sm text-muted">
                {result.caveats.map((caveat) => (
                  <li key={caveat}>{caveat}</li>
                ))}
              </ul>
            </section>
          ) : null}
          <section className="mt-8">
            <h2 className="text-lg tracking-tight">Requirement breakdown</h2>
            <div className="mt-3 overflow-x-auto">
              <table className="w-full min-w-[640px] text-left text-sm">
                <thead className="text-xs text-muted">
                  <tr>
                    <th className="py-2">Requirement</th>
                    <th>Importance</th>
                    <th>Match</th>
                    <th>Contribution</th>
                  </tr>
                </thead>
                <tbody>
                  {result.requirements?.map((req) => (
                    <tr key={req.id} className="border-t border-line">
                      <td className="py-2 pr-3">{req.normalizedSkill ?? req.rawText}</td>
                      <td>{req.importance}</td>
                      <td>{req.evidenceStatus}</td>
                      <td>
                        {req.importance === "required" ? 3 : 1} × {req.evidenceScore}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      ) : null}
    </div>
  );
}
