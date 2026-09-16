import SiteHeader from "@/components/SiteHeader";
import { profile } from "@/lib/portfolio";

export default function AboutPage() {
  return (
    <main className="landingPage">
      <SiteHeader />
      <div className="ambientLight" />
      <div className="topoGrid" />
      
      <section className="storySection" style={{ minHeight: "100vh", paddingTop: "180px", maxWidth: "900px", margin: "0 auto" }}>
        <span className="eyebrow">ABOUT ME</span>
        <h1 style={{ fontSize: "clamp(3rem, 6vw, 4.5rem)", letterSpacing: "-0.05em", lineHeight: 1.1, marginBottom: "30px", marginTop: "12px" }}>
          A little about me.
        </h1>
        
        <div className="aboutCopy" style={{ marginBottom: "60px" }}>
          {profile.about.map((p, i) => (
            <p key={i} style={{ fontSize: "1.1rem", lineHeight: 1.8, color: "var(--muted)", marginBottom: "18px" }}>
              {p}
            </p>
          ))}
        </div>
        
        <span className="eyebrow">CONTACT & LINKS</span>
        <div className="contactCards" style={{ marginTop: "16px" }}>
          <a href={`mailto:${profile.email}`}>
            <small>EMAIL</small>
            <b>{profile.email}</b>
          </a>
          <a href={profile.linkedin} target="_blank">
            <small>LINKEDIN</small>
            <b>linkedin.com/in/sahil-shitole</b>
          </a>
          <a href={profile.github} target="_blank">
            <small>GITHUB</small>
            <b>github.com/Sms1818</b>
          </a>
        </div>
      </section>
    </main>
  );
}
