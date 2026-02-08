"use client";
import { useState, useEffect, useRef } from "react";

// ═══════════════════════════════════════════════════════════════
// REPORTS LANDING — Candle + Glitter + Full Table of All Reports
// Opening page: candle, gold dust, full menu. Three live; rest coming soon.
// Jennifer Leigh West | The Forgotten Code Research Institute
// ═══════════════════════════════════════════════════════════════

const GOLD = { bright: "#daa520", warm: "#c9a55a", light: "#f0d68a", pale: "#e8d5a0", deep: "#8B6914", dark: "#6B4F10", muted: "#a0884a", white: "#faf5e8" };
const VOID = { deep: "#020008", mid: "#08031a", light: "#0e0628", purple: "#1a0a35" };

const SIGILS = {
  bloodline: (c) => <svg viewBox="0 0 60 60" width="100%" height="100%"><g fill="none" stroke={c} strokeWidth="1.2"><circle cx="30" cy="30" r="22"/><circle cx="30" cy="30" r="14"/><circle cx="30" cy="30" r="6"/><line x1="30" y1="2" x2="30" y2="58"/><line x1="2" y1="30" x2="58" y2="30"/><circle cx="30" cy="16" r="2" fill={c}/><circle cx="30" cy="44" r="2" fill={c}/><circle cx="16" cy="30" r="2" fill={c}/><circle cx="44" cy="30" r="2" fill={c}/></g></svg>,
  dream: (c) => <svg viewBox="0 0 60 60" width="100%" height="100%"><g fill="none" stroke={c} strokeWidth="1.2"><path d="M38 12 A18 18 0 1 0 38 48 A12 12 0 1 1 38 12Z"/><circle cx="24" cy="20" r="1.5" fill={c}/><circle cx="18" cy="30" r="1" fill={c}/><circle cx="28" cy="36" r="1.8" fill={c}/><path d="M42 8 L44 12 L48 10 L46 14 L50 16 L46 17 L48 21 L44 19 L42 23 L41 19 L37 21 L39 17 L35 16 L39 14 L37 10 L41 12Z" fill={c} opacity="0.5"/></g></svg>,
  lovers: (c) => <svg viewBox="0 0 60 60" width="100%" height="100%"><g fill="none" stroke={c} strokeWidth="1.2"><path d="M30 52 L8 28 A12 12 0 0 1 30 16 A12 12 0 0 1 52 28Z"/><path d="M30 44 L16 30 A8 8 0 0 1 30 22 A8 8 0 0 1 44 30Z"/><line x1="30" y1="22" x2="30" y2="44" strokeDasharray="2,3"/></g></svg>,
  business: (c) => <svg viewBox="0 0 60 60" width="100%" height="100%"><g fill="none" stroke={c} strokeWidth="1.2"><polygon points="30,4 56,22 48,56 12,56 4,22"/><polygon points="30,14 46,26 42,48 18,48 14,26"/><polygon points="30,24 38,30 36,40 24,40 22,30"/><circle cx="30" cy="32" r="3" fill={c} opacity="0.4"/></g></svg>,
  entrepreneur: (c) => <svg viewBox="0 0 60 60" width="100%" height="100%"><g fill="none" stroke={c} strokeWidth="1.2"><circle cx="30" cy="30" r="18"/><path d="M20 15 C20 15 25 25 30 30 C35 25 40 15 40 15"/><path d="M20 45 C20 45 25 35 30 30 C35 35 40 45 40 45"/><circle cx="30" cy="30" r="4" fill={c} opacity="0.3"/><path d="M30 6 L30 16 M30 44 L30 54"/></g></svg>,
  desire: (c) => <svg viewBox="0 0 60 60" width="100%" height="100%"><g fill="none" stroke={c} strokeWidth="1.2"><ellipse cx="30" cy="30" rx="20" ry="26"/><ellipse cx="30" cy="30" rx="12" ry="18"/><ellipse cx="30" cy="30" rx="4" ry="8" fill={c} opacity="0.15"/><path d="M30 4 C22 16 22 44 30 56" strokeDasharray="3,3"/><path d="M30 4 C38 16 38 44 30 56" strokeDasharray="3,3"/></g></svg>,
  attachment: (c) => <svg viewBox="0 0 60 60" width="100%" height="100%"><g fill="none" stroke={c} strokeWidth="1.2"><circle cx="20" cy="24" r="10"/><circle cx="40" cy="24" r="10"/><path d="M20 34 C20 46 30 52 30 52 C30 52 40 46 40 34"/><line x1="20" y1="24" x2="40" y2="24" strokeDasharray="3,2"/><circle cx="30" cy="24" r="2" fill={c} opacity="0.4"/></g></svg>,
  financial: (c) => <svg viewBox="0 0 60 60" width="100%" height="100%"><g fill="none" stroke={c} strokeWidth="1.2"><circle cx="30" cy="30" r="22"/><path d="M22 20 C22 14 38 14 38 20 C38 26 22 26 22 32 C22 38 38 38 38 32"/><line x1="30" y1="10" x2="30" y2="50" strokeDasharray="4,2"/></g></svg>,
  rage: (c) => <svg viewBox="0 0 60 60" width="100%" height="100%"><g fill="none" stroke={c} strokeWidth="1.2"><path d="M30 6 L26 22 L10 22 L24 32 L18 50 L30 38 L42 50 L36 32 L50 22 L34 22Z"/><circle cx="30" cy="28" r="6" fill={c} opacity="0.15"/></g></svg>,
  siren: (c) => <svg viewBox="0 0 60 60" width="100%" height="100%"><g fill="none" stroke={c} strokeWidth="1.2"><path d="M10 30 C15 20 20 24 25 20 C30 16 30 16 35 20 C40 24 45 20 50 30"/><path d="M10 36 C15 26 20 30 25 26 C30 22 30 22 35 26 C40 30 45 26 50 36" opacity="0.5"/><path d="M10 42 C15 32 20 36 25 32 C30 28 30 28 35 32 C40 36 45 32 50 42" opacity="0.25"/><circle cx="30" cy="12" r="3"/></g></svg>,
  pastlives: (c) => <svg viewBox="0 0 60 60" width="100%" height="100%"><g fill="none" stroke={c} strokeWidth="1.2"><path d="M30 6 A24 24 0 1 1 29.99 6" strokeDasharray="4,3"/><path d="M30 14 A16 16 0 1 1 29.99 14" strokeDasharray="3,2"/><path d="M30 22 A8 8 0 1 1 29.99 22"/><circle cx="30" cy="30" r="2" fill={c}/></g></svg>,
  calling: (c) => <svg viewBox="0 0 60 60" width="100%" height="100%"><g fill="none" stroke={c} strokeWidth="1.2"><line x1="30" y1="6" x2="30" y2="54" strokeWidth="1.5"/><line x1="14" y1="20" x2="46" y2="20" strokeWidth="1.5"/><circle cx="30" cy="14" r="3"/><path d="M24 28 L30 54 L36 28" opacity="0.4"/><circle cx="30" cy="20" r="8" strokeDasharray="2,2"/></g></svg>,
};

