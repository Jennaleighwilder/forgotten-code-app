"use client";
import { useState, useEffect, useRef, useCallback } from "react";

// ═══════════════════════════════════════════════════════════════
// LOVERS, LIARS & ALL THINGS PATTERNED
// Full flow: Intro → Mini Teaser → Gate → Access Code → Deep Intake
// Jennifer Leigh West | The Forgotten Code Research Institute
// Mirror Protocol™ + DYAD Engine™
// ═══════════════════════════════════════════════════════════════

const P = { hot:"#ff2d7b", neon:"#ff69b4", mag:"#ff1493", blush:"#ffb6c1", pale:"#ffd6e7", white:"#fff0f5", electric:"#ff0080", blue:"#00d4ff", violet:"#bf5fff" };
const D = { black:"#0a0a0f", charcoal:"#141418", slate:"#1a1a22" };

// ═══ DUST EMBERS — Small, sharp particles (embers / dust in light), moody, minimal ═══
function DustEmbers() {
  const particles = Array.from({ length: 14 }, (_, i) => ({
    left: Math.random() * 100, delay: Math.random() * 12, dur: 14 + Math.random() * 10,
    size: 0.8 + Math.random() * 1.2, opa: 0.06 + Math.random() * 0.1,
    color: [P.hot, P.neon, P.mag, "#d4a030", P.blush][i % 5],
  }));
  return <div style={{ position: "fixed", inset: 0, zIndex: 1, pointerEvents: "none", overflow: "hidden" }}>
    {particles.map((p, i) => <div key={i} style={{
      position: "absolute", left: `${p.left}%`, bottom: "-2%", width: p.size, height: p.size, borderRadius: "50%",
      background: p.color, boxShadow: `0 0 ${p.size * 4}px ${p.color}40`,
      opacity: p.opa, animation: `dustFloat ${p.dur}s linear ${p.delay}s infinite`,
    }} />)}
  </div>;
}

