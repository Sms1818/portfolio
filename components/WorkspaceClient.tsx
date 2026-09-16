"use client";

import { useMemo, useState, type ReactNode } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AskSahil, MatchRole } from "./PortfolioAI";
import ThemeToggle from "./ThemeToggle";
import { engineeringMap, evidence, experience, openSource, profile, projects, prsenseDeepDive } from "@/lib/portfolio";

type View = "home" | "experience" | "projects" | "engineering" | "opensource" | "resume" | "ask" | "match" | "about" | "prsense";

type Node = { id: View; label: string; kind: "folder"|"file"|"app"; icon: string; detail: string };
const nodes: Node[] = [
  { id:"experience", label:"Experience", kind:"folder", icon:"▰", detail:"Professional work" },
  { id:"projects", label:"Projects", kind:"folder", icon:"◇", detail:"Engineering + MVPs" },
  { id:"engineering", label:"Engineering", kind:"folder", icon:"⌘", detail:"Concept → evidence" },
  { id:"opensource", label:"Open Source", kind:"folder", icon:"↗", detail:"Merged contributions" },
  { id:"resume", label:"Resume.pdf", kind:"file", icon:"▤", detail:"View / download" },
  { id:"ask", label:"Ask Sahil.app", kind:"app", icon:"✦", detail:"Ask about my work" },
  { id:"match", label:"Match Role.app", kind:"app", icon:"◎", detail:"Compare a job description" },
  { id:"about", label:"About Sahil", kind:"file", icon:"○", detail:"Profile + contact" },
];

function useWorkspaceView(): [View, (v:View)=>void] {
  const router = useRouter(); const params = useSearchParams();
  const current = (params.get("open") || "home") as View;
  return [current, (v)=>router.push(v === "home" ? "/workspace" : `/workspace?open=${v}`, { scroll:false })];
}

