"use client";
import { useState, useEffect } from "react";

// ═══════════════════════════════════════════════════════════════
// REPORTS LANDING — Opening: candle + Enter → Menu: candle on top, no glitter
// Sharp contrast, bigger readable text. Three live; rest coming soon.
// Jennifer Leigh West | The Forgotten Code Research Institute
// ═══════════════════════════════════════════════════════════════

const GOLD = { warm: "#c9a55a", light: "#f0d68a", pale: "#e8d5a0", white: "#faf8f2" };
const VOID = { deep: "#050208", mid: "#0a0612", card: "#0d0818" };
const TEXT = { primary: "#f5f0e8", secondary: "#d4ccb8", muted: "#9a9278" };

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
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700&family=Crimson+Text:wght@400;600;700&family=Inter:wght@400;500;600&display=swap');
*{box-sizing:border-box;margin:0;padding:0}
html,body{overflow-x:hidden;-webkit-font-smoothing:antialiased}
@keyframes floatUp{0%,100%{transform:translateY(0) translateX(0)}25%{transform:translateY(-22px) translateX(6px)}50%{transform:translateY(-8px) translateX(-10px)}75%{transform:translateY(-30px) translateX(4px)}}
@keyframes twinkle{0%,100%{opacity:0.08}50%{opacity:0.7}}
@keyframes candleFlicker{0%{transform:scaleY(1) scaleX(1);opacity:1}25%{transform:scaleY(1.14) scaleX(0.86) translateX(-1px);opacity:0.85}50%{transform:scaleY(0.92) scaleX(1.08) translateX(1px);opacity:1}75%{transform:scaleY(1.06) scaleX(0.93);opacity:0.82}100%{transform:scaleY(1) scaleX(1);opacity:1}}
@keyframes fadeIn{from{opacity:0}to{opacity:1}}
@keyframes fadeInUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
@keyframes gentleBob{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
@keyframes breathe{0%,100%{opacity:0.3}50%{opacity:0.6}}
@keyframes goldDie{0%{transform:scale(1) rotate(0);opacity:0.9}100%{transform:scale(0) rotate(140deg) translateY(-20px);opacity:0}}
@keyframes goldBurst{0%{transform:scale(0);opacity:0.8}100%{transform:scale(1);opacity:0}}
@keyframes flameFlicker{0%,100%{transform:scale(1) scaleY(1);opacity:1;filter:blur(0)}25%{transform:scale(1.08) scaleY(1.12);opacity:0.92;filter:blur(0.5px)}50%{transform:scale(0.96) scaleY(0.94);opacity:1;filter:blur(0)}75%{transform:scale(1.04) scaleY(1.06);opacity:0.97;filter:blur(0.2px)}}
@keyframes flameBreathe{0%,100%{opacity:0.25;transform:scale(1)}50%{opacity:0.45;transform:scale(1.15)}}
@keyframes btnSweep{0%{transform:translateX(-100%) skewX(-12deg)}100%{transform:translateX(200%) skewX(-12deg)}}
::selection{background:rgba(201,165,90,0.25);color:#faf8f2}
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

function GoldBurst({ active, onDone }) {
  const [sparks, setSparks] = useState([]);
  useEffect(() => {
    if (!active) return;
    const s = Array.from({ length: 70 }, (_, i) => ({
      id: i,
      x: 50 + (Math.random() - 0.5) * 16,
      y: 50 + (Math.random() - 0.5) * 16,
      dx: (Math.random() - 0.5) * 120,
      dy: (Math.random() - 0.5) * 120,
      size: Math.random() * 5 + 1.5,
      lum: Math.random() * 25 + 55,
      delay: Math.random() * 0.25,
      dur: Math.random() * 0.5 + 0.35,
    }));
    setSparks(s);
    const timer = setTimeout(() => { setSparks([]); onDone?.(); }, 900);
    return () => clearTimeout(timer);
  }, [active]);
  if (!sparks.length) return null;
  return <div style={{ position: "fixed", inset: 0, zIndex: 9999, pointerEvents: "none" }}>
    <div style={{ position: "absolute", inset: 0, background: "rgba(5,2,8,0.35)", animation: "fadeIn 0.15s" }} />
    <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)",
      width: 12, height: 12, borderRadius: "50%",
      background: "radial-gradient(circle, rgba(250,245,232,0.7), rgba(201,165,90,0.35), transparent)",
      animation: "goldBurst 0.6s ease-out forwards" }} />
    {sparks.map(s => <div key={s.id} style={{
      position: "absolute",
      left: `calc(${s.x}% + ${s.dx}px)`, top: `calc(${s.y}% + ${s.dy}px)`,
      width: s.size, height: s.size, borderRadius: "50%",
      background: `hsl(43, 55%, ${s.lum}%)`,
      boxShadow: `0 0 ${s.size * 3}px hsla(43, 55%, ${s.lum - 8}%, 0.55)`,
      animation: `goldDie ${s.dur}s ease-out ${s.delay}s forwards`,
    }} />)}
  </div>;
}

