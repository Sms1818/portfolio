import { person } from "@/lib/brain/content";
import { ButtonLink } from "@/components/ui";

export function ResumeViewer() {
  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="mono text-[11px] uppercase tracking-[0.18em] text-muted">Resume.pdf</p>
          <h1 className="mt-3 text-3xl tracking-tight">The actual resume.</h1>
        </div>
        <div className="flex gap-2">
          <ButtonLink href={person.resumePath} variant="ghost">
            Open PDF
          </ButtonLink>
          <a
            href={person.resumePath}
            download
            className="inline-flex items-center rounded-full bg-accent px-4 py-2 text-sm text-accent-fg"
          >
            Download PDF
          </a>
        </div>
      </div>
      <iframe
        title="Sahil Shitole resume"
        src={person.resumePath}
        className="mt-8 h-[80vh] w-full rounded-2xl border border-line bg-bg-elevated"
      />
    </div>
  );
}

export function AboutPanel() {
  return (
    <div className="max-w-2xl">
      <p className="mono text-[11px] uppercase tracking-[0.18em] text-muted">About / Contact</p>
      <h1 className="mt-3 text-3xl tracking-tight">{person.name}</h1>
      <p className="mt-2 text-muted">
        {person.title} · {person.positioning}
      </p>
      <p className="mt-8 whitespace-pre-line leading-7 text-[15px] text-muted">{person.about}</p>
      <dl className="mt-10 space-y-3 text-sm">
        <div>
          <dt className="mono text-[11px] text-faint">Email</dt>
          <dd>
            <a className="text-accent" href={`mailto:${person.email}`}>
              {person.email}
            </a>
          </dd>
        </div>
        <div>
          <dt className="mono text-[11px] text-faint">Location</dt>
          <dd>{person.location}</dd>
        </div>
        <div>
          <dt className="mono text-[11px] text-faint">GitHub</dt>
          <dd>
            <a className="text-accent" href={person.github} target="_blank" rel="noreferrer">
              {person.github}
            </a>
          </dd>
        </div>
        <div>
          <dt className="mono text-[11px] text-faint">LinkedIn</dt>
          <dd>
            <a className="text-accent" href={person.linkedin} target="_blank" rel="noreferrer">
              {person.linkedin}
            </a>
          </dd>
        </div>
        <div>
          <dt className="mono text-[11px] text-faint">Education</dt>
          <dd>
            {person.education.degree}, {person.education.school} · {person.education.years} · CGPA {person.education.cgpa}
          </dd>
        </div>
      </dl>
    </div>
  );
}

export function WorkspaceHome() {
  return (
    <div className="max-w-2xl">
      <p className="mono text-[11px] uppercase tracking-[0.18em] text-muted">Engineering workspace</p>
      <h1 className="mt-3 text-3xl tracking-tight">Start clean. Create complexity by inspecting.</h1>
      <p className="mt-4 leading-7 text-muted">
        This is Sahil&apos;s personal engineering workspace — not a fake desktop OS. Open experience, projects, engineering concepts, or open source. Search with ⌘K.
      </p>
      <div className="mt-10 grid gap-3 sm:grid-cols-2">
        {[
          ["Neopart Transit", "/explore/experience/neopart", "Professional"],
          ["PRSense", "/explore/projects/prsense", "Engineering project"],
          ["Caspian SDK", "/explore/oss/caspian", "Open source"],
          ["Engineering map", "/explore/engineering", "Concept → evidence"],
        ].map(([label, href, meta]) => (
          <a key={href} href={href} className="rounded-2xl border border-line p-4 hover:border-line-strong">
            <div className="mono text-[10px] uppercase tracking-[0.14em] text-faint">{meta}</div>
            <div className="mt-2">{label}</div>
          </a>
        ))}
      </div>
    </div>
  );
}
