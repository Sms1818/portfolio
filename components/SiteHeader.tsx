"use client";
import TransitionLink from "./TransitionLink";
import ThemeToggle from "./ThemeToggle";
import { Compass, Clock, FileText } from "lucide-react";
import { motion, useScroll } from "framer-motion";
import { useEffect, useState } from "react";

export default function SiteHeader() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    return scrollY.on("change", (latest: number) => {
      setIsScrolled(latest > 20);
    });
  }, [scrollY]);

  return (
    <>
      <motion.header 
        className={`siteHeader ${isScrolled ? 'scrolled' : ''}`}
      >
        <TransitionLink href="/" className="brand">
          <span className="brandMark">SS</span>
          <span>Sahil Shitole</span>
        </TransitionLink>
        <nav className="topNav" aria-label="Primary">
          <TransitionLink href="/boot?next=/workspace">
            <Compass size={20} className="mobileIcon" />
            <span>Explore</span>
          </TransitionLink>
          <a href="/resume/Sahil_Shitole_Resume.pdf" target="_blank">
            <FileText size={20} className="mobileIcon" />
            <span>Resume</span>
          </a>
          <TransitionLink href="/about">
            <span className="mobileIcon">○</span>
            <span>About</span>
          </TransitionLink>
          <div className="desktopThemeToggle">
            <ThemeToggle />
          </div>
        </nav>
      </motion.header>
      <div className="mobileThemeToggle">
        <ThemeToggle />
      </div>
    </>
  );
}

