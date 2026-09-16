export type EvidenceStrength = "STRONG" | "GOOD" | "LIMITED" | "NONE";
export type EvidenceSource =
  | "PROFESSIONAL"
  | "ENGINEERING_PROJECT"
  | "MVP"
  | "OPEN_SOURCE"
  | "EDUCATION";

export type Evidence = {
  id: string;
  label: string;
  summary: string;
  source: EvidenceSource;
  strength: EvidenceStrength;
  tags: string[];
  href?: string;
  caveat?: string;
};

export const profile = {
  name: "Sahil Shitole",
  title: "Software Engineer",
  positioning: "Backend Systems × Applied AI",
  location: "Pune, India",
  experience: "~1.5 years",
  email: "sahilmshitole1483@gmail.com",
  github: "https://github.com/Sms1818",
  linkedin: "https://www.linkedin.com/in/sahil-shitole/",
  about: [
    "I’m a software engineer who likes building things that solve real problems. Over the past ~1.5 years, I’ve worked on backend systems, APIs, automation, integrations, and AI-powered tools used in day-to-day operations.",
    "Most of my professional work has been with Java, Spring Boot, Python, FastAPI, and SQL. I care more about understanding the problem and building the right solution than sticking to one stack.",
    "Outside of work, I enjoy taking ideas from a rough problem to something people can actually use. I’ve built projects like PRSense, experimented with AI MVPs such as VeriSpec and FlowDoctor, and contributed to open-source projects including the Caspian SDK and AgentKit.",
    "I’m currently open to Software Engineering and AI opportunities, especially roles where I can own problems, build useful products, work on strong engineering systems, and keep growing as an engineer.",
  ],
};

export const experience = {
  company: "Neopart Transit LLC",
  via: "via Blue Ocean Global",
  role: "Software Engineer – Backend & Automation",
  dates: "Jan 2025 – May 2026",
  summary:
    "Production backend systems, integrations, automation and applied-AI workflows used in day-to-day operations.",
  achievements: [
    "Built an AR escalation system supporting 50+ customer accounts, combining LLM-assisted interpretation with deterministic business rules.",
    "Consolidated 4 legacy accounting applications into Spring Boot microservices.",
    "Built secure REST APIs with Spring Security, JWT, JPA/Hibernate and RBAC.",
    "Integrated Quickbase, OptimoRoute, QuickBooks and Office 365.",
    "Automated recurring reporting workflows, saving approximately 4 hours of manual work per week.",
    "Worked with GitHub Actions CI/CD, DigitalOcean deployments and production debugging.",
  ],
};

export const projects = [
  {
    id: "prsense",
    name: "PRSense",
    type: "ENGINEERING PROJECT",
    blurb: "Event-driven AI code review for Bitbucket pull requests.",
    tech: [
      "Java 21",
      "Spring Boot",
      "Kafka",
      "PostgreSQL",
      "JGit",
      "Gemini",
      "Docker",
      "Kubernetes",
    ],
    github: "https://github.com/Sms1818/PRSense",
    featured: true,
  },
  {
    id: "supportsync",
    name: "SupportSync",
    type: "ENGINEERING PROJECT",
    blurb:
      "AI-powered support integration platform with semantic retrieval over solved tickets.",
    tech: ["Python", "FastAPI", "LangChain", "Pinecone", "RAG", "Docker"],
    github: "https://github.com/Sms1818/Support_Sync_Project",
    featured: true,
  },
  {
    id: "verispec",
    name: "VeriSpec",
    type: "MVP",
    blurb:
      "AI product MVP exploring product judgment, AI workflow design and deployment.",
    tech: ["AI Product", "Full-stack", "Deployment"],
    github: "https://github.com/Sms1818/VeriSpec",
    live: "https://veri-spec-rho.vercel.app/",
    demo: "https://www.loom.com/share/6880f60a811647f983c85aa3191c6550",
  },
  {
    id: "flowdoctor",
    name: "FlowDoctor",
    type: "MVP",
    blurb:
      "AI workflow review MVP across reliability, security, observability, cost and architecture.",
    tech: ["AI", "Workflow Review", "Product MVP"],
    github: "https://github.com/Sms1818/FlowDoctor",
    live: "https://flow-doctor-coral.vercel.app/",
    demo: "https://drive.google.com/file/d/16yispMfn6X-60Uviq6Uz9Q0linlyjmfm/view?usp=drive_link",
  },
  {
    id: "lenny",
    name: "Lenny Growth Assistant",
    type: "MVP",
    blurb:
      "RAG assistant with persistent chat sessions, pgvector and local/cloud model support.",
    tech: ["FastAPI", "PostgreSQL", "pgvector", "RAG", "Evals"],
    github: "https://github.com/Sms1818/lenny-growth-assistant",
    demo: "https://www.loom.com/share/75ccefd82a4c4c60bf3cda657c8b2ec3",
  },
];