// ═══ MCQ DATA — 24 Pattern Questions ═══
const MCQ = [
  { cat:"ATTACHMENT STYLE", q:"When you're upset, how does your partner typically respond?", sub:"Core attachment strategy under stress", opts:[
    { text:"Immediately wants to fix it and solve the problem", detail:"Task-focused — may avoid emotional processing", code:"fixer" },
    { text:"Gets uncomfortable and needs space to think", detail:"Emotional overwhelm triggers withdrawal", code:"avoidant" },
    { text:"Stays present and asks what you need", detail:"Emotional regulation and attunement", code:"secure" },
    { text:"Sometimes supportive, sometimes defensive — unpredictable", detail:"Inconsistent emotional responses", code:"disorganized" }
  ]},
  { cat:"COMMUNICATION PATTERNS", q:"During arguments, what's your partner's signature move?", sub:"Conflict patterns reveal unconscious defense mechanisms", opts:[
    { text:"Brings up past issues or throws in kitchen sink arguments", detail:"Emotional flooding and poor boundaries", code:"anxious" },
    { text:"Gets quiet, shuts down, or walks away", detail:"Emotional overwhelm triggers escape", code:"avoidant" },
    { text:"Stays focused on the current issue and works toward resolution", detail:"Emotional regulation during conflict", code:"secure" },
    { text:"Flips between attacking and withdrawing unpredictably", detail:"Fear and intimacy triggers create chaos", code:"disorganized" }
  ]},
  { cat:"INTIMACY PATTERNS", q:"How does your partner handle emotional vulnerability?", sub:"Intimacy tolerance reveals core wound patterns", opts:[
    { text:"Shares openly and creates space for your emotions too", detail:"Comfortable with emotional intimacy", code:"secure" },
    { text:"Overshares everything, including stuff that makes you uncomfortable", detail:"Poor emotional boundaries and enmeshment", code:"anxious" },
    { text:"Keeps things surface level, doesn't go too deep", detail:"Intimacy triggers abandonment fears", code:"avoidant" },
    { text:"Hot and cold — sometimes very open, sometimes completely closed off", detail:"Intimacy triggers conflicting survival responses", code:"disorganized" }
  ]},
  { cat:"CONTROL DYNAMICS", q:"When making decisions together, your partner tends to:", sub:"Decision-making reveals power and control patterns", opts:[
    { text:"Want to discuss options and decide together", detail:"Collaborative — healthy power sharing", code:"secure" },
    { text:"Defer to you but then resent the decision later", detail:"Passive-aggressive — avoids conflict but builds resentment", code:"passive" },
    { text:"Take charge and expect you to go along with their choice", detail:"Controlling — dominance as emotional safety strategy", code:"controlling" },
    { text:"Get overwhelmed by choices and want you to decide everything", detail:"Decision paralysis from fear", code:"anxious" }
  ]},
  { cat:"STRESS RESPONSE", q:"Under high stress, your partner becomes:", sub:"Stress reveals authentic personality underneath social masks", opts:[
    { text:"More focused and solution-oriented", detail:"Stress activates healthy coping mechanisms", code:"secure" },
    { text:"Clingy and needs constant reassurance", detail:"Stress triggers abandonment fears", code:"anxious" },
    { text:"Withdrawn and handles everything alone", detail:"Stress triggers self-reliance patterns", code:"avoidant" },
    { text:"Unpredictable — could go any direction", detail:"Stress triggers chaotic survival responses", code:"disorganized" }
  ]},
  { cat:"PAST RELATIONSHIPS", q:"How does your partner talk about their exes?", sub:"Past relationship narratives reveal unconscious patterns", opts:[
    { text:"Takes responsibility for their part and has learned from it", detail:"Healthy processing and growth mindset", code:"secure" },
    { text:"They were all 'crazy' or 'toxic' — never their fault", detail:"Victim mentality and lack of accountability", code:"flag" },
    { text:"Doesn't really talk about them much", detail:"Compartmentalizes to avoid emotional processing", code:"avoidant" },
    { text:"Still has drama or unresolved issues with multiple exes", detail:"Poor boundaries and emotional regulation", code:"disorganized" }
  ]},
  { cat:"EMOTIONAL REGULATION", q:"When your partner gets triggered, they:", sub:"Childhood trauma patterns encoded in their nervous system", opts:[
    { text:"Take space to calm down then come back to discuss", detail:"Self-awareness and healthy regulation", code:"secure" },
    { text:"Explode emotionally and say things they later regret", detail:"Likely childhood emotional neglect", code:"explosive" },
    { text:"Shut down completely and won't talk about it", detail:"Learned in childhood for survival", code:"avoidant" },
    { text:"React differently each time — you never know what you'll get", detail:"Chaotic trauma response", code:"disorganized" }
  ]},
  { cat:"BOUNDARY PATTERNS", q:"How does your partner handle boundaries?", sub:"Boundary patterns reveal early childhood attachment wounds", opts:[
    { text:"Respects your boundaries and has healthy ones themselves", detail:"Learned healthy boundaries in early attachment", code:"secure" },
    { text:"Gets upset when you have boundaries, takes them personally", detail:"Boundaries trigger abandonment fears", code:"anxious" },
    { text:"Has walls up everywhere — rigid boundaries", detail:"Uses boundaries as emotional protection", code:"avoidant" },
    { text:"Inconsistent — sometimes respects them, sometimes tramples them", detail:"Chaotic boundary patterns from trauma", code:"disorganized" }
  ]},
  { cat:"FAMILY DYNAMICS", q:"How does your partner relate to their family?", sub:"Family patterns reveal core attachment programming", opts:[
    { text:"Healthy relationships with appropriate boundaries", detail:"Secure family attachments — good foundation", code:"secure" },
    { text:"Enmeshed and overly involved in family drama", detail:"Poor boundaries and codependency", code:"anxious" },
    { text:"Distant or cut off from family completely", detail:"May have valid reasons but shows pattern", code:"avoidant" },
    { text:"Chaotic relationships — love/hate dynamics", detail:"Trauma bonding and unhealthy patterns", code:"disorganized" }
  ]},
  { cat:"TRUST PATTERNS", q:"Your partner's relationship with trust is:", sub:"Trust patterns reveal early betrayal and safety wounds", opts:[
    { text:"Generally trusting but not naive", detail:"Healthy discernment without paranoia", code:"secure" },
    { text:"Needs constant proof and reassurance that you care", detail:"Abandonment fears create trust insecurity", code:"anxious" },
    { text:"Takes forever to trust and keeps things surface level", detail:"Protects against intimacy and vulnerability", code:"avoidant" },
    { text:"Trust fluctuates wildly — trusts completely then suspects everything", detail:"Core wound around safety and betrayal", code:"disorganized" }
  ]},
  { cat:"JEALOUSY PATTERNS", q:"When it comes to jealousy, your partner:", sub:"Jealousy reveals core insecurity and possession patterns", opts:[
    { text:"Rarely gets jealous and trusts your judgment", detail:"Confident in self and relationship", code:"secure" },
    { text:"Gets jealous easily and needs lots of reassurance", detail:"Fear of replacement triggers jealousy", code:"anxious" },
    { text:"Says they don't care but gets weird about your friendships", detail:"Suppressed jealousy shows as passive control", code:"avoidant" },
    { text:"Extremely jealous or tries to control who you see", detail:"Possession and control from deep insecurity", code:"disorganized" }
  ]},
  { cat:"RESPONSIBILITY PATTERNS", q:"When something goes wrong, your partner typically:", sub:"Accountability reveals self-worth and shame programming", opts:[
    { text:"Takes appropriate responsibility without over-apologizing", detail:"Healthy accountability and self-worth", code:"secure" },
    { text:"Takes ALL the blame, even for things that aren't their fault", detail:"Toxic shame creates over-responsibility", code:"anxious" },
    { text:"Deflects blame or finds ways to make it not their fault", detail:"Shame triggers defensive blame-shifting", code:"avoidant" },
    { text:"Blames others aggressively or plays victim", detail:"Shame triggers narcissistic defense patterns", code:"disorganized" }
  ]},
  { cat:"MONEY PATTERNS", q:"Your partner's relationship with money shows:", sub:"Money patterns reveal deep control and security wounds", opts:[
    { text:"Healthy balance — neither hoarding nor reckless spending", detail:"Balanced relationship with security and abundance", code:"secure" },
    { text:"Anxiety about money, even when finances are stable", detail:"Scarcity mindset from early insecurity", code:"anxious" },
    { text:"Very private about money or controlling with spending", detail:"Uses money as control and independence", code:"avoidant" },
    { text:"Extreme patterns — hoarding or reckless spending", detail:"Chaotic relationship with security", code:"disorganized" }
  ]},
  { cat:"GROWTH MINDSET", q:"When it comes to personal growth, your partner:", sub:"Growth patterns reveal openness to change and self-awareness", opts:[
    { text:"Actively works on themselves and supports your growth too", detail:"Growth mindset and mutual support", code:"secure" },
    { text:"Wants to grow but gets overwhelmed and gives up easily", detail:"Perfectionism and fear of failure block growth", code:"anxious" },
    { text:"Thinks they're fine the way they are, doesn't see need to change", detail:"Growth threatens identity and triggers shame", code:"avoidant" },
    { text:"Says they want to change but sabotages their own efforts", detail:"Self-sabotage from deep unworthiness beliefs", code:"disorganized" }
  ]},
  { cat:"SOCIAL PATTERNS", q:"In social situations, your partner tends to:", sub:"Social patterns reveal core wound around belonging and acceptance", opts:[
    { text:"Be naturally social and include you in their interactions", detail:"Comfortable with social connection and inclusion", code:"secure" },
    { text:"Be overly focused on what others think", detail:"People-pleasing from fear of rejection", code:"anxious" },
    { text:"Be socially awkward or prefer to avoid groups", detail:"Social anxiety from early rejection wounds", code:"avoidant" },
    { text:"Be charming but you notice fake or manipulative behavior", detail:"Uses social mask to hide authentic self", code:"disorganized" }
  ]},
  { cat:"AFFECTION PATTERNS", q:"Your partner expresses affection by:", sub:"Affection patterns reveal love language and intimacy comfort", opts:[
    { text:"Naturally and consistently in ways that feel good to you", detail:"Attuned to partner's needs and natural expression", code:"secure" },
    { text:"Overwhelming you with constant affection and attention", detail:"Love bombing from fear of abandonment", code:"anxious" },
    { text:"Being practical and helpful rather than romantic or emotional", detail:"Safer to show care through actions than vulnerability", code:"avoidant" },
    { text:"Hot and cold — very affectionate sometimes, distant others", detail:"Intimacy triggers conflicting responses", code:"disorganized" }
  ]},
  { cat:"FUTURE PLANNING", q:"When you talk about the future together, your partner:", sub:"Future orientation reveals commitment and fear of abandonment", opts:[
    { text:"Engages enthusiastically and makes concrete plans", detail:"Comfortable with commitment and future planning", code:"secure" },
    { text:"Gets anxious and needs constant reassurance about the relationship", detail:"Future triggers abandonment fears", code:"anxious" },
    { text:"Gets uncomfortable and keeps things vague", detail:"Commitment triggers engulfment fears", code:"avoidant" },
    { text:"Makes grand promises but doesn't follow through", detail:"Future self feels disconnected from present self", code:"disorganized" }
  ]},
  { cat:"CONFLICT RESOLUTION", q:"After an argument, your partner typically:", sub:"Post-conflict behavior reveals repair skills and emotional maturity", opts:[
    { text:"Addresses the issue and works toward genuine resolution", detail:"Healthy repair and conflict resolution skills", code:"secure" },
    { text:"Over-apologizes and tries to make up for everything", detail:"Fear-based repair attempts and people-pleasing", code:"anxious" },
    { text:"Acts like nothing happened and avoids bringing it up", detail:"Conflict avoidance and emotional suppression", code:"avoidant" },
    { text:"Brings it up repeatedly or uses it against you later", detail:"Poor conflict resolution and grudge-holding", code:"disorganized" }
  ]},
  { cat:"INDEPENDENCE BALANCE", q:"Your partner's approach to independence in the relationship is:", sub:"Independence patterns reveal core wounds around autonomy vs connection", opts:[
    { text:"Healthy balance of togetherness and individual space", detail:"Comfortable with interdependence", code:"secure" },
    { text:"Wants to do everything together and gets hurt when you need space", detail:"Enmeshment from abandonment fears", code:"anxious" },
    { text:"Very independent and doesn't like feeling 'tied down'", detail:"Hyper-independence from engulfment fears", code:"avoidant" },
    { text:"Swings between clingy and completely distant", detail:"Conflicting needs for connection and autonomy", code:"disorganized" }
  ]},
  { cat:"EMOTIONAL INTELLIGENCE", q:"Your partner's emotional intelligence shows up as:", sub:"EQ reveals childhood emotional attunement and development", opts:[
    { text:"Good awareness of both their emotions and yours", detail:"Healthy emotional development and attunement", code:"secure" },
    { text:"Very aware of emotions but gets overwhelmed by them", detail:"Emotional sensitivity without regulation skills", code:"anxious" },
    { text:"Struggles to identify or express emotions", detail:"Emotional suppression learned for survival", code:"avoidant" },
    { text:"Uses emotions to manipulate or control situations", detail:"Emotions as weapons from trauma patterns", code:"disorganized" }
  ]},
  { cat:"STRESS & SUPPORT", q:"When you're going through a hard time, your partner:", sub:"Support patterns reveal capacity for emotional availability", opts:[
    { text:"Offers appropriate support and follows your lead", detail:"Emotionally available and attuned support", code:"secure" },
    { text:"Gets more upset than you and makes it about their feelings", detail:"Emotional enmeshment and poor boundaries", code:"anxious" },
    { text:"Gets uncomfortable and tries to fix it or distract you", detail:"Emotional discomfort leads to fixing/avoiding", code:"avoidant" },
    { text:"Sometimes supportive, sometimes adds to your stress", detail:"Inconsistent support from own trauma triggers", code:"disorganized" }
  ]},
  { cat:"LIFE VISION", q:"Your partner's approach to life goals and vision is:", sub:"Life vision reveals self-worth and capacity for healthy future", opts:[
    { text:"Clear direction with realistic steps to get there", detail:"Healthy self-worth and future orientation", code:"secure" },
    { text:"Big dreams but gets overwhelmed by how to achieve them", detail:"Fear and perfectionism block execution", code:"anxious" },
    { text:"Practical and focused but not very visionary", detail:"Focuses on security over dreams to avoid disappointment", code:"avoidant" },
    { text:"Chaotic or unrealistic goals with no clear plan", detail:"Disconnection from authentic self and goals", code:"disorganized" }
  ]},
  { cat:"AUTHENTICITY", q:"The most authentic version of your partner shows up when:", sub:"Authenticity patterns reveal core self vs defensive adaptations", opts:[
    { text:"They're relaxed and feel safe — they're consistent", detail:"Integrated authentic self across contexts", code:"secure" },
    { text:"They're feeling loved and validated", detail:"Authenticity depends on external validation", code:"anxious" },
    { text:"They're alone or with very few people they trust", detail:"Authenticity requires extreme safety", code:"avoidant" },
    { text:"Rarely — they seem to wear different masks for different people", detail:"Fragmented sense of self from trauma", code:"disorganized" }
  ]},
  { cat:"CORE PATTERN", q:"If you had to describe your partner's core relationship pattern:", sub:"The meta-pattern driving everything", opts:[
    { text:"Generally stable and secure with normal human struggles", detail:"Secure attachment — healthy relationship foundation", code:"secure" },
    { text:"Loving but needy — fears abandonment and needs lots of reassurance", detail:"Fear-based love and emotional dependency", code:"anxious" },
    { text:"Caring but distant — struggles with intimacy and vulnerability", detail:"Love with emotional walls", code:"avoidant" },
    { text:"Chaotic and unpredictable — you never know what you're going to get", detail:"Trauma-driven relationship chaos", code:"disorganized" }
  ]}
];

