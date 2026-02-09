"use client";
import { useState, useRef, useEffect } from "react";

// Financial Identity Map — $79 | Route: /financial
// Wall Street meets GQ — Bebas Neue, Source Serif 4, Space Mono

const OBSIDIAN = "#0a0a0a";
const TERMINAL_GREEN = "#00ff88";
const GREEN_DIM = "#00cc6a";
const CHROME = "#c0c0c0";
const CHROME_DARK = "#888";
const CHARCOAL = "#1a1a1a";
const WHITE = "#f0f0f0";
const RED_ALERT = "#ff3344";

const FINANCIAL_QUESTIONS = [
  { q: "What did your family teach you about money before you ever earned a dollar?", A: "Money was scarce — we never had enough and talking about it was shameful.", B: "Money was power — those who had it controlled the room.", C: "Money was dangerous — having too much meant someone would take it or judge you.", D: "Money was invisible — we didn't talk about it; I had to figure it out alone." },
  { q: "When you receive money (paycheck, gift, sale), what is your first impulse?", A: "Hide it or pay off debt immediately — it never feels like mine.", B: "Spend it on others or give it away before I 'lose' it.", C: "Feel guilty — I don't deserve this.", D: "Feel a rush of possibility — then anxiety about losing it." },
  { q: "What pattern keeps repeating with your finances?", A: "I build something and it collapses — same story, different year.", B: "I undercharge or give away my worth.", C: "I sabotage right when I'm about to break through.", D: "I can't let myself have more than a certain amount — an invisible ceiling." },
  { q: "If your ancestors could speak about wealth, what would they say?", A: "We lost everything. Don't get too comfortable.", B: "Money corrupts. Stay clean.", C: "We never had a chance. You shouldn't either.", D: "Someone in our line had it — and lost it. Don't repeat the mistake." },
  { q: "What would change if you fully believed you were allowed to prosper?", A: "I'd stop punishing myself for having more than my family had.", B: "I'd charge what I'm worth and stop apologizing.", C: "I'd let money flow in and out without panic.", D: "I'd build something that lasts instead of something that dissolves." },
];

function getDominantAnswer(answers) {
  const counts = { A: 0, B: 0, C: 0, D: 0 };
  answers.forEach((a) => { if (a && counts.hasOwnProperty(a)) counts[a]++; });
  const max = Math.max(...Object.values(counts));
  const dominantLetters = Object.keys(counts).filter((k) => counts[k] === max);
  if (dominantLetters.length === 1) return dominantLetters[0];
  const q5 = answers[4];
  if (q5 && dominantLetters.includes(q5)) return q5;
  return "MIXED";
}

