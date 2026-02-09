"use client";
import { useState, useEffect, useRef, useCallback } from "react";

// ═══════════════════════════════════════════════════════════════
// THE DREAM ATLAS & FORBIDDEN LIBRARY — FULL DEEP INTAKE
// Celestial Grimoire + LIVING FOG, MIST & SANDS OF TIME DREAMSCAPE
// Jennifer Leigh West | The Forgotten Code Research Institute
// ═══════════════════════════════════════════════════════════════

const G = { gold: "#c9a84c", amber: "#b8943f", pale: "#e8dcc8", cream: "#d4cbb8", moon: "#f5e6c8" };
const C = { teal: "#2a9d8f", deep: "#1a7a6d", sea: "#3ab5a5", frost: "#7ecfc5" };
const V = { void: "#040810", indigo: "#081428", twilight: "#0c1e3a", navy: "#0a1628", deep: "#061222" };
const B = { midnight: "#0d2847", ocean: "#0f3460", cobalt: "#163d6f", steel: "#1a4a7a", slate: "#1e5488" };
const L = { mist: "#8badc4", frost: "#a8c8d8", silver: "#94afc4", whisper: "#6b8fa8" };

const SECTIONS = [
  { id: "intro", title: "THE DREAM ATLAS", sub: "& Forbidden Library" },
  { id: "foundation", title: "PERSONAL FOUNDATION", sub: "Who dreams these dreams?" },
  { id: "dreamfoundations", title: "DREAM FOUNDATIONS", sub: "The roots of your sleeping mind" },
  { id: "animals", title: "RECURRING ANIMALS", sub: "Guides, guardians, and warnings" },
  { id: "symbols", title: "OBJECTS & MOTIFS", sub: "The language your dreams speak" },
  { id: "forces", title: "NATURAL FORCES", sub: "Elements that move through your nights" },
  { id: "shadows", title: "SHADOW FIGURES", sub: "The beings who visit you" },
  { id: "landscapes", title: "DREAM LANDSCAPES", sub: "Where your sleeping self wanders" },
  { id: "portals", title: "PORTALS & THRESHOLDS", sub: "Crossings, gates, and passages" },
  { id: "library", title: "THE FORBIDDEN LIBRARY", sub: "Books your soul has written" },
  { id: "crossroads", title: "DREAM & WAKING CROSSROADS", sub: "Where the veil thins" },
  { id: "revelations", title: "FINAL REVELATIONS", sub: "The dreams that define you" },
  { id: "complete", title: "ATLAS SEALED", sub: "Your map is drawn" }
];

