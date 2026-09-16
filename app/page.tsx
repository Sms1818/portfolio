import SpotlightCard from "@/components/SpotlightCard";
import SiteHeader from "@/components/SiteHeader";
import TransitionLink from "@/components/TransitionLink";
import FloatingProof from "@/components/FloatingProof";
import HomeAIActions from "@/components/HomeAIActions";
import { experience, profile } from "@/lib/portfolio";
import { ArrowRight, TerminalSquare, ExternalLink, ChevronRight, Clock } from "lucide-react";
import Reveal from "@/components/Reveal";

export default function HomePage(){
  return <main className="landingPage">
    <div className="topoGrid"/><div className="ambientLight"/>
    <SiteHeader/>
    
    <section className="heroSection pageEnter">
      
      <div className="heroCopy">
        <div className="availability"><span/> Open to Software Engineering & AI opportunities</div>
        <p className="heroEyebrow">{profile.name.toUpperCase()} · {profile.title.toUpperCase()}</p>
        <h1 style={{ fontSize: 'clamp(3rem, 7vw, 5rem)', lineHeight: 1.05, letterSpacing: '-0.04em', margin: '12px 0' }}>
          Backend Systems<br/>
          <span style={{ color: 'var(--accent)' }}>× Applied AI</span>
        </h1>
        <p className="heroLead" style={{ fontSize: '1.15rem', maxWidth: '640px', lineHeight: 1.6 }}>
          Building robust software where models handle the ambiguity and deterministic systems provide the guarantees.
        </p>
        <div className="quickLinks" style={{ marginTop: '32px' }}>
          <a href="/resume/Sahil_Shitole_Resume.pdf" target="_blank">Resume <ExternalLink size={14}/></a>
          <a href={profile.github} target="_blank">GitHub <ExternalLink size={14}/></a>
          <a href={profile.linkedin} target="_blank">LinkedIn <ExternalLink size={14}/></a>
          <a href={`mailto:${profile.email}`}>Contact <ExternalLink size={14}/></a>
        </div>
      </div>

      <FloatingProof/>
    </section>

    <Reveal delay={100}>
      <section className="depthChoiceSection" style={{ maxWidth: '1160px', margin: '0 auto', padding: '20px 28px 100px' }}>
        <p className="eyebrow" style={{ marginBottom: '20px' }}>HOW MUCH TIME DO YOU HAVE?</p>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
          
          <TransitionLink href="/30s" className="choiceCard" style={{ padding: '32px', borderRadius: '24px', border: '1px solid var(--line)', background: 'var(--panel)', backdropFilter: 'blur(16px)', display: 'flex', flexDirection: 'column', gap: '12px', transition: '0.3s' }}>
            <Clock size={24} style={{ color: 'var(--accent)' }}/>
            <h3 style={{ fontSize: '1.4rem', margin: 0 }}>30 seconds</h3>
            <p style={{ color: 'var(--muted)', fontSize: '0.95rem', lineHeight: 1.5, margin: 0, flex: 1 }}>Recruiter summary. Core experience, impact, and stack.</p>
            <span style={{ color: 'var(--accent)', fontSize: '0.85rem', fontWeight: 700, marginTop: '12px' }}>Read summary →</span>
          </TransitionLink>

          <TransitionLink href="/story" className="choiceCard" style={{ padding: '32px', borderRadius: '24px', border: '1px solid var(--line)', background: 'var(--panel)', backdropFilter: 'blur(16px)', display: 'flex', flexDirection: 'column', gap: '12px', transition: '0.3s' }}>
            <ArrowRight size={24} style={{ color: 'var(--accent)' }}/>
            <h3 style={{ fontSize: '1.4rem', margin: 0 }}>2 minutes</h3>
            <p style={{ color: 'var(--muted)', fontSize: '0.95rem', lineHeight: 1.5, margin: 0, flex: 1 }}>An editorial tour of my professional work, PRSense, and open source.</p>
            <span style={{ color: 'var(--accent)', fontSize: '0.85rem', fontWeight: 700, marginTop: '12px' }}>Take the tour →</span>
          </TransitionLink>

          <TransitionLink href="/boot?next=/workspace" className="choiceCard primaryChoice" style={{ padding: '32px', borderRadius: '24px', border: '1px solid var(--accent)', background: 'linear-gradient(145deg, var(--accent-soft), var(--bg))', backdropFilter: 'blur(16px)', display: 'flex', flexDirection: 'column', gap: '12px', transition: '0.3s', boxShadow: 'var(--shadow-sm)' }}>
            <TerminalSquare size={24} style={{ color: 'var(--accent)' }}/>
            <h3 style={{ fontSize: '1.4rem', margin: 0 }}>Explore</h3>
            <p style={{ color: 'var(--muted)', fontSize: '0.95rem', lineHeight: 1.5, margin: 0, flex: 1 }}>Enter my engineering workspace to inspect architecture, code, and evidence.</p>
            <span style={{ color: 'var(--accent)', fontSize: '0.85rem', fontWeight: 700, marginTop: '12px' }}>Boot workspace →</span>
          </TransitionLink>

        </div>
      </section>
    </Reveal>

    <Reveal delay={200}>
      <section className="landingFeatured" style={{ paddingTop: '80px', borderTop: '1px solid var(--line)' }}>
        <div><span className="eyebrow">DIRECT EVIDENCE</span><h2>Key projects & work.</h2></div>
        <div className="featureRow">
          <SpotlightCard><span className="featureIndex">01</span><small>PROFESSIONAL WORK</small><h3>Neopart Transit</h3><p>Backend systems, secure APIs, integrations, automation and applied AI used in day-to-day operations.</p><TransitionLink href="/story#experience">See the work <ChevronRight size={16} className="inline"/></TransitionLink></SpotlightCard>
          <SpotlightCard><span className="featureIndex">02</span><small>ENGINEERING PROJECT</small><h3>PRSense</h3><p>Event-driven AI code review with Spring Boot, Kafka, Git, Gemini and Bitbucket.</p><TransitionLink href="/boot?next=/workspace?open=prsense">Inspect architecture <ChevronRight size={16} className="inline"/></TransitionLink></SpotlightCard>
          <SpotlightCard><span className="featureIndex">03</span><small>OPEN SOURCE</small><h3>Caspian SDK</h3><p>Merged work in an external SDK, including protocol integration, session handling and concurrency.</p><TransitionLink href="/boot?next=/workspace?open=opensource">See open-source work <ChevronRight size={16} className="inline"/></TransitionLink></SpotlightCard>
        </div>
      </section>
    </Reveal>

    <Reveal delay={100}><HomeAIActions/></Reveal>

    <footer className="landingFooter">
      <div className="quickLinks" style={{ display: 'flex', gap: '24px', margin: 0 }}>
        <a href="/resume/Sahil_Shitole_Resume.pdf" target="_blank">Resume <ExternalLink size={14}/></a>
        <a href={profile.github} target="_blank">GitHub <ExternalLink size={14}/></a>
        <a href={profile.linkedin} target="_blank">LinkedIn <ExternalLink size={14}/></a>
        <a href={`mailto:${profile.email}`}>Contact <ExternalLink size={14}/></a>
      </div>
      <span>© 2026 Sahil Shitole</span>
    </footer>
  </main>
}
