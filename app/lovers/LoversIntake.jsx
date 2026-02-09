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
@keyframes neonFlicker{0%,100%{opacity:1;filter:brightness(1)}50%{opacity:0.85;filter:brightness(0.95)}}
@-webkit-keyframes neonFlicker{0%,100%{opacity:1;filter:brightness(1)}50%{opacity:0.85;filter:brightness(0.95)}}
@keyframes heartFall{0%{transform:translateY(-10vh) rotate(0deg);opacity:0}10%{opacity:0.6}90%{opacity:0.6}100%{transform:translateY(110vh) rotate(360deg);opacity:0}}
@-webkit-keyframes heartFall{0%{transform:translateY(-10vh) rotate(0deg);opacity:0}10%{opacity:0.6}90%{opacity:0.6}100%{transform:translateY(110vh) rotate(360deg);opacity:0}}
@keyframes neonBorderPulse{0%,100%{border-color:rgba(255,45,123,0.35);box-shadow:0 0 8px rgba(255,45,123,0.15)}50%{border-color:rgba(255,45,123,0.6);box-shadow:0 0 18px rgba(255,45,123,0.25)}}
@keyframes fadeIn{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
@keyframes btnSweep{0%{transform:translateX(-100%) skewX(-12deg)}100%{transform:translateX(200%) skewX(-12deg)}}
@keyframes dustFloat{0%{transform:translateY(0) translateX(0);opacity:0}8%{opacity:0.15}92%{opacity:0.08}100%{transform:translateY(-100vh) translateX(15px);opacity:0}}
`;

// ═══ FALLING NEON HEARTS — neon outline SVG hearts (no emoji) ═══
const FALLING_HEARTS = [
  { left: 3, w: 14, dur: 8, delay: 0 }, { left: 10, w: 20, dur: 11, delay: 1 }, { left: 17, w: 12, dur: 9, delay: 3 }, { left: 24, w: 18, dur: 10, delay: 0.5 }, { left: 31, w: 15, dur: 12, delay: 2 },
  { left: 38, w: 22, dur: 8.5, delay: 4 }, { left: 45, w: 11, dur: 13, delay: 1.5 }, { left: 52, w: 16, dur: 9.5, delay: 3.5 }, { left: 59, w: 24, dur: 11.5, delay: 0.8 }, { left: 66, w: 13, dur: 10.5, delay: 2.5 },
  { left: 73, w: 19, dur: 8.8, delay: 4.5 }, { left: 80, w: 14, dur: 12.5, delay: 1.2 }, { left: 87, w: 21, dur: 9.2, delay: 3.2 }, { left: 94, w: 15, dur: 11.2, delay: 0.3 }, { left: 7, w: 17, dur: 10.8, delay: 5 },
  { left: 21, w: 12, dur: 13.5, delay: 2.8 }, { left: 35, w: 23, dur: 8.3, delay: 4.2 }, { left: 49, w: 14, dur: 11.8, delay: 1.8 }, { left: 63, w: 18, dur: 9.8, delay: 3.8 }, { left: 77, w: 16, dur: 12.2, delay: 0.6 },
  { left: 14, w: 20, dur: 10.3, delay: 5.5 }, { left: 42, w: 11, dur: 14, delay: 2.2 }, { left: 56, w: 19, dur: 8.7, delay: 4.8 }, { left: 70, w: 13, dur: 11.5, delay: 1.4 }, { left: 91, w: 17, dur: 9.4, delay: 3.6 },
];

// Neon outline only (stroke, no fill) — same shape as NeonHeart, scales clean at small sizes
const OutlineHeartSvg = () => (
  <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%", display: "block" }}>
    <path
      d="M30 50 L10 28 A11 11 0 0 1 30 18 A11 11 0 0 1 50 28 Z"
      fill="none"
      stroke="#ff69b4"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

function FallingHearts() {
  return (
    <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 1, overflow: "hidden" }} aria-hidden="true">
      {FALLING_HEARTS.map((h, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: `${h.left}%`,
            top: "-5%",
            width: h.w,
            height: h.w,
            opacity: 0.7,
            filter: "drop-shadow(0 0 4px #ff69b4) drop-shadow(0 0 8px #ff1493) drop-shadow(0 0 16px #c71585)",
            animation: `heartFall ${h.dur}s linear ${h.delay}s infinite`,
            WebkitAnimation: `heartFall ${h.dur}s linear ${h.delay}s infinite`,
          }}
        >
          <OutlineHeartSvg />
        </div>
      ))}
    </div>
  );
}

// ═══ NEON HEART ICON — slow dreamy flicker (3s+, no strobe) ═══
function NeonHeart({ size = 80, delay = 0 }) {
  return <div style={{ width: size, height: size, animation: `neonFlicker 3s ease-in-out ${delay}s infinite`, WebkitAnimation: `neonFlicker 3s ease-in-out ${delay}s infinite`, lineHeight: 0, margin: "0 auto" }}>
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
    <FallingHearts />
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

function MiniSelect({ label, value, onChange, options }) {
  return <div>
    <label style={labelStyle}>{label}</label>
    <select value={value} onChange={e => onChange(e.target.value)}
      style={{ ...inputBase, cursor: "pointer", appearance: "none",
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23ffb6c1' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`,
        backgroundRepeat: "no-repeat", backgroundPosition: "right 16px center" }}>
      <option value="">Choose one...</option>
      {options.map(o => <option key={o} value={o}>{o}</option>)}
    </select>
  </div>;
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