const ANIMAL_OPTS = ["Jaguar/Panther","Serpent/Snake","Wolf","Raven/Crow","Owl","Horse","Eagle/Hawk","Bear","Deer/Stag","Fox","Cat","Dog","Fish/Whale","Spider","Butterfly/Moth","Dragon","Lion/Lioness"];
const OBJECT_OPTS = ["Keys","Mirrors","Weapons","Blood","Water","Fire","Feathers","Rings","Fruits","Stars","Numbers","Books","Clocks","Masks","Coins","Doors","Bones"];
const ENV_OPTS = ["Forests","Deserts","Rivers/Lakes","Oceans","Mountains","Cities","Ruins","Temples","Caves","Fields","Laboratories","Hospitals","Graveyards","Libraries","Castles"];
const PORTAL_OPTS = ["Doors","Staircases","Tunnels","Wells","Elevators","Mirrors","Windows","Bridges","Archways","Underwater passages"];
const KNOWLEDGE_OPTS = ["Past-life memory","Ancestral language","Prophecy","Healing knowledge","Hidden power","Cosmic secrets","Death wisdom","Creation codes"];
const TRADITION_OPTS = ["Jungian","Daoist","Vedic/Hindu","Shamanic","Indigenous","Sufi","Kabbalistic","Buddhist","Norse/Germanic","Celtic","Egyptian","Gnostic","Hermetic","Yoruba/Ifa"];

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700&family=Crimson+Text:wght@400;600;700&family=Inter:wght@300;400;500;600&display=swap');
*{box-sizing:border-box;margin:0;padding:0}
html,body{overflow-x:hidden;font-style:normal}
p, input, textarea, label, select { font-style: normal }
textarea:focus,input:focus,select:focus{outline:none}
::selection{background:#2a9d8f33;color:#e8dcc8}
@keyframes starDrift{0%{transform:translateY(0) rotate(0deg);opacity:0}10%{opacity:1}90%{opacity:1}100%{transform:translateY(-100vh) rotate(180deg);opacity:0}}
@keyframes moonGlow{0%,100%{filter:drop-shadow(0 0 15px #1a4a7a44)}50%{filter:drop-shadow(0 0 35px #2a9d8f44)}}
@keyframes fadeUp{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}
@keyframes constellationPulse{0%,100%{opacity:0.3}50%{opacity:0.8}}
@keyframes starTwinkle{0%,100%{opacity:0.15;transform:scale(1)}25%{opacity:0.9;transform:scale(1.2)}50%{opacity:0.25;transform:scale(1)}75%{opacity:0.95;transform:scale(1.15)}}
@keyframes goldBorderPulse{0%,100%{border-color:#c9a84c22;box-shadow:0 0 8px #0d284711}50%{border-color:#c9a84c55;box-shadow:0 0 25px #2a9d8f11}}
@keyframes inkBleed{from{width:0}to{width:100%}}
@keyframes btnSweep{0%{transform:translateX(-100%) skewX(-12deg)}100%{transform:translateX(200%) skewX(-12deg)}}
`;

function Stars() {
  const stars = Array.from({ length: 120 }, (_, i) => ({
    left: Math.random() * 100, top: Math.random() * 100,
    size: Math.random() * 2.5 + 0.5, delay: Math.random() * 4,
    dur: Math.random() * 1.5 + 1, opacity: Math.random() * 0.4 + 0.2
  }));
  return <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}>
    {stars.map((s, i) => <div key={i} style={{
      position: "absolute", left: `${s.left}%`, top: `${s.top}%`,
      width: s.size, height: s.size, borderRadius: "50%",
      background: i % 3 === 0 ? G.gold : L.frost, opacity: s.opacity,
      animation: `starTwinkle ${s.dur}s ease-in-out ${s.delay}s infinite`
    }} />)}
  </div>;
}

// ═══ FOG & MIST — Canvas-based rolling dreamscape haze ═══════
function FogMist() {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const banksRef = useRef([]);
  const sandsRef = useRef([]);

  useEffect(() => {
    const c = canvasRef.current; if (!c) return;
    const ctx = c.getContext("2d");
    const resize = () => { c.width = window.innerWidth; c.height = window.innerHeight; };
    resize(); window.addEventListener("resize", resize);

    // Fog — gentle drift across full width, minimal wave so it doesn't sit in weird waves
    banksRef.current = Array.from({ length: 18 }, (_, i) => ({
      x: Math.random() * c.width, y: c.height * 0.2 + Math.random() * c.height * 0.7,
      w: Math.random() * 500 + 300, h: Math.random() * 120 + 50,
      speed: (Math.random() - 0.5) * 0.15 + 0.08,
      yDrift: Math.random() * Math.PI * 2, ySpeed: Math.random() * 0.001 + 0.0005,
      opa: Math.random() * 0.05 + 0.025,
      opaPulse: Math.random() * Math.PI * 2, opaSp: Math.random() * 0.002 + 0.001,
      color: i % 4 === 0 ? "rgba(42,157,143," : i % 4 === 1 ? "rgba(139,173,196," : i % 4 === 2 ? "rgba(168,200,216," : "rgba(13,40,71,"
    }));

    // Sands of time — full width coverage, more particles drifting up
    sandsRef.current = Array.from({ length: 140 }, () => ({
      x: Math.random() * c.width,
      y: c.height + Math.random() * 200,
      size: Math.random() * 2.5 + 0.6,
      speed: Math.random() * 0.8 + 0.3,
      drift: (Math.random() - 0.5) * 0.25,
      wobble: Math.random() * Math.PI * 2,
      wobbleSpeed: Math.random() * 0.015 + 0.01,
      opa: Math.random() * 0.45 + 0.12,
      color: Math.random() > 0.6 ? "rgba(201,168,76," : Math.random() > 0.3 ? "rgba(184,148,63," : "rgba(245,230,200,"
    }));

    const loop = () => {
      ctx.clearRect(0, 0, c.width, c.height);

      // Draw fog — gentle horizontal drift, very subtle vertical movement (no weird waves)
      banksRef.current.forEach(b => {
        b.x += b.speed;
        b.yDrift += b.ySpeed;
        b.opaPulse += b.opaSp;
        const yOff = Math.sin(b.yDrift) * 3;
        const opaOff = Math.sin(b.opaPulse) * 0.01;
        const opa = Math.max(0.015, Math.min(0.09, b.opa + opaOff));

        if (b.x > c.width + b.w) b.x = -b.w;
        if (b.x < -b.w) b.x = c.width + b.w;

        const grd = ctx.createRadialGradient(b.x, b.y + yOff, 0, b.x, b.y + yOff, b.w * 0.5);
        grd.addColorStop(0, b.color + opa + ")");
        grd.addColorStop(0.5, b.color + (opa * 0.5) + ")");
        grd.addColorStop(1, b.color + "0)");
        ctx.fillStyle = grd;
        ctx.beginPath();
        ctx.ellipse(b.x, b.y + yOff, b.w * 0.5, b.h * 0.5, 0, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw sands of time — golden particles drifting upward
      sandsRef.current.forEach(s => {
        s.y -= s.speed;
        s.wobble += s.wobbleSpeed;
        s.x += s.drift + Math.sin(s.wobble) * 0.4;

        // Reset when off screen
        if (s.y < -10) {
          s.y = c.height + Math.random() * 50;
          s.x = Math.random() * c.width;
        }

        // Fade based on vertical position (brighter in middle)
        const vertFade = 1 - Math.abs((s.y / c.height) - 0.5) * 1.2;
        const finalOpa = Math.max(0.02, s.opa * Math.max(0.1, vertFade));

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fillStyle = s.color + finalOpa + ")";
        ctx.fill();

        // Glow effect for larger particles
        if (s.size > 1.2) {
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.size * 3, 0, Math.PI * 2);
          ctx.fillStyle = s.color + (finalOpa * 0.15) + ")";
          ctx.fill();
        }
      });

      animRef.current = requestAnimationFrame(loop);
    };
    loop();
    return () => { cancelAnimationFrame(animRef.current); window.removeEventListener("resize", resize); };
  }, []);

  return <canvas ref={canvasRef} style={{ position: "fixed", inset: 0, zIndex: 1, pointerEvents: "none" }} />;
}

function CrescentMoon({ size = 100 }) {
  return <div style={{ width: size, height: size, margin: "0 auto", animation: "moonGlow 4s ease-in-out infinite" }}>
    <svg viewBox="0 0 100 100" width="100%" height="100%">
      <defs>
        <radialGradient id="mg" cx="40%" cy="40%"><stop offset="0%" stopColor="#f5e6c8"/><stop offset="100%" stopColor={G.gold}/></radialGradient>
        <filter id="glow"><feGaussianBlur stdDeviation="3" result="b"/><feComposite in="SourceGraphic" in2="b" operator="over"/></filter>
      </defs>
      <circle cx="50" cy="50" r="30" fill="url(#mg)" filter="url(#glow)" opacity="0.9"/>
      <circle cx="62" cy="42" r="25" fill={V.void}/>
      {[{cx:25,cy:25,r:1},{cx:75,cy:20,r:0.8},{cx:15,cy:60,r:1.2},{cx:80,cy:70,r:0.6},{cx:40,cy:85,r:0.9},{cx:70,cy:40,r:0.7},{cx:30,cy:15,r:0.5}].map((s,i) =>
        <circle key={i} cx={s.cx} cy={s.cy} r={s.r} fill={G.gold} opacity="0.5"/>
      )}
    </svg>
  </div>;
}

function SectionDivider() {
  return <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 15, margin: "40px 0" }}>
    <div style={{ width: 60, height: 1, background: `linear-gradient(90deg,transparent,${B.cobalt}33)` }} />
    <div style={{ width: 5, height: 5, borderRadius: "50%", background: C.teal, opacity: 0.25 }} />
    <div style={{ width: 5, height: 5, transform: "rotate(45deg)", background: G.gold, opacity: 0.15 }} />
    <div style={{ width: 5, height: 5, borderRadius: "50%", background: C.teal, opacity: 0.25 }} />
    <div style={{ width: 60, height: 1, background: `linear-gradient(90deg,${B.cobalt}33,transparent)` }} />
  </div>;
}

// ═══ SHARED INPUT STYLES ═══
const inputBase = { width: "100%", padding: "14px 18px", background: `${V.indigo}cc`,
  border: `1px solid ${B.midnight}44`, color: G.pale, fontFamily: "'Crimson Text',serif",
  fontSize: 16, fontStyle: "normal", transition: "border-color 0.3s", lineHeight: 1.7, borderRadius: 2 };
const labelStyle = { fontFamily: "'Cinzel',serif", fontSize: 13, color: `${L.mist}88`,
  letterSpacing: "0.08em", display: "block", marginBottom: 6, marginTop: 20 };
const hintStyle = { fontFamily: "'Crimson Text',serif", fontSize: 13, color: `${L.whisper}55`, fontStyle: "normal",
 marginTop: 4, marginBottom: 2 };

function TextInput({ label, hint, value, onChange, placeholder, multiline, rows }) {
  const Tag = multiline ? "textarea" : "input";
  return <div>
    <label style={labelStyle}>{label}</label>
    {hint && <p style={hintStyle}>{hint}</p>}
    <Tag value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
      rows={rows || 3} style={{ ...inputBase, ...(multiline ? { resize: "vertical", minHeight: 80 } : {}) }}
      onFocus={e => e.target.style.borderColor = `${C.teal}55`}
      onBlur={e => e.target.style.borderColor = `${B.midnight}44`} />
  </div>;
}

function CheckboxGrid({ label, options, selected, onToggle, columns = 3 }) {
  return <div>
    <label style={{ ...labelStyle, marginBottom: 12 }}>{label}</label>
    <div style={{ display: "grid", gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: 8 }}>
      {options.map(opt => {
        const active = selected.includes(opt);
        return <div key={opt} onClick={() => onToggle(opt)}
          style={{ padding: "10px 14px", cursor: "pointer", textAlign: "center",
            border: `1px solid ${active ? C.teal + "44" : B.midnight + "33"}`,
            background: active ? `${B.midnight}88` : `${V.indigo}66`,
            color: active ? G.pale : `${L.mist}44`,
            fontFamily: "'Crimson Text',serif", fontSize: 14,
            transition: "all 0.25s", borderRadius: 2,
            boxShadow: active ? `0 0 15px ${C.teal}11, inset 0 0 20px ${B.ocean}22` : "none" }}>
          {opt}
        </div>;
      })}
    </div>
  </div>;
}

function SelectInput({ label, value, onChange, options }) {
  return <div>
    <label style={labelStyle}>{label}</label>
    <select value={value} onChange={e => onChange(e.target.value)}
      style={{ ...inputBase, cursor: "pointer", appearance: "none",
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%238badc4' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`,
        backgroundRepeat: "no-repeat", backgroundPosition: "right 16px center" }}>
      <option value="">{label}</option>
      {options.map(o => <option key={o} value={o}>{o}</option>)}
    </select>
  </div>;
}

function NavButton({ label, onClick, disabled, primary }) {
  const [hover, setHover] = useState(false);
  return <div onClick={() => !disabled && onClick()} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
    style={{ position: "relative", overflow: "hidden", display: "inline-block", padding: primary ? "16px 50px" : "14px 35px",
      border: `1px solid ${disabled ? L.mist + "08" : primary ? G.gold + "44" : B.cobalt + "55"}`,
      cursor: disabled ? "default" : "pointer", textAlign: "center",
      fontFamily: "'Cinzel',serif", fontSize: primary ? 15 : 13, letterSpacing: "0.15em",
      color: disabled ? `${L.mist}15` : primary ? G.gold : L.mist, transition: "border-color 0.3s, box-shadow 0.3s",
      textShadow: disabled ? "none" : primary ? `0 0 10px ${G.gold}22` : "none",
      background: primary && !disabled ? `${B.midnight}44` : "transparent",
      animation: primary && !disabled ? "goldBorderPulse 3s ease-in-out infinite" : "none",
      opacity: disabled ? 0.3 : 1, borderRadius: 2 }}>
    {hover && !disabled && <div style={{ position: "absolute", inset: 0, background: "linear-gradient(105deg, transparent 0%, transparent 40%, rgba(255,248,240,0.08) 50%, transparent 60%, transparent 100%)", animation: "btnSweep 0.5s ease-out forwards", pointerEvents: "none" }} />}
    <span style={{ position: "relative", zIndex: 1 }}>{label}</span>
  </div>;
}

function FilmGrain() {
  const svg = "data:image/svg+xml," + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg"><filter id="df"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/></filter><rect width="100%" height="100%" filter="url(%23df)"/></svg>');
  return <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, backgroundImage: `url("${svg}")`, backgroundRepeat: "repeat", opacity: 0.04 }} />;
}

function PageShell({ children, section }) {
  const [show, setShow] = useState(false);
  useEffect(() => { setShow(false); setTimeout(() => setShow(true), 100) }, [section]);
  return <div style={{ minHeight: "100vh", padding: "60px 24px 100px", background: V.void, position: "relative" }}>
    <style>{CSS}</style>
    <FilmGrain />
    <Stars />
    <FogMist />
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none",
      background: `radial-gradient(ellipse at 50% 20%, ${B.midnight}33, transparent 55%), radial-gradient(ellipse at 80% 80%, ${B.ocean}11, transparent 45%)` }} />
    <div style={{ position: "relative", zIndex: 10, maxWidth: 640, margin: "0 auto",
      opacity: show ? 1 : 0, transform: show ? "translateY(0)" : "translateY(25px)",
      transition: "all 0.7s ease" }}>
      {children}
    </div>
  </div>;
}