export default function WorkspaceClient() {
  const router = useRouter();
  const [view, setView] = useWorkspaceView();
  const [search, setSearch] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const searchResults = useMemo(() => {
    const q = search.trim().toLowerCase(); if (!q) return [];
    const ev = evidence.filter((e) => [e.label,e.summary,...e.tags].join(" ").toLowerCase().includes(q)).slice(0,6).map((e) => ({ label:e.label, sub:e.summary, href:e.href }));
    const ns = nodes.filter((n) => `${n.label} ${n.detail}`.toLowerCase().includes(q)).map((n) => ({ label:n.label, sub:n.detail, id:n.id }));
    return [...ns, ...ev].slice(0,8);
  }, [search]);

  const title = view === "home" ? "Desktop" : nodes.find((n) => n.id === view)?.label || (view === "prsense" ? "PRSense" : "Workspace");

  return <main className="osShell">
    <div className="osWallpaper"><div className="wallpaperGlow one"/><div className="wallpaperGlow two"/><div className="wallpaperMesh"/></div>

    <header className="osMenubar">
      <div className="osMenuGroup">
        <button className="osBrandButton" onClick={() => setMenuOpen((x) => !x)}><span className="miniBrand">SS</span><b>Sahil Workspace</b></button>
        <button onClick={() => router.push("/")} className="menubarText">← Portfolio</button>
        <button onClick={() => setView("home")} className="menubarText">Desktop</button>
        {menuOpen && <div className="systemMenu"><button onClick={() => { setMenuOpen(false); router.push("/"); }}>Exit to portfolio <span>⌘E</span></button><button onClick={() => { setMenuOpen(false); setView("resume"); }}>Open Resume.pdf <span>⌘R</span></button><button onClick={() => { setMenuOpen(false); setView("ask"); }}>Ask Sahil <span>⌘A</span></button></div>}
      </div>
      <div className="osStatus"><ThemeToggle /><span className="healthDot"/> <span>Portfolio online</span><time suppressHydrationWarning>{new Date().toLocaleDateString("en-IN", { month:"short", day:"numeric" })}</time></div>
    </header>

    <section className="osDesktop">
      <div className="desktopCanvas">
        <div className="desktopLeft">
          <div className="desktopWelcome">
            <span className="eyebrow">SAHIL / ENGINEERING WORKSPACE</span>
            <h1>Take a look around.<br/>This is where the details live.</h1>
            <p>Open a folder, look through a project, read my resume, or ask a question.</p>
          </div>

          <div className="desktopQuickAccess" aria-label="Quick access">
            <div className="quickAccessHeading"><span>QUICK ACCESS</span><small>Good places to start</small></div>
            <div className="quickAccessGrid">
              <button onClick={() => setView("experience")}><span className="quickIcon">▰</span><span><b>Professional work</b><small>Neopart Transit</small></span><i>↗</i></button>
              <button onClick={() => setView("prsense")}><span className="quickIcon">◇</span><span><b>PRSense</b><small>Event-driven code review</small></span><i>↗</i></button>
              <button onClick={() => setView("opensource")}><span className="quickIcon">↗</span><span><b>Open source</b><small>Caspian + AgentKit</small></span><i>↗</i></button>
            </div>
          </div>
        </div>

        <div className="desktopBrowser" aria-label="Workspace files and folders">
          <div className="desktopBrowserBar">
            <div><span className="browserDot"/><span className="browserDot"/><span className="browserDot"/></div>
            <div className="desktopPath"><span>⌂</span><span>Sahil</span><b>Desktop</b></div>
            <span className="desktopCount">8 items</span>
          </div>
          <div className="desktopIcons">
            <div className="desktopIconGroup">
              <span className="desktopGroupLabel">FOLDERS</span>
              {nodes.filter((node) => node.kind === "folder").map((node, i) => <button key={node.id} className={`desktopIcon desktopIcon-${node.kind}`} onDoubleClick={() => setView(node.id)} onClick={() => setView(node.id)} style={{ animationDelay:`${120 + i*55}ms` }}>
                <span className="folderGlyph"><i/><b>{node.icon}</b></span>
                <span className="desktopIconText"><strong>{node.label}</strong><small>{node.detail}</small></span>
              </button>)}
            </div>
            <div className="desktopIconGroup">
              <span className="desktopGroupLabel">APPS & FILES</span>
              {nodes.filter((node) => node.kind !== "folder").map((node, i) => <button key={node.id} className={`desktopIcon desktopIcon-${node.kind}`} onDoubleClick={() => setView(node.id)} onClick={() => setView(node.id)} style={{ animationDelay:`${340 + i*55}ms` }}>
                <span className="folderGlyph">{node.icon}</span>
                <span className="desktopIconText"><strong>{node.label}</strong><small>{node.detail}</small></span>
              </button>)}
            </div>
          </div>
          <div className="desktopBrowserFooter"><span>Tip: use the dock or open any item above.</span><button onClick={() => setView("ask")}>Ask Sahil <b>✦</b></button></div>
        </div>
      </div>
    </section>

    {view !== "home" && <section className="osWindow" aria-label={title}>
      <header className="windowTitlebar">
        <div className="windowControls"><button onClick={() => setView("home")} aria-label="Close window">×</button><button onClick={() => router.back()} aria-label="Back">‹</button><button aria-label="Window control" disabled>□</button></div>
        <div className="windowTitle"><span>{nodes.find((n) => n.id === view)?.icon || "◇"}</span>{title}</div>
        <div className="windowActions"><button onClick={() => setView("home")}>Desktop</button></div>
      </header>
      <div className="windowToolbar">
        <div className="breadcrumb"><button onClick={() => setView("home")}>Sahil</button><span>›</span>{view === "prsense" && <><button onClick={() => setView("projects")}>Projects</button><span>›</span></>}<b>{title}</b></div>
        <div className="windowSearch"><span>⌕</span><input value={search} onChange={(e)=>setSearch(e.target.value)} placeholder="Search workspace"/>{searchResults.length>0 && <div className="searchPopover">{searchResults.map((r:any, i)=><button key={`${r.label}-${i}`} onClick={()=>{setSearch(""); if(r.id) setView(r.id); else if(r.href?.includes("prsense")) setView("prsense"); else if(r.href?.includes("experience")) setView("experience"); else if(r.href?.includes("opensource")) setView("opensource"); else setView("engineering");}}><b>{r.label}</b><small>{r.sub}</small></button>)}</div>}</div>
      </div>
      <div className="windowBody">
        <aside className="folderSidebar">
          <small>FAVORITES</small>
          <button onClick={()=>setView("home")}>⌂ Desktop</button>
          <button onClick={()=>setView("experience")} className={view==="experience"?"active":""}>▰ Experience</button>
          <button onClick={()=>setView("projects")} className={view==="projects"||view==="prsense"?"active":""}>◇ Projects</button>
          <button onClick={()=>setView("engineering")} className={view==="engineering"?"active":""}>⌘ Engineering</button>
          <button onClick={()=>setView("opensource")} className={view==="opensource"?"active":""}>↗ Open Source</button>
          <small>APPS</small>
          <button onClick={()=>setView("ask")} className={view==="ask"?"active":""}>✦ Ask Sahil</button>
          <button onClick={()=>setView("match")} className={view==="match"?"active":""}>◎ Match Role</button>
          <small>FILES</small>
          <button onClick={()=>setView("resume")} className={view==="resume"?"active":""}>▤ Resume.pdf</button>
          <button onClick={()=>setView("about")} className={view==="about"?"active":""}>○ About</button>
        </aside>
        <div className="windowContent">{renderView(view, setView)}</div>
      </div>
    </section>}

    <nav className="osDock" aria-label="Workspace dock">
      <button onClick={() => setView("home")} title="Desktop"><span>⌂</span></button>
      <i/>
      <button onClick={() => setView("projects")} title="Projects"><span>◇</span></button>
      <button onClick={() => setView("experience")} title="Experience"><span>▰</span></button>
      <button onClick={() => setView("engineering")} title="Engineering"><span>⌘</span></button>
      <button onClick={() => setView("opensource")} title="Open Source"><span>↗</span></button>
      <i/>
      <button onClick={() => setView("ask")} title="Ask Sahil"><span>✦</span></button>
      <button onClick={() => setView("match")} title="Match Role"><span>◎</span></button>
      <button onClick={() => setView("resume")} title="Resume"><span>▤</span></button>
    </nav>
  </main>;
}