function FilmGrain() {
  const svg = "data:image/svg+xml," + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg"><filter id="g"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/></filter><rect width="100%" height="100%" filter="url(%23g)"/></svg>');
  return <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 50, backgroundImage: `url("${svg}")`, backgroundRepeat: "repeat", opacity: 0.04 }} />;
}

function RealisticFlame({ size = 1 }) {
  return <div style={{ display: "flex", flexDirection: "column", alignItems: "center", transform: `scale(${size})` }}>
    <div style={{ position: "relative" }}>
      <div style={{ position: "absolute", top: -40, left: "50%", transform: "translateX(-50%)", width: 120, height: 120,
        background: "radial-gradient(ellipse at center, rgba(255,200,100,0.15) 0%, transparent 60%)",
        animation: "flameBreathe 3s ease-in-out infinite" }} />
      <div style={{ position: "relative", width: 24, height: 56, margin: "0 auto" }}>
        <div style={{ position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)", width: 20, height: 48,
          background: "radial-gradient(ellipse 60% 100% at 50% 100%, rgba(120,60,20,0.4), transparent 70%)",
          animation: "flameFlicker 0.4s ease-in-out infinite" }} />
        <div style={{ position: "absolute", bottom: 4, left: "50%", transform: "translateX(-50%)", width: 14, height: 38,
          background: "radial-gradient(ellipse 70% 100% at 50% 100%, rgba(255,140,40,0.9), rgba(255,100,20,0.5) 40%, transparent 75%)",
          animation: "flameFlicker 0.35s ease-in-out infinite 0.05s" }} />
        <div style={{ position: "absolute", bottom: 10, left: "50%", transform: "translateX(-50%)", width: 8, height: 22,
          background: "radial-gradient(ellipse 80% 100% at 50% 100%, rgba(255,248,240,0.95), rgba(255,220,150,0.6) 50%, transparent 80%)",
          animation: "flameFlicker 0.25s ease-in-out infinite 0.1s" }} />
      </div>
    </div>
    <div style={{ width: 2, height: 6, background: "#0a0806", marginTop: -4 }} />
    <div style={{ width: 12, height: 36, background: "linear-gradient(to right, #1a1510, #252018, #1a1510)", marginTop: -2, borderRadius: "0 0 1px 1px", boxShadow: "inset 0 0 20px rgba(0,0,0,0.5)" }} />
  </div>;
}

function EnterButton() {
  const [hover, setHover] = useState(false);
  return <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
    style={{ position: "relative", overflow: "hidden", padding: "14px 50px", border: "1px solid rgba(180,140,80,0.7)", borderRadius: 2,
      fontFamily: "'Cinzel', serif", fontSize: "clamp(0.9rem, 2vw, 1.05rem)", color: GOLD.warm,
      letterSpacing: "0.2em", fontWeight: 600, transition: "border-color 0.3s, box-shadow 0.3s",
      boxShadow: hover ? "0 0 20px rgba(180,140,80,0.25)" : "none" }}>
    {hover && <div style={{ position: "absolute", inset: 0, background: "linear-gradient(105deg, transparent 0%, transparent 35%, rgba(255,248,240,0.12) 50%, transparent 65%, transparent 100%)", animation: "btnSweep 0.6s ease-out forwards", pointerEvents: "none" }} />}
    <span style={{ position: "relative", zIndex: 1 }}>ENTER</span>
  </div>;
}