function SectionHeader({ title, sub, progress }) {
  return <div style={{ textAlign: "center", marginBottom: 40 }}>
    {progress !== undefined && <div style={{ width: "100%", height: 2, background: `${B.midnight}55`, marginBottom: 25 }}>
      <div style={{ width: `${progress}%`, height: "100%",
        background: `linear-gradient(90deg,${C.deep}88,${C.teal}bb,${G.gold}66)`,
        boxShadow: `0 0 10px ${C.teal}33`, transition: "width 0.6s ease" }} />
    </div>}
    <div style={{ fontFamily: "'Cinzel',serif", fontSize: "clamp(1.5rem,5vw,2.2rem)",
      color: G.pale, letterSpacing: "0.12em", fontWeight: 500,
      textShadow: `0 0 20px ${B.cobalt}44,0 0 40px ${C.teal}11` }}>{title}</div>
    <div style={{ fontFamily: "'Crimson Text',serif", fontSize: "clamp(0.95rem,2.5vw,1.15rem)",
      color: `${L.whisper}66`,  marginTop: 8 }}>{sub}</div>
    <SectionDivider />
  </div>;
}

// ═══════════════════════════════════════════════════════════════
// MAIN APPLICATION
// ═══════════════════════════════════════════════════════════════

const ACCESS_CODE = "DREAMATLAS2026";

