import { evidence, skills } from "@/lib/brain/content";
import type { Evidence, Skill } from "@/lib/brain/types";

export type Importance = "required" | "preferred";
export type EvidenceStatus = "direct" | "transferable" | "gap";

export type ExtractedRequirement = {
  rawText: string;
  normalizedSkill?: string;
  category: string;
  importance: Importance;
};

export type JobRequirement = {
  id: string;
  rawText: string;
  normalizedSkill?: string;
  category: string;
  importance: Importance;
  evidenceStatus: EvidenceStatus;
  evidenceIds: string[];
  evidenceScore: 0 | 0.5 | 1;
  caveat?: string;
  evidenceHref?: string;
};

const aliasToSkill = new Map<string, Skill>();
for (const skill of skills) {
  aliasToSkill.set(normalize(skill.id), skill);
  aliasToSkill.set(normalize(skill.name), skill);
  for (const alias of skill.aliases) aliasToSkill.set(normalize(alias), skill);
}

function normalize(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9+#]+/g, " ").trim();
}

export function resolveSkill(raw: string | undefined) {
  if (!raw) return undefined;
  const direct = aliasToSkill.get(normalize(raw));
  if (direct) return direct;
  for (const [alias, skill] of aliasToSkill) {
    if (normalize(raw).includes(alias) || alias.includes(normalize(raw))) return skill;
  }
  return undefined;
}

function evidenceForSkill(skill: Skill): Evidence[] {
  return skill.evidenceIds
    .map((id) => evidence.find((item) => item.id === id))
    .filter((item): item is Evidence => Boolean(item));
}

export function scoreRequirements(extracted: ExtractedRequirement[]): {
  requirements: JobRequirement[];
  score: number;
  weightedPoints: number;
  possiblePoints: number;
} {
  const requirements: JobRequirement[] = extracted.map((item, index) => {
    const skill = resolveSkill(item.normalizedSkill) ?? resolveSkill(item.rawText);
    if (!skill) {
      return {
        id: `req-${index + 1}`,
        rawText: item.rawText,
        normalizedSkill: item.normalizedSkill,
        category: item.category || "general",
        importance: item.importance,
        evidenceStatus: "gap",
        evidenceIds: [],
        evidenceScore: 0,
      };
    }

    const rows = evidenceForSkill(skill);
    if (rows.length > 0) {
      return {
        id: `req-${index + 1}`,
        rawText: item.rawText,
        normalizedSkill: skill.name,
        category: item.category || skill.category,
        importance: item.importance,
        evidenceStatus: "direct",
        evidenceIds: rows.map((row) => row.id),
        evidenceScore: 1,
        caveat: skill.caveat,
        evidenceHref: rows[0]?.href,
      };
    }

    const transferable = (skill.transferableFrom ?? [])
      .map((id) => skills.find((s) => s.id === id))
      .filter((s): s is Skill => Boolean(s && s.evidenceIds.length > 0));

    if (transferable.length > 0) {
      const ids = transferable.flatMap((s) => s.evidenceIds);
      return {
        id: `req-${index + 1}`,
        rawText: item.rawText,
        normalizedSkill: skill.name,
        category: item.category || skill.category,
        importance: item.importance,
        evidenceStatus: "transferable",
        evidenceIds: ids,
        evidenceScore: 0.5,
        caveat:
          skill.caveat ??
          `Related evidence exists (${transferable.map((s) => s.name).join(", ")}), but this is not direct evidence for ${skill.name}.`,
        evidenceHref: evidence.find((row) => ids.includes(row.id))?.href,
      };
    }

    return {
      id: `req-${index + 1}`,
      rawText: item.rawText,
      normalizedSkill: skill.name,
      category: item.category || skill.category,
      importance: item.importance,
      evidenceStatus: "gap",
      evidenceIds: [],
      evidenceScore: 0,
      caveat: skill.caveat ?? skill.summary,
    };
  });

  const possiblePoints = requirements.reduce(
    (sum, req) => sum + (req.importance === "required" ? 3 : 1),
    0,
  );
  const weightedPoints = requirements.reduce(
    (sum, req) => sum + (req.importance === "required" ? 3 : 1) * req.evidenceScore,
    0,
  );
  const score = possiblePoints === 0 ? 0 : Math.round((weightedPoints / possiblePoints) * 100);

  return { requirements, score, weightedPoints, possiblePoints };
}
