"use client";
import { useEffect, useState } from "react";

const labels = ["Intro", "Experience", "Engineering", "Selected builds", "Open source", "Next"];
export default function StoryProgress() {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const sections = [...document.querySelectorAll<HTMLElement>("[data-story-section]")];
    const io = new IntersectionObserver(entries => {
      const best = entries.filter(e => e.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0];
      if (best) setActive(Number((best.target as HTMLElement).dataset.storySection || 0));
    }, { threshold: [0.3,0.55,0.75] });
    sections.forEach(s=>io.observe(s));
    return () => io.disconnect();
  }, []);
  return <div className="storyProgress">{labels.map((l,i)=><div key={l} className={i<=active?"progressItem active":"progressItem"}><span />{l}</div>)}</div>;
}
