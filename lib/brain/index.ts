import { concepts, evidence, person, skills, work } from "./content";
import type { Concept, Evidence, Skill, WorkObject } from "./types";

export * from "./types";
export { concepts, evidence, person, skills, work } from "./content";

export const professional = work.filter((item) => item.classification === "PROFESSIONAL");
export const projects = work.filter((item) => item.classification === "ENGINEERING PROJECT");
export const mvps = work.filter((item) => item.classification === "MVP");
export const oss = work.filter((item) => item.classification === "OPEN SOURCE");

const workById = new Map(work.map((item) => [item.id, item]));
const evidenceById = new Map(evidence.map((item) => [item.id, item]));
const conceptById = new Map(concepts.map((item) => [item.id, item]));
const skillById = new Map(skills.map((item) => [item.id, item]));

export function getWork(id: string) {
  return workById.get(id);
}

export function getEvidence(id: string) {
  return evidenceById.get(id);
}

export function getConcept(id: string) {
  return conceptById.get(id);
}

export function getSkill(id: string) {
  return skillById.get(id);
}

export function evidenceFor(ids: string[]): Evidence[] {
  return ids.map((id) => evidenceById.get(id)).filter((item): item is Evidence => Boolean(item));
}

export function workHref(item: WorkObject) {
  if (item.classification === "PROFESSIONAL") return `/explore/experience/${item.slug}`;
  if (item.classification === "ENGINEERING PROJECT") return `/explore/projects/${item.slug}`;
  if (item.classification === "MVP") return `/explore/mvps/${item.slug}`;
  return `/explore/oss/${item.slug}`;
}

export function conceptHref(concept: Concept) {
  return `/explore/engineering/${concept.id}`;
}

export function skillHref(skill: Skill) {
  return `/explore/engineering/${skill.id}`;
}

export const explorerGroups = [
  {
    id: "experience",
    label: "Experience",
    items: professional.map((item) => ({
      id: item.id,
      label: item.name,
      href: workHref(item),
      meta: item.classification,
    })),
  },
  {
    id: "projects",
    label: "Projects",
    items: projects.map((item) => ({
      id: item.id,
      label: item.name,
      href: workHref(item),
      meta: item.classification,
    })),
  },
  {
    id: "mvps",
    label: "MVPs",
    items: mvps.map((item) => ({
      id: item.id,
      label: item.name,
      href: workHref(item),
      meta: item.classification,
    })),
  },
  {
    id: "engineering",
    label: "Engineering",
    items: concepts.map((item) => ({
      id: item.id,
      label: item.name,
      href: conceptHref(item),
      meta: "CONCEPT",
    })),
  },
  {
    id: "oss",
    label: "Open Source",
    items: oss.map((item) => ({
      id: item.id,
      label: item.name,
      href: workHref(item),
      meta: item.classification,
    })),
  },
  {
    id: "tools",
    label: "Workspace",
    items: [
      { id: "resume", label: "Resume.pdf", href: "/explore/resume", meta: "PDF" },
      { id: "ask", label: "Ask Sahil", href: "/explore/ask", meta: "APP" },
      { id: "match", label: "Match Role", href: "/explore/match", meta: "APP" },
      { id: "about", label: "About / Contact", href: "/explore/about", meta: "PROFILE" },
    ],
  },
];

export function brainSnapshot() {
  return {
    person,
    work,
    evidence,
    concepts,
    skills,
    facts: {
      experienceYears: "~1.5 years",
      kafkaIsProjectEvidence: true,
      notSenior: true,
      noAwsProduction: true,
      noTerraform: true,
      noGoogleEmployment: true,
      noInternetScale: true,
      absenceOfEvidenceIsNotInability: true,
      excluded: ["CollectFlow"],
    },
  };
}
