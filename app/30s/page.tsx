import SiteHeader from "@/components/SiteHeader";
import { profile, experience } from "@/lib/portfolio";
import { ExternalLink, FileText, Mail } from "lucide-react";

export default function ThirtySecondPage() {
  return (
    <main className="landingPage" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <SiteHeader />
      <div className="ambientLight" />
      <div className="topoGrid" />
      
      <section style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', maxWidth: '800px', margin: '0 auto', width: '100%', padding: '120px 24px 60px' }}>
        
        <div style={{ marginBottom: '40px' }}>
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', letterSpacing: '-0.04em', lineHeight: 1.1, margin: '0 0 12px 0' }}>{profile.name}</h1>
          <p style={{ fontSize: '1.4rem', color: 'var(--muted)', margin: 0 }}>{profile.title}</p>
          <p style={{ fontSize: '1.1rem', color: 'var(--accent)', fontWeight: 600, margin: '8px 0 0 0' }}>Backend Systems × Applied AI</p>
        </div>

        <div style={{ padding: '32px', borderRadius: '24px', border: '1px solid var(--line)', background: 'var(--panel)', backdropFilter: 'blur(16px)', boxShadow: 'var(--shadow-sm)', marginBottom: '40px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '24px', borderBottom: '1px solid var(--line)', paddingBottom: '16px' }}>
            <h2 style={{ fontSize: '1.2rem', margin: 0 }}>Impact & Evidence</h2>
            <span style={{ fontFamily: 'var(--mono)', color: 'var(--muted)', fontSize: '0.85rem' }}>~1.5 YOE</span>
          </div>
          
          <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'grid', gap: '16px' }}>
            <li style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
              <span style={{ color: 'var(--accent)', marginTop: '2px' }}>→</span>
              <p style={{ margin: 0, lineHeight: 1.6 }}>Helped consolidate 4 legacy applications into Spring Boot microservices.</p>
            </li>
            <li style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
              <span style={{ color: 'var(--accent)', marginTop: '2px' }}>→</span>
              <p style={{ margin: 0, lineHeight: 1.6 }}>Built/worked on an AR escalation system supporting 50+ customer accounts.</p>
            </li>
            <li style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
              <span style={{ color: 'var(--accent)', marginTop: '2px' }}>→</span>
              <p style={{ margin: 0, lineHeight: 1.6 }}>Built <strong>PRSense</strong>, an event-driven AI code review platform (Kafka, Git, Gemini).</p>
            </li>
            <li style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
              <span style={{ color: 'var(--accent)', marginTop: '2px' }}>→</span>
              <p style={{ margin: 0, lineHeight: 1.6 }}>Merged contributions to external open-source codebases (Caspian SDK, AgentKit).</p>
            </li>
          </ul>

          <div style={{ marginTop: '32px', paddingTop: '24px', borderTop: '1px solid var(--line)' }}>
            <h3 style={{ fontSize: '0.85rem', color: 'var(--muted)', fontFamily: 'var(--mono)', letterSpacing: '0.1em', marginBottom: '16px', marginTop: 0 }}>CORE STACK</h3>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {["Java", "Spring Boot", "Python", "FastAPI", "SQL", "Kafka", "REST APIs"].map(tech => (
                <span key={tech} style={{ padding: '6px 12px', background: 'var(--bg)', border: '1px solid var(--line)', borderRadius: '8px', fontSize: '0.85rem', fontWeight: 500 }}>
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '12px' }}>
          <a href="/resume/Sahil_Shitole_Resume.pdf" target="_blank" className="secondaryButton" style={{ justifyContent: 'center' }}>
            <FileText size={16}/> Resume
          </a>
          <a href={profile.github} target="_blank" className="secondaryButton" style={{ justifyContent: 'center' }}>
            <ExternalLink size={16}/> GitHub
          </a>
          <a href={profile.linkedin} target="_blank" className="secondaryButton" style={{ justifyContent: 'center' }}>
            <ExternalLink size={16}/> LinkedIn
          </a>
          <a href={`mailto:${profile.email}`} className="secondaryButton" style={{ justifyContent: 'center' }}>
            <Mail size={16}/> Contact
          </a>
        </div>
      </section>
    </main>
  );
}
