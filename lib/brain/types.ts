export type Classification =
  | "PROFESSIONAL"
  | "ENGINEERING PROJECT"
  | "MVP"
  | "OPEN SOURCE"
  | "EDUCATION";

export type EvidenceSourceType =
  | "PROFESSIONAL"
  | "ENGINEERING_PROJECT"
  | "OPEN_SOURCE"
  | "MVP"
  | "EDUCATION";

export type EvidenceStrength = "STRONG" | "GOOD" | "LIMITED" | "NONE";

export type LinkKind =
  | "github"
  | "live"
  | "demo"
  | "pr"
  | "linkedin"
  | "email"
  | "resume";

export type ExternalLink = {
  label: string;
  href: string;
  kind: LinkKind;
};

export type Evidence = {
  id: string;
  claim: string;
  summary: string;
  sourceType: EvidenceSourceType;
  strength: EvidenceStrength;
  objectId: string;
  href: string;
  github?: string;
  caveat?: string;
  tags: string[];
};

export type Achievement = {
  id: string;
  title: string;
  body: string;
  metrics?: string[];
  evidenceIds: string[];
};

export type ArchitectureNode = {
  id: string;
  label: string;
  detail: string;
  kind: "ingress" | "service" | "data" | "queue" | "worker" | "external" | "ai";
};

export type Decision = {
  id: string;
  title: string;
  body: string;
  evidenceIds: string[];
};

export type Limitation = {
  id: string;
  title: string;
  body: string;
  improvement: string;
  href: string;
};

export type WorkObject = {
  id: string;
  slug: string;
  name: string;
  classification: Classification;
  eyebrow: string;
  summary: string;
  story: string;
  technologies: string[];
  links: ExternalLink[];
  achievements?: Achievement[];
  architecture?: {
    nodes: ArchitectureNode[];
    flow: string[];
    canonicalStory: string;
  };
  decisions?: Decision[];
  limitations?: Limitation[];
  inspectorTabs: string[];
  sections: Record<string, string>;
  evidenceIds: string[];
};

export type Concept = {
  id: string;
  name: string;
  summary: string;
  evidenceIds: string[];
  relatedConceptIds: string[];
};

export type Skill = {
  id: string;
  name: string;
  aliases: string[];
  category: string;
  strength: EvidenceStrength | "PROFESSIONAL EVIDENCE" | "PROJECT EVIDENCE" | "FOCUSED EXTERNAL EVIDENCE";
  summary: string;
  evidenceIds: string[];
  transferableFrom?: string[];
  caveat?: string;
};

export type Person = {
  name: string;
  title: string;
  positioning: string;
  location: string;
  experience: string;
  email: string;
  phone: string;
  linkedin: string;
  github: string;
  resumePath: string;
  about: string;
  education: {
    degree: string;
    school: string;
    years: string;
    cgpa: string;
  };
  targetRoles: string[];
  strengths: string[];
  limitations: string[];
  gaps: string[];
};