const DYAD_QUESTIONS = [
  { q:"What role do you always end up playing in this relationship?", hint:"Are you the fixer, the peacekeeper, the parent, the one who chases?" },
  { q:"What does this relationship ask you to give up about yourself?", hint:"What parts of you get smaller when you're with them?" },
  { q:"What do you keep hoping will change that never changes?", hint:"The loop you're caught in — name it." },
  { q:"What pattern from your family of origin shows up here?", hint:"Your parents' relationship lives inside yours. Where?" },
  { q:"If you're honest — what are you afraid to see clearly about this relationship?", hint:"The truth that lives underneath everything." }
];

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Playfair+Display:wght@400;500;600;700&family=Manrope:wght@300;400;500;600;700;800&display=swap');
*{box-sizing:border-box;margin:0;padding:0}
html,body{overflow-x:hidden;font-style:normal}
p, input, textarea, label { font-style: normal }
textarea:focus,input:focus{outline:none}
::selection{background:#ff2d7b33;color:#fff0f5}
@keyframes neonFlicker{0%,60%,64%,68%,72%,76%,80%,84%,88%,92%,100%{opacity:1;filter:brightness(1)}61%,63%{opacity:0.4;filter:brightness(0.5)}65%,67%{opacity:0.85;filter:brightness(0.9)}69%,71%{opacity:0.3;filter:brightness(0.4)}73%,75%{opacity:0.7;filter:brightness(0.75)}77%,79%{opacity:0.25;filter:brightness(0.35)}81%,83%{opacity:0.9;filter:brightness(0.95)}85%,87%{opacity:0.35;filter:brightness(0.45)}89%,91%{opacity:0.5;filter:brightness(0.6)}93%,97%{opacity:0.2;filter:brightness(0.3)}}
@keyframes neonBorderPulse{0%,100%{border-color:rgba(255,45,123,0.35);box-shadow:0 0 8px rgba(255,45,123,0.15)}50%{border-color:rgba(255,45,123,0.6);box-shadow:0 0 18px rgba(255,45,123,0.25)}}
@keyframes fadeIn{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
@keyframes btnSweep{0%{transform:translateX(-100%) skewX(-12deg)}100%{transform:translateX(200%) skewX(-12deg)}}
@keyframes dustFloat{0%{transform:translateY(0) translateX(0);opacity:0}8%{opacity:0.15}92%{opacity:0.08}100%{transform:translateY(-100vh) translateX(15px);opacity:0}}
`;

// ═══ REAL NEON HEART — White-hot core, pink bleed, tube highlight, subtle flicker ═══
function NeonHeart({ size = 80, delay = 0 }) {
  return <div style={{ width: size, height: size, animation: `neonFlicker 4s ease-in-out ${delay}s infinite`, lineHeight: 0, margin: "0 auto" }}>
    <svg viewBox="0 0 60 60" width="100%" height="100%">
      <defs>
        <filter id="ngGlow"><feGaussianBlur stdDeviation="3" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        <filter id="ngOuter"><feGaussianBlur stdDeviation="6" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      </defs>
      <path d="M30 50 L10 28 A11 11 0 0 1 30 18 A11 11 0 0 1 50 28Z" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="4" filter="url(#ngOuter)"/>
      <path d="M30 50 L10 28 A11 11 0 0 1 30 18 A11 11 0 0 1 50 28Z" fill="none" stroke={P.hot} strokeWidth="2.5" filter="url(#ngGlow)" opacity="0.9"/>
      <path d="M30 44 L16 30 A8 8 0 0 1 30 22 A8 8 0 0 1 44 30Z" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="0.8" opacity="0.95"/>
      <path d="M30 50 L10 28 A11 11 0 0 1 30 18 A11 11 0 0 1 50 28Z" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="0.6" strokeLinecap="round" opacity="0.8"/>
    </svg>
  </div>;
}

function FilmGrain() {
  const svg = "data:image/svg+xml," + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg"><filter id="gf"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/></filter><rect width="100%" height="100%" filter="url(%23gf)"/></svg>');
  return <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 2, backgroundImage: `url("${svg}")`, backgroundRepeat: "repeat", opacity: 0.04 }} />;
}

function Shell({ children, step }) {
  const [show, setShow] = useState(false);
  useEffect(() => { setShow(false); setTimeout(() => setShow(true), 100) }, [step]);
  return <div style={{ minHeight: "100vh", padding: "50px 24px 100px", background: D.black, position: "relative" }}>
    <style>{CSS}</style>
    <FilmGrain />
    <DustEmbers />
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", background: `radial-gradient(ellipse at 30% 60%,${P.hot}06,transparent 55%),radial-gradient(ellipse at 70% 20%,${P.violet}05,transparent 50%)`, zIndex: 3 }} />
    <div style={{ position: "relative", zIndex: 10, maxWidth: 640, margin: "0 auto", opacity: show ? 1 : 0, transform: show ? "translateY(0)" : "translateY(25px)", transition: "all 0.7s ease" }}>{children}</div>
  </div>;
}

function Divider() {
  return <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, margin: "32px 0" }}>
    <div style={{ width: 50, height: 1, background: `linear-gradient(90deg,transparent,${P.hot}33)` }} />
    <div style={{ width: 6, height: 6, background: P.hot, opacity: 0.2, transform: "rotate(45deg)" }} />
    <div style={{ width: 50, height: 1, background: `linear-gradient(90deg,${P.hot}33,transparent)` }} />
  </div>;
}

function Header({ title, sub, progress }) {
  return <div style={{ textAlign: "center", marginBottom: 40 }}>
    {progress !== undefined && <div style={{ width: "100%", height: 2, background: `${D.slate}88`, marginBottom: 25, position: "relative", overflow: "hidden" }}>
      <div style={{ width: `${progress}%`, height: "100%", background: `linear-gradient(90deg,${P.mag}55,${P.hot}88,${P.neon}66)`, boxShadow: `0 0 12px ${P.hot}22`, transition: "width 0.6s ease" }} />
      <div style={{ position: "absolute", top: -3, left: `${progress}%`, width: 8, height: 8, borderRadius: "50%", background: P.hot, boxShadow: `0 0 10px ${P.hot}55`, transition: "left 0.6s ease", transform: "translateX(-50%)" }} />
    </div>}
    <NeonHeart size={55} />
    <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "clamp(1.8rem,6vw,2.8rem)", color: P.hot, letterSpacing: "0.15em", marginTop: 8, textShadow: `0 0 15px ${P.hot}44` }}>{title}</div>
    <div style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(0.95rem,2.5vw,1.15rem)", color: "#C4B59A",  marginTop: 8 }}>{sub}</div>
    <Divider />
  </div>;
}

const inputBase = { width: "100%", padding: "14px 18px", background: `${D.slate}cc`, border: `1px solid ${P.hot}22`, color: P.pale, fontFamily: "'Playfair Display',serif", fontSize: 16, fontStyle: "normal", transition: "all 0.3s", lineHeight: 1.7, borderRadius: 2 };
const labelStyle = { fontFamily: "'Manrope',sans-serif", fontSize: 13, color: `${P.blush}77`, letterSpacing: "0.06em", fontWeight: 600, display: "block", marginBottom: 6, marginTop: 22 };
const hintStyle = { fontFamily: "'Playfair Display',serif", fontSize: 13, color: `${P.neon}44`, fontStyle: "normal", marginTop: 4, marginBottom: 2 };

function TI({ label, hint, value, onChange, placeholder, multi, rows }) {
  const Tag = multi ? "textarea" : "input";
  return <div><label style={labelStyle}>{label}</label>{hint && <p style={hintStyle}>{hint}</p>}
    <Tag value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} rows={rows || 3}
      style={{ ...inputBase, ...(multi ? { resize: "vertical", minHeight: 80 } : {}) }}
      onFocus={e => { e.target.style.borderColor = `${P.hot}55`; e.target.style.boxShadow = `0 0 18px ${P.hot}15` }}
      onBlur={e => { e.target.style.borderColor = `${P.hot}22`; e.target.style.boxShadow = "none" }} /></div>;
}

function Btn({ label, onClick, disabled, primary, full }) {
  const [hover, setHover] = useState(false);
  return <div onClick={() => !disabled && onClick()} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
    style={{ position: "relative", overflow: "hidden", display: full ? "block" : "inline-block", padding: primary ? "18px 50px" : "14px 35px",
      border: `1px solid ${disabled ? P.blush + "08" : primary ? P.hot + "55" : P.blush + "22"}`,
      cursor: disabled ? "default" : "pointer", textAlign: "center",
      fontFamily: "'Bebas Neue',sans-serif", fontSize: primary ? 18 : 14, letterSpacing: "0.15em",
      color: disabled ? `${P.blush}15` : primary ? P.pale : `${P.blush}77`, transition: "border-color 0.3s, box-shadow 0.3s", borderRadius: 2,
      background: primary && !disabled ? `${P.hot}22` : "transparent",
      animation: primary && !disabled ? "neonBorderPulse 3s ease-in-out infinite" : "none", opacity: disabled ? 0.3 : 1 }}>
    {hover && !disabled && <div style={{ position: "absolute", inset: 0, background: "linear-gradient(105deg, transparent 0%, transparent 40%, rgba(255,248,240,0.08) 50%, transparent 60%, transparent 100%)", animation: "btnSweep 0.5s ease-out forwards", pointerEvents: "none" }} />}
    <span style={{ position: "relative", zIndex: 1 }}>{label}</span>
  </div>;
}

const ACCESS_CODE = "LOVERS2026";

// ═══ MAIN COMPONENT ═══
export default function LoversIntake() {
  const [phase, setPhase] = useState("intro");
  const [d, setD] = useState({
    name: "", email: "", partner: "", relStatus: "", miniWhisper: "",
    accessCode: "", codeError: false,
    mcqAnswers: [], qi: 0,
    dyadAnswers: ["", "", "", "", ""],
  });
  const [copied, setCopied] = useState(false);

  const set = (k, v) => setD(p => ({ ...p, [k]: v }));
  const go = ph => { setPhase(ph); window.scrollTo({ top: 0, behavior: "smooth" }) };
  const nav = (back, next, label = "CONTINUE", dis = false) => <div style={{ display: "flex", justifyContent: back ? "space-between" : "flex-end", marginTop: 40 }}>
    {back && <Btn label="← BACK" onClick={() => go(back)} />}<Btn label={label} onClick={() => go(next)} primary disabled={dis} /></div>;

  // ── INTRO ──
  if (phase === "intro") return <Shell step="intro">
    <div style={{ minHeight: "90vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
      <div style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <NeonHeart size={100} delay={0} />
        <div style={{ position: "absolute", top: 70, left: "50%", transform: "translateX(calc(-50% - 38px))" }}><NeonHeart size={52} delay={1.2} /></div>
        <div style={{ position: "absolute", top: 78, left: "50%", transform: "translateX(calc(-50% + 38px))" }}><NeonHeart size={44} delay={2.4} /></div>
      </div>
      <h1 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "clamp(3.5rem,14vw,6.5rem)", letterSpacing: "0.12em", lineHeight: 0.95, marginTop: 20,
        color: P.hot, textShadow: "0 0 4px rgba(255,255,255,0.9), 0 0 12px #ff2d7b, 0 0 28px #ff2d7b88, 0 0 48px #ff2d7b44, 0 0 80px #ff2d7b22", animation: "neonFlicker 4s ease-in-out 0.6s infinite" }}>LOVERS<br/><span style={{ fontSize: "0.5em", letterSpacing: "0.3em", color: P.neon, opacity: 0.7 }}>LIARS &</span><br/>ALL THINGS<br/>PATTERNED</h1>
      <p style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(1.1rem,3vw,1.5rem)", color: "#C4B59A", fontStyle: "normal", marginTop: 18 }}>Mirror Protocol™ · DYAD Engine™</p>
      <div style={{ fontFamily: "'Manrope',sans-serif", fontSize: 11, letterSpacing: "0.4em", color: "rgba(255,248,240,0.7)", marginTop: 20 }}>MINI PREVIEW + FULL DEEP INTAKE</div>
      <Divider />
      <p style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(1.05rem,2.5vw,1.18rem)", color: "rgba(255,248,240,0.85)", lineHeight: 2, maxWidth: 480, fontStyle: "normal" }}>
        Every relationship has a pattern. A code running underneath the surface that neither of you can see but both of you feel. Give us one whisper about love — and we'll show you the thread.</p>
      <div style={{ marginTop: 40 }}><Btn label="BEGIN THE PATTERN MAP" onClick={() => go("mini1")} primary /></div>
      <div style={{ marginTop: 60, display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: 30, height: 1, background: `${P.hot}0c` }} />
        <p style={{ fontFamily: "'Manrope',sans-serif", fontSize: 9, color: "rgba(255,248,240,0.65)", letterSpacing: "0.2em", fontStyle: "normal" }}>The Forgotten Code Research Institute</p>
        <div style={{ width: 30, height: 1, background: `${P.hot}0c` }} />
      </div>
    </div></Shell>;

  // ── MINI TEASER ──
  if (phase === "mini1") return <Shell step="mini1">
    <Header title="FIRST THREAD" sub="Before the patterns reveal themselves" />
    <TI label="Your Name" value={d.name} onChange={v => set("name", v)} placeholder="First and last" />
    <TI label="Email Address" value={d.email} onChange={v => set("email", v)} placeholder="For receiving your reading" />
    <TI label="What's the one thing you can't say out loud about love?" hint="The pattern you feel but can't name" value={d.miniWhisper} onChange={v => set("miniWhisper", v)} placeholder="I always end up..." multi rows={3} />
    {nav(null, "miniResult", "REVEAL MY PATTERN GLIMPSE", !(d.name && d.email))}</Shell>;

  // ── MINI RESULT ──
  if (phase === "miniResult") return <Shell step="miniResult">
    <div style={{ textAlign: "center" }}>
      <NeonHeart size={70} />
      <h2 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "clamp(1.8rem,5vw,2.8rem)", color: P.hot, marginTop: 15, letterSpacing: "0.1em", textShadow: `0 0 20px ${P.hot}33` }}>YOUR PATTERN GLIMPSE</h2>
      <p style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(1rem,2.5vw,1.15rem)", color: "rgba(255,248,240,0.85)",  marginTop: 12, lineHeight: 1.9 }}>The patterns have noticed you.</p>
      <Divider />
      <div style={{ background: `${D.slate}cc`, border: `1px solid ${P.hot}22`, padding: "30px 25px", borderRadius: 2, textAlign: "left", marginBottom: 30 }}>
        <div style={{ fontFamily: "'Manrope',sans-serif", fontSize: 12, letterSpacing: "0.25em", color: "rgba(255,248,240,0.65)", marginBottom: 25, fontWeight: 700 }}>INITIAL TRACE</div>
        <p style={{ fontFamily: "'Playfair Display',serif", fontSize: 16, color: "rgba(255,248,240,0.85)", lineHeight: 2,  marginBottom: 20 }}>
          {d.name} — something in your love pattern is trying to be seen. The fact that you're here means a thread has been activated in your relational code.</p>
        {d.miniWhisper && d.miniWhisper.trim() && <div style={{ marginBottom: 22, padding: "18px 20px", borderLeft: `2px solid ${P.hot}44`, background: `${P.hot}08` }}>
          <div style={{ fontFamily: "'Manrope',sans-serif", fontSize: 10, letterSpacing: "0.2em", color: `${P.hot}55`, marginBottom: 8, fontWeight: 700 }}>YOUR WHISPER</div>
          <p style={{ fontFamily: "'Playfair Display',serif", fontSize: 15, color: `${P.blush}55`, lineHeight: 1.9,  }}>"{d.miniWhisper}"</p>
        </div>}
        <p style={{ fontFamily: "'Playfair Display',serif", fontSize: 15, color: `${P.blush}44`, lineHeight: 2 }}>
          This whisper is the surface of something much deeper. Your full Pattern Dossier maps 24 attachment categories, 5 DYAD depth questions, and reveals the invisible architecture of your relationship — the wounds, the loops, the exits, and the codes your nervous system is running without your permission.</p>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 14, alignItems: "center" }}>
        <Btn label="UNLOCK THE FULL PATTERN MAP →" onClick={() => go("gate")} primary full />
      </div>
      <div style={{ marginTop: 30 }}><Btn label="← EDIT MY ANSWERS" onClick={() => go("mini1")} /></div>
    </div></Shell>;

  // ── GATE — Payment ──
  if (phase === "gate") return <Shell step="gate">
    <div style={{ textAlign: "center" }}>
      <NeonHeart size={70} />
      <h2 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "clamp(1.8rem,5vw,2.5rem)", color: P.hot, marginTop: 15, letterSpacing: "0.1em" }}>UNLOCK THE FULL PATTERN MAP</h2>
      <p style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(1.05rem,2.5vw,1.18rem)", color: "rgba(255,248,240,0.85)",  marginTop: 12, lineHeight: 2, maxWidth: 480, margin: "12px auto 0" }}>
        Your pattern glimpse revealed the surface. The full Lovers & Liars Dossier goes 24 categories deep — mapping attachment wounds, defense mechanisms, communication loops, trust architecture, and the hidden codes running your love life.</p>
      <Divider />
      <div style={{ background: `${D.slate}cc`, border: `1px solid ${P.hot}22`, padding: "30px 25px", borderRadius: 2, textAlign: "left", maxWidth: 460, margin: "0 auto 30px" }}>
        <div style={{ fontFamily: "'Manrope',sans-serif", fontSize: 12, letterSpacing: "0.2em", color: `${P.blush}55`, marginBottom: 18, fontWeight: 700 }}>YOUR PATTERN DOSSIER INCLUDES</div>
        {["24-category attachment & behavioral pattern mapping", "Mirror Protocol™ — your patterns reflected back with precision", "DYAD Engine™ — 5 depth questions that crack the code", "Communication, trust, jealousy & money pattern analysis", "Family-of-origin wound tracing and generational loops", "Personalized pattern-breaking recommendations"].map((s, i) =>
          <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 12 }}>
            <div style={{ color: `${P.hot}55`, fontSize: 12, marginTop: 2, flexShrink: 0 }}>♦</div>
            <p style={{ fontFamily: "'Playfair Display',serif", fontSize: 14, color: `${P.blush}44`, lineHeight: 1.6 }}>{s}</p></div>)}
        <p style={{ fontFamily: "'Playfair Display',serif", fontSize: 13, color: `${P.blush}33`,  marginTop: 14, lineHeight: 1.7 }}>
          Delivered within 5-7 days.</p>
      </div>

      <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "clamp(1.5rem,4vw,2rem)", color: P.hot, letterSpacing: "0.15em", marginBottom: 8 }}>$111</div>
      <p style={{ fontFamily: "'Playfair Display',serif", fontSize: 13, color: `${P.blush}33`,  marginBottom: 25 }}>One-time payment · Lifetime access</p>

      <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 380, margin: "0 auto" }}>
        {[
          { label: "PAY WITH STRIPE", href: "https://buy.stripe.com/PLACEHOLDER", icon: "◇", note: "Credit / Debit Card" },
          { label: "PAY WITH VENMO", href: "https://venmo.com/u/Jennifer-Coley-4", icon: "♥", note: "@Jennifer-Coley-4" },
          { label: "PAY WITH CASHAPP", href: "https://cash.app/$jenniferWilderWest", icon: "♦", note: "$jenniferWilderWest" },
          { label: "PAY WITH PAYPAL", href: "https://paypal.me/JSnider364/111", icon: "♠", note: "PayPal.me/JSnider364" }
        ].map((pm, i) =>
          <a key={i} href={pm.href} target="_blank" rel="noopener noreferrer"
            style={{ display: "block", padding: "16px 20px", border: `1px solid ${P.hot}33`, textDecoration: "none", borderRadius: 2, background: `${D.slate}cc`, transition: "all 0.3s", textAlign: "center" }}>
            <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 15, letterSpacing: "0.15em", color: P.pale }}>{pm.icon} {pm.label}</div>
            <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 12, color: `${P.blush}33`, marginTop: 4 }}>{pm.note}</div>
          </a>)}
      </div>

      <p style={{ fontFamily: "'Playfair Display',serif", fontSize: 12, color: `${P.blush}22`, marginTop: 18, lineHeight: 1.7 }}>
        Include <strong style={{ color: `${P.blush}44` }}>"{d.name}"</strong> and <strong style={{ color: `${P.blush}44` }}>"{d.email}"</strong> in your payment note.</p>

      <Divider />
      <p style={{ fontFamily: "'Manrope',sans-serif", fontSize: 12, letterSpacing: "0.15em", color: `${P.blush}44`, marginBottom: 12, fontWeight: 700 }}>ALREADY PAID?</p>
      <p style={{ fontFamily: "'Playfair Display',serif", fontSize: 14, color: `${P.blush}33`, lineHeight: 1.8, maxWidth: 420, margin: "0 auto 18px",  }}>
        Let Jennifer know so she can send your access code.</p>
      <a href={`mailto:theforgottencode780@gmail.com?subject=${encodeURIComponent(`Lovers & Liars Payment Confirmation — ${d.name}`)}&body=${encodeURIComponent(`Hi Jennifer,\n\nI just completed payment for the Lovers, Liars & All Things Patterned Dossier ($111).\n\nName: ${d.name}\nEmail: ${d.email}\nPayment method: [Venmo/CashApp/PayPal/Stripe]\n\nPlease send my access code when ready.\n\nThank you.`)}`}
        style={{ display: "block", width: "min(100%,380px)", padding: "16px 25px", margin: "0 auto", border: `1px solid ${P.hot}33`, textDecoration: "none", textAlign: "center", fontFamily: "'Bebas Neue',sans-serif", fontSize: 14, letterSpacing: "0.12em", color: P.pale, background: `${P.hot}18`, borderRadius: 2 }}>
        ✉ I'VE PAID — NOTIFY JENNIFER</a>
      <p style={{ fontFamily: "'Playfair Display',serif", fontSize: 12, color: `${P.blush}18`, marginTop: 12 }}>
        theforgottencode780@gmail.com · (423) 388-8304</p>

      <Divider />
      <p style={{ fontFamily: "'Manrope',sans-serif", fontSize: 12, letterSpacing: "0.15em", color: `${P.blush}44`, marginBottom: 18, fontWeight: 700 }}>HAVE YOUR ACCESS CODE?</p>
      <div style={{ maxWidth: 350, margin: "0 auto" }}>
        <input value={d.accessCode} onChange={e => { set("accessCode", e.target.value.toUpperCase()); set("codeError", false) }} placeholder="ENTER ACCESS CODE"
          style={{ ...inputBase, textAlign: "center", letterSpacing: "0.3em", fontFamily: "'Bebas Neue',sans-serif", fontSize: 16 }}
          onFocus={e => { e.target.style.borderColor = `${P.hot}55` }}
          onBlur={e => { e.target.style.borderColor = `${P.hot}22` }} />
        {d.codeError && <p style={{ fontFamily: "'Playfair Display',serif", fontSize: 13, color: P.hot, textAlign: "center", marginTop: 8,  }}>Invalid access code. Please check and try again.</p>}
        <div style={{ marginTop: 18, textAlign: "center" }}>
          <Btn label="UNLOCK FULL INTAKE" onClick={() => { if (d.accessCode === ACCESS_CODE) go("deep1"); else set("codeError", true) }} primary /></div>
      </div>
      <div style={{ marginTop: 35, textAlign: "center" }}><Btn label="← BACK" onClick={() => go("miniResult")} /></div>
    </div></Shell>;

  // ═══ DEEP INTAKE ═══
  const deepSteps = ["deep1", "mcq", "dyad", "complete"];
  const deepIdx = deepSteps.indexOf(phase);
  const deepProgress = deepIdx >= 0 ? (deepIdx / (deepSteps.length - 1)) * 100 : 0;

  // ── DEEP 1: Client Info ──
  if (phase === "deep1") return <Shell step="deep1">
    <Header title="YOUR IDENTITY" sub="Who loves and who lies" progress={deepProgress} />
    <TI label="Full Name" value={d.name} onChange={v => set("name", v)} placeholder="First and last" />
    <TI label="Email Address" value={d.email} onChange={v => set("email", v)} placeholder="For receiving your dossier" />
    <TI label="Partner's Name (or alias)" hint="First name is fine — or whatever you call them" value={d.partner} onChange={v => set("partner", v)} placeholder="Their name or what you call them" />
    <div style={{ marginTop: 22 }}>
      <label style={labelStyle}>Relationship Status</label>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
        {["Together — committed", "Together — complicated", "Separated / On a break", "Over — processing it", "Situationship", "It's complicated"].map(o => {
          const a = d.relStatus === o;
          return <div key={o} onClick={() => set("relStatus", o)} style={{ padding: "10px 14px", cursor: "pointer", border: `1px solid ${a ? P.hot + "55" : P.hot + "15"}`, background: a ? `${P.hot}18` : `${D.slate}88`, color: a ? P.pale : `${P.blush}44`, fontFamily: "'Playfair Display',serif", fontSize: 14, transition: "all 0.3s", borderRadius: 2, textAlign: "center" }}>{o}</div>
        })}
      </div>
    </div>
    {nav("gate", "mcq", "BEGIN PATTERN MAPPING", !(d.name && d.email))}</Shell>;

  // ── MCQ SCREEN — One question at a time ──
  if (phase === "mcq") {
    const qi = d.qi;
    const q = MCQ[qi];
    const progress = (qi / MCQ.length) * 100;

    return <Shell step={`mcq-${qi}`}>
      <div style={{ textAlign: "center", marginBottom: 30 }}>
        <div style={{ width: "100%", height: 2, background: `${D.slate}88`, marginBottom: 25, position: "relative", overflow: "hidden" }}>
          <div style={{ width: `${progress}%`, height: "100%", background: `linear-gradient(90deg,${P.mag}55,${P.hot}88,${P.neon}66)`, transition: "width 0.6s ease" }} />
          <div style={{ position: "absolute", top: -3, left: `${progress}%`, width: 8, height: 8, borderRadius: "50%", background: P.hot, boxShadow: `0 0 10px ${P.hot}55`, transition: "left 0.6s ease", transform: "translateX(-50%)" }} />
        </div>
        <p style={{ fontFamily: "'Manrope',sans-serif", fontSize: 11, letterSpacing: "0.25em", color: `${P.hot}55`, fontWeight: 700, marginBottom: 6 }}>{q.cat}</p>
        <p style={{ fontFamily: "'Manrope',sans-serif", fontSize: 11, color: `${P.blush}22`, letterSpacing: "0.1em" }}>{qi + 1} of {MCQ.length}</p>
      </div>
      <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(1.2rem,3.5vw,1.6rem)", color: P.pale, textAlign: "center", lineHeight: 1.5, marginBottom: 8 }}>{q.q}</h3>
      <p style={{ fontFamily: "'Playfair Display',serif", fontSize: 13, color: `${P.blush}33`, textAlign: "center",  marginBottom: 30 }}>{q.sub}</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {q.opts.map((opt, oi) => <div key={oi} onClick={() => {
          const newAnswers = [...d.mcqAnswers]; newAnswers[qi] = opt;
          if (qi < MCQ.length - 1) { setD(p => ({ ...p, mcqAnswers: newAnswers, qi: qi + 1 })); window.scrollTo({ top: 0, behavior: "smooth" }); }
          else { setD(p => ({ ...p, mcqAnswers: newAnswers })); go("dyad"); }
        }}
          style={{ padding: "16px 20px", border: `1px solid ${P.hot}22`, borderRadius: 2, cursor: "pointer", background: `${D.slate}cc`, transition: "all 0.3s" }}>
          <p style={{ fontFamily: "'Playfair Display',serif", fontSize: 15, color: P.pale, lineHeight: 1.5 }}>{opt.text}</p>
          <p style={{ fontFamily: "'Playfair Display',serif", fontSize: 12, color: `${P.neon}33`,  marginTop: 4 }}>{opt.detail}</p>
        </div>)}
      </div>
      {qi > 0 && <div style={{ marginTop: 25, textAlign: "center" }}>
        <Btn label="← PREVIOUS QUESTION" onClick={() => set("qi", qi - 1)} /></div>}
    </Shell>;
  }

  // ── DYAD SCREEN — Open-ended ──
  if (phase === "dyad") return <Shell step="dyad">
    <Header title="DYAD ENGINE™" sub="The questions underneath the questions" progress={75} />
    <p style={{ fontFamily: "'Playfair Display',serif", fontSize: 14, color: `${P.blush}33`, textAlign: "center",  marginBottom: 30 }}>
      These five questions reach where multiple choice cannot. Take your time. Write from the gut.</p>
    {DYAD_QUESTIONS.map((dq, i) => <TI key={i} label={dq.q} hint={dq.hint}
      value={d.dyadAnswers[i]} onChange={v => { const a = [...d.dyadAnswers]; a[i] = v; set("dyadAnswers", a) }}
      placeholder="Write from the gut..." multi rows={4} />)}
    {nav("mcq", "complete", "SEAL THE PATTERN MAP")}</Shell>;

  // ── COMPLETE ──
  if (phase === "complete") {
    const build = () => {
      let s = `════════════════════════════════════════\nLOVERS, LIARS & ALL THINGS PATTERNED\nFULL DEEP INTAKE — Pattern Dossier\n════════════════════════════════════════\n\n`;
      s += `Name: ${d.name}\nEmail: ${d.email}\nPartner: ${d.partner}\nStatus: ${d.relStatus}\n\n`;
      s += `══════════════════════════════════════\nMIRROR PROTOCOL™ — 24 PATTERN CATEGORIES\n══════════════════════════════════════\n\n`;
      d.mcqAnswers.forEach((a, i) => { if (a) s += `[${MCQ[i].cat}]\nQ: ${MCQ[i].q}\nA: ${a.text}\n→ ${a.detail} (${a.code})\n\n` });
      s += `══════════════════════════════════════\nDYAD ENGINE™ — OPEN RESPONSES\n══════════════════════════════════════\n\n`;
      DYAD_QUESTIONS.forEach((dq, i) => { s += `Q: ${dq.q}\nA: ${d.dyadAnswers[i] || "(not answered)"}\n\n` });
      s += `════════════════════════════════════════\n© Jennifer Leigh West · The Forgotten Code Research Institute\nMirror Protocol™ · DYAD Engine™\n`;
      return s;
    };
    const summary = build();

    return <Shell step="complete">
      <div style={{ textAlign: "center" }}>
        <NeonHeart size={80} />
        <h2 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "clamp(2rem,6vw,3rem)", color: P.hot, marginTop: 20, letterSpacing: "0.1em", animation: "titleGlow 4s ease-in-out infinite" }}>PATTERN MAP SEALED</h2>
        <p style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(1rem,2.5vw,1.15rem)", color: `${P.blush}55`,  marginTop: 12, lineHeight: 1.9, maxWidth: 460, margin: "12px auto 0" }}>
          Your relational codes have been captured. Your Pattern Dossier will be delivered within 5-7 days.</p>
        <Divider />
        <div style={{ display: "flex", flexDirection: "column", gap: 14, alignItems: "center", marginBottom: 40 }}>
          <a href={`mailto:theforgottencode780@gmail.com?subject=${encodeURIComponent(`Lovers & Liars Full Intake — ${d.name}`)}&body=${encodeURIComponent(summary)}`}
            style={{ display: "block", width: "min(100%,400px)", padding: "18px 30px", border: `2px solid ${P.hot}44`, textDecoration: "none", textAlign: "center", fontFamily: "'Bebas Neue',sans-serif", fontSize: 16, letterSpacing: "0.15em", color: P.pale, background: `${P.hot}22`, borderRadius: 2, animation: "neonBorderPulse 3s ease-in-out infinite" }}>
            ✉ SEND PATTERN MAP VIA EMAIL</a>
          <div onClick={() => { navigator.clipboard.writeText(summary).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2500) }) }}
            style={{ width: "min(100%,400px)", padding: "14px 30px", cursor: "pointer", textAlign: "center", border: `1px solid ${P.hot}22`, borderRadius: 2, fontFamily: "'Manrope',sans-serif", fontSize: 13, letterSpacing: "0.12em", color: copied ? P.hot : `${P.blush}25`, transition: "all 0.3s" }}>
            {copied ? "✓ COPIED TO CLIPBOARD" : "⊏ COPY ALL RESPONSES"}</div>
        </div>
        <div style={{ background: `${D.slate}cc`, border: `1px solid ${P.hot}22`, padding: "25px 20px", textAlign: "left", borderRadius: 2 }}>
          <div style={{ fontFamily: "'Manrope',sans-serif", fontSize: 11, letterSpacing: "0.3em", color: `${P.blush}18`, marginBottom: 15, fontWeight: 700 }}>INTAKE PREVIEW</div>
          <div style={{ maxHeight: 350, overflow: "auto", paddingRight: 8 }}>
            <pre style={{ fontFamily: "'Playfair Display',serif", fontSize: 13, color: `${P.blush}25`, lineHeight: 1.8, whiteSpace: "pre-wrap", wordBreak: "break-word" }}>{summary}</pre></div>
        </div>
        <p style={{ fontFamily: "'Playfair Display',serif", fontSize: 13, color: `${P.blush}25`, marginTop: 35, lineHeight: 1.9,  }}>
          Your Pattern Dossier will be delivered within 5-7 days.<br />
          <span style={{ color: `${P.hot}33` }}>theforgottencode780@gmail.com</span> · (423) 388-8304</p>
        <p style={{ fontFamily: "'Manrope',sans-serif", fontSize: 9, color: `${P.hot}15`, marginTop: 40, letterSpacing: "0.15em" }}>
          © Jennifer Leigh West · The Forgotten Code Research Institute · Mirror Protocol™ · DYAD Engine™</p>
      </div></Shell>;
  }

  return null;
}