const FINANCIAL_REPORTS = {
  A: { archetype: "The Scarcity Inheritor", soulLine: "Your nervous system was wired for lack before you ever earned a dollar.", body: "Your family taught you what money means before you had language for it. Scarcity wasn't a circumstance — it was a story. There was never enough. Talking about it was shameful. Wanting more was greedy. That story lives in your nervous system now, deciding what you charge, what you save, what you sabotage.\n\nThe pattern you keep meeting — building and watching it collapse, almost reaching and then watching it dissolve — isn't bad luck. It's an echo. Your body is following an old script: don't get too comfortable. Don't hold too much. The original lesson is still running.\n\nYour task is not to think positive. It's to map the wiring. To see where the scarcity story was installed, and what it would take to run a different program.", sealed: "Your full Financial Identity Map traces the scarcity imprint across your lineage — identifying the original wound, the nervous-system triggers, and the specific practices required to rewrite the story." },
  B: { archetype: "The Worth Hider", soulLine: "You give away your value before you can be seen holding it.", body: "You learned early that having was dangerous — or that wanting was wrong. So you learned to disappear your worth. You undercharge. You give it away. You spend it on others before it can be taken or judged. The pattern isn't generosity; it's a preemptive strike. If you never hold it, no one can take it. If you never claim it, no one can say you didn't deserve it.\n\nYour nervous system is still running that program. The moment money arrives, something in you moves to redistribute it — to others, to debt, to anything that makes you less visible. The ceiling you keep hitting isn't external. It's the height you were taught you were allowed to reach.\n\nYour task is to see the pattern — and to choose, one decision at a time, to stop giving your worth away before you've received it.", sealed: "Your full Financial Identity Map identifies the worth-hiding pattern — where it came from, how it operates in your pricing and spending, and the specific steps to hold your value without guilt or sabotage." },
  C: { archetype: "The Saboteur", soulLine: "You get close to breakthrough — then something in you pulls the plug.", body: "You've felt it. The moment right before the thing lands — the deal, the raise, the launch — when something in you flinches. You sabotage. You hesitate. You find a way to make it not quite happen. It's not laziness or fear of success. It's an older script: having too much was dangerous. Being too visible got someone hurt. So your system learned to cut the wire before the current gets too strong.\n\nThe pattern repeats because the original lesson was never mapped. Your conscious mind wants the breakthrough. Your nervous system is still running the old program: don't get too big. Don't hold too much. The sabotage isn't random. It's protection — outdated, but still running.\n\nYour task is to trace the pattern to its source — and to give your system a new rule: it is safe to have. It is safe to be seen.", sealed: "Your full Financial Identity Map traces the sabotage pattern — identifying the original trigger, the moments when you pull the plug, and the somatic and cognitive practices to complete the breakthrough instead of interrupting it." },
  D: { archetype: "The Ceiling Keeper", soulLine: "You have an invisible ceiling — and you're the one holding it in place.", body: "You can feel it. There's a number, a level, a height beyond which you don't let yourself go. It's not imposed by the market or your skills. It's internal. Someone in your line had more — and lost it. Or wanted more — and was punished. So your system encoded a rule: don't go past this point. The ceiling feels like safety. It's actually a limit you're enforcing on yourself.\n\nThe frustration of feeling capable of more while staying just under the line isn't a coincidence. You're following an old contract: this far, no farther. The ceiling isn't bad luck. It's a boundary you inherited — and that you can renegotiate.\n\nYour task is to identify the ceiling, trace where it came from, and decide whether the old contract still serves you — or whether you're ready to rise past it.", sealed: "Your full Financial Identity Map identifies the ceiling — where it was set, what it's protecting, and the specific steps to renegotiate the contract and allow yourself to rise past it." },
  MIXED: { archetype: "The Pattern Breaker", soulLine: "Your money story has multiple threads — and you're the one who gets to rewrite them.", body: "Your answers reveal a financial identity that doesn't fit one box. Scarcity, worth-hiding, sabotage, and ceiling-keeping — you're carrying more than one pattern. That's not confusion. It's complexity. Your lineage passed down multiple money stories, and they're all running at once.\n\nThe good news: you're not stuck with a single script. You're at the convergence point. You can see the patterns. You can feel where they conflict. That awareness is the first step toward choosing which story you want to run — and which ones you're ready to retire.\n\nYour task is to map all the threads — and to become the pattern breaker. The one who decides which inheritance to keep and which to release.", sealed: "Your full Financial Identity Map traces all active money patterns — scarcity, worth-hiding, sabotage, and ceiling — and identifies the convergence point: the specific beliefs and behaviors to rewrite so you can prosper without the old scripts running the show." },
};

function Btn({ label, onClick, disabled, primary }) {
  return (
    <div
      onClick={() => !disabled && onClick()}
      style={{
        display: "inline-block",
        padding: primary ? "16px 60px" : "14px 32px",
        fontFamily: "'Bebas Neue', sans-serif",
        fontSize: 18,
        letterSpacing: "6px",
        color: disabled ? CHROME_DARK : OBSIDIAN,
        background: primary && !disabled ? TERMINAL_GREEN : "transparent",
        border: `1px solid ${disabled ? CHARCOAL : "rgba(0,255,136,0.3)"}`,
        cursor: disabled ? "default" : "pointer",
        transition: "all 0.3s ease",
        fontStyle: "normal",
      }}
    >
      {label}
    </div>
  );
}

const TICKER_ITEMS = [
  { label: "WEALTH.INDEX", value: "+4.73%", cls: "pos" },
  { label: "SABOTAGE.FREQ", value: "-12.8%", cls: "neg" },
  { label: "PATTERN.MATCH", value: "94.2%", cls: "pos" },
  { label: "BLOODLINE.SIG", value: "ACTIVE", cls: "pos" },
  { label: "SHADOW.VAULT", value: "SEALED", cls: "neg" },
  { label: "PROSPERITY.ARC", value: "+8.91%", cls: "pos" },
  { label: "SCARCITY.LOOP", value: "-3.44%", cls: "neg" },
  { label: "THRONE.STATUS", value: "UNCLAIMED", cls: "neg" },
];