export default function ReportsLanding() {
  const [entered, setEntered] = useState(false);
  const [burst, setBurst] = useState(false);
  const [vis, setVis] = useState(false);
  const [hov, setHov] = useState(null);
  useEffect(() => { setTimeout(() => setVis(true), 200) }, []);

  const handleEnter = () => {
    if (entered) return;
    setBurst(true);
  };

  // ── INTRO: Realistic flame + vault feel + Enter (gold border, light sweep on hover) ──
  if (!entered) {
    return (
      <>
        {burst && <GoldBurst active={true} onDone={() => { setBurst(false); setEntered(true); }} />}
      <div onClick={handleEnter} style={{
        position: "fixed", inset: 0, zIndex: 100, display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center", background: VOID.deep, cursor: "pointer", overflow: "hidden",
      }}>
        <style>{CSS}</style>
        <FilmGrain />
        <GoldDustField />
        <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at 50% 38%, rgba(180,120,40,0.04), transparent 50%)`, pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 2, textAlign: "center", opacity: vis ? 1 : 0, transition: "opacity 1s" }}>
          <div style={{ margin: "0 auto 40px" }}>
            <RealisticFlame size={1.8} />
          </div>
          <h1 style={{ fontFamily: "'Cinzel', serif", fontSize: "clamp(1.75rem, 5vw, 3rem)", fontWeight: 700,
            color: TEXT.primary, letterSpacing: "0.14em", marginBottom: 14, textShadow: "0 0 30px rgba(201,165,90,0.15)" }}>
            THE FORGOTTEN CODE
          </h1>
          <p style={{ fontFamily: "'Crimson Text', serif", fontSize: "clamp(1.05rem, 2.5vw, 1.3rem)",
            color: TEXT.secondary, letterSpacing: "0.05em", marginBottom: 40 }}>
            Research Institute
          </p>
          <EnterButton />
        </div>
        <p style={{ position: "absolute", bottom: 28, fontFamily: "'Inter', sans-serif", fontSize: 11, color: "rgba(255,248,240,0.65)", letterSpacing: "0.15em" }}>
          Click to enter
        </p>
      </div>
      </>
    );
  }

  // ── MENU: Candle on top, gold glitter, sharp contrast + bigger text, no italics ──
  return (
    <div style={{ minHeight: "100vh", padding: "40px 20px 80px", background: VOID.deep, position: "relative", overflow: "hidden" }}>
      <style>{CSS}</style>
      <GoldDustField />

      <div style={{ position: "relative", zIndex: 10, maxWidth: 1120, margin: "0 auto" }}>
        <FilmGrain />
        <div style={{ textAlign: "center", marginBottom: 48, opacity: vis ? 1 : 0, animation: vis ? "fadeIn 0.8s ease" : "none" }}>
          <div style={{ margin: "0 auto 20px" }}>
            <RealisticFlame size={1.4} />
          </div>
          <h1 style={{ fontFamily: "'Cinzel', serif", fontSize: "clamp(1.5rem, 4vw, 2.5rem)", fontWeight: 700,
            color: TEXT.primary, letterSpacing: "0.12em", marginBottom: 8 }}>
            CHOOSE YOUR READING
          </h1>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "clamp(1rem, 2vw, 1.15rem)", color: TEXT.secondary, marginBottom: 24 }}>
            Three reports live now · Mini reading free — then unlock with your access code
          </p>
          <div style={{ width: 80, height: 2, background: `linear-gradient(90deg, transparent, ${GOLD.warm}55, transparent)`, margin: "0 auto" }} />
        </div>

        {/* Report cards — high contrast, bigger font */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 24, maxWidth: 1120, margin: "0 auto" }}>
          {REPORTS.map((r, i) => {
            const isH = hov === r.id;
            const href = LIVE_ROUTES[r.id];
            const isLive = !!href;
            const content = (
              <>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
                  <div style={{ opacity: isH && isLive ? 1 : 0.7, transition: "opacity 0.3s", animation: isH && isLive ? "gentleBob 2.5s ease-in-out infinite" : "none" }}>
                    <SigilIcon type={r.sigil} size={42} color={isH && isLive ? GOLD.light : GOLD.warm} />
                  </div>
                  <span style={{ fontFamily: "'Cinzel', serif", fontSize: 13, letterSpacing: "0.08em",
                    color: r.tier === "premium" ? GOLD.light : TEXT.muted, fontWeight: 600,
                    padding: "6px 14px", borderRadius: 4, border: `1px solid ${r.tier === "premium" ? "rgba(201,165,90,0.4)" : "rgba(154,146,120,0.3)"}` }}>
                    {r.tier === "premium" ? "PREMIUM" : "STANDARD"} · ${r.price}
                  </span>
                </div>
                <h3 style={{ fontFamily: "'Cinzel', serif", fontSize: "clamp(1.15rem, 2vw, 1.35rem)",
                  color: isLive ? (isH ? TEXT.primary : TEXT.primary) : TEXT.secondary,
                  fontWeight: 600, letterSpacing: "0.03em", lineHeight: 1.4, marginBottom: 12 }}>
                  {r.name}
                </h3>
                <p style={{ fontFamily: "'Crimson Text', serif", fontSize: "clamp(1.05rem, 1.8vw, 1.15rem)",
                  color: TEXT.secondary, lineHeight: 1.65 }}>
                  {r.desc}
                </p>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: TEXT.muted, letterSpacing: "0.02em", lineHeight: 1.5, marginTop: 12 }}>
                  {r.focus}
                </p>
                {!isLive && <p style={{ fontFamily: "'Cinzel', serif", fontSize: 12, letterSpacing: "0.15em", color: TEXT.muted, marginTop: 16 }}>COMING SOON</p>}
                {isLive && <p style={{ fontFamily: "'Cinzel', serif", fontSize: 12, letterSpacing: "0.15em", color: GOLD.warm, marginTop: 16 }}>ENTER →</p>}
              </>
            );
            const cardStyle = {
              position: "relative", borderRadius: 8, overflow: "hidden",
              border: `1px solid ${isH && isLive ? "rgba(201,165,90,0.5)" : "rgba(245,240,232,0.12)"}`,
              transform: isH && isLive ? "translateY(-4px)" : "translateY(0)",
              boxShadow: isH && isLive ? "0 20px 50px rgba(0,0,0,0.5), 0 0 24px rgba(201,165,90,0.15)" : "0 8px 32px rgba(0,0,0,0.35)",
              transition: "all 0.35s ease",
              animation: vis ? `fadeInUp 0.6s ease-out ${i * 0.05}s both` : "none",
              background: VOID.card,
              padding: "28px 26px",
            };
            if (isLive) {
              return <a key={r.id} href={href} onMouseEnter={() => setHov(r.id)} onMouseLeave={() => setHov(null)}
                style={{ ...cardStyle, textDecoration: "none", cursor: "pointer", display: "block" }}>{content}</a>;
            }
            return <div key={r.id} onMouseEnter={() => setHov(r.id)} onMouseLeave={() => setHov(null)}
              style={{ ...cardStyle, cursor: "default", opacity: 0.85 }}>{content}</div>;
          })}
        </div>

        <footer style={{ textAlign: "center", marginTop: 56, fontFamily: "'Inter', sans-serif", fontSize: 12, color: TEXT.muted, letterSpacing: "0.08em" }}>
          Jennifer Leigh West · theforgottencode780@gmail.com
        </footer>
      </div>
    </div>
  );
}
