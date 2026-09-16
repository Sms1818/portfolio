import SiteHeader from "@/components/SiteHeader";
import TransitionLink from "@/components/TransitionLink";
import FloatingProof from "@/components/FloatingProof";
import HomeAIActions from "@/components/HomeAIActions";
import { experience, profile } from "@/lib/portfolio";
import { ArrowRight, TerminalSquare, ExternalLink } from "lucide-react";
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
      <section className="proofStrip" style={{ marginBottom: '60px' }}>
        <article><small>PROFESSIONAL</small><strong>~1.5 years</strong><span>{experience.company}</span></article>
        <article><small>IMPACT</small><strong>4 legacy apps</strong><span>consolidated into Spring Boot microservices</span></article>
        <article><small>AUTOMATION</small><strong>50+ accounts</strong><span>supported by AR escalation workflows</span></article>
        <article><small>OPEN SOURCE</small><strong>2 merged contributions</strong><span>Caspian SDK + AgentKit</span></article>
      </section>
    </Reveal>

    <Reveal delay={150}>
      <section className="depthChoiceSection" style={{ maxWidth: '1160px', margin: '0 auto', padding: '0 28px 100px' }}>
        <p className="eyebrow" style={{ marginBottom: '24px' }}>HOW MUCH TIME DO YOU HAVE?</p>
        
        <div style={{ display: 'flex', flexDirection: 'column', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
          
          <TransitionLink href="/30s" style={{ display: 'grid', gridTemplateColumns: '120px 1fr auto', alignItems: 'center', padding: '24px 16px', borderBottom: '1px solid var(--line)', textDecoration: 'none', color: 'var(--text)' }} className="rowLink">
            <h3 style={{ fontSize: '1.25rem', margin: 0, fontWeight: 500 }}>30 seconds</h3>
            <p style={{ color: 'var(--muted)', margin: 0, fontSize: '1rem' }}>Recruiter summary. Core experience, impact, and stack.</p>
            <span style={{ color: 'var(--accent)' }}><ArrowRight size={20}/></span>
          </TransitionLink>

          <TransitionLink href="/story" style={{ display: 'grid', gridTemplateColumns: '120px 1fr auto', alignItems: 'center', padding: '24px 16px', borderBottom: '1px solid var(--line)', textDecoration: 'none', color: 'var(--text)' }} className="rowLink">
            <h3 style={{ fontSize: '1.25rem', margin: 0, fontWeight: 500 }}>2 minutes</h3>
            <p style={{ color: 'var(--muted)', margin: 0, fontSize: '1rem' }}>An editorial tour of my professional work, PRSense, and open source.</p>
            <span style={{ color: 'var(--accent)' }}><ArrowRight size={20}/></span>
          </TransitionLink>

          <TransitionLink href="/boot?next=/workspace" style={{ display: 'grid', gridTemplateColumns: '120px 1fr auto', alignItems: 'center', padding: '24px 16px', textDecoration: 'none', color: 'var(--text)' }} className="rowLink">
            <h3 style={{ fontSize: '1.25rem', margin: 0, fontWeight: 500 }}>Explore</h3>
            <p style={{ color: 'var(--muted)', margin: 0, fontSize: '1rem' }}>Enter my engineering workspace to inspect architecture, code, and evidence.</p>
            <span style={{ color: 'var(--accent)' }}><TerminalSquare size={20}/></span>
          </TransitionLink>

        </div>
      </section>
    </Reveal>

    <Reveal delay={200}><HomeAIActions/></Reveal>

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
