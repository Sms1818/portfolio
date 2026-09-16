import Link from "next/link";
import { explorerGroups, getWork } from "@/lib/brain";
import { concepts } from "@/lib/brain/content";
import { SiteHeader } from "@/components/site-header";
import { ConceptInspector, WorkInspector } from "@/components/workspace/inspector";
import { AskSahil } from "@/components/workspace/ask";
import { MatchRole } from "@/components/workspace/match";
import { AboutPanel, ResumeViewer, WorkspaceHome } from "@/components/workspace/panels";
import { MobileJump } from "@/components/workspace/mobile-jump";
import { cn } from "@/lib/cn";

function Explorer({ active }: { active: string }) {
  return (
    <nav aria-label="Workspace explorer" className="space-y-6">
      {explorerGroups.map((group) => (
        <div key={group.id}>
          <p className="mono px-2 text-[10px] uppercase tracking-[0.16em] text-faint">{group.label}</p>
          <ul className="mt-2">
            {group.items.map((item) => (
              <li key={item.id}>
                <Link
                  href={item.href}
                  className={cn(
                    "block rounded-lg px-2 py-1.5 text-sm",
                    active.includes(item.id) || active.includes(item.href)
                      ? "bg-[var(--accent-soft)] text-accent"
                      : "text-muted hover:text-fg",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  );
}

function EngineeringMap() {
  return (
    <div>
      <p className="mono text-[11px] uppercase tracking-[0.18em] text-muted">Engineering map</p>
      <h1 className="mt-3 text-3xl tracking-tight">Concept → evidence → trace.</h1>
      <p className="mt-3 max-w-xl text-sm text-muted">
        Concepts are only shown when the portfolio has supporting evidence.
      </p>
      <div className="mt-8 divide-y divide-line border-y border-line">
        {concepts.map((concept) => (
          <a key={concept.id} href={`/explore/engineering/${concept.id}`} className="block py-5">
            <div className="text-lg tracking-tight">{concept.name}</div>
            <p className="mt-1 text-sm text-muted">{concept.summary}</p>
          </a>
        ))}
      </div>
    </div>
  );
}

export function WorkspaceApp({ slug, about }: { slug: string[]; about?: string }) {
  const [section, id, tab, fragment] = slug;
  const active = `/${slug.join("/")}`;
  let body: React.ReactNode = <WorkspaceHome />;

  if (!section) body = <WorkspaceHome />;
  else if (section === "resume") body = <ResumeViewer />;
  else if (section === "about") body = <AboutPanel />;
  else if (section === "ask") {
    body = (
        <AskSahil about={about} />
    );
  } else if (section === "match") {
    body = (
        <MatchRole />
    );
  } else if (section === "engineering" && !id) body = <EngineeringMap />;
  else if (section === "engineering" && id) body = <ConceptInspector id={id} />;
  else if (id) {
    const item = getWork(id);
    if (item) body = <WorkInspector item={item} tab={tab} fragment={fragment} />;
    else body = <ConceptInspector id={id} />;
  }

  return (
    <div className="min-h-screen">
      <SiteHeader current="explore" />
      <div className="mx-auto grid max-w-[1400px] md:grid-cols-[240px_1fr]">
        <aside className="hidden border-r border-line md:block">
          <div className="sticky top-14 max-h-[calc(100vh-56px)] overflow-auto p-4">
            <Explorer active={active} />
          </div>
        </aside>
        <MobileJump active={active} />
        <main id="content" className="min-w-0 px-5 py-8 md:px-10 md:py-10">
          {body}
        </main>
      </div>
    </div>
  );
}