export const openSource = {
  name: "Open Source",
  type: "OPEN SOURCE",
  summary:
    "Merged contributions to external open-source projects, with review and iteration in codebases I didn’t own.",
  prs: [
    {
      id: 94,
      title: "Bluesky / AT Protocol integration",
      href: "https://github.com/TryCaspian/caspian-sdk/pull/94",
    },
    {
      id: 140,
      title: "Session reliability + per-account concurrency",
      href: "https://github.com/TryCaspian/caspian-sdk/pull/140",
    },
  ],
  collectFlow: {
    name: "CollectFlow — AgentKit",
    summary:
      "Built an accounts-receivable prioritization and escalation kit that turns collection context and policy rules into clear next actions, including disputes, payment promises, escalation thresholds and manager approval.",
    href: "https://github.com/Sms1818/AgentKit/tree/feat/collectflow-kit/kits/collectflow",
  },
};

export const evidence: Evidence[] = [
  {
    id: "java",
    label: "Java",
    summary: "Professional Spring Boot work plus PRSense in Java 21.",
    source: "PROFESSIONAL",
    strength: "STRONG",
    tags: ["java", "spring boot", "backend", "microservices"],
    href: "/workspace?open=experience",
  },
  {
    id: "spring",
    label: "Spring Boot",
    summary: "Professional microservices and secure APIs, plus PRSense.",
    source: "PROFESSIONAL",
    strength: "STRONG",
    tags: ["spring boot", "spring security", "jpa", "hibernate"],
    href: "/workspace?open=experience",
  },
  {
    id: "python",
    label: "Python / FastAPI",
    summary:
      "Professional integrations and automation plus SupportSync and Lenny.",
    source: "PROFESSIONAL",
    strength: "STRONG",
    tags: ["python", "fastapi", "flask", "backend"],
    href: "/workspace?open=experience",
  },
  {
    id: "apis",
    label: "REST APIs & Integrations",
    summary:
      "Quickbase, QuickBooks, OptimoRoute, Office 365 and multiple project integrations.",
    source: "PROFESSIONAL",
    strength: "STRONG",
    tags: ["rest api", "integrations", "third-party", "api design"],
    href: "/workspace?open=experience",
  },
  {
    id: "sql",
    label: "SQL & Relational Data",
    summary:
      "SQL Server, MySQL and PostgreSQL across professional and project work.",
    source: "PROFESSIONAL",
    strength: "STRONG",
    tags: ["sql", "postgresql", "mysql", "sql server", "relational database"],
  },
  {
    id: "kafka",
    label: "Kafka / Event-Driven Systems",
    summary:
      "Hands-on project evidence in PRSense; no documented professional-production Kafka usage.",
    source: "ENGINEERING_PROJECT",
    strength: "GOOD",
    tags: ["kafka", "event-driven", "asynchronous", "messaging"],
    href: "/workspace?open=prsense",
    caveat:
      "Project evidence, not documented professional-production evidence.",
  },
  {
    id: "rag",
    label: "RAG / Retrieval",
    summary:
      "SupportSync and Lenny use retrieval-oriented AI patterns and vector stores.",
    source: "ENGINEERING_PROJECT",
    strength: "GOOD",
    tags: ["rag", "retrieval", "pinecone", "pgvector", "vector database"],
    href: "/workspace?open=projects",
  },
  {
    id: "ai",
    label: "Applied AI / LLM Systems",
    summary:
      "Professional AI-assisted workflows plus PRSense, SupportSync and MVP work.",
    source: "PROFESSIONAL",
    strength: "STRONG",
    tags: ["llm", "gemini", "rag", "ai-assisted", "applied ai"],
    href: "/workspace?open=engineering",
  },
  {
    id: "security",
    label: "Authentication & API Security",
    summary:
      "Professional Spring Security, JWT and RBAC work; Caspian session lifecycle work.",
    source: "PROFESSIONAL",
    strength: "GOOD",
    tags: ["security", "jwt", "rbac", "authentication", "authorization"],
    href: "/workspace?open=experience",
  },
  {
    id: "docker",
    label: "Docker",
    summary: "Professional and project containerization evidence.",
    source: "PROFESSIONAL",
    strength: "GOOD",
    tags: ["docker", "container", "containerization"],
  },
  {
    id: "kubernetes",
    label: "Kubernetes",
    summary: "Project evidence through PRSense manifests and deployment setup.",
    source: "ENGINEERING_PROJECT",
    strength: "GOOD",
    tags: ["kubernetes", "k8s"],
    href: "/workspace?open=prsense",
    caveat: "Project evidence.",
  },
  {
    id: "cicd",
    label: "CI/CD",
    summary: "Professional GitHub Actions and DigitalOcean deployment work.",
    source: "PROFESSIONAL",
    strength: "GOOD",
    tags: ["ci/cd", "github actions", "deployment", "digitalocean"],
  },
  {
    id: "opensource",
    label: "Open Source",
    summary:
      "Merged contributions to the Caspian SDK and AgentKit, with upstream review and iteration.",
    source: "OPEN_SOURCE",
    strength: "STRONG",
    tags: ["open source", "open-source", "github", "code review"],
    href: "/workspace?open=opensource",
  },
  {
    id: "concurrency",
    label: "Concurrency",
    summary:
      "Focused external evidence through per-account session locking in Caspian PR #140.",
    source: "OPEN_SOURCE",
    strength: "GOOD",
    tags: ["concurrency", "locking", "session", "async"],
    href: "/workspace?open=opensource",
    caveat: "Focused evidence, not a claim of broad concurrency expertise.",
  },
  {
    id: "aws",
    label: "AWS",
    summary: "No strong production AWS evidence documented in the portfolio.",
    source: "ENGINEERING_PROJECT",
    strength: "NONE",
    tags: ["aws", "amazon web services"],
    caveat: "Portfolio does not establish production AWS experience.",
  },
  {
    id: "terraform",
    label: "Terraform",
    summary: "No documented Terraform evidence.",
    source: "ENGINEERING_PROJECT",
    strength: "NONE",
    tags: ["terraform", "infrastructure as code", "iac"],
    caveat: "Portfolio does not establish Terraform experience.",
  },
  {
    id: "frontend",
    label: "Frontend",
    summary:
      "Some frontend work through MVPs, while most of the portfolio is stronger on backend engineering.",
    source: "MVP",
    strength: "LIMITED",
    tags: ["frontend", "full-stack", "product ui"],
    href: "/workspace?open=projects",
  },
];

