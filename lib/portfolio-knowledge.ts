import { evidence, engineeringMap, experience, openSource, profile, projects, prsenseDeepDive } from "./portfolio";

export type KnowledgeChunk = {
  id: string;
  title: string;
  text: string;
  href?: string;
  tags: string[];
};

export const knowledgeChunks: KnowledgeChunk[] = [
  {
    id: "profile",
    title: "Profile and positioning",
    text: `${profile.name} is a ${profile.title} based in ${profile.location} with ${profile.experience} of professional experience. Positioning: ${profile.positioning}. ${profile.about.join(" ")}`,
    href: "/workspace?open=about",
    tags: ["profile", "about", "software engineer", "backend", "applied ai", "roles"],
  },
  {
    id: "experience-neopart",
    title: "Professional experience — Neopart Transit",
    text: `${experience.company} (${experience.via}), ${experience.role}, ${experience.dates}. ${experience.summary} Achievements: ${experience.achievements.join(" ")}`,
    href: "/workspace?open=experience",
    tags: ["professional", "neopart", "spring boot", "java", "python", "fastapi", "sql", "integrations", "production", "automation"],
  },
  {
    id: "prsense",
    title: "PRSense engineering project",
    text: `PRSense is an engineering project, not professional production work. Architecture: ${prsenseDeepDive.architecture.join(" -> ")}. Why Kafka: ${prsenseDeepDive.whyKafka} Current failure handling and limitations: ${prsenseDeepDive.failureHandling.join(" ")} Improvements Sahil would make: ${prsenseDeepDive.improvements.join(" ")}`,
    href: "/workspace?open=prsense",
    tags: ["prsense", "java", "spring boot", "kafka", "event-driven", "git", "gemini", "bitbucket", "reliability", "failure handling", "idempotency"],
  },
  {
    id: "opensource-caspian",
    title: "Caspian SDK open-source contributions",
    text: `${openSource.summary} PR #94 added Bluesky / AT Protocol support including posts, threaded replies, inbound polling, webhook verification, normalization, fakes and tests, and was ported when the upstream provider architecture changed. PR #140 added cached sessions, refresh-on-401 behavior and per-account session locking. These are merged upstream contributions in an external codebase.`,
    href: "/workspace?open=opensource",
    tags: ["caspian", "open source", "bluesky", "at protocol", "concurrency", "authentication", "sessions", "code review"],
  },
  {
    id: "opensource-agentkit-collectflow",
    title: "CollectFlow — AgentKit open-source contribution",
    text: `${openSource.collectFlow.summary} The contribution is merged into the AgentKit project. It includes policy-driven decisions for disputes, payment promises, priority thresholds and manager approval.`,
    href: openSource.collectFlow.href,
    tags: ["collectflow", "agentkit", "open source", "agent workflows", "accounts receivable", "decision engine", "applied ai"],
  },
  ...projects.filter((p) => p.id !== "prsense").map((p) => ({
    id: `project-${p.id}`,
    title: `${p.name} — ${p.type}`,
    text: `${p.name} is classified as ${p.type}. ${p.blurb} Technologies/evidence: ${p.tech.join(", ")}. Do not describe this as more mature than its classification.`,
    href: "/workspace?open=projects",
    tags: [p.name.toLowerCase(), p.type.toLowerCase(), ...p.tech.map((x) => x.toLowerCase())],
  })),
  ...evidence.map((e) => ({
    id: `evidence-${e.id}`,
    title: `${e.label} evidence`,
    text: `${e.label}: ${e.summary} Evidence source: ${e.source}. Evidence strength: ${e.strength}.${e.caveat ? ` Caveat: ${e.caveat}` : ""}`,
    href: e.href,
    tags: [e.label.toLowerCase(), ...e.tags],
  })),
  {
    id: "engineering-map",
    title: "Engineering concept map",
    text: engineeringMap.map((m) => `${m.concept}: ${m.evidence.join(", ")}`).join(". "),
    href: "/workspace?open=engineering",
    tags: ["engineering", "skills", "evidence", "architecture", "concepts"],
  },
  {
    id: "explicit-gaps",
    title: "Explicit portfolio limitations",
    text: "Sahil has approximately 1.5 years of professional experience and must not be presented as senior/staff/principal. Backend evidence is stronger than frontend evidence. The portfolio does not establish internet-scale production distributed systems, deep AWS production expertise, or Terraform experience. Kafka and Kubernetes have strong hands-on project evidence but are not documented as professional-production experience.",
    href: "/workspace?open=engineering",
    tags: ["weakness", "weaknesses", "gaps", "limitations", "aws", "terraform", "frontend", "scale", "seniority"],
  },
];

const STOP = new Set(["the","a","an","and","or","to","of","in","on","for","with","is","are","was","were","has","have","does","do","what","how","why","can","sahil","his","he","this","that","about","tell","me"]);

export function retrieveKnowledge(query: string, limit = 8) {
  const terms = query.toLowerCase().replace(/[^a-z0-9+#.\-/ ]/g, " ").split(/\s+/).filter((x) => x.length > 1 && !STOP.has(x));
  const scored = knowledgeChunks.map((chunk) => {
    const hay = `${chunk.title} ${chunk.text} ${chunk.tags.join(" ")}`.toLowerCase();
    let score = 0;
    for (const term of terms) {
      if (chunk.tags.some((t) => t.includes(term) || term.includes(t))) score += 5;
      if (chunk.title.toLowerCase().includes(term)) score += 3;
      const matches = hay.split(term).length - 1;
      score += Math.min(matches, 5);
    }
    return { chunk, score };
  }).sort((a,b) => b.score - a.score);
  const hits = scored.filter((x) => x.score > 0).slice(0, limit).map((x) => x.chunk);
  return hits.length ? hits : [knowledgeChunks[0], knowledgeChunks[1], knowledgeChunks[knowledgeChunks.length - 1]];
}
