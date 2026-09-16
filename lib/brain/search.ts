import { concepts, evidence, person, skills, work } from "./content";
import { workHref } from "./index";

export type SearchHit = {
  id: string;
  title: string;
  subtitle: string;
  href: string;
  kind: "work" | "concept" | "skill" | "evidence" | "person" | "action";
};

function haystack(parts: Array<string | undefined>) {
  return parts.filter(Boolean).join(" ").toLowerCase();
}

function score(query: string, text: string) {
  if (!query) return 0;
  const q = query.toLowerCase().trim();
  const t = text.toLowerCase();
  if (t === q) return 100;
  if (t.startsWith(q)) return 80;
  if (t.includes(q)) return 50;
  const terms = q.split(/\s+/).filter(Boolean);
  return terms.reduce((sum, term) => sum + (t.includes(term) ? 12 : 0), 0);
}

export function searchPortfolio(query: string): SearchHit[] {
  const q = query.trim();
  if (!q) {
    return [
      { id: "prsense", title: "PRSense", subtitle: "Strongest engineering project", href: "/explore/projects/prsense", kind: "work" },
      { id: "neopart", title: "Neopart Transit", subtitle: "Professional evidence", href: "/explore/experience/neopart", kind: "work" },
      { id: "caspian", title: "Caspian SDK", subtitle: "Open source · 2 merged PRs", href: "/explore/oss/caspian", kind: "work" },
      { id: "ask", title: "Ask Sahil", subtitle: "Evidence-grounded questions", href: "/explore/ask", kind: "action" },
      { id: "match", title: "Match Role", subtitle: "Job description evidence matching", href: "/explore/match", kind: "action" },
      { id: "resume", title: "Resume.pdf", subtitle: "View or download", href: "/explore/resume", kind: "action" },
    ];
  }

  const hits: Array<SearchHit & { n: number }> = [];

  hits.push({
    id: "person",
    title: person.name,
    subtitle: `${person.title} · ${person.positioning}`,
    href: "/explore/about",
    kind: "person",
    n: score(q, haystack([person.name, person.title, person.positioning, person.location, person.about])),
  });

  for (const item of work) {
    hits.push({
      id: item.id,
      title: item.name,
      subtitle: `${item.classification} · ${item.summary}`,
      href: workHref(item),
      kind: "work",
      n: score(
        q,
        haystack([
          item.name,
          item.classification,
          item.summary,
          item.story,
          item.technologies.join(" "),
          Object.values(item.sections).join(" "),
          item.limitations?.map((l) => `${l.title} ${l.body}`).join(" "),
        ]),
      ),
    });
  }

  for (const concept of concepts) {
    hits.push({
      id: `concept-${concept.id}`,
      title: concept.name,
      subtitle: concept.summary,
      href: `/explore/engineering/${concept.id}`,
      kind: "concept",
      n: score(q, haystack([concept.name, concept.summary, concept.id])),
    });
  }

  for (const skill of skills) {
    hits.push({
      id: `skill-${skill.id}`,
      title: skill.name,
      subtitle: skill.summary,
      href: `/explore/engineering/${skill.id}`,
      kind: "skill",
      n: score(q, haystack([skill.name, skill.summary, skill.aliases.join(" "), skill.caveat])),
    });
  }

  for (const item of evidence) {
    hits.push({
      id: item.id,
      title: item.claim,
      subtitle: `${item.sourceType} · ${item.strength}`,
      href: item.href,
      kind: "evidence",
      n: score(q, haystack([item.claim, item.summary, item.tags.join(" "), item.caveat])),
    });
  }

  const extras: Array<SearchHit & { n: number }> = [
    { id: "ask", title: "Ask Sahil", subtitle: "Ask a grounded question", href: "/explore/ask", kind: "action", n: score(q, "ask sahil chat question") },
    { id: "match", title: "Match Role", subtitle: "Paste a job description", href: "/explore/match", kind: "action", n: score(q, "match role job description jd") },
    { id: "resume", title: "Resume.pdf", subtitle: "View or download the resume", href: "/explore/resume", kind: "action", n: score(q, "resume cv pdf") },
    { id: "map", title: "Engineering map", subtitle: "Concept → evidence", href: "/explore/engineering", kind: "action", n: score(q, "engineering map concepts architecture") },
  ];

  return [...hits, ...extras]
    .filter((hit) => hit.n > 0)
    .sort((a, b) => b.n - a.n)
    .slice(0, 12)
    .map(({ n: _n, ...hit }) => hit);
}