// Mini report — 5 questions one per screen, A/B/C/D → pre-written report (exact wording, no AI)
const LOVERS_QUESTIONS = [
  { q: "In relationships, your deepest pattern is:", A: "I attract the same type of person over and over", B: "I lose myself — I become what they need", C: "I keep walls up until it's too late", D: "I see the real them before they show me, and I stay anyway" },
  { q: "The lie you tell yourself most in love is:", A: "\"This time will be different\"", B: "\"I don't need that much\"", C: "\"If I just give more, they'll finally see me\"", D: "\"I'm too much for anyone to handle\"" },
  { q: "When a relationship ends, what haunts you?", A: "The version of me I became with them", B: "The signs I ignored", C: "How fast I was replaced or forgotten", D: "That I still understand why they did what they did" },
  { q: "The love you secretly want but won't say out loud:", A: "Someone who stays without being convinced", B: "Someone who matches my intensity without flinching", C: "Someone who sees the parts I hide and doesn't run", D: "Someone who fights FOR me, not with me" },
  { q: "What do you most need to understand about your love patterns?", A: "Why I keep choosing the same wound", B: "What I'm actually afraid of underneath it all", C: "Whether I'm repeating something that didn't start with me", D: "How to break the cycle without breaking myself" },
];

function getDominantAnswer(answers) {
  const counts = { A: 0, B: 0, C: 0, D: 0 };
  answers.forEach(a => { if (a && counts.hasOwnProperty(a)) counts[a]++; });
  const max = Math.max(...Object.values(counts));
  const dominantLetters = Object.keys(counts).filter(k => counts[k] === max);
  if (dominantLetters.length === 1) return dominantLetters[0];
  const q5 = answers[4];
  if (q5 && dominantLetters.includes(q5)) return q5;
  return "MIXED";
}