function SigilIcon({ type, size = 48, color }) {
  const fn = SIGILS[type];
  const c = color || GOLD.warm;
  return <div style={{ width: size, height: size, filter: `drop-shadow(0 0 10px ${c}55)`, lineHeight: 0, flexShrink: 0 }}>{fn ? fn(c) : SIGILS.dream(c)}</div>;
}

const REPORTS = [
  { id: 1, name: "Bloodline: Ancestral Tree", sigil: "bloodline", tier: "premium", price: 127, desc: "Uncover the magic woven into your bloodline", focus: "Ancestral gifts · bloodline patterns · sacred geography" },
  { id: 2, name: "Dream Mapping", sigil: "dream", tier: "premium", price: 127, desc: "Navigate your dreamscape atlas", focus: "Dream Atlas · Forbidden Library · recurring visions" },
  { id: 3, name: "Lovers, Liars & All Things Patterned", sigil: "lovers", tier: "premium", price: 127, desc: "Decode the architecture of your connections", focus: "DYAD Engine™ · Mirror Protocol™ · soul contracts" },
  { id: 4, name: "Business Identity Map", sigil: "business", tier: "premium", price: 127, desc: "Your wealth positioning blueprint", focus: "Wealth geography · venue infiltration · scaling" },
  { id: 5, name: "Spiritual Entrepreneur", sigil: "entrepreneur", tier: "premium", price: 127, desc: "Business alchemy decoded", focus: "90-day transformation · wealth protocols" },
  { id: 6, name: "Desire: The Forbidden Mirror", sigil: "desire", tier: "standard", price: 79, desc: "Beauty, desire, and sovereignty", focus: "Shame alchemy · erotic self-discovery" },
  { id: 7, name: "Attachment Bonds", sigil: "attachment", tier: "standard", price: 79, desc: "Your love pattern forensics", focus: "Attachment architecture · toxic cycle breaking" },
  { id: 8, name: "Financial Identity Map", sigil: "financial", tier: "standard", price: 79, desc: "Your money archetypes revealed", focus: "Money wounds · prosperity sabotage patterns" },
  { id: 9, name: "Rage & Resilience", sigil: "rage", tier: "standard", price: 79, desc: "Trauma transformed to power", focus: "Ancestral fire · phoenix ashes · sacred combat" },
  { id: 10, name: "The Siren's Call", sigil: "siren", tier: "standard", price: 79, desc: "Voice activation prophecy", focus: "Origins of voice · naming power · prophecy" },
  { id: 11, name: "Past Lives: Soul Map", sigil: "pastlives", tier: "standard", price: 79, desc: "Karmic patterns decoded", focus: "Soul contracts · death patterns · gifts carried" },
  { id: 12, name: "The Calling", sigil: "calling", tier: "standard", price: 79, desc: "Faith & divine purpose", focus: "Spiritual gifts · prophetic calling" },
];

