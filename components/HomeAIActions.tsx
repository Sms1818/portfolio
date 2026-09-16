"use client";
import { useEffect, useState } from "react";
import { AskSahil, MatchRole } from "./PortfolioAI";

type App = "ask" | "match" | null;
export default function HomeAIActions() {
  const [app, setApp] = useState<App>(null);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setApp(null); };
    window.addEventListener("keydown", onKey); return () => window.removeEventListener("keydown", onKey);
  }, []);
  return <>
    <section className="homeAISection" id="portfolio-ai">
      <div className="homeAIHeading"><span className="eyebrow">QUICK QUESTIONS</span><h2>Want to know something specific?</h2><p>Ask me about my work, or drop in a job description to see how my experience lines up.</p></div>
      <div className="homeAITiles">
        <button className="homeAITile askTile" onClick={() => setApp("ask")}>
          <span className="aiTileIcon">✦</span><div><small>ASK SAHIL</small><h3>Ask me about my work.</h3><p>Projects, experience, skills, strengths, gaps — whatever you want to know.</p><b>Start a conversation →</b></div><span className="tileGlow"/>
        </button>
        <button className="homeAITile matchTile" onClick={() => setApp("match")}>
          <span className="aiTileIcon">◎</span><div><small>MATCH ROLE</small><h3>See how I fit the role.</h3><p>Paste a job description or upload the file. I’ll show you where my experience lines up and where it doesn’t.</p><b>Check a role →</b></div><span className="tileGlow"/>
        </button>
      </div>
    </section>
    {app && <div className="aiModalBackdrop" role="presentation" onMouseDown={(e) => { if (e.target === e.currentTarget) setApp(null); }}>
      <section className="aiModal" role="dialog" aria-modal="true" aria-label={app === "ask" ? "Ask Sahil" : "Match Role"}>
        <header className="aiModalHeader"><div><span className="modalAppIcon">{app === "ask" ? "✦" : "◎"}</span><div><small>SAHIL</small><b>{app === "ask" ? "Ask Sahil" : "Match Role"}</b></div></div><button onClick={() => setApp(null)} aria-label="Close">×</button></header>
        <div className="aiModalBody">{app === "ask" ? <AskSahil/> : <MatchRole/>}</div>
      </section>
    </div>}
  </>;
}