const LOVERS_REPORTS = {
  A: "Your Love Pattern: The Loop Runner\n\nYou already know the pattern. You have watched yourself walk into the same room with a different face at the door, and you have felt the sickening recognition of realizing — again — that this is the one you always choose. Different name. Same architecture.\n\nThe loop is not about bad taste or poor judgment. It is a code running beneath your conscious choices. You are drawn to a specific emotional signature because your system was calibrated to recognize it as love. It is not love. It is familiarity wearing love's clothes.\n\nThe hardest part is not that you keep choosing it. The hardest part is that you see it happening and still cannot stop. That is not weakness. That is a pattern too deep for willpower alone to interrupt.\n\nWhat your full Pattern Map reveals:\nThe origin point of your loop — where the pattern was first encoded. The specific emotional signature you are calibrated to seek and why your system reads it as love. The architectural blueprint of every relationship that has followed this code. Your Pattern Map uses the Mirror Protocol™ and DYAD Engine™ to decode the loop at its source — so you can finally see the machinery, not just the result.",
  B: "Your Love Pattern: The Invisible Giver\n\nYou love by disappearing. Not all at once — slowly. You adjust. You accommodate. You read what they need and you become it, so gradually that by the time you realize you've lost yourself, you can't remember what you looked like before them.\n\nThe lie that holds this pattern in place is the smallest one: \"I don't need that much.\" You do. You need enormously. But somewhere you learned that your needs were too much, too heavy, too inconvenient — so you made yourself lighter. You gave more. You asked for less. And you called it love.\n\nIt is not love. It is a survival strategy that outlived the danger it was built for. And it is costing you everything.\n\nWhat your full Pattern Map reveals:\nThe moment you first learned to make yourself small for love. The specific needs you buried and what happens when they surface. The relationship architecture that repeats when you give from an empty place. Your Pattern Map traces the Invisible Giver pattern to its root and shows you what your love looks like when you stop disappearing.",
  C: "Your Love Pattern: The Watcher\n\nYou see everything. You clock the micro-expressions, the shifts in tone, the distance that opens between what someone says and what they mean. You are hypervigilant in love because at some point, not seeing cost you something you couldn't afford to lose.\n\nSo you built walls. Not obvious ones — yours are sophisticated. You let people close enough to think they're in, but there is a room they never reach. You watch from that room. You assess. You wait for the evidence that confirms what you already expect: that they will leave, or lie, or replace you with someone easier to love.\n\nThe walls don't protect you. They guarantee the outcome you fear. Because no one can reach someone who is watching from behind glass.\n\nWhat your full Pattern Map reveals:\nThe original betrayal or loss that activated your surveillance system. The specific walls you built and the exact point where you stop letting people in. The relationship pattern that forms when you love from behind glass. Your Pattern Map uses the DYAD Engine™ to decode what you are actually protecting — and what it would take to let someone into the room.",
  D: "Your Love Pattern: The Mirror Keeper\n\nYou hold the mirror for everyone. You see people with devastating clarity — their wounds, their patterns, their potential, their lies — and you stay. Not because you are naive. Because you understand. You understand so deeply that you absorb their pain as if comprehension were the same as responsibility.\n\nThis is the cruelest pattern because it looks like strength. You are the one who holds it together. The one who forgives with full knowledge of what was done. The one who fights for people who have not yet learned to fight for themselves.\n\nBut who holds the mirror for you? Who sees YOUR pattern with the same clarity you give everyone else? The answer, so far, is no one. Because you have made yourself the seer and never the seen.\n\nWhat your full Pattern Map reveals:\nWhy you were built to carry this role and who assigned it to you. The cost of seeing without being seen — the specific ways this pattern has eroded your own foundation. The love architecture that forms when a Mirror Keeper finally allows themselves to be reflected. Your Pattern Map decodes your gift and your wound as two sides of the same thread.",
  MIXED: "Your Love Pattern: The Pattern Breaker\n\nYour answers don't settle into one pattern because you are running several. The loop, the giving, the walls, the mirror — they take turns. You are not confused about love. You are exhausted by the number of programs running simultaneously.\n\nThis is actually a sign of transition. When a single dominant pattern starts fracturing into multiple overlapping patterns, it means the original code is breaking down. You are not stuck in one loop anymore — you are between loops. The old architecture is crumbling and the new one hasn't been built yet.\n\nThis is the most disorienting place to be. It is also the most powerful. Because right now, before the next pattern calcifies, you have a window to choose differently.\n\nWhat your full Pattern Map reveals:\nThe multiple love patterns operating in your system and how they interact. Which pattern is original, which are adaptations, and which is trying to emerge. The window you are in right now — the specific opportunity to rewrite your love code before it hardens. Your Pattern Map catches you at the break point and gives you the architecture for what comes next.",
};