export default function FinancialIdentityIntake() {
  const [phase, setPhase] = useState("intro");
  const [d, setD] = useState({ name: "", email: "", miniAnswers: ["", "", "", "", ""] });
  const set = (k, v) => setD((p) => ({ ...p, [k]: v }));
  const go = (ph) => { setPhase(ph); window.scrollTo({ top: 0, behavior: "smooth" }); };

  // INTRO
  if (phase === "intro")
    return (
      <>
        <style dangerouslySetInnerHTML={{ __html: `
          @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Source+Serif+4:ital,wght@0,400;0,600;1,400&family=Space+Mono:ital,wght@0,400;0,700&display=swap');
          @keyframes financialTicker { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
          @keyframes financialScan { 0% { top: -3px; } 100% { top: 100vh; } }
        ` }} />
        <div style={{ minHeight: "100vh", width: "100%", background: OBSIDIAN, color: CHROME, fontFamily: "'Source Serif 4', Georgia, serif", position: "relative", overflow: "hidden" }}>
          {/* Ticker bar */}
          <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: 32, background: CHARCOAL, borderBottom: "1px solid rgba(0,255,136,0.15)", zIndex: 100, overflow: "hidden" }}>
            <div style={{ display: "flex", whiteSpace: "nowrap", animation: "financialTicker 40s linear infinite", fontFamily: "'Space Mono', monospace", fontSize: 11, lineHeight: "32px", color: GREEN_DIM, letterSpacing: "0.5px" }}>
              {[...TICKER_ITEMS, ...TICKER_ITEMS].map((t, i) => (
                <span key={i} style={{ marginRight: 50 }}>
                  <span style={{ color: CHROME_DARK }}>{t.label}</span>{" "}
                  <span style={{ color: t.cls === "pos" ? TERMINAL_GREEN : RED_ALERT }}>{t.value}</span>
                </span>
              ))}
            </div>
          </div>
          {/* Scan line */}
          <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: 3, background: "linear-gradient(90deg, transparent, rgba(0,255,136,0.12), transparent)", zIndex: 1, pointerEvents: "none", animation: "financialScan 8s linear infinite" }} />
          {/* Vertical lines */}
          <div style={{ position: "fixed", left: "15%", top: 0, width: 1, height: "100vh", background: "linear-gradient(to bottom, transparent, rgba(0,255,136,0.03), transparent)", zIndex: 1, pointerEvents: "none" }} />
          <div style={{ position: "fixed", left: "50%", top: 0, width: 1, height: "100vh", background: "linear-gradient(to bottom, transparent, rgba(0,255,136,0.05), transparent)", zIndex: 1, pointerEvents: "none" }} />
          <div style={{ position: "fixed", left: "85%", top: 0, width: 1, height: "100vh", background: "linear-gradient(to bottom, transparent, rgba(0,255,136,0.03), transparent)", zIndex: 1, pointerEvents: "none" }} />
          {/* Content */}
          <div style={{ position: "relative", minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: "80px 20px 60px", zIndex: 5 }}>
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, letterSpacing: "6px", textTransform: "uppercase", color: TERMINAL_GREEN, marginBottom: 20, fontStyle: "normal" }}>Where does your money actually go?</div>
            <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(60px, 10vw, 140px)", letterSpacing: "4px", color: WHITE, lineHeight: 0.95, textAlign: "center", textTransform: "uppercase", fontStyle: "normal" }}>
              FINANCIAL<br /><span style={{ color: TERMINAL_GREEN, textShadow: "0 0 30px rgba(0,255,136,0.3)" }}>IDENTITY</span><br />MAP
            </h1>
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 12, letterSpacing: "3px", textTransform: "uppercase", color: CHROME_DARK, marginTop: 30, textAlign: "center", fontStyle: "normal" }}>Wealth imprint · Money sabotage patterns · Prosperity architecture</div>
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: GREEN_DIM, marginTop: 12, letterSpacing: "1px", fontStyle: "normal" }}>REPORT TYPE: STANDARD | DEPTH: 79 VARIABLES | $79</div>
            <div style={{ display: "flex", gap: 4, marginTop: 40 }}>
              <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, letterSpacing: "2px", color: TERMINAL_GREEN, padding: "6px 16px", border: "1px solid rgba(0,255,136,0.3)", fontStyle: "normal" }}>MINI PREVIEW</span>
              <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color: CHROME_DARK, lineHeight: "30px", fontStyle: "normal" }}>·</span>
              <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, letterSpacing: "2px", color: TERMINAL_GREEN, padding: "6px 16px", border: "1px solid rgba(0,255,136,0.3)", fontStyle: "normal" }}>FULL DEEP INTAKE</span>
            </div>
            <p style={{ maxWidth: 520, textAlign: "center", fontSize: 16, lineHeight: 1.8, color: CHROME, marginTop: 50, fontStyle: "italic", fontWeight: 300 }}>
              Your family taught you what money means before you ever earned a dollar. Those lessons live in your nervous system — deciding what you charge, what you save, what you sabotage. Five questions. We'll show you the pattern.
            </p>
            <div style={{ marginTop: 50 }}><Btn label="ACCESS THE VAULT" onClick={() => go("start")} primary /></div>
          </div>
          <div style={{ position: "absolute", bottom: 30, left: "50%", transform: "translateX(-50%)", fontFamily: "'Space Mono', monospace", fontSize: 9, letterSpacing: "3px", textTransform: "uppercase", color: "rgba(192,192,192,0.25)", zIndex: 10, fontStyle: "normal" }}>FC SOLE · The Forgotten Code Research Institute</div>
        </div>
      </>
    );

  // START
  if (phase === "start")
    return (
      <div style={{ minHeight: "100vh", width: "100%", background: OBSIDIAN, color: CHROME, fontFamily: "'Source Serif 4', Georgia, serif", padding: "80px 24px" }}>
        <div style={{ maxWidth: 420, margin: "0 auto" }}>
          <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, letterSpacing: "0.3em", color: GREEN_DIM, marginBottom: 24, fontStyle: "normal" }}>BEFORE WE BEGIN</div>
          <label style={{ display: "block", fontFamily: "'Space Mono', monospace", fontSize: 13, color: CHROME_DARK, marginBottom: 6, fontStyle: "normal" }}>Your Name</label>
          <input value={d.name} onChange={(e) => set("name", e.target.value)} placeholder="First and last" style={{ width: "100%", padding: "14px 18px", background: CHARCOAL, border: "1px solid rgba(0,255,136,0.12)", color: CHROME, fontFamily: "'Source Serif 4', serif", fontSize: 16, marginBottom: 20, fontStyle: "normal" }} />
          <label style={{ display: "block", fontFamily: "'Space Mono', monospace", fontSize: 13, color: CHROME_DARK, marginBottom: 6, fontStyle: "normal" }}>Email Address</label>
          <input value={d.email} onChange={(e) => set("email", e.target.value)} placeholder="For receiving your reading" type="email" style={{ width: "100%", padding: "14px 18px", background: CHARCOAL, border: "1px solid rgba(0,255,136,0.12)", color: CHROME, fontFamily: "'Source Serif 4', serif", fontSize: 16, marginBottom: 36, fontStyle: "normal" }} />
          <Btn label="ACCESS THE VAULT" onClick={() => go("q1")} primary disabled={!(d.name && d.email)} />
        </div>
      </div>
    );

  // QUIZ
  const qIndex = phase === "q1" ? 0 : phase === "q2" ? 1 : phase === "q3" ? 2 : phase === "q4" ? 3 : phase === "q5" ? 4 : -1;
  const answers = d.miniAnswers || ["", "", "", "", ""];
  const setAnswer = (i, letter) => { const a = [...answers]; a[i] = letter; set("miniAnswers", a); go(i < 4 ? `q${i + 2}` : "miniResult"); };
  if (qIndex >= 0) {
    const q = FINANCIAL_QUESTIONS[qIndex];
    const opts = [{ letter: "A", text: q.A }, { letter: "B", text: q.B }, { letter: "C", text: q.C }, { letter: "D", text: q.D }];
    return (
      <div style={{ minHeight: "100vh", width: "100%", background: OBSIDIAN, color: CHROME, fontFamily: "'Source Serif 4', Georgia, serif", padding: "60px 24px" }}>
        <div style={{ maxWidth: 640, margin: "0 auto" }}>
          <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, letterSpacing: "0.2em", color: GREEN_DIM, textAlign: "center", marginBottom: 24, fontStyle: "normal" }}>Variable {qIndex + 1} of V</div>
          <p style={{ fontFamily: "'Source Serif 4', serif", fontSize: "clamp(1.1rem,2.8vw,1.5rem)", color: CHROME, textAlign: "center", marginBottom: 40, lineHeight: 1.6, fontStyle: "normal" }}>"{q.q}"</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {opts.map(({ letter, text }) => (
              <div key={letter} onClick={() => setAnswer(qIndex, letter)} style={{ padding: "20px 24px", background: "rgba(0,255,136,0.03)", border: "1px solid rgba(0,255,136,0.12)", cursor: "pointer", fontFamily: "'Source Serif 4', serif", fontSize: "1.05rem", color: CHROME, lineHeight: 1.6, fontStyle: "normal" }}>
                {text}
              </div>
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "center", gap: 12, marginTop: 50 }}>
            {[0, 1, 2, 3, 4].map((i) => <div key={i} style={{ width: 6, height: 6, borderRadius: "50%", background: i <= qIndex ? TERMINAL_GREEN : "rgba(0,255,136,0.15)" }} />)}
          </div>
        </div>
      </div>
    );
  }

  // MINI RESULT
  if (phase === "miniResult") {
    const dominant = getDominantAnswer(answers);
    const r = FINANCIAL_REPORTS[dominant] || FINANCIAL_REPORTS.MIXED;
    return (
      <div style={{ minHeight: "100vh", width: "100%", background: OBSIDIAN, color: CHROME, fontFamily: "'Source Serif 4', Georgia, serif", padding: "80px 24px" }}>
        <div style={{ maxWidth: 680, margin: "0 auto" }}>
          <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, letterSpacing: "0.2em", color: GREEN_DIM, textAlign: "center", marginBottom: 20, fontStyle: "normal" }}>Your Wealth Imprint Preview</div>
          <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(1.6rem,4vw,2.4rem)", color: WHITE, textAlign: "center", marginBottom: 12, fontStyle: "normal" }}>{r.archetype}</h2>
          <p style={{ fontFamily: "'Source Serif 4', serif", fontSize: "1.15rem", color: CHROME_DARK, textAlign: "center", marginBottom: 40, fontStyle: "normal" }}>{r.soulLine}</p>
          <div style={{ width: 60, height: 1, background: "rgba(0,255,136,0.3)", margin: "0 auto 40px" }} />
          <div style={{ marginBottom: 40 }}>{r.body.split("\n\n").map((para, i) => <p key={i} style={{ fontFamily: "'Source Serif 4', serif", fontSize: "1.15rem", lineHeight: 1.9, color: CHROME, marginBottom: 20, fontStyle: "normal" }}>{para}</p>)}</div>
          <div style={{ padding: "30px", border: "1px solid rgba(0,255,136,0.15)", background: "rgba(0,255,136,0.02)", textAlign: "center", marginBottom: 50 }}>
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, letterSpacing: "0.2em", color: GREEN_DIM, marginBottom: 16, fontStyle: "normal" }}>The Sealed Section</div>
            <p style={{ fontFamily: "'Source Serif 4', serif", fontSize: "1.05rem", lineHeight: 1.7, color: CHROME_DARK, fontStyle: "normal" }}>{r.sealed}</p>
          </div>
          <div style={{ textAlign: "center" }}>
            <a href="https://paypal.me/JSnider364/79" target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", padding: "18px 52px", fontFamily: "'Bebas Neue', sans-serif", fontSize: 18, letterSpacing: "6px", color: OBSIDIAN, background: TERMINAL_GREEN, border: "none", cursor: "pointer", textDecoration: "none", fontStyle: "normal" }}>Unlock Your Full Financial Identity Map</a>
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 12, letterSpacing: "2px", color: CHROME_DARK, marginTop: 16, fontStyle: "normal" }}>$79</div>
            <p style={{ fontFamily: "'Source Serif 4', serif", fontSize: "0.95rem", lineHeight: 1.7, color: CHROME_DARK, marginTop: 24, maxWidth: 420, margin: "24px auto 0", fontStyle: "normal" }}>Wealth imprint analysis, money sabotage patterns, family money stories, and nervous-system based prosperity design — mapped across 10 sections and 69+ diagnostic questions.</p>
          </div>
          <div style={{ textAlign: "center", marginTop: 40 }}><Btn label="← EDIT MY ANSWERS" onClick={() => go("q1")} /></div>
        </div>
      </div>
    );
  }

  return null;
}