export default function DreamAtlasIntake() {
  const [phase, setPhase] = useState("intro");
  const [d, setD] = useState({
    name: "", otherNames: "", dob: "", tob: "", pob: "", location: "", email: "",
    miniWhisper: "", accessCode: "", codeError: false,
    dreamRecall: "", dreamRecord: "", firstDream: "", childhoodNightmares: "", currentThemes: "",
    dreamAnimals: [], otherAnimals: "", animalEmotions: "",
    dreamObjects: [], otherObjects: "", objectStates: "",
    naturalForces: "", forcesBehavior: "",
    humanFigures: "", humanEmotions: "", otherworldlyFigures: "", figureRoles: "", unresolvedFigures: "",
    dreamEnvironments: [], otherEnvironments: "", environmentFeelings: "", dreamTimes: "", sacredSites: "", realWorldConnections: "",
    dreamGates: [], portalExperience: "", fallingDreams: "", flyingDreams: "", underwaterDreams: "", lucidity: "",
    wornBook: "", misplacedBook: "", fearfulBook: "", desiredBook: "", forbiddenKnowledge: [], otherKnowledge: "",
    synchronicities: "", spiritualTraditions: [], traditionInfluence: "", sacredTools: "",
    powerfulDream: "", terrifyingDream: "", hopeToDiscover: "", unspokenMysteries: ""
  });
  const [copied, setCopied] = useState(false);

  const set = (key, val) => setD(prev => ({ ...prev, [key]: val }));
  const toggleArr = (key, val) => setD(prev => ({
    ...prev, [key]: prev[key].includes(val) ? prev[key].filter(v => v !== val) : [...prev[key], val]
  }));
  const go = ph => { setPhase(ph); window.scrollTo({ top: 0, behavior: "smooth" }) };
  const nav = (back, next, label = "CONTINUE", dis = false) => <div style={{ display: "flex", justifyContent: back ? "space-between" : "flex-end", marginTop: 40 }}>
    {back && <NavButton label="← BACK" onClick={() => go(back)} />}<NavButton label={label} onClick={() => go(next)} primary disabled={dis} /></div>;

  // \u2500\u2500 INTRO \u2500\u2500
  if (phase === "intro") return <PageShell section={0}>
    <div style={{ minHeight: "85vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
      <CrescentMoon size={110} />
      <h1 style={{ fontFamily: "'Cinzel',serif", fontSize: "clamp(2rem,7vw,3.5rem)", color: G.pale, letterSpacing: "0.1em", marginTop: 30, lineHeight: 1.1, textShadow: `0 0 15px ${B.cobalt}88,0 0 40px ${C.teal}22,0 0 80px ${B.ocean}11` }}>THE DREAM ATLAS</h1>
      <div style={{ fontFamily: "'Crimson Text',serif", fontSize: "clamp(1.1rem,3vw,1.5rem)", color: "#C4B59A",  marginTop: 10 }}>& The Forbidden Library</div>
      <div style={{ fontFamily: "'Cinzel',serif", fontSize: 11, letterSpacing: "0.35em", color: "rgba(255,248,240,0.7)", marginTop: 25 }}>MINI PREVIEW + FULL DEEP INTAKE</div>
      <p style={{ fontFamily: "'Crimson Text',serif", fontSize: "clamp(1rem,2.5vw,1.2rem)", color: `${L.frost}44`, lineHeight: 2, maxWidth: 480, marginTop: 28 }}>
        Your dreams are not random. They are the oldest language your soul still speaks. Give us one returning dream — and we'll show you the thread your sleeping mind has been weaving.</p>
      <SectionDivider />
      <div style={{ marginTop: 40 }}><NavButton label="OPEN THE ATLAS" onClick={() => go("mini1")} primary /></div>
      <div style={{ marginTop: 60, display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: 30, height: 1, background: `${B.cobalt}18` }} />
        <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 9, color: "rgba(255,248,240,0.65)", letterSpacing: "0.2em" }}>The Forgotten Code Research Institute</p>
        <div style={{ width: 30, height: 1, background: `${B.cobalt}18` }} />
      </div>
    </div>
  </PageShell>;

  // \u2500\u2500 MINI TEASER \u2500\u2500
  if (phase === "mini1") return <PageShell section="mini1">
    <SectionHeader title="FIRST THREAD" sub="Before the atlas opens" />
    <TextInput label="Your Name" value={d.name} onChange={v => set("name", v)} placeholder="First, middle, last" />
    <TextInput label="Email Address" value={d.email} onChange={v => set("email", v)} placeholder="For receiving your atlas" />
    <TextInput label="What dream keeps coming back?" hint="The one your sleeping mind won't let go of — even fragments count" value={d.miniWhisper} onChange={v => set("miniWhisper", v)} placeholder="I keep dreaming about..." multiline rows={3} />
    {nav(null, "miniResult", "REVEAL MY DREAM GLIMPSE", !(d.name && d.email))}
  </PageShell>;

  // \u2500\u2500 MINI RESULT \u2500\u2500
  if (phase === "miniResult") return <PageShell section="miniResult">
    <div style={{ textAlign: "center" }}>
      <CrescentMoon size={70} />
      <h2 style={{ fontFamily: "'Cinzel',serif", fontSize: "clamp(1.8rem,5vw,2.8rem)", color: G.pale, marginTop: 15, letterSpacing: "0.1em", textShadow: `0 0 15px ${B.cobalt}66,0 0 30px ${C.teal}22` }}>YOUR DREAM GLIMPSE</h2>
      <p style={{ fontFamily: "'Crimson Text',serif", fontSize: "clamp(1rem,2.5vw,1.15rem)", color: `${L.whisper}55`,  marginTop: 12, lineHeight: 1.9 }}>What you wrote is just the first thread. The full map goes twelve layers deep.</p>
      <SectionDivider />
      <div style={{ background: `${V.indigo}cc`, border: `1px solid ${B.midnight}44`, padding: "30px 25px", borderRadius: 2, textAlign: "left", marginBottom: 30 }}>
        <div style={{ fontFamily: "'Cinzel',serif", fontSize: 12, letterSpacing: "0.25em", color: `${L.mist}33`, marginBottom: 25 }}>INITIAL TRACE</div>
        <p style={{ fontFamily: "'Crimson Text',serif", fontSize: 16, color: `${L.frost}55`, lineHeight: 2,  marginBottom: 20 }}>
          {d.name} — the dream you keep returning to is the surface of something your soul has been writing for years. Every symbol, animal guide, shadow figure, and forbidden book in your nights is part of one architecture. You've just named the first thread.</p>
        {d.miniWhisper && d.miniWhisper.trim() && <div style={{ marginBottom: 22, padding: "18px 20px", borderLeft: `2px solid ${C.teal}44`, background: `${B.midnight}33` }}>
          <div style={{ fontFamily: "'Cinzel',serif", fontSize: 10, letterSpacing: "0.2em", color: `${C.teal}55`, marginBottom: 8 }}>YOUR RETURNING DREAM</div>
          <p style={{ fontFamily: "'Crimson Text',serif", fontSize: 15, color: `${L.frost}55`, lineHeight: 1.9,  }}>"{d.miniWhisper}"</p>
        </div>}
        <p style={{ fontFamily: "'Crimson Text',serif", fontSize: 15, color: `${L.mist}44`, lineHeight: 2 }}>
          The full Dream Atlas decodes that architecture — hand-crafted by Jennifer, no AI. You get the complete map: every recurring symbol, landscape, portal, and the Forbidden Library your soul has been writing in the dark. Most people never see it. You're one step away.</p>
      </div>
      <NavButton label="UNLOCK THE FULL DREAM ATLAS →" onClick={() => go("gate")} primary />
      <div style={{ marginTop: 30 }}><NavButton label="← EDIT MY ANSWERS" onClick={() => go("mini1")} /></div>
    </div>
  </PageShell>;

  // \u2500\u2500 GATE \u2014 Payment \u2500\u2500
  if (phase === "gate") return <PageShell section="gate">
    <div style={{ textAlign: "center" }}>
      <CrescentMoon size={70} />
      <h2 style={{ fontFamily: "'Cinzel',serif", fontSize: "clamp(1.8rem,5vw,2.5rem)", color: G.pale, marginTop: 15, letterSpacing: "0.1em" }}>UNLOCK THE FULL ATLAS</h2>
      <p style={{ fontFamily: "'Crimson Text',serif", fontSize: "clamp(1.05rem,2.5vw,1.18rem)", color: `${L.frost}44`,  marginTop: 12, lineHeight: 2, maxWidth: 480, margin: "12px auto 0" }}>
        Your dream glimpse revealed the surface. The full Dream Atlas goes twelve layers deep — mapping every symbol, animal guide, shadow figure, dream landscape, portal crossing, and the forbidden books your soul has been writing in the dark.</p>
      <SectionDivider />
      <div style={{ background: `${V.indigo}cc`, border: `1px solid ${B.midnight}44`, padding: "30px 25px", borderRadius: 2, textAlign: "left", maxWidth: 460, margin: "0 auto 30px" }}>
        <div style={{ fontFamily: "'Cinzel',serif", fontSize: 12, letterSpacing: "0.2em", color: `${L.mist}55`, marginBottom: 18 }}>YOUR DREAM ATLAS INCLUDES</div>
        {["Dream foundations — earliest memories, recurring themes, childhood patterns", "Animal guides, totems, and dream guardians across your lifetime", "Sacred objects, motifs, and the language your dreams speak", "Shadow figures — beings, entities, and unresolved encounters", "Dream landscapes, portals, and threshold crossings", "The Forbidden Library — the books your soul keeps writing", "Synchronicities and dream-to-waking connections"].map((s, i) =>
          <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 12 }}>
            <div style={{ color: `${C.teal}55`, fontSize: 12, marginTop: 2, flexShrink: 0 }}>☽</div>
            <p style={{ fontFamily: "'Crimson Text',serif", fontSize: 14, color: `${L.frost}44`, lineHeight: 1.6 }}>{s}</p></div>)}
        <p style={{ fontFamily: "'Crimson Text',serif", fontSize: 13, color: `${L.mist}33`,  marginTop: 14, lineHeight: 1.7 }}>
          Hand-crafted personally by Jennifer. No AI generation. Delivered within 5-7 days.</p>
      </div>

      <div style={{ fontFamily: "'Cinzel',serif", fontSize: "clamp(1.5rem,4vw,2rem)", color: G.gold, letterSpacing: "0.15em", marginBottom: 8 }}>$111</div>
      <p style={{ fontFamily: "'Crimson Text',serif", fontSize: 13, color: `${L.mist}33`,  marginBottom: 25 }}>One-time payment · Lifetime access</p>

      <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 380, margin: "0 auto" }}>
        {[
          { label: "PAY WITH STRIPE", href: "https://buy.stripe.com/PLACEHOLDER", icon: "\u25c7", note: "Credit / Debit Card" },
          { label: "PAY WITH VENMO", href: "https://venmo.com/u/Jennifer-Coley-4", icon: "\u263d", note: "@Jennifer-Coley-4" },
          { label: "PAY WITH CASHAPP", href: "https://cash.app/$jenniferWilderWest", icon: "\u2605", note: "$jenniferWilderWest" },
          { label: "PAY WITH PAYPAL", href: "https://paypal.me/JSnider364/111", icon: "\u25c9", note: "PayPal.me/JSnider364" }
        ].map((pm, i) =>
          <a key={i} href={pm.href} target="_blank" rel="noopener noreferrer"
            style={{ display: "block", padding: "16px 20px", border: `1px solid ${B.midnight}55`, textDecoration: "none", borderRadius: 2, background: `${V.indigo}cc`, transition: "all 0.3s", textAlign: "center" }}>
            <div style={{ fontFamily: "'Cinzel',serif", fontSize: 14, letterSpacing: "0.15em", color: G.pale }}>{pm.icon} {pm.label}</div>
            <div style={{ fontFamily: "'Crimson Text',serif", fontSize: 12, color: `${L.mist}33`, marginTop: 4 }}>{pm.note}</div>
          </a>)}
      </div>

      <p style={{ fontFamily: "'Crimson Text',serif", fontSize: 12, color: `${L.mist}22`, marginTop: 18, lineHeight: 1.7 }}>
        Include <strong style={{ color: `${L.mist}44` }}>"{d.name}"</strong> and <strong style={{ color: `${L.mist}44` }}>"{d.email}"</strong> in your payment note.</p>

      <SectionDivider />
      <p style={{ fontFamily: "'Cinzel',serif", fontSize: 12, letterSpacing: "0.15em", color: `${L.mist}44`, marginBottom: 12 }}>ALREADY PAID?</p>
      <a href={`mailto:theforgottencode780@gmail.com?subject=${encodeURIComponent(`Dream Atlas Payment Confirmation — ${d.name}`)}&body=${encodeURIComponent(`Hi Jennifer,\n\nI just completed payment for the Dream Atlas & Forbidden Library ($111).\n\nName: ${d.name}\nEmail: ${d.email}\nPayment method: [Venmo/CashApp/PayPal/Stripe]\n\nPlease send my access code when ready.\n\nThank you.`)}`}
        style={{ display: "block", width: "min(100%,380px)", padding: "16px 25px", margin: "0 auto", border: `1px solid ${C.teal}33`, textDecoration: "none", textAlign: "center", fontFamily: "'Cinzel',serif", fontSize: 13, letterSpacing: "0.12em", color: G.gold, background: `${B.midnight}33`, borderRadius: 2 }}>
        ✉ I'VE PAID — NOTIFY JENNIFER</a>
      <p style={{ fontFamily: "'Crimson Text',serif", fontSize: 12, color: `${L.mist}18`, marginTop: 12 }}>
        theforgottencode780@gmail.com · (423) 388-8304</p>

      <SectionDivider />
      <p style={{ fontFamily: "'Cinzel',serif", fontSize: 12, letterSpacing: "0.15em", color: `${L.mist}44`, marginBottom: 18 }}>HAVE YOUR ACCESS CODE?</p>
      <div style={{ maxWidth: 350, margin: "0 auto" }}>
        <input value={d.accessCode} onChange={e => { set("accessCode", e.target.value.toUpperCase()); set("codeError", false) }} placeholder="ENTER ACCESS CODE"
          style={{ ...inputBase, textAlign: "center", letterSpacing: "0.3em", fontFamily: "'Cinzel',serif", fontSize: 14 }}
          onFocus={e => { e.target.style.borderColor = `${C.teal}55` }}
          onBlur={e => { e.target.style.borderColor = `${B.midnight}44` }} />
        {d.codeError && <p style={{ fontFamily: "'Crimson Text',serif", fontSize: 13, color: C.teal, textAlign: "center", marginTop: 8,  }}>Invalid access code. Please check and try again.</p>}
        <div style={{ marginTop: 18, textAlign: "center" }}>
          <NavButton label="UNLOCK FULL INTAKE" onClick={() => { if (d.accessCode === ACCESS_CODE) go("deep1"); else set("codeError", true) }} primary /></div>
      </div>
      <div style={{ marginTop: 35, textAlign: "center" }}><NavButton label="← BACK" onClick={() => go("miniResult")} /></div>
    </div>
  </PageShell>;

  // Deep intake sections
  const deepSteps = ["deep1","deep2","deep3","deep4","deep5","deep6","deep7","deep8","deep9","deep10","deep11","complete"];
  const deepIdx = deepSteps.indexOf(phase);
  const deepProgress = deepIdx >= 0 ? (deepIdx / (deepSteps.length - 1)) * 100 : 0;
  const dn = (back, next, label = "CONTINUE", dis = false) => nav(back, next, label, dis);

  if (phase === "deep1") return <PageShell section="deep1">
    <SectionHeader title="PERSONAL FOUNDATION" sub="Who dreams these dreams?" progress={deepProgress} />
    <TextInput label="Full Name" value={d.name} onChange={v => set("name", v)} placeholder="First, middle, last" />
    <TextInput label="Other Names" hint="Nicknames, spiritual names, dream names" value={d.otherNames} onChange={v => set("otherNames", v)} placeholder="Optional" />
    <TextInput label="Date of Birth" value={d.dob} onChange={v => set("dob", v)} placeholder="MM/DD/YYYY" />
    <TextInput label="Time of Birth" hint="If known" value={d.tob} onChange={v => set("tob", v)} placeholder="e.g. 9:32 AM" />
    <TextInput label="Place of Birth" value={d.pob} onChange={v => set("pob", v)} placeholder="City, State, Country" />
    <TextInput label="Email Address" value={d.email} onChange={v => set("email", v)} placeholder="For receiving your Dream Atlas" />
    {dn("gate", "deep2", "CONTINUE", !(d.name && d.email))}
  </PageShell>;

  if (phase === "deep2") return <PageShell section="deep2">
    <SectionHeader title="DREAM FOUNDATIONS" sub="The roots of your sleeping mind" progress={deepProgress} />
    <SelectInput label="How often do you remember your dreams?" value={d.dreamRecall} onChange={v => set("dreamRecall", v)} options={["Daily/Almost every night","Several times per week","A few times per month","Rarely","Almost never"]} />
    <TextInput label="Do you record your dreams? How?" value={d.dreamRecord} onChange={v => set("dreamRecord", v)} placeholder="Journal, audio, art, no..." multiline />
    <TextInput label="Your earliest dream memory" hint="The first dream you can remember" value={d.firstDream} onChange={v => set("firstDream", v)} placeholder="Describe everything you remember..." multiline rows={4} />
    <TextInput label="Childhood nightmares or repeating images" value={d.childhoodNightmares} onChange={v => set("childhoodNightmares", v)} placeholder="What haunted your young sleep?" multiline rows={4} />
    <TextInput label="Current dream themes" value={d.currentThemes} onChange={v => set("currentThemes", v)} placeholder="Running, searching, water, specific people..." multiline />
    {dn("deep1", "deep3")}
  </PageShell>;

  if (phase === "deep3") return <PageShell section="deep3">
    <SectionHeader title="RECURRING ANIMALS" sub="Guides, guardians, and warnings" progress={deepProgress} />
    <CheckboxGrid label="Dream Animals" options={ANIMAL_OPTS} selected={d.dreamAnimals} onToggle={v => toggleArr("dreamAnimals", v)} columns={3} />
    <TextInput label="Other dream animals not listed" value={d.otherAnimals} onChange={v => set("otherAnimals", v)} placeholder="Giraffes, scorpions, whales..." multiline />
    <TextInput label="How do these animals make you feel?" value={d.animalEmotions} onChange={v => set("animalEmotions", v)} placeholder="The serpent makes me feel..." multiline rows={4} />
    {dn("deep2", "deep4")}
  </PageShell>;

  if (phase === "deep4") return <PageShell section="deep4">
    <SectionHeader title="OBJECTS & MOTIFS" sub="The language your dreams speak" progress={deepProgress} />
    <CheckboxGrid label="Recurring objects and symbols" options={OBJECT_OPTS} selected={d.dreamObjects} onToggle={v => toggleArr("dreamObjects", v)} columns={3} />
    <TextInput label="Other recurring objects" value={d.otherObjects} onChange={v => set("otherObjects", v)} placeholder="Clocks, photographs, letters..." multiline />
    <TextInput label="How do these objects appear?" hint="Broken, whole, hidden, glowing, unreachable?" value={d.objectStates} onChange={v => set("objectStates", v)} placeholder="The mirrors are always cracked..." multiline rows={4} />
    {dn("deep3", "deep5")}
  </PageShell>;

  if (phase === "deep5") return <PageShell section="deep5">
    <SectionHeader title="NATURAL FORCES" sub="Elements that move through your nights" progress={deepProgress} />
    <TextInput label="Recurring natural phenomena" hint="Storms, eclipses, fire, floods, wind, earthquakes..." value={d.naturalForces} onChange={v => set("naturalForces", v)} placeholder="Describe what nature does in your dreams" multiline rows={4} />
    <TextInput label="How do these forces behave toward you?" value={d.forcesBehavior} onChange={v => set("forcesBehavior", v)} placeholder="The water is always pulling me under..." multiline rows={4} />
    {dn("deep4", "deep6")}
  </PageShell>;

  if (phase === "deep6") return <PageShell section="deep6">
    <SectionHeader title="SHADOW FIGURES" sub="The beings who visit you" progress={deepProgress} />
    <TextInput label="Recurring human figures" value={d.humanFigures} onChange={v => set("humanFigures", v)} placeholder="Who keeps appearing?" multiline rows={3} />
    <TextInput label="Emotional impact of these figures" value={d.humanEmotions} onChange={v => set("humanEmotions", v)} placeholder="My grandmother brings peace..." multiline rows={3} />
    <TextInput label="Non-human or otherworldly beings" value={d.otherworldlyFigures} onChange={v => set("otherworldlyFigures", v)} placeholder="What beings visit from beyond?" multiline rows={3} />
    <TextInput label="What roles did these beings play?" value={d.figureRoles} onChange={v => set("figureRoles", v)} placeholder="The dark figure always blocks the door..." multiline rows={3} />
    <TextInput label="Unresolved encounters" value={d.unresolvedFigures} onChange={v => set("unresolvedFigures", v)} placeholder="Who did you never face?" multiline rows={3} />
    {dn("deep5", "deep7")}
  </PageShell>;

  if (phase === "deep7") return <PageShell section="deep7">
    <SectionHeader title="DREAM LANDSCAPES" sub="Where your sleeping self wanders" progress={deepProgress} />
    <CheckboxGrid label="Recurring dream environments" options={ENV_OPTS} selected={d.dreamEnvironments} onToggle={v => toggleArr("dreamEnvironments", v)} columns={3} />
    <TextInput label="Other recurring environments" value={d.otherEnvironments} onChange={v => set("otherEnvironments", v)} placeholder="Airports, childhood homes..." multiline />
    <TextInput label="Which feel like home? Which feel like exile?" value={d.environmentFeelings} onChange={v => set("environmentFeelings", v)} placeholder="The forest is always safe..." multiline rows={3} />
    <TextInput label="Times and seasons" value={d.dreamTimes} onChange={v => set("dreamTimes", v)} placeholder="It's always night. It's always raining." multiline />
    <TextInput label="Sacred sites" value={d.sacredSites} onChange={v => set("sacredSites", v)} placeholder="A temple I always recognize..." multiline rows={3} />
    <TextInput label="Real-world connections" value={d.realWorldConnections} onChange={v => set("realWorldConnections", v)} placeholder="The dream city looks like..." multiline />
    {dn("deep6", "deep8")}
  </PageShell>;

  if (phase === "deep8") return <PageShell section="deep8">
    <SectionHeader title="PORTALS & THRESHOLDS" sub="Crossings, gates, and passages" progress={deepProgress} />
    <CheckboxGrid label="Types of portals" options={PORTAL_OPTS} selected={d.dreamGates} onToggle={v => toggleArr("dreamGates", v)} columns={2} />
    <TextInput label="Were you able to cross?" value={d.portalExperience} onChange={v => set("portalExperience", v)} placeholder="Sometimes I cross, sometimes denied..." multiline rows={3} />
    <TextInput label="Falling dreams" value={d.fallingDreams} onChange={v => set("fallingDreams", v)} placeholder="Describe any falling experiences..." multiline />
    <TextInput label="Flying dreams" value={d.flyingDreams} onChange={v => set("flyingDreams", v)} placeholder="Can you fly? How does it feel?" multiline />
    <TextInput label="Underwater or drowning dreams" value={d.underwaterDreams} onChange={v => set("underwaterDreams", v)} placeholder="Water experiences..." multiline />
    <TextInput label="Dream lucidity" value={d.lucidity} onChange={v => set("lucidity", v)} placeholder="How often? Can you control anything?" multiline rows={3} />
    {dn("deep7", "deep9")}
  </PageShell>;

  if (phase === "deep9") return <PageShell section="deep9">
    <SectionHeader title="THE FORBIDDEN LIBRARY" sub="Books your soul has written" progress={deepProgress} />
    <TextInput label="The most worn-out book" hint="The dream theme you return to most" value={d.wornBook} onChange={v => set("wornBook", v)} placeholder="The book I've read a thousand times..." multiline rows={3} />
    <TextInput label="The book you keep misplacing" value={d.misplacedBook} onChange={v => set("misplacedBook", v)} placeholder="The dream I almost remember..." multiline rows={3} />
    <TextInput label="The book you're afraid to open" value={d.fearfulBook} onChange={v => set("fearfulBook", v)} placeholder="The dream I don't want to look at..." multiline rows={3} />
    <TextInput label="The book you long to find" value={d.desiredBook} onChange={v => set("desiredBook", v)} placeholder="If I could dream about anything..." multiline rows={3} />
    <CheckboxGrid label="What forbidden knowledge do you seek?" options={KNOWLEDGE_OPTS} selected={d.forbiddenKnowledge} onToggle={v => toggleArr("forbiddenKnowledge", v)} columns={2} />
    <TextInput label="Other knowledge sought" value={d.otherKnowledge} onChange={v => set("otherKnowledge", v)} placeholder="What else does your soul want to know?" multiline />
    {dn("deep8", "deep10")}
  </PageShell>;

  if (phase === "deep10") return <PageShell section="deep10">
    <SectionHeader title="DREAM & WAKING CROSSROADS" sub="Where the veil thins" progress={deepProgress} />
    <TextInput label="Synchronicities" hint="Have symbols from your dreams appeared in waking life?" value={d.synchronicities} onChange={v => set("synchronicities", v)} placeholder="Numbers, animals, objects that crossed the veil..." multiline rows={4} />
    <CheckboxGrid label="Traditions you feel drawn to" options={TRADITION_OPTS} selected={d.spiritualTraditions} onToggle={v => toggleArr("spiritualTraditions", v)} columns={2} />
    <TextInput label="How have these traditions shaped your dream life?" value={d.traditionInfluence} onChange={v => set("traditionInfluence", v)} placeholder="The symbols changed after I studied..." multiline rows={3} />
    <TextInput label="Sacred tools and anchors" value={d.sacredTools} onChange={v => set("sacredTools", v)} placeholder="Crystals, journals, meditation..." multiline rows={3} />
    {dn("deep9", "deep11")}
  </PageShell>;

  if (phase === "deep11") return <PageShell section="deep11">
    <SectionHeader title="FINAL REVELATIONS" sub="The dreams that define you" progress={deepProgress} />
    <TextInput label="The dream you cannot forget" hint="The most powerful dream of your life" value={d.powerfulDream} onChange={v => set("powerfulDream", v)} placeholder="The dream that changed something in you..." multiline rows={6} />
    <TextInput label="The dream that terrifies you" value={d.terrifyingDream} onChange={v => set("terrifyingDream", v)} placeholder="The dream you'd rather not revisit..." multiline rows={5} />
    <TextInput label="What you most hope to discover" value={d.hopeToDiscover} onChange={v => set("hopeToDiscover", v)} placeholder="About your dream-life, symbols, or hidden books..." multiline rows={3} />
    <TextInput label="Anything else unspoken" value={d.unspokenMysteries} onChange={v => set("unspokenMysteries", v)} placeholder="What wants to be said that has no category?" multiline rows={5} />
    {dn("deep10", "complete", "SEAL THE ATLAS")}
  </PageShell>;

  // ═══════════════════════════════════════════════════════
  // COMPLETION SCREEN — ATLAS SEALED
  // ═══════════════════════════════════════════════════════
  if (phase === "complete") {
    const buildSummary = () => {
      let s = `════════════════════════════════════════\nTHE DREAM ATLAS & FORBIDDEN LIBRARY\nFULL DEEP INTAKE — Celestial Map\n════════════════════════════════════════\n\n`;
      s += `══ PERSONAL FOUNDATION ══\nName: ${d.name}\nDate of Birth: ${d.dob}\nTime of Birth: ${d.tob || "(not provided)"}\nPlace of Birth: ${d.pob || "(not provided)"}\nEmail: ${d.email}\n\n`;
      s += `══ DREAM FOUNDATIONS ══\nRecall Frequency: ${d.dreamRecall || "(not answered)"}\nRecording Method: ${d.dreamRecord || "(not answered)"}\nEarliest Dream: ${d.firstDream || "(not answered)"}\nChildhood Nightmares: ${d.childhoodNightmares || "(not answered)"}\nCurrent Themes: ${d.currentThemes || "(not answered)"}\n\n`;
      s += `══ RECURRING ANIMALS ══\nAnimals: ${(d.dreamAnimals||[]).join(", ") || "None selected"}\nOther Animals: ${d.otherAnimals || "(none)"}\nEmotional Response: ${d.animalEmotions || "(not answered)"}\n\n`;
      s += `══ OBJECTS & MOTIFS ══\nObjects: ${(d.dreamObjects||[]).join(", ") || "None selected"}\nOther Objects: ${d.otherObjects || "(none)"}\nStates/Conditions: ${d.objectStates || "(not answered)"}\n\n`;
      s += `══ NATURAL FORCES ══\nPhenomena: ${d.naturalForces || "(not answered)"}\nBehavior Toward Dreamer: ${d.forcesBehavior || "(not answered)"}\n\n`;
      s += `══ SHADOW FIGURES ══\nHuman Figures: ${d.humanFigures || "(not answered)"}\nEmotional Impact: ${d.humanEmotions || "(not answered)"}\nOtherworldly Beings: ${d.otherworldlyFigures || "(not answered)"}\nRoles: ${d.figureRoles || "(not answered)"}\nUnresolved Encounters: ${d.unresolvedFigures || "(not answered)"}\n\n`;
      s += `══ DREAM LANDSCAPES ══\nEnvironments: ${(d.dreamEnvironments||[]).join(", ") || "None selected"}\nOther Environments: ${d.otherEnvironments || "(none)"}\nEnvironment Feelings: ${d.environmentFeelings || "(not answered)"}\nTimes/Seasons: ${d.dreamTimes || "(not answered)"}\nSacred Sites: ${d.sacredSites || "(not answered)"}\nReal-World Connections: ${d.realWorldConnections || "(not answered)"}\n\n`;
      s += `══ PORTALS & THRESHOLDS ══\nGate Types: ${(d.dreamGates||[]).join(", ") || "None selected"}\nCrossing Experience: ${d.portalExperience || "(not answered)"}\nFalling Dreams: ${d.fallingDreams || "(not answered)"}\nFlying Dreams: ${d.flyingDreams || "(not answered)"}\nUnderwater Dreams: ${d.underwaterDreams || "(not answered)"}\nLucidity: ${d.lucidity || "(not answered)"}\n\n`;
      s += `══ THE FORBIDDEN LIBRARY ══\nMost Worn Book: ${d.wornBook || "(not answered)"}\nMisplaced Book: ${d.misplacedBook || "(not answered)"}\nFearful Book: ${d.fearfulBook || "(not answered)"}\nDesired Book: ${d.desiredBook || "(not answered)"}\nForbidden Knowledge: ${(d.forbiddenKnowledge||[]).join(", ") || "None selected"}\nOther Knowledge: ${d.otherKnowledge || "(none)"}\n\n`;
      s += `══ DREAM & WAKING CROSSROADS ══\nSynchronicities: ${d.synchronicities || "(not answered)"}\nSpiritual Traditions: ${(d.spiritualTraditions||[]).join(", ") || "None selected"}\nTradition Influence: ${d.traditionInfluence || "(not answered)"}\nSacred Tools: ${d.sacredTools || "(not answered)"}\n\n`;
      s += `══ FINAL REVELATIONS ══\nThe Dream You Cannot Forget: ${d.powerfulDream || "(not answered)"}\nThe Dream That Terrifies You: ${d.terrifyingDream || "(not answered)"}\nWhat You Hope to Discover: ${d.hopeToDiscover || "(not answered)"}\nAnything Else Unspoken: ${d.unspokenMysteries || "(not answered)"}\n\n`;
      s += `════════════════════════════════════════\n© Jennifer Leigh West · The Forgotten Code Research Institute\nMirror Protocol™ · Dream Atlas™\n`;
      return s;
    };
    const summary = buildSummary();

    return <PageShell section="complete">
      <div style={{ textAlign: "center" }}>
        <CrescentMoon size={80} />
        <h2 style={{ fontFamily: "'Cinzel',serif", fontSize: "clamp(1.8rem,5vw,2.8rem)", color: G.gold, marginTop: 20, letterSpacing: "0.12em", animation: "moonGlow 4s ease-in-out infinite" }}>ATLAS SEALED</h2>
        <p style={{ fontFamily: "'Crimson Text',serif", fontSize: "clamp(1rem,2.5vw,1.15rem)", color: `${L.mist}88`,  marginTop: 12, lineHeight: 1.9, maxWidth: 460, margin: "12px auto 0" }}>
          Your celestial map has been drawn. Your Dream Atlas will be delivered within 5-7 days.</p>
        <SectionDivider />
        <div style={{ display: "flex", flexDirection: "column", gap: 14, alignItems: "center", marginBottom: 40 }}>
          <a href={`mailto:theforgottencode780@gmail.com?subject=${encodeURIComponent(`Dream Atlas Full Intake — ${d.name}`)}&body=${encodeURIComponent(summary)}`}
            style={{ display: "block", width: "min(100%,400px)", padding: "18px 30px", border: `2px solid ${G.gold}44`, textDecoration: "none", textAlign: "center", fontFamily: "'Cinzel',serif", fontSize: 15, letterSpacing: "0.15em", color: G.pale, background: `${C.teal}22`, borderRadius: 2, animation: "goldBorderPulse 3s ease-in-out infinite" }}>
            ✉ SEND DREAM MAP VIA EMAIL</a>
          <div onClick={() => { navigator.clipboard.writeText(summary).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2500) }) }}
            style={{ width: "min(100%,400px)", padding: "14px 30px", cursor: "pointer", textAlign: "center", border: `1px solid ${G.gold}22`, borderRadius: 2, fontFamily: "'Inter',sans-serif", fontSize: 13, letterSpacing: "0.12em", color: copied ? G.gold : `${L.mist}44`, transition: "all 0.3s" }}>
            {copied ? "✓ COPIED TO CLIPBOARD" : "⊏ COPY ALL RESPONSES"}</div>
        </div>
        <div style={{ background: `${V.indigo}cc`, border: `1px solid ${G.gold}22`, padding: "25px 20px", textAlign: "left", borderRadius: 2 }}>
          <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, letterSpacing: "0.3em", color: `${L.mist}33`, marginBottom: 15, fontWeight: 600 }}>INTAKE PREVIEW</div>
          <div style={{ maxHeight: 350, overflow: "auto", paddingRight: 8 }}>
            <pre style={{ fontFamily: "'Crimson Text',serif", fontSize: 13, color: `${L.mist}44`, lineHeight: 1.8, whiteSpace: "pre-wrap", wordBreak: "break-word" }}>{summary}</pre></div>
        </div>
        <p style={{ fontFamily: "'Crimson Text',serif", fontSize: 13, color: `${L.mist}44`, marginTop: 35, lineHeight: 1.9,  }}>
          Your Dream Atlas will be delivered within 5-7 days.<br />
          <span style={{ color: `${G.gold}55` }}>theforgottencode780@gmail.com</span> · (423) 388-8304</p>
        <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 9, color: `${G.gold}22`, marginTop: 40, letterSpacing: "0.15em" }}>
          © Jennifer Leigh West · The Forgotten Code Research Institute · Mirror Protocol™ · Dream Atlas™</p>
      </div></PageShell>;
  }

  return null;
}
