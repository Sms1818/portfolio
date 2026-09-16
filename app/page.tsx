import SpotlightCard from "@/components/SpotlightCard";
import SiteHeader from "@/components/SiteHeader";
import TransitionLink from "@/components/TransitionLink";
import FloatingProof from "@/components/FloatingProof";
import HomeAIActions from "@/components/HomeAIActions";
import Reveal from "@/components/Reveal";
import { experience, profile } from "@/lib/portfolio";
import { ArrowRight, TerminalSquare, ExternalLink, ChevronRight } from "lucide-react";

export default function HomePage(){
  return <main className="landingPage">
    <div className="topoGrid"/><div className="ambientLight"/>
    <SiteHeader/>
    <section className="heroSection pageEnter">
      <div className="heroCopy">
        <div className="availability"><span/> Open to Software Engineering & AI opportunities</div>
        <p className="heroEyebrow">{profile.title} · {profile.location}</p>
        <h1>Building robust<br/>systems.<br/><span>Solving real</span><br/>problems.</h1>
        <p className="heroLead">I'm a software engineer focused on backend architecture, automation, and building practical tools that make an impact.</p>
        <div className="heroCtas">
          <TransitionLink href="/story" className="primaryButton">
            See my work <ArrowRight size={18} />
          </TransitionLink>
          <TransitionLink href="/boot?next=/workspace" className="secondaryButton">
            <TerminalSquare size={18} /> Explore Workspace
          </TransitionLink>
        </div>
        <div className="quickLinks">
          <a href="/resume/Sahil_Shitole_Resume.pdf" target="_blank">Resume <ExternalLink size={14}/></a>
          <a href={profile.github} target="_blank">GitHub <ExternalLink size={14}/></a>
          <a href={profile.linkedin} target="_blank">LinkedIn <ExternalLink size={14}/></a>
          <a href={`mailto:${profile.email}`}>Contact <ExternalLink size={14}/></a>
        </div>
      </div>
      <FloatingProof/>
    </section>

    <Reveal delay={200}>
      <section className="proofStrip">
        <article><small>PROFESSIONAL</small><strong>~1.5 years</strong><span>{experience.company}</span></article>
        <article><small>IMPACT</small><strong>4 legacy apps</strong><span>consolidated into Spring Boot microservices</span></article>
        <article><small>AUTOMATION</small><strong>50+ accounts</strong><span>supported by AR escalation workflows</span></article>
        <article><small>OPEN SOURCE</small><strong>2 projects</strong><span>Caspian SDK + AgentKit</span></article>
      </section>
    </Reveal>

    <Reveal delay={100}>
      <section className="landingFeatured">
        <div><span className="eyebrow">A FEW THINGS I’VE WORKED ON</span><h2>A quick look at my work.</h2></div>
        <div className="featureRow">
          <SpotlightCard><span className="featureIndex">01</span><small>PROFESSIONAL WORK</small><h3>Neopart Transit</h3><p>Backend systems, secure APIs, integrations, automation and applied AI used in day-to-day operations.</p><TransitionLink href="/story#experience">See the work <ChevronRight size={16} className="inline"/></TransitionLink></SpotlightCard>
          <SpotlightCard><span className="featureIndex">02</span><small>ENGINEERING PROJECT</small><h3>PRSense</h3><p>Event-driven AI code review with Spring Boot, Kafka, Git, Gemini and Bitbucket.</p><TransitionLink href="/boot?next=/workspace?open=prsense">Inspect architecture <ChevronRight size={16} className="inline"/></TransitionLink></SpotlightCard>
          <SpotlightCard><span className="featureIndex">03</span><small>OPEN SOURCE</small><h3>Caspian SDK</h3><p>Merged work in an external SDK, including protocol integration, session handling and concurrency.</p><TransitionLink href="/boot?next=/workspace?open=opensource">See open-source work <ChevronRight size={16} className="inline"/></TransitionLink></SpotlightCard>
        </div>
      </section>
    </Reveal>

    <Reveal delay={100}><HomeAIActions/></Reveal>

    <footer className="landingFooter"><span>Built to be skimmed. Made to be explored.</span><span>© 2026 Sahil Shitole</span></footer>
  </main>
}