export const engineeringMap = [
  {
    concept: "Event-driven systems",
    evidence: ["PRSense", "Kafka", "Async processing"],
  },
  {
    concept: "API & backend design",
    evidence: ["Neopart", "PRSense", "SupportSync"],
  },
  {
    concept: "Reliability & failure handling",
    evidence: ["PRSense", "Professional automation"],
  },
  { concept: "AI + deterministic logic", evidence: ["Neopart AR escalation"] },
  {
    concept: "Authentication & security",
    evidence: ["Spring Security / JWT / RBAC", "Caspian sessions"],
  },
  { concept: "Concurrency", evidence: ["Caspian PR #140"] },
  { concept: "RAG / retrieval", evidence: ["SupportSync", "Lenny"] },
  {
    concept: "Product / MVP execution",
    evidence: ["VeriSpec", "FlowDoctor", "Lenny"],
  },
];

export const prsenseDeepDive = {
  architecture: [
    "Bitbucket webhook",
    "review-service",
    "Kafka",
    "ai-service",
    "repository clone",
    "merge-base diff",
    "Gemini",
    "Bitbucket PR comment",
  ],
  whyKafka:
    "Kafka decouples webhook ingestion from the longer-running review pipeline. Events are accepted and persisted first, while cloning, diff generation, AI inference and PR feedback run asynchronously in a separate consumer.",
  failureHandling: [
    "Gemini and Bitbucket failures propagate to the Kafka consumer instead of being treated as successful reviews.",
    "Git clone and diff failures are currently logged too locally and can collapse into an empty-diff outcome.",
    "Duplicate webhook delivery is not explicitly deduplicated today.",
    "There is no explicit application-level dead-letter/replay workflow yet.",
    "Repository workspaces are cleaned before a same-branch clone, but not with a finally-based post-job cleanup.",
  ],
  improvements: [
    "Deterministic idempotency key using repository + PR + source commit.",
    "Explicit Git-stage error propagation and bounded retries.",
    "Retry topics / DLQ and replay tooling.",
    "Unique temporary workspace per review with guaranteed cleanup.",
    "Reliable DB-to-Kafka publication boundary such as an outbox.",
    "Rate limiting, observability and bounded concurrency for higher-scale operation.",
  ],
};
