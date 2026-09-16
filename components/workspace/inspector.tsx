import { concepts, getConcept, getEvidence, getSkill, getWork, workHref, type WorkObject } from "@/lib/brain";
import { resolveSkill } from "@/lib/match/score";
import { ClassBadge, ExternalActions } from "@/components/ui";
import { ArchitectureFlow } from "./architecture";

function tabLabel(tab: string) {
  return tab.replace(/-/g, " ");
}

export function WorkInspector({
  item,
  tab,
  fragment,
}: {
  item: WorkObject;
  tab?: string;
  fragment?: string;
}) {
  const active = tab && item.inspectorTabs.includes(tab) ? tab : item.inspectorTabs[0];
  const limitation = fragment
    ? item.limitations?.find((row) => row.id === fragment)
    : undefined;
  const body = item.sections[active] ?? item.summary;
  const base = workHref(item);

  return (
    <div className="grid gap-8 lg:grid-cols-[200px_1fr]">
      <nav aria-label="Inspector sections" className="flex gap-2 overflow-auto lg:flex-col">
        {item.inspectorTabs.map((id) => (
          <a
            key={id}
            href={`${base}/${id}`}
            className={`mono shrink-0 rounded-full px-3 py-1 text-[11px] capitalize ${
              id === active ? "bg-[var(--accent-soft)] text-accent" : "text-muted hover:text-fg"
            }`}
          >
            {tabLabel(id)}
          </a>
        ))}
      </nav>
      <div>
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <ClassBadge value={item.classification} />
            <h1 className="mt-3 text-3xl tracking-tight">{item.name}</h1>
            <p className="mt-2 text-sm text-muted">{item.eyebrow}</p>
          </div>
          <ExternalActions links={item.links} />
        </div>
        {active === "architecture" && item.architecture ? (
          <div className="mt-8">
            <ArchitectureFlow nodes={item.architecture.nodes} />
            <p className="mt-6 max-w-2xl leading-7 text-muted">{item.architecture.canonicalStory}</p>
          </div>
        ) : null}
        {active === "event-flow" && item.architecture ? (
          <ol className="mt-8 space-y-3">
            {item.architecture.flow.map((step, index) => (
              <li key={step} className="flex gap-4 border-b border-line pb-3">
                <span className="mono text-faint">{String(index + 1).padStart(2, "0")}</span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        ) : null}
        <p className="mt-8 max-w-2xl whitespace-pre-line leading-7 text-[15px] text-muted">{body}</p>
        {active === "limitations" && item.limitations ? (
          <div className="mt-8 space-y-4">
            {item.limitations.map((row) => (
              <a
                key={row.id}
                href={row.href}
                className={`block rounded-2xl border p-4 ${
                  limitation?.id === row.id ? "border-accent" : "border-line hover:border-line-strong"
                }`}
              >
                <div className="text-sm font-medium">{row.title}</div>
                <p className="mt-2 text-sm text-muted">{row.body}</p>
                <p className="mt-2 text-sm text-accent">Improve: {row.improvement}</p>
              </a>
            ))}
          </div>
        ) : null}
        {active === "decisions" && item.decisions ? (
          <div className="mt-8 space-y-4">
            {item.decisions.map((row) => (
              <div key={row.id} className="rounded-2xl border border-line p-4">
                <div className="text-sm font-medium">{row.title}</div>
                <p className="mt-2 text-sm text-muted">{row.body}</p>
              </div>
            ))}
          </div>
        ) : null}
        {active === "technology" ? (
          <div className="mt-8 flex flex-wrap gap-2">
            {item.technologies.map((tech) => (
              <a
                key={tech}
                href={`/explore/engineering/${encodeURIComponent(tech.toLowerCase().split(" ")[0])}`}
                className="mono rounded-full border border-line px-3 py-1 text-[11px] text-muted hover:text-fg"
              >
                {tech}
              </a>
            ))}
          </div>
        ) : null}
        {limitation && active !== "limitations" ? (
          <div className="mt-8 rounded-2xl border border-line p-4">
            <div className="text-sm font-medium">{limitation.title}</div>
            <p className="mt-2 text-sm text-muted">{limitation.body}</p>
          </div>
        ) : null}
        <div className="mt-10 flex flex-wrap gap-3 text-sm">
          <a className="text-accent" href={`/explore/ask?about=${item.id}`}>
            Ask about this
          </a>
          <a className="text-accent" href={`/explore/match?about=${item.id}`}>
            Compare to role
          </a>
          {item.links.find((l) => l.kind === "github") ? (
            <a className="text-accent" href={item.links.find((l) => l.kind === "github")!.href} target="_blank" rel="noreferrer">
              View GitHub
            </a>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export function ConceptInspector({ id }: { id: string }) {
  const concept = getConcept(id);
  const skill = getSkill(id) ?? resolveSkill(id.replace(/-/g, " "));
  const title = concept?.name ?? skill?.name ?? id;
  const summary = concept?.summary ?? skill?.summary ?? "The current portfolio doesn't provide a dedicated evidence node for this query. Related search still works.";
  const evidenceIds = concept?.evidenceIds ?? skill?.evidenceIds ?? [];
  const related = concept?.relatedConceptIds ?? [];

  return (
    <div>
      <ClassBadge value="CONCEPT → EVIDENCE" />
      <h1 className="mt-3 text-3xl tracking-tight">{title}</h1>
      <p className="mt-3 max-w-2xl text-muted">{summary}</p>
      {skill?.caveat ? <p className="mt-3 text-sm text-[var(--warn)]">{skill.caveat}</p> : null}
      <div className="mt-8 space-y-3">
        {evidenceIds.length === 0 ? (
          <p className="text-sm text-muted">
            The current portfolio doesn&apos;t provide evidence of {title} experience. Absence of evidence is not evidence of inability.
          </p>
        ) : (
          evidenceIds.map((eid) => {
            const item = getEvidence(eid);
            if (!item) return null;
            const obj = getWork(item.objectId);
            return (
              <a key={eid} href={item.href} className="block rounded-2xl border border-line p-4 hover:border-line-strong">
                <div className="flex gap-2">
                  <ClassBadge value={item.sourceType.replace("_", " ")} />
                  <span className="mono text-[10px] text-faint">{item.strength}</span>
                </div>
                <div className="mt-2 text-sm">{item.claim}</div>
                <p className="mt-1 text-sm text-muted">{item.summary}</p>
                {obj ? <p className="mt-2 text-xs text-accent">{obj.name} → inspect</p> : null}
              </a>
            );
          })
        )}
      </div>
      {related.length ? (
        <div className="mt-8 flex flex-wrap gap-2">
          {related.map((rid) => (
            <a key={rid} href={`/explore/engineering/${rid}`} className="mono text-[11px] text-muted hover:text-fg">
              {concepts.find((c) => c.id === rid)?.name ?? rid}
            </a>
          ))}
        </div>
      ) : null}
    </div>
  );
}