// ═══ MAIN COMPONENT ═══
export default function LoversIntake() {
  const [phase, setPhase] = useState("intro");
  const [d, setD] = useState({
    name: "", email: "", partner: "", relStatus: "", miniWhisper: "",
    miniAnswers: ["", "", "", "", ""],
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
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
        <NeonHeart size={110} delay={0} />
        <NeonHeart size={70} delay={0.7} />
        <NeonHeart size={50} delay={1.4} />
      </div>
      <h1 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "clamp(3.5rem,14vw,6.5rem)", letterSpacing: "0.12em", lineHeight: 0.95, marginTop: 24,
        color: P.hot, textShadow: "0 0 4px rgba(255,255,255,0.9), 0 0 12px #ff2d7b, 0 0 28px #ff2d7b88, 0 0 48px #ff2d7b44, 0 0 80px #ff2d7b22", animation: "neonFlicker 3s ease-in-out 0.4s infinite", WebkitAnimation: "neonFlicker 3s ease-in-out 0.4s infinite" }}>LOVERS<br/><span style={{ fontSize: "0.5em", letterSpacing: "0.3em", color: P.neon, opacity: 0.7 }}>LIARS &</span><br/>ALL THINGS<br/>PATTERNED</h1>
      <p style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(1.1rem,3vw,1.5rem)", color: "#C4B59A", fontStyle: "normal", marginTop: 18 }}>Mirror Protocol™ · DYAD Engine™</p>
      <div style={{ fontFamily: "'Manrope',sans-serif", fontSize: 11, letterSpacing: "0.4em", color: "rgba(255,248,240,0.7)", marginTop: 20 }}>MINI PREVIEW + FULL DEEP INTAKE</div>
      <Divider />
      <p style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(1.05rem,2.5vw,1.18rem)", color: "rgba(255,248,240,0.85)", lineHeight: 2, maxWidth: 480, fontStyle: "normal" }}>
        Every relationship has a pattern. A code running underneath the surface that neither of you can see but both of you feel. Give us one whisper about love — and we'll show you the thread.</p>
      <div style={{ marginTop: 40 }}><Btn label="CONTINUE" onClick={() => go("start")} primary /></div>
      <div style={{ marginTop: 60, display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: 30, height: 1, background: `${P.hot}0c` }} />
        <p style={{ fontFamily: "'Manrope',sans-serif", fontSize: 9, color: "rgba(255,248,240,0.65)", letterSpacing: "0.2em", fontStyle: "normal" }}>The Forgotten Code Research Institute</p>
        <div style={{ width: 30, height: 1, background: `${P.hot}0c` }} />
      </div>
    </div></Shell>;

  // ── START: Name + Email (minimal, before Q1) ──
  if (phase === "start") return <Shell step="start">
    <div style={{ minHeight: "80vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", maxWidth: 420, margin: "0 auto" }}>
      <div style={{ fontFamily: "'Manrope',sans-serif", fontSize: 11, letterSpacing: "0.3em", color: `${P.blush}66`, marginBottom: 24 }}>BEFORE WE BEGIN</div>
      <TI label="Your Name" value={d.name} onChange={v => set("name", v)} placeholder="First and last" />
      <TI label="Email Address" value={d.email} onChange={v => set("email", v)} placeholder="For receiving your reading" />
      <div style={{ marginTop: 36, width: "100%" }}><Btn label="BEGIN THE PATTERN MAP" onClick={() => go("q1")} primary disabled={!(d.name && d.email)} full /></div>
    </div></Shell>;

  // ── MINI: 5 questions one at a time, A/B/C/D → pre-written report ──
  const loversQIndex = phase === "q1" ? 0 : phase === "q2" ? 1 : phase === "q3" ? 2 : phase === "q4" ? 3 : phase === "q5" ? 4 : -1;
  const loversAnswers = d.miniAnswers || ["", "", "", "", ""];
  const setLoversAnswer = (i, letter) => { const a = [...loversAnswers]; a[i] = letter; set("miniAnswers", a); go(i < 4 ? `q${i + 2}` : "miniResult"); };
  if (loversQIndex >= 0) {
    const q = LOVERS_QUESTIONS[loversQIndex];
    const opts = [{ letter: "A", text: q.A }, { letter: "B", text: q.B }, { letter: "C", text: q.C }, { letter: "D", text: q.D }];
    return <Shell step={`q${loversQIndex + 1}`}>
      <div style={{ textAlign: "center", marginBottom: 28 }}>
        <div style={{ fontFamily: "'Manrope',sans-serif", fontSize: 11, letterSpacing: "0.2em", color: `${P.blush}44`, marginBottom: 20 }}>QUESTION {loversQIndex + 1} OF 5</div>
        <p style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(1.1rem,2.8vw,1.35rem)", color: "rgba(255,248,240,0.9)", lineHeight: 1.6, maxWidth: 520, margin: "0 auto", fontStyle: "normal" }}>"{q.q}"</p>
        <div style={{ display: "flex", justifyContent: "center", gap: 10, marginTop: 32 }}>
          {[0, 1, 2, 3, 4].map(i => <div key={i} style={{ width: 10, height: 10, borderRadius: "50%", background: i <= loversQIndex ? `${P.hot}66` : `${P.blush}22` }} />)}
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {opts.map(({ letter, text }) => (
          <div key={letter} onClick={() => setLoversAnswer(loversQIndex, letter)} style={{ padding: "18px 20px", cursor: "pointer", border: `1px solid ${P.blush}44`, background: `${D.slate}cc`, borderRadius: 2, fontFamily: "'Playfair Display',serif", fontSize: 15, color: `${P.blush}99`, lineHeight: 1.6, transition: "all 0.3s", display: "flex", alignItems: "flex-start", gap: 12, fontStyle: "normal" }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = `${P.hot}55`; e.currentTarget.style.boxShadow = `0 0 18px ${P.hot}15`; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = `${P.blush}44`; e.currentTarget.style.boxShadow = "none"; }}>
            <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 14, color: `${P.hot}99`, flexShrink: 0 }}>{letter})</span>
            <span style={{ fontStyle: "normal" }}>{text}</span>
          </div>
        ))}
      </div>
    </Shell>;
  }

  // ── MINI RESULT (pre-written report only; no AI) ──
  if (phase === "miniResult") {
    const dominant = getDominantAnswer(loversAnswers);
    const reportText = LOVERS_REPORTS[dominant] || LOVERS_REPORTS.MIXED;
    return <Shell step="miniResult">
      <div style={{ textAlign: "center" }}>
        <NeonHeart size={70} />
        <h2 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "clamp(1.8rem,5vw,2.8rem)", color: P.hot, marginTop: 15, letterSpacing: "0.1em", textShadow: `0 0 20px ${P.hot}33`, fontStyle: "normal" }}>YOUR PATTERN GLIMPSE</h2>
        <Divider />
        <div style={{ background: `${D.slate}cc`, border: `1px solid ${P.hot}22`, padding: "30px 25px", borderRadius: 2, textAlign: "left", marginBottom: 30 }}>
          {reportText.split("\n\n").map((para, i) => <p key={i} style={{ fontFamily: "'Playfair Display',serif", fontSize: 15, color: "rgba(255,248,240,0.85)", lineHeight: 2, marginBottom: 18, fontStyle: "normal" }}>{para}</p>)}
        </div>
        <div style={{ height: 1, background: `linear-gradient(90deg, transparent, ${P.hot}44, transparent)`, margin: "28px 0 20px" }} />
        <p style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(1.05rem,2.5vw,1.15rem)", color: "rgba(255,248,240,0.9)", marginBottom: 20, fontStyle: "normal" }}>Ready to see the full map?</p>
        <div style={{ marginBottom: 16 }}><Btn label="ORDER YOUR FULL READING — $127" onClick={() => go("gate")} primary full /></div>
        <p style={{ fontFamily: "'Manrope',sans-serif", fontSize: 12, color: `${P.blush}66`, maxWidth: 420, margin: "0 auto", lineHeight: 1.7, fontStyle: "normal" }}>After purchase, you'll receive a personal access code to complete your full intake. Jennifer will personally generate your complete Pattern Map and deliver it within 5-7 business days.</p>
        <div style={{ marginTop: 30 }}><Btn label="← EDIT MY ANSWERS" onClick={() => go("q1")} /></div>
      </div>
    </Shell>;
  }

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

      <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "clamp(1.5rem,4vw,2rem)", color: P.hot, letterSpacing: "0.15em", marginBottom: 8 }}>$127</div>
      <p style={{ fontFamily: "'Playfair Display',serif", fontSize: 13, color: `${P.blush}33`,  marginBottom: 25 }}>One-time payment · Lifetime access</p>

      <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 380, margin: "0 auto" }}>
        {[
          { label: "PAY WITH STRIPE", href: "https://buy.stripe.com/PLACEHOLDER", icon: "◇", note: "Credit / Debit Card" },
          { label: "PAY WITH VENMO", href: "https://venmo.com/u/Jennifer-Coley-4", icon: "♥", note: "@Jennifer-Coley-4" },
          { label: "PAY WITH CASHAPP", href: "https://cash.app/$jenniferWilderWest", icon: "♦", note: "$jenniferWilderWest" },
          { label: "PAY WITH PAYPAL", href: "https://paypal.me/JSnider364/127", icon: "♠", note: "PayPal.me/JSnider364" }
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
      <a href={`mailto:theforgottencode780@gmail.com?subject=${encodeURIComponent(`Lovers & Liars Payment Confirmation — ${d.name}`)}&body=${encodeURIComponent(`Hi Jennifer,\n\nI just completed payment for the Lovers, Liars & All Things Patterned Dossier ($127).\n\nName: ${d.name}\nEmail: ${d.email}\nPayment method: [Venmo/CashApp/PayPal/Stripe]\n\nPlease send my access code when ready.\n\nThank you.`)}`}
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