function renderView(view: View, open:(v:View)=>void) {
  switch(view) {
    case "experience": return <ExperienceView/>;
    case "projects": return <ProjectsView open={open}/>;
    case "engineering": return <EngineeringView/>;
    case "opensource": return <OpenSourceView/>;
    case "resume": return <ResumeView/>;
    case "ask": return <AppView icon="✦" label="Ask Sahil.app" copy="Ask about my experience, projects, skills, or anything else in this portfolio."><AskSahil contextHint="Inside the Explore workspace"/></AppView>;
    case "match": return <AppView icon="◎" label="Match Role.app" copy="Paste a job description or upload the file to see where my experience lines up and where it doesn’t."><MatchRole/></AppView>;
    case "about": return <AboutView/>;
    case "prsense": return <PRSenseView/>;
    default: return null;
  }
}

function ViewHeader({kicker,title,copy}:{kicker:string;title:string;copy:string}) { return <header className="viewHeader"><span className="eyebrow">{kicker}</span><h2>{title}</h2><p>{copy}</p></header> }
function AppView({icon,label,copy,children}:{icon:string;label:string;copy:string;children:ReactNode}) { return <div className="pageEnter osAppView"><div className="appIntro"><span className="largeAppIcon">{icon}</span><div><small>PORTFOLIO APP</small><h2>{label}</h2><p>{copy}</p></div></div>{children}</div> }

function ExperienceView() { return <div className="pageEnter"><ViewHeader kicker="PROFESSIONAL WORK" title="Neopart Transit" copy="Backend systems, integrations, automation and AI-powered workflows used in day-to-day operations."/><div className="experienceMeta"><span>{experience.role}</span><span>{experience.dates}</span><span>{experience.via}</span></div><div className="impactGrid">{experience.achievements.map((a,i)=><article key={a}><small>0{i+1}</small><p>{a}</p></article>)}</div><div className="evidenceNote"><b>About this work</b><p>I’ve kept private company code and confidential implementation details out of the portfolio.</p></div></div> }

function ProjectsView({open}:{open:(v:View)=>void}) { return <div className="pageEnter"><ViewHeader kicker="PROJECTS" title="Projects and experiments." copy="Engineering projects go deeper into how they work. MVPs are shown for what they are: smaller product experiments."/><div className="projectFolderGroups"><section><div className="folderSectionTitle"><span>◇</span><div><b>Engineering Projects</b><small>Projects where I can go deeper into the engineering</small></div></div><div className="projectGrid">{projects.filter(p=>p.type==="ENGINEERING PROJECT").map(p=><ProjectCard key={p.id} p={p} open={open}/>)}</div></section><section><div className="folderSectionTitle"><span>□</span><div><b>MVPs</b><small>Smaller ideas I built and tested</small></div></div><div className="projectGrid">{projects.filter(p=>p.type==="MVP").map(p=><ProjectCard key={p.id} p={p} open={open}/>)}</div></section></div></div> }
function ProjectCard({p,open}:{p:any;open:(v:View)=>void}) { return <article className={p.featured?"projectCard featured":"projectCard"}><div><span className="typePill">{p.type}</span>{p.featured&&<span className="featuredPill">FEATURED</span>}</div><h3>{p.name}</h3><p>{p.blurb}</p><div className="techLine">{p.tech.slice(0,5).map((t:string)=><span key={t}>{t}</span>)}</div><div className="cardActions">{p.id==="prsense"?<button onClick={()=>open("prsense")}>See how it works</button>:<a href={p.github} target="_blank">GitHub</a>}{p.live&&<a href={p.live} target="_blank">Live</a>}{p.demo&&<a href={p.demo} target="_blank">Demo</a>}</div></article> }

