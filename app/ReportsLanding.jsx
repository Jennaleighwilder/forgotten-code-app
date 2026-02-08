"use client";
import { useState } from "react";

// ═══════════════════════════════════════════════════════════════
// REPORTS LANDING — Choose Your Reading
// Opening page: offers Bloodline, Lovers, Dream Atlas.
// Pick one → mini report → buy full → access code → full report.
// Jennifer Leigh West | The Forgotten Code Research Institute
// ═══════════════════════════════════════════════════════════════

const G = { gold: "#c9a55a", amber: "#b8943f", pale: "#e8dcc8", cream: "#d4cbb8" };
const D = { void: "#0a0806", earth: "#1a1410", loam: "#221c14" };
const T = { bone: "#c8b89a", dust: "#9a8a6e", sage: "#8a9a7a" };

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700&family=Crimson+Text:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Inter:wght@300;400;500&display=swap');
*{box-sizing:border-box;margin:0;padding:0}
html,body{overflow-x:hidden}
::selection{background:#c9a55a33;color:#e8dcc8}
@keyframes fadeUp{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}
@keyframes titleShimmer{0%{background-position:-200% center}100%{background-position:200% center}}
@keyframes cardGlow{0%,100%{border-color:#c9a55a22;box-shadow:0 0 12px #0a080600}50%{border-color:#c9a55a44;box-shadow:0 0 28px #c9a55a12}}
`;

const REPORTS = [
  {
    id: "bloodline",
    name: "Bloodline",
    sub: "Ancestral Heritage Dossier",
    desc: "Uncover the magic woven into your bloodline. Mini glimpse free — then unlock the full seven-generation dossier.",
    href: "/bloodline",
    color: "#8b1a1a",
    sigil: "◈",
  },
  {
    id: "lovers",
    name: "Lovers, Liars & All Things Patterned",
    sub: "Mirror Protocol™ · DYAD Engine™",
    desc: "Decode the architecture of your connections. Mini teaser free — then unlock the full pattern reading.",
    href: "/lovers",
    color: "#ff2d7b",
    sigil: "♥",
  },
  {
    id: "dream-atlas",
    name: "The Dream Atlas",
    sub: "& Forbidden Library",
    desc: "Navigate your dreamscape atlas. Mini reading free — then unlock the full Living Fog & Sands of Time report.",
    href: "/dream-atlas",
    color: "#2a9d8f",
    sigil: "◇",
  },
];

function Card({ report }) {
  const [hover, setHover] = useState(false);
  return (
    <a
      href={report.href}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: "block",
        textDecoration: "none",
        padding: "32px 28px",
        background: hover ? `${D.loam}ee` : `${D.loam}99`,
        border: `1px solid ${hover ? report.color + "55" : G.gold + "22"}`,
        borderRadius: 4,
        transition: "all 0.35s ease",
        boxShadow: hover ? `0 0 28px ${report.color}18` : "0 0 12px #0a080608",
        animation: hover ? "cardGlow 2.5s ease-in-out infinite" : "none",
      }}
    >
      <div style={{ fontFamily: "'Cinzel', serif", fontSize: 11, letterSpacing: "0.25em", color: report.color + "99", marginBottom: 10 }}>
        {report.sigil} PREMIUM REPORT
      </div>
      <h2 style={{
        fontFamily: "'Cinzel', serif",
        fontSize: "clamp(1.35rem, 4vw, 1.75rem)",
        fontWeight: 600,
        letterSpacing: "0.08em",
        color: G.pale,
        marginBottom: 6,
        lineHeight: 1.25,
      }}>
        {report.name}
      </h2>
      <p style={{ fontFamily: "'Crimson Text', serif", fontSize: 14, color: T.dust + "99", fontStyle: "italic", marginBottom: 14 }}>
        {report.sub}
      </p>
      <p style={{ fontFamily: "'Crimson Text', serif", fontSize: 15, color: T.bone + "dd", lineHeight: 1.7 }}>
        {report.desc}
      </p>
      <div style={{
        marginTop: 20,
        fontFamily: "'Cinzel', serif",
        fontSize: 12,
        letterSpacing: "0.2em",
        color: report.color + "cc",
      }}>
        CHOOSE THIS REPORT →
      </div>
    </a>
  );
}

export default function ReportsLanding() {
  return (
    <div style={{ minHeight: "100vh", padding: "60px 24px 80px", background: D.void, position: "relative" }}>
      <style>{CSS}</style>
      <div style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        background: "radial-gradient(ellipse at 50% 0%, #1a141022 0%, transparent 55%), radial-gradient(ellipse at 80% 80%, #0a0806 0%, transparent 45%)",
        zIndex: 0,
      }} />
      <div style={{ position: "relative", zIndex: 10, maxWidth: 720, margin: "0 auto" }}>
        <header style={{ textAlign: "center", marginBottom: 48, animation: "fadeUp 0.8s ease forwards" }}>
          <div style={{
            fontFamily: "'Cinzel', serif",
            fontSize: "clamp(2.2rem, 8vw, 3.5rem)",
            fontWeight: 700,
            letterSpacing: "0.12em",
            lineHeight: 1.1,
            background: "linear-gradient(90deg, #d4c4a0 0%, #f0e0c0 25%, #ffffff 50%, #f5ddb5 75%, #d4c4a0 100%)",
            backgroundSize: "200% 100%",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            animation: "titleShimmer 8s ease-in-out infinite",
            filter: "drop-shadow(0 2px 16px #c9a55a22)",
          }}>
            THE FORGOTTEN CODE
          </div>
          <p style={{ fontFamily: "'Crimson Text', serif", fontSize: "clamp(1rem, 2.5vw, 1.2rem)", color: T.dust + "99", fontStyle: "italic", marginTop: 12, letterSpacing: "0.04em" }}>
            Research Institute · Premium Reports
          </p>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 14, marginTop: 28 }}>
            <div style={{ width: 40, height: 1, background: G.gold + "22" }} />
            <span style={{ fontFamily: "'Cinzel', serif", fontSize: 10, letterSpacing: "0.3em", color: T.dust + "44" }}>CHOOSE YOUR READING</span>
            <div style={{ width: 40, height: 1, background: G.gold + "22" }} />
          </div>
        </header>

        <p style={{
          fontFamily: "'Crimson Text', serif",
          fontSize: "clamp(1rem, 2.2vw, 1.12rem)",
          color: T.bone + "88",
          lineHeight: 1.9,
          textAlign: "center",
          maxWidth: 520,
          margin: "0 auto 40px",
          fontStyle: "italic",
          animation: "fadeUp 0.8s ease 0.1s forwards",
          opacity: 0,
          animationFillMode: "forwards",
        }}>
          Each report begins with a free mini reading. If it calls to you, unlock the full premium report — we send your access code after payment.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          {REPORTS.map((report, i) => (
            <div key={report.id} style={{ animation: `fadeUp 0.7s ease ${0.15 + i * 0.1}s forwards`, opacity: 0, animationFillMode: "forwards" }}>
              <Card report={report} />
            </div>
          ))}
        </div>

        <footer style={{
          marginTop: 56,
          textAlign: "center",
          fontFamily: "'Cinzel', serif",
          fontSize: 9,
          letterSpacing: "0.25em",
          color: T.dust + "22",
        }}>
          Jennifer Leigh West · theforgottencode780@gmail.com
        </footer>
      </div>
    </div>
  );
}