const LIVE_ROUTES = { 1: "/bloodline", 2: "/dream-atlas", 3: "/lovers" };

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700;800;900&family=Crimson+Text:ital,wght@0,400;0,600;0,700;1,400;1,600&family=EB+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&display=swap');
*{box-sizing:border-box;margin:0;padding:0}
html,body{overflow-x:hidden}
@keyframes floatUp{0%,100%{transform:translateY(0) translateX(0)}25%{transform:translateY(-22px) translateX(6px)}50%{transform:translateY(-8px) translateX(-10px)}75%{transform:translateY(-30px) translateX(4px)}}
@keyframes twinkle{0%,100%{opacity:0.08}50%{opacity:0.7}}
@keyframes candleFlicker{0%{transform:scaleY(1) scaleX(1);opacity:1}25%{transform:scaleY(1.14) scaleX(0.86) translateX(-1px);opacity:0.85}50%{transform:scaleY(0.92) scaleX(1.08) translateX(1px);opacity:1}75%{transform:scaleY(1.06) scaleX(0.93);opacity:0.82}100%{transform:scaleY(1) scaleX(1);opacity:1}}
@keyframes pulseGlow{0%,100%{box-shadow:0 0 20px rgba(201,165,90,0.12),0 0 50px rgba(201,165,90,0.05)}50%{box-shadow:0 0 40px rgba(201,165,90,0.3),0 0 80px rgba(201,165,90,0.12)}}
@keyframes fadeInUp{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}
@keyframes gentleBob{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
@keyframes breathe{0%,100%{opacity:0.3}50%{opacity:0.6}}
::selection{background:rgba(201,165,90,0.2);color:#faf5e8}
`;

function GoldDustField() {
  const [p] = useState(() => Array.from({ length: 80 }, (_, i) => ({
    id: i, x: Math.random() * 100, y: Math.random() * 100,
    s: Math.random() * 2.5 + 0.3,
    d: Math.random() * 30 + 12, dl: Math.random() * -25,
    tw: Math.random() * 6 + 3, td: Math.random() * -6,
    lum: Math.random() * 25 + 55,
  })));
  return <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 2, overflow: "hidden" }}>
    {p.map(v => <div key={v.id} style={{
      position: "absolute", left: `${v.x}%`, top: `${v.y}%`,
      width: v.s, height: v.s, borderRadius: "50%",
      background: `hsl(43, 60%, ${v.lum}%)`,
      boxShadow: v.s > 1.2 ? `0 0 ${v.s * 5}px hsla(43, 60%, ${v.lum}%, 0.45)` : "none",
      animation: `floatUp ${v.d}s ease-in-out ${v.dl}s infinite, twinkle ${v.tw}s ease-in-out ${v.td}s infinite`,
    }} />)}
  </div>;
}

function Candle({ size = 1 }) {
  return <div style={{ display: "flex", flexDirection: "column", alignItems: "center", transform: `scale(${size})` }}>
    <div style={{ position: "relative" }}>
      <div style={{ width: 8, height: 28, borderRadius: "50% 50% 20% 20%",
        background: "linear-gradient(to top, #c06000, #e89000, #ffd060, #fff8e8)",
        boxShadow: "0 0 30px rgba(224,144,0,0.5), 0 0 60px rgba(192,96,0,0.25), 0 0 100px rgba(192,96,0,0.1)",
        animation: "candleFlicker 1.8s ease-in-out infinite" }} />
      <div style={{ position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)",
        width: 30, height: 30, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(224,160,60,0.12), transparent 70%)",
        animation: "breathe 2.5s ease-in-out infinite" }} />
    </div>
    <div style={{ width: 2, height: 5, background: "#222", marginTop: -2 }} />
    <div style={{ width: 14, height: 44, borderRadius: "2px 2px 4px 4px",
      background: "linear-gradient(to right, #c8b890, #e8dcc4, #c8b890)", marginTop: -1,
      boxShadow: "inset -2px 0 5px rgba(0,0,0,0.08)" }} />
  </div>;
}

export default function ReportsLanding() {
  const [vis, setVis] = useState(false);
  const [hov, setHov] = useState(null);
  useEffect(() => { setTimeout(() => setVis(true), 250) }, []);

  return (
    <div style={{ minHeight: "100vh", padding: "50px 24px 100px",
      background: `linear-gradient(180deg, ${VOID.deep}, ${VOID.mid} 20%, ${VOID.light} 45%, ${VOID.mid} 75%, ${VOID.deep})`,
      position: "relative", overflow: "hidden" }}>
      <style>{CSS}</style>
      <GoldDustField />

      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 1,
        background: `radial-gradient(ellipse at 50% 0%, rgba(200,150,60,0.04), transparent 50%), radial-gradient(ellipse at 50% 100%, ${VOID.purple}22, transparent 50%)` }} />

      <div style={{ position: "relative", zIndex: 10, maxWidth: 1120, margin: "0 auto" }}>
        {/* Candle + title */}
        <div style={{ textAlign: "center", marginBottom: 55, opacity: vis ? 1 : 0,
          transform: vis ? "translateY(0)" : "translateY(20px)",
          transition: "all 1.2s cubic-bezier(0.25,0.46,0.45,0.94)" }}>
          <div style={{ margin: "0 auto 28px", animation: "gentleBob 5s ease-in-out infinite" }}>
            <Candle size={1.6} />
          </div>
          <h1 style={{ fontFamily: "'Cinzel', serif", fontSize: "clamp(1.8rem, 5vw, 3.2rem)", fontWeight: 800,
            color: "transparent", letterSpacing: "0.14em",
            backgroundImage: `linear-gradient(135deg, ${GOLD.deep}, ${GOLD.light}, ${GOLD.warm}, ${GOLD.light}, ${GOLD.deep})`,
            backgroundClip: "text", WebkitBackgroundClip: "text", backgroundSize: "200% 100%",
            filter: `drop-shadow(0 0 25px ${GOLD.warm}30)`,
            }}>
            THE FORGOTTEN CODE
          </h1>
          <p style={{ fontFamily: "'EB Garamond', serif", fontSize: "clamp(1rem, 2.2vw, 1.25rem)",
            color: `${GOLD.pale}99`, fontStyle: "italic", marginTop: 14, letterSpacing: "0.06em" }}>
            Research Institute · Choose your reading
          </p>
          <div style={{ width: 60, height: 1, background: `linear-gradient(90deg, transparent, ${GOLD.warm}44, transparent)`, margin: "28px auto" }} />
        </div>

        {/* Full table of reports */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 22, maxWidth: 1120, margin: "0 auto" }}>
          {REPORTS.map((r, i) => {
            const isH = hov === r.id;
            const href = LIVE_ROUTES[r.id];
            const isLive = !!href;
            const content = (
              <>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                  <div style={{ opacity: isH && isLive ? 0.9 : 0.5, transition: "opacity 0.4s", animation: isH && isLive ? "gentleBob 2.5s ease-in-out infinite" : "none" }}>
                    <SigilIcon type={r.sigil} size={38} color={isH && isLive ? GOLD.warm : GOLD.muted} />
                  </div>
                  <span style={{ fontFamily: "'Cinzel', serif", fontSize: 11, letterSpacing: "0.1em",
                    color: r.tier === "premium" ? `${GOLD.warm}99` : `${GOLD.pale}55`, fontWeight: 600,
                    padding: "5px 12px", borderRadius: 2, border: `1px solid ${r.tier === "premium" ? GOLD.warm + "25" : GOLD.pale + "15"}` }}>
                    {r.tier === "premium" ? "PREMIUM" : "STANDARD"} · ${r.price}
                  </span>
                </div>
                <h3 style={{ fontFamily: "'Cinzel', serif", fontSize: "clamp(1rem, 1.8vw, 1.15rem)",
                  color: isLive ? (isH ? GOLD.white : `${GOLD.pale}dd`) : `${GOLD.pale}77`,
                  fontWeight: 600, letterSpacing: "0.04em", lineHeight: 1.35, marginBottom: 10, transition: "color 0.4s" }}>
                  {r.name}
                </h3>
                <p style={{ fontFamily: "'Crimson Text', serif", fontSize: "clamp(0.95rem, 1.5vw, 1.05rem)",
                  color: `${GOLD.pale}55`, lineHeight: 1.6, fontStyle: "italic" }}>
                  {r.desc}
                </p>
                <p style={{ fontFamily: "'EB Garamond', serif", fontSize: 12, color: `${GOLD.warm}28`, letterSpacing: "0.05em", lineHeight: 1.5, marginTop: 12 }}>
                  {r.focus}
                </p>
                {!isLive && <p style={{ fontFamily: "'Cinzel', serif", fontSize: 10, letterSpacing: "0.2em", color: `${GOLD.warm}44`, marginTop: 14 }}>COMING SOON</p>}
                {isLive && <p style={{ fontFamily: "'Cinzel', serif", fontSize: 10, letterSpacing: "0.18em", color: `${GOLD.warm}66`, marginTop: 14 }}>ENTER →</p>}
              </>
            );
            const cardStyle = {
              position: "relative", borderRadius: 6, overflow: "hidden",
              border: `1px solid ${isH && isLive ? GOLD.warm + "4a" : GOLD.warm + "12"}`,
              transform: isH && isLive ? "translateY(-4px)" : "translateY(0)",
              boxShadow: isH && isLive ? `0 20px 50px rgba(0,0,0,0.5), 0 0 28px ${GOLD.warm}15` : "0 6px 28px rgba(0,0,0,0.3)",
              transition: "all 0.45s cubic-bezier(0.25,0.46,0.45,0.94)",
              animation: vis ? `fadeInUp 0.7s ease-out ${i * 0.06}s both` : "none",
              background: `linear-gradient(165deg, ${VOID.deep}f2 0%, ${VOID.mid}ee 50%, ${VOID.deep}f5 100%)`,
              padding: "28px 26px",
            };
            if (isLive) {
              return <a key={r.id} href={href} onMouseEnter={() => setHov(r.id)} onMouseLeave={() => setHov(null)}
                style={{ ...cardStyle, textDecoration: "none", cursor: "pointer", display: "block" }}>{content}</a>;
            }
            return <div key={r.id} onMouseEnter={() => setHov(r.id)} onMouseLeave={() => setHov(null)}
              style={{ ...cardStyle, cursor: "default", opacity: 0.88 }}>{content}</div>;
          })}
        </div>

        <p style={{ textAlign: "center", marginTop: 50, fontFamily: "'EB Garamond', serif", fontSize: 13, color: `${GOLD.warm}35`, fontStyle: "italic", letterSpacing: "0.08em" }}>
          Three reports live now. Mini reading free — then unlock the full report with your access code.
        </p>
        <footer style={{ textAlign: "center", marginTop: 40, fontFamily: "'Cinzel', serif", fontSize: 9, letterSpacing: "0.25em", color: `${GOLD.warm}22` }}>
          Jennifer Leigh West · theforgottencode780@gmail.com
        </footer>
      </div>
    </div>
  );
}
