"use client";
import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const steps = [
  ["INITIALIZING", "Sahil Workspace"],
  ["INDEXING EVIDENCE", "Professional Work / Projects / Open Source"],
  ["LOADING APPS", "Ready"],
] as const;

export default function BootSequence() {
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get("next") || "/workspace";
  const [done, setDone] = useState(0);
  const [exiting, setExiting] = useState(false);
  const delays = useMemo(()=>[250, 300, 250],[]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { router.replace(next); return; }
    let total = 0;
    const timers = delays.map((d, idx) => { total += d; return window.setTimeout(()=>setDone(idx+1), total); });
    const preExit = window.setTimeout(()=>setExiting(true), total + 100);
    const redirect = window.setTimeout(()=>router.replace(next), total + 400);
    return () => { timers.forEach(clearTimeout); clearTimeout(preExit); clearTimeout(redirect); };
  }, [delays,next,router]);

  function skip(){ setExiting(true); window.setTimeout(()=>router.replace(next), 180); }

  return <main className={exiting?"bootPage bootExit":"bootPage"}>
    <div className="bootAurora"/><div className="bootGrid"/>
    <button className="bootSkip" onClick={skip}>Skip boot ↗</button>
    <div className="bootCore"><div className="coreRing r1"/><div className="coreRing r2"/><div className="coreOrb"><span>SS</span></div></div>
    <div className="bootPanel">
      <div className="bootBrand">SAHIL WORKSPACE</div>
      <h1>{done < steps.length ? "Starting Sahil Workspace…" : "Workspace ready."}</h1>
      <div className="bootSteps">
        {steps.map(([label, detail],i)=><div className={i<done?"bootStep complete":i===done?"bootStep current":"bootStep"} key={label}><span>{i<done?"✓":"•"}</span><div><b>{label}</b><small>{detail}</small></div></div>)}
      </div>
      <div className="bootBar"><i style={{width:`${Math.min(100,done/steps.length*100)}%`}}/></div>
      <small>Almost there.</small>
    </div>
  </main>;
}
