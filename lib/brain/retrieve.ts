import { concepts, evidence, person, skills, work } from "./content";
import { getEvidence, getWork } from "./index";

const PORTFOLIO_TERMS = [
  "sahil",
  "experience",
  "project",
  "backend",
  "java",
  "python",
  "spring",
  "kafka",
  "ai",
  "llm",
  "rag",
  "prsense",
  "neopart",
  "caspian",
  "resume",
  "skill",
  "weak",
  "strength",
  "frontend",
  "aws",
  "terraform",
  "role",
  "interview",
  "github",
  "production",
  "scale",
  "concurrency",
  "failure",
  "limitation",
];

export function isLikelyPortfolioQuestion(question: string) {
  const q = question.toLowerCase();
  return PORTFOLIO_TERMS.some((term) => q.includes(term));
}

export function retrieveEvidence(question: string, contextObjectId?: string) {
  const q = question.toLowerCase();
  const terms = q.split(/[^a-z0-9+#]+/).filter((t) => t.length > 2);

  const scored = evidence.map((item) => {
    const text = `${item.claim} ${item.summary} ${item.tags.join(" ")} ${item.caveat ?? ""}`.toLowerCase();
    let n = terms.reduce((sum, term) => sum + (text.includes(term) ? 1 : 0), 0);
    if (contextObjectId && item.objectId === contextObjectId) n += 2;
    return { item, n };
  });

  const topEvidence = scored
    .filter((row) => row.n > 0)
    .sort((a, b) => b.n - a.n)
    .slice(0, 10)
    .map((row) => row.item);

  const relatedWork = work.filter((item) => {
    const blob = `${item.name} ${item.summary} ${item.story} ${item.technologies.join(" ")}`.toLowerCase();
    return terms.some((term) => blob.includes(term)) || item.id === contextObjectId;
  });

  const relatedSkills = skills.filter((skill) => {
    const blob = `${skill.name} ${skill.aliases.join(" ")} ${skill.summary}`.toLowerCase();
    return terms.some((term) => blob.includes(term));
  });

  const relatedConcepts = concepts.filter((concept) => {
    const blob = `${concept.name} ${concept.summary}`.toLowerCase();
    return terms.some((term) => blob.includes(term));
  });

  const contextWork = contextObjectId ? getWork(contextObjectId) : undefined;

  return {
    person: {
      name: person.name,
      title: person.title,
      positioning: person.positioning,
      location: person.location,
      experience: person.experience,
      about: person.about,
      education: person.education,
      strengths: person.strengths,
      limitations: person.limitations,
      gaps: person.gaps,
      targetRoles: person.targetRoles,
      contact: {
        email: person.email,
        linkedin: person.linkedin,
        github: person.github,
        phone: person.phone,
      },
    },
    facts: {
      professionalExperience: "~1.5 years",
      kafkaIsProjectNotProfessionalProduction: true,
      notSeniorStaffOrPrincipal: true,
      noAwsProductionEvidence: true,
      noTerraformEvidence: true,
      noGoogleEmployment: true,
      noInternetScaleProduction: true,
      prsenseIsNotAutonomousAgent: true,
      mvpsAreNotProductionPlatforms: true,
      absenceOfEvidenceIsNotInability: true,
      excludedProjects: ["CollectFlow"],
    },
    contextWork: contextWork
      ? {
          id: contextWork.id,
          name: contextWork.name,
          classification: contextWork.classification,
          summary: contextWork.summary,
          story: contextWork.story,
          sections: contextWork.sections,
          limitations: contextWork.limitations,
          decisions: contextWork.decisions,
          architecture: contextWork.architecture,
          technologies: contextWork.technologies,
          links: contextWork.links,
        }
      : null,
    evidence: (topEvidence.length ? topEvidence : evidence.slice(0, 8)).map((item) => ({
      id: item.id,
      claim: item.claim,
      summary: item.summary,
      sourceType: item.sourceType,
      strength: item.strength,
      href: item.href,
      caveat: item.caveat,
      objectId: item.objectId,
    })),
    work: relatedWork.map((item) => ({
      id: item.id,
      name: item.name,
      classification: item.classification,
      summary: item.summary,
      technologies: item.technologies,
      links: item.links,
    })),
    skills: relatedSkills.map((skill) => ({
      id: skill.id,
      name: skill.name,
      strength: skill.strength,
      summary: skill.summary,
      caveat: skill.caveat,
      evidenceIds: skill.evidenceIds,
    })),
    concepts: relatedConcepts.map((concept) => ({
      id: concept.id,
      name: concept.name,
      summary: concept.summary,
      evidenceIds: concept.evidenceIds,
    })),
  };
}

export function compactBrainForMatch() {
  return {
    skills: skills.map((skill) => ({
      id: skill.id,
      name: skill.name,
      aliases: skill.aliases,
      strength: skill.strength,
      caveat: skill.caveat,
      evidenceIds: skill.evidenceIds,
      transferableFrom: skill.transferableFrom ?? [],
    })),
    evidence: evidence.map((item) => ({
      id: item.id,
      claim: item.claim,
      sourceType: item.sourceType,
      strength: item.strength,
      href: item.href,
      objectId: item.objectId,
      caveat: item.caveat,
    })),
    work: work.map((item) => ({
      id: item.id,
      name: item.name,
      classification: item.classification,
    })),
  };
}

export function evidenceByIds(ids: string[]) {
  return ids.map((id) => getEvidence(id)).filter(Boolean);
}
