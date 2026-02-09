"use client";
import { useState, useEffect } from "react";

// ═══════════════════════════════════════════════════════════════
// REPORTS LANDING — Landing: infinity + sparkles + stars + gold glow; Menu: tarot cards, dark gothic
// Jennifer Leigh West | The Forgotten Code Research Institute
// ═══════════════════════════════════════════════════════════════

const GOLD = { warm: "#d4af37", light: "#f0d68a", pale: "#e8d5a0", white: "#faf8f2", pink: "#ff69b4" };
const VOID = { deep: "#050208", mid: "#0a0a0a", card: "rgba(15,15,20,0.8)" };
const TEXT = { primary: "#f0e6d3", secondary: "#d4ccb8", muted: "#9a9278", cream: "#f0e6d3" };

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
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700&family=Playfair+Display:wght@400;500;600&family=Cormorant+Garamond:wght@300;400;500&family=Inter:wght@400;500;600&display=swap');
*{box-sizing:border-box;margin:0;padding:0}
html,body{overflow-x:hidden;-webkit-font-smoothing:antialiased;font-style:normal}
p,input,textarea,label{font-style:normal}
@keyframes floatUp{0%,100%{transform:translateY(0) translateX(0)}25%{transform:translateY(-22px) translateX(6px)}50%{transform:translateY(-8px) translateX(-10px)}75%{transform:translateY(-30px) translateX(4px)}}
@keyframes twinkle{0%,100%{opacity:0.08}50%{opacity:0.7}}
@keyframes starTwinkle{0%,100%{opacity:0.3;transform:scale(1)}50%{opacity:1;transform:scale(1.5)}}
@keyframes infinityPulse{0%,100%{filter:drop-shadow(0 0 8px #d4af37) drop-shadow(0 0 20px #ff69b4) drop-shadow(0 0 40px #d4af37);opacity:1}50%{filter:drop-shadow(0 0 15px #d4af37) drop-shadow(0 0 35px #ff69b4) drop-shadow(0 0 60px #d4af37);opacity:0.9}}
@keyframes sparkleLife{0%,100%{opacity:0;transform:scale(0)}50%{opacity:1;transform:scale(1)}}
@keyframes pageFadeOut{from{opacity:1}to{opacity:0}}
@keyframes pageFadeIn{from{opacity:0}to{opacity:1}}
@keyframes fadeIn{from{opacity:0}to{opacity:1}}
@keyframes fadeInUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
@keyframes gentleBob{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
@keyframes goldDie{0%{transform:scale(1) rotate(0);opacity:0.9}100%{transform:scale(0) rotate(140deg) translateY(-20px);opacity:0}}
@keyframes goldBurst{0%{transform:scale(0);opacity:0.8}100%{transform:scale(1);opacity:0}}
@keyframes btnSweep{0%{transform:translateX(-100%) skewX(-12deg)}100%{transform:translateX(200%) skewX(-12deg)}}
::selection{background:rgba(212,175,55,0.25);color:#faf8f2}
.infinity-symbol{filter:drop-shadow(0 0 8px #d4af37) drop-shadow(0 0 20px #ff69b4) drop-shadow(0 0 40px #d4af37);animation:infinityPulse 3.5s ease-in-out infinite}
.reading-card{background:rgba(15,15,20,0.8);border:1px solid rgba(212,175,55,0.2);border-radius:12px;padding:32px 28px;transition:all 0.4s ease;backdrop-filter:blur(10px);position:relative;overflow:hidden}
.reading-card:hover{border-color:rgba(212,175,55,0.5);box-shadow:0 0 30px rgba(212,175,55,0.1),0 0 60px rgba(255,105,180,0.05);transform:translateY(-4px)}
.reading-card::before{content:'';position:absolute;top:-50%;left:-50%;width:200%;height:200%;background:radial-gradient(circle,rgba(212,175,55,0.03) 0%,transparent 70%);opacity:0;transition:opacity 0.4s ease;pointer-events:none}
.reading-card:hover::before{opacity:1}
.reading-card-coming{opacity:0.9;border-color:rgba(212,175,55,0.12)}
.card-symbol{color:#d4af37;font-size:32px;text-shadow:0 0 8px rgba(212,175,55,0.4);margin-bottom:16px;line-height:1}
.price-badge{font-size:11px;letter-spacing:0.15em;color:rgba(212,175,55,0.7);border:1px solid rgba(212,175,55,0.3);padding:4px 12px;border-radius:20px;font-family:'Cinzel',serif;font-style:normal}
.menu-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:32px;max-width:1120px;margin:0 auto;align-items:stretch}
@media (max-width:900px){.menu-grid{grid-template-columns:repeat(2,1fr);gap:28px}}
@media (max-width:560px){.menu-grid{grid-template-columns:1fr;gap:28px}}
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

function StarsField({ count = 90 }) {
  const [stars] = useState(() =>
    Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      dur: Math.random() * 4 + 2,
      delay: Math.random() * -5,
      tint: ["white", "gold", "pink"][Math.floor(Math.random() * 3)],
    }))
  );
  const color = (t) => (t === "gold" ? "rgba(212,175,55,0.9)" : t === "pink" ? "rgba(255,105,180,0.7)" : "rgba(255,255,255,0.95)");
  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
      {stars.map((s) => (
        <div
          key={s.id}
          className="star-twinkle"
          style={{
            position: "absolute",
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.size,
            height: s.size,
            borderRadius: "50%",
            background: color(s.tint),
            boxShadow: `0 0 ${s.size * 2}px ${color(s.tint)}`,
            animation: `starTwinkle ${s.dur}s ease-in-out ${s.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

function InfinitySymbol() {
  return (
    <svg className="infinity-symbol" viewBox="0 0 200 100" xmlns="http://www.w3.org/2000/svg" style={{ width: 200, height: 100 }}>
      <defs>
        <linearGradient id="infinityGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#d4af37" />
          <stop offset="50%" stopColor="#ff69b4" />
          <stop offset="100%" stopColor="#d4af37" />
        </linearGradient>
      </defs>
      <path
        d="M50 50 C50 20, 90 20, 100 50 C110 80, 150 80, 150 50 C150 20, 110 20, 100 50 C90 80, 50 80, 50 50 Z"
        fill="none"
        stroke="url(#infinityGradient)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function Sparkles({ count = 18 }) {
  const [dots] = useState(() =>
    Array.from({ length: count }, (_, i) => ({
      id: i,
      x: 50 + (Math.random() - 0.5) * 24,
      y: 50 + (Math.random() - 0.5) * 20,
      size: Math.random() * 2 + 2,
      dur: Math.random() * 2 + 1.5,
      delay: Math.random() * -3,
      color: ["#d4af37", "#ff69b4", "#fff"][Math.floor(Math.random() * 3)],
    }))
  );
  return (
    <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)", width: "40%", height: "30%", pointerEvents: "none" }}>
      {dots.map((d) => (
        <div
          key={d.id}
          className="sparkle-dot"
          style={{
            position: "absolute",
            left: `${d.x}%`,
            top: `${d.y}%`,
            width: d.size,
            height: d.size,
            borderRadius: "50%",
            background: d.color,
            boxShadow: `0 0 ${d.size}px ${d.color}`,
            animation: `sparkleLife ${d.dur}s ease-in-out ${d.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
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
      <div style={{ position: "absolute", top: -35, left: "50%", transform: "translateX(-50%)", width: 100, height: 100,
        background: "radial-gradient(ellipse at center, rgba(255,220,120,0.2) 0%, transparent 65%)",
        animation: "flameBreathe 4s ease-in-out infinite" }} />
      <div style={{ width: 10, height: 32, margin: "0 auto",
        background: "linear-gradient(to top, rgba(200,100,20,0.5), rgba(255,180,60,0.95) 25%, rgba(255,240,180,0.98) 50%, rgba(255,248,240,0.9) 70%, transparent 100%)",
        borderRadius: "50% 50% 40% 40%", boxShadow: "0 0 20px rgba(255,200,80,0.4)", animation: "flameGlow 2.5s ease-in-out infinite" }} />
    </div>
    <div style={{ width: 2, height: 4, background: "#1a1510", marginTop: -2 }} />
    <div style={{ width: 14, height: 40, background: "linear-gradient(to right, #3d3528, #4a4035, #3d3528)", marginTop: -1, borderRadius: "0 0 2px 2px", boxShadow: "inset 1px 0 0 rgba(255,255,255,0.06)" }} />
  </div>;
}

function EnterButton() {
  const [hover, setHover] = useState(false);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: "relative",
        overflow: "hidden",
        padding: "16px 60px",
        border: `1px solid ${hover ? "#d4af37" : "rgba(212,175,55,0.6)"}`,
        borderRadius: 2,
        fontFamily: "'Cinzel', serif",
        fontSize: "clamp(0.9rem, 2vw, 1.05rem)",
        color: "#d4af37",
        letterSpacing: "0.3em",
        fontWeight: 500,
        background: "transparent",
        cursor: "pointer",
        transition: "all 0.4s ease",
        textShadow: hover ? "0 0 15px rgba(212,175,55,0.6)" : "0 0 8px rgba(212,175,55,0.3)",
        boxShadow: hover ? "0 0 30px rgba(212,175,55,0.3)" : "0 0 15px rgba(212,175,55,0.1)",
      }}
    >
      {hover && <div style={{ position: "absolute", inset: 0, background: "linear-gradient(105deg, transparent 0%, transparent 35%, rgba(255,248,240,0.08) 50%, transparent 65%, transparent 100%)", animation: "btnSweep 0.6s ease-out forwards", pointerEvents: "none" }} />}
      <span style={{ position: "relative", zIndex: 1 }}>ENTER</span>
    </div>
  );
}

export default function ReportsLanding() {
  const [entered, setEntered] = useState(false);
  const [fadingOut, setFadingOut] = useState(false);
  const [vis, setVis] = useState(false);
  const [hov, setHov] = useState(null);
  useEffect(() => { setTimeout(() => setVis(true), 200) }, []);

  const handleEnter = () => {
    if (entered || fadingOut) return;
    setFadingOut(true);
    setTimeout(() => { setFadingOut(false); setEntered(true); }, 800);
  };

  // ── LANDING: Infinity + sparkles + stars + gold title/button, fade-out on ENTER ──
  if (!entered) {
    return (
      <div
        onClick={handleEnter}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 100,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: VOID.deep,
          cursor: "pointer",
          overflow: "hidden",
          animation: fadingOut ? "pageFadeOut 0.8s ease-in-out forwards" : "none",
        }}
      >
        <style>{CSS}</style>
        <FilmGrain />
        <StarsField count={95} />
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 38%, rgba(212,175,55,0.04), transparent 50%)", pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 2, textAlign: "center", opacity: vis ? 1 : 0, transition: "opacity 1s", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div style={{ position: "relative", marginBottom: 28 }}>
            <InfinitySymbol />
            <Sparkles count={18} />
          </div>
          <h1
            className="landing-title"
            style={{
              fontFamily: "'Cinzel', 'Playfair Display', serif",
              fontSize: "clamp(1.75rem, 5vw, 3rem)",
              fontWeight: 600,
              letterSpacing: "0.3em",
              color: "#d4af37",
              textShadow: "0 0 10px rgba(212,175,55,0.5), 0 0 20px rgba(212,175,55,0.3), 0 0 40px rgba(212,175,55,0.1)",
              marginBottom: 14,
            }}
          >
            THE FORGOTTEN CODE
          </h1>
          <p style={{ fontFamily: "'Playfair Display', 'Cormorant Garamond', serif", fontSize: "clamp(1.05rem, 2.5vw, 1.3rem)", color: TEXT.secondary, letterSpacing: "0.2em", marginBottom: 40 }}>
            Research Institute
          </p>
          <EnterButton />
        </div>
        <p style={{ position: "absolute", bottom: 28, fontFamily: "'Inter', sans-serif", fontSize: 11, color: "rgba(255,248,240,0.65)", letterSpacing: "0.15em" }}>
          Click to enter
        </p>
      </div>
    );
  }

  // ── MENU: Dark gothic tarot cards, gold glow, twinkling stars ──
  return (
    <div style={{ minHeight: "100vh", padding: "40px 20px 80px", background: "#0a0a0a", position: "relative", overflow: "hidden", animation: "pageFadeIn 0.8s ease-in-out" }}>
      <style>{CSS}</style>
      <StarsField count={90} />
      <FilmGrain />

      <div style={{ position: "relative", zIndex: 10, maxWidth: 1120, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 48, opacity: vis ? 1 : 0, animation: vis ? "fadeIn 0.8s ease" : "none" }}>
          <h1 style={{ fontFamily: "'Cinzel', 'Playfair Display', serif", fontSize: "clamp(1.5rem, 4vw, 2.5rem)", fontWeight: 600,
            color: "#d4af37", letterSpacing: "0.2em", marginBottom: 10,
            textShadow: "0 0 10px rgba(212,175,55,0.5), 0 0 20px rgba(212,175,55,0.3), 0 0 40px rgba(212,175,55,0.1)" }}>
            CHOOSE YOUR READING
          </h1>
          <p style={{ fontFamily: "'Playfair Display', 'Cormorant Garamond', serif", fontSize: "clamp(1rem, 2vw, 1.15rem)", color: TEXT.secondary, letterSpacing: "0.1em", marginBottom: 24 }}>
            Three reports live now · Mini reading free — then unlock with your access code
          </p>
          <div style={{ width: 80, height: 2, background: "linear-gradient(90deg, transparent, rgba(212,175,55,0.35), transparent)", margin: "0 auto" }} />
        </div>

        <div className="menu-grid">
          {REPORTS.map((r, i) => {
            const isH = hov === r.id;
            const href = LIVE_ROUTES[r.id];
            const isLive = !!href;
            const content = (
              <>
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 16 }}>
                  <div className="card-symbol" style={{ opacity: isH && isLive ? 1 : 0.85, transition: "opacity 0.3s" }}>
                    <SigilIcon type={r.sigil} size={32} color="#d4af37" />
                  </div>
                  <span className="price-badge">${r.price}</span>
                </div>
                <h3 style={{ fontFamily: "'Playfair Display', 'Cinzel', serif", fontSize: "clamp(1.1rem, 1.8vw, 1.3rem)",
                  color: TEXT.cream, fontWeight: 500, letterSpacing: "0.04em", lineHeight: 1.4, marginBottom: 12, fontStyle: "normal" }}>
                  {r.name}
                </h3>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1rem, 1.6vw, 1.1rem)",
                  color: TEXT.secondary, lineHeight: 1.6, fontStyle: "normal" }}>
                  {r.desc}
                </p>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 12, color: TEXT.muted, letterSpacing: "0.02em", lineHeight: 1.5, marginTop: 12, fontStyle: "normal" }}>
                  {r.focus}
                </p>
                {!isLive && <p style={{ fontFamily: "'Cinzel', serif", fontSize: 11, letterSpacing: "0.15em", color: TEXT.muted, marginTop: 16, fontWeight: 400 }}>COMING SOON</p>}
                {isLive && (
                  <p style={{
                    fontFamily: "'Cinzel', serif", fontSize: 12, letterSpacing: "0.15em", marginTop: 16,
                    color: "#d4af37", textShadow: isH ? "0 0 10px rgba(212,175,55,0.5)" : "0 0 6px rgba(212,175,55,0.3)",
                    transition: "all 0.3s ease", display: "inline-block", transform: isH ? "translateX(4px)" : "translateX(0)",
                  }}>ENTER →</p>
                )}
              </>
            );
            const cardClass = ["reading-card", !isLive && "reading-card-coming"].filter(Boolean).join(" ");
            const cardStyle = {
              animation: vis ? `fadeInUp 0.6s ease-out ${i * 0.05}s both` : "none",
              borderColor: isLive && (isH ? "rgba(212,175,55,0.5)" : "rgba(212,175,55,0.25)"),
            };
            if (isLive) {
              return (
                <a key={r.id} href={href} onMouseEnter={() => setHov(r.id)} onMouseLeave={() => setHov(null)}
                  className={cardClass} style={{ ...cardStyle, textDecoration: "none", cursor: "pointer", display: "block" }}>
                  {content}
                </a>
              );
            }
            return <div key={r.id} onMouseEnter={() => setHov(r.id)} onMouseLeave={() => setHov(null)} className={cardClass} style={cardStyle}>{content}</div>;
          })}
        </div>

        <footer style={{ textAlign: "center", marginTop: 56, fontFamily: "'Cormorant Garamond', serif", fontSize: 12, color: "rgba(240,230,211,0.5)", letterSpacing: "0.06em", fontStyle: "normal" }}>
          Jennifer Leigh West · theforgottencode780@gmail.com
        </footer>
      </div>
    </div>
  );
}