function EngineeringView() { return <div className="pageEnter"><ViewHeader kicker="ENGINEERING MAP" title="How I’ve used these skills." copy="A map from the technologies I use to the work where I used them."/><div className="mapGrid">{engineeringMap.map((m,i)=><article key={m.concept}><div className="mapIndex">0{i+1}</div><h3>{m.concept}</h3>{m.evidence.map(e=><span className="mapEvidence" key={e}>{e}</span>)}</article>)}</div><div className="evidenceMatrix">{evidence.filter(e=>e.strength!=="NONE").slice(0,12).map(e=><div key={e.id}><b>{e.label}</b><small>{e.source.replaceAll("_"," ")}</small><span className={`strength ${e.strength.toLowerCase()}`}>{e.strength}</span>{e.caveat&&<p>{e.caveat}</p>}</div>)}</div></div> }

function OpenSourceView() { return <div className="pageEnter"><ViewHeader kicker="OPEN SOURCE" title="Work merged into projects I didn’t own." copy={openSource.summary}/><div className="ossStory"><article><span className="typePill">CASPIAN SDK · MERGED PR #94</span><h3>Bluesky / AT Protocol integration</h3><p>Added Bluesky support for posts, threaded replies, notification polling, webhook verification, message normalization, fakes and tests. I also adapted the work when the upstream provider structure changed.</p><a href={openSource.prs[0].href} target="_blank">Open merged PR ↗</a></article><article><span className="typePill">CASPIAN SDK · MERGED PR #140</span><h3>Session reliability + concurrency</h3><p>Improved session reuse and refresh behavior, then changed the locking approach after review so unrelated accounts could authenticate at the same time.</p><a href={openSource.prs[1].href} target="_blank">Open merged PR ↗</a></article><article><span className="typePill">AGENTKIT · MERGED</span><h3>CollectFlow</h3><p>{openSource.collectFlow.summary}</p><a href={openSource.collectFlow.href} target="_blank">Open contribution ↗</a></article></div></div> }

function ResumeView() { return <div className="pageEnter resumeView"><ViewHeader kicker="RESUME.PDF" title="My resume." copy="If you want the quick version, this is it."/><div className="resumeActions"><a href="/resume/Sahil_Shitole_Resume.pdf" target="_blank">Open PDF</a><a href="/resume/Sahil_Shitole_Resume.pdf" download>Download PDF</a></div><iframe title="Sahil Shitole resume" src="/resume/Sahil_Shitole_Resume.pdf" /></div> }

function PRSenseView() { return <div className="pageEnter"><ViewHeader kicker="ENGINEERING PROJECT / PRSENSE" title="The AI call is the easy part." copy="The interesting problem is coordinating Git, Kafka, Gemini and Bitbucket when each boundary can fail independently."/><div className="architectureFlow">{prsenseDeepDive.architecture.map((n,i)=><div key={n}><span>{n}</span>{i<prsenseDeepDive.architecture.length-1&&<i>→</i>}</div>)}</div><div className="deepGrid"><article><small>WHY ASYNC</small><h3>Kafka as a system boundary</h3><p>{prsenseDeepDive.whyKafka}</p></article><article><small>CURRENT LIMITATIONS</small><h3>What can fail today</h3>{prsenseDeepDive.failureHandling.map(x=><p className="bullet" key={x}>{x}</p>)}</article><article className="wide"><small>WHAT I’D IMPROVE NEXT</small><h3>Production-hardening path</h3><div className="improvementGrid">{prsenseDeepDive.improvements.map((x,i)=><div key={x}><span>0{i+1}</span>{x}</div>)}</div></article></div><a className="externalButton" href="https://github.com/Sms1818/PRSense" target="_blank">Open PRSense on GitHub ↗</a></div> }

function AboutView() { return <div className="pageEnter"><ViewHeader kicker="ABOUT" title="A little about me." copy="I’m open to Software Engineering and AI opportunities."/><div className="aboutCopy">{profile.about.map(p=><p key={p}>{p}</p>)}</div><div className="contactCards"><a href={`mailto:${profile.email}`}><small>EMAIL</small><b>{profile.email}</b></a><a href={profile.linkedin} target="_blank"><small>LINKEDIN</small><b>linkedin.com/in/sahil-shitole</b></a><a href={profile.github} target="_blank"><small>GITHUB</small><b>github.com/Sms1818</b></a></div></div> }
