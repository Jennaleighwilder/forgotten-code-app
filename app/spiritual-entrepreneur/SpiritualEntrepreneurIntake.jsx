"use client";
import { useState } from "react";

// The Spiritual Entrepreneur — Sacred Commerce Profiles — $79 | Route: /spiritual-entrepreneur
// Indian spice market + sacred geometry — Philosopher, Lora, Rajdhani | saffron, turmeric, cardamom, bazaar-dark
// Pure CSS intro (no JS, no canvas)

const BAZAAR = "#0e0c0a";
const SAFFRON = "#e8a020";
const TURMERIC = "#c07818";
const CARDAMOM = "#2a6848";
const INCENSE = "#8a7e6e";
const WARM_CREAM = "#f4e8d0";
const BODY_TEXT = "#a89878";

const SPIRITUAL_QUESTIONS = [
  { q: "What did your bloodline carry that still runs through your business?", A: "Trade routes and commerce — we've always been in the exchange of value.", B: "Healing practices and service — we've always been in the care of others.", C: "Sacred economies and ritual — we've always woven spirit and transaction.", D: "I don't know — it was never spoken, but I feel it in my bones." },
  { q: "When you charge for your work, what comes up first?", A: "Guilt — I should give more away.", B: "Fear — they won't pay that.", C: "Clarity — this is the value; this is the exchange.", D: "Confusion — I don't know what I'm worth." },
  { q: "Where does the 'oracle within the founder' show up for you?", A: "I know things before they happen — about clients, offers, timing.", B: "I feel what others need before they say it.", C: "I see the bigger pattern — how pieces connect.", D: "I don't trust it yet — it feels too mystical for business." },
  { q: "What would soul-aligned revenue look like for you?", A: "Enough to be free — and to give from overflow.", B: "Enough to fund the mission — every dollar has purpose.", C: "Enough to prove the old story wrong — we can have and hold.", D: "I'm not sure — I've never let myself imagine it fully." },
  { q: "If your business could speak one sentence about your ancestral commerce lineage, what would it say?", A: "We were always meant to trade — and to do it with integrity.", B: "We were always meant to serve — and to be paid for it.", C: "We were always meant to weave spirit and matter — sacred commerce.", D: "We were always meant to break the old pattern — and build something new." },
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

const SPIRITUAL_REPORTS = {
  A: { archetype: "The Trader", soulLine: "Your bloodline carried trade routes — and that current is still running.", body: "You've always been in the exchange of value. Not in a cold, transactional way — in a way that understands that commerce is relationship. That fair exchange is sacred. Your guilt around charging, or your fear that they won't pay, isn't about the number. It's about an old story that said having was wrong.\n\nYour task is not to charge less. It's to map where that story came from — and to let your ancestral trader stand in the marketplace with integrity. Soul-aligned revenue for you means enough to be free, and to give from overflow. The oracle within the founder? It knows the timing. Trust it.", sealed: "Your full Sacred Commerce Profile traces your ancestral trade lineage — and identifies the specific beliefs and practices to run soul-aligned revenue without guilt or collapse." },
  B: { archetype: "The Healer-Commerce", soulLine: "Your bloodline carried healing practices — and you're learning to be paid for them.", body: "You've always been in the care of others. Service is your native language. But somewhere you learned that charging for care was wrong — that real healers don't take. So you give too much, charge too little, and burn out. The oracle within the founder? It feels what others need before they say it. That's not a liability. It's your edge.\n\nSoul-aligned revenue for you means enough to fund the mission — every dollar has purpose. Your task is to see that being paid well lets you serve more, not less. The old story that said 'healer' and 'wealth' don't mix is the one to dissolve.", sealed: "Your full Sacred Commerce Profile maps your healer-commerce lineage — and identifies the specific beliefs and pricing practices to sustain your service without sacrifice." },
  C: { archetype: "The Sacred Economist", soulLine: "Your bloodline wove spirit and transaction — sacred commerce is your inheritance.", body: "You see the bigger pattern. How spirit and matter connect. How money can be a current, not a block. You've probably been told that's 'too mystical' for business — or that you have to choose: spiritual or successful. Your bloodline says otherwise. Sacred economies and ritual were the original architecture.\n\nThe oracle within the founder shows up as knowing — about clients, offers, timing. Soul-aligned revenue for you means weaving spirit and transaction so clearly that the old split dissolves. Your task is to stop apologizing for the weave — and to build the structure that holds it.", sealed: "Your full Sacred Commerce Profile traces your sacred economy lineage — and identifies the specific practices to run the oracle within the founder without collapse or confusion." },
  D: { archetype: "The Pattern Breaker", soulLine: "You're the one who gets to break the old story — and build something new.", body: "You don't know exactly what your bloodline carried — it was never spoken. But you feel it in your bones. And you know this much: you're not meant to repeat the old pattern. The one that said having was wrong, or that spiritual people don't charge, or that you don't get to imagine fully. You're the one who gets to break that — and build something new.\n\nSoul-aligned revenue might still be unclear. That's okay. The map isn't finished yet. Your task is to let yourself imagine it fully — and to trust the oracle even when it feels too mystical for business. It's not. It's your lineage waking up.", sealed: "Your full Sacred Commerce Profile maps the unspoken lineage — and identifies the specific beliefs to release so you can build the commerce structure that has never existed in your line before." },
  MIXED: { archetype: "The Convergence", soulLine: "Your sacred commerce profile has multiple threads — and you're at the convergence point.", body: "Your answers reveal a founder who carries more than one lineage — trader, healer, sacred economist, pattern breaker. That's not confusion. It's convergence. The old story tried to make you choose: spiritual or successful, give or receive, mystic or merchant. Your bloodline says you get to hold more than one.\n\nYour task is to map all the threads — and to become the founder who doesn't have to choose. Soul-aligned revenue for you might look like a blend: enough to be free, enough to fund the mission, enough to weave spirit and matter, and enough to prove the old story wrong. The oracle within the founder is already running. Let the map show you how.", sealed: "Your full Sacred Commerce Profile traces all active lineages — and identifies the convergence point: the specific beliefs and practices to run soul-aligned revenue without collapse, guilt, or confusion." },
};

function Btn({ label, onClick, disabled, primary }) {
  return (
    <div
      onClick={() => !disabled && onClick()}
      style={{
        display: "inline-block",
        padding: primary ? "16px 48px" : "14px 32px",
        fontFamily: "'Rajdhani', sans-serif",
        fontWeight: 600,
        fontSize: 14,
        letterSpacing: "3px",
        textTransform: "uppercase",
        color: disabled ? INCENSE + "99" : BAZAAR,
        background: primary && !disabled ? SAFFRON : "transparent",
        border: `1px solid ${disabled ? "rgba(232,160,32,0.2)" : "rgba(232,160,32,0.4)"}`,
        cursor: disabled ? "default" : "pointer",
        transition: "all 0.3s ease",
        fontStyle: "normal",
      }}
    >
      {label}
    </div>
  );
}

const SE_INTRO_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Philosopher:ital,wght@0,400;0,700;1,400&family=Lora:ital,wght@0,400;0,500;1,400&family=Rajdhani:wght@300;400;500;600&display=swap');
  .se-intro { background: #0e0c0a; overflow: hidden; height: 100vh; width: 100%; position: relative; font-family: 'Lora', serif; }
  .se-intro .se-ambient { position: fixed; top: 50%; left: 50%; width: 130%; height: 130%; transform: translate(-50%, -50%); background: radial-gradient(ellipse at center, rgba(232,160,32,0.06) 0%, transparent 50%); z-index: 1; pointer-events: none; animation: seAmbPulse 8s ease-in-out infinite; }
  @keyframes seAmbPulse { 0%, 100% { opacity: 0.5; } 50% { opacity: 1; } }
  .se-intro .se-ring { position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); border-radius: 50%; border: 2px solid rgba(232,160,32,0.2); pointer-events: none; z-index: 2; }
  .se-intro .se-ring-1 { width: 200px; height: 200px; animation: seRingRot 30s linear infinite; }
  .se-intro .se-ring-2 { width: 320px; height: 320px; border-color: rgba(42,104,72,0.12); animation: seRingRot 60s linear infinite reverse; }
  @keyframes seRingRot { 0% { transform: translate(-50%, -50%) rotate(0deg); } 100% { transform: translate(-50%, -50%) rotate(360deg); } }
  .se-intro .se-page { position: relative; z-index: 20; height: 100vh; display: flex; flex-direction: column; justify-content: center; align-items: center; padding: 40px 20px; }
  .se-intro .se-overline { font-family: 'Rajdhani', sans-serif; font-weight: 500; font-size: 10px; letter-spacing: 6px; text-transform: uppercase; color: #8a7e6e; margin-bottom: 28px; opacity: 0; animation: seSoftIn 2.5s ease-out 0.3s forwards; }
  .se-intro .se-title { font-family: 'Philosopher', serif; font-weight: 700; font-size: clamp(44px, 8vw, 100px); line-height: 0.95; text-align: center; letter-spacing: 2px; opacity: 0; animation: seTitleReveal 3s ease-out 0.6s forwards, seGoldShimmer 6s ease-in-out 3.5s infinite; background: linear-gradient(110deg, #f4e8d0 0%, #fff4d0 30%, #ffe8a0 50%, #f4e8d0 70%, #e8a020 100%); background-size: 300% 100%; -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
  @keyframes seGoldShimmer { 0% { background-position: 100% 50%; } 100% { background-position: -100% 50%; } }
  @keyframes seTitleReveal { 0% { opacity: 0; letter-spacing: 12px; filter: blur(5px); } 40% { opacity: 0.7; letter-spacing: 4px; filter: blur(1px); } 100% { opacity: 1; letter-spacing: 2px; filter: blur(0); } }
  .se-intro .se-line2 { display: block; font-family: 'Rajdhani', sans-serif; font-weight: 500; font-size: clamp(10px, 1.6vw, 14px); letter-spacing: 8px; text-transform: uppercase; margin-top: 14px; color: #c07818; opacity: 0; animation: seSoftIn 2.5s ease-out 1.8s forwards; }
  .se-intro .se-editorial { width: 0; height: 1px; background: linear-gradient(90deg, transparent, #f0a830, transparent); margin: 24px auto; opacity: 0; animation: seLineGrow 2s ease-out 2.1s forwards; }
  @keyframes seLineGrow { 0% { opacity: 0; width: 0; } 100% { opacity: 0.6; width: 60px; } }
  .se-intro .se-subtitle { font-family: 'Rajdhani', sans-serif; font-weight: 400; font-size: 10px; letter-spacing: 3px; text-transform: uppercase; color: #8a7e6e; text-align: center; line-height: 2.2; opacity: 0; animation: seSoftIn 2.5s ease-out 2.4s forwards; }
  .se-intro .se-hook { max-width: 480px; text-align: center; font-family: 'Lora', serif; font-size: 15px; font-weight: 400; font-style: italic; line-height: 1.9; color: #a89878; margin-top: 28px; opacity: 0; animation: seSoftIn 2.5s ease-out 2.8s forwards; }
  .se-intro .se-cta { display: inline-block; margin-top: 32px; font-family: 'Rajdhani', sans-serif; font-weight: 600; font-size: 11px; letter-spacing: 5px; text-transform: uppercase; color: #0e0c0a; background: #e8a020; padding: 16px 44px; border: none; cursor: pointer; opacity: 0; animation: seSoftIn 2.5s ease-out 3.2s forwards; transition: all 0.4s ease; text-decoration: none; }
  .se-intro .se-cta:hover { background: #f0a830; box-shadow: 0 0 30px rgba(232,160,32,0.3); }
  @keyframes seSoftIn { 0% { opacity: 0; transform: translateY(10px); } 100% { opacity: 1; transform: translateY(0); } }
  .se-intro .se-footer { position: fixed; bottom: 18px; left: 0; right: 0; text-align: center; z-index: 20; opacity: 0; animation: seSoftIn 2s ease-out 3.5s forwards; }
  .se-intro .se-footer-text { font-family: 'Rajdhani', sans-serif; font-weight: 300; font-size: 8px; letter-spacing: 3px; text-transform: uppercase; color: rgba(138,126,110,0.35); }
`;

export default function SpiritualEntrepreneurIntake() {
  const [phase, setPhase] = useState("intro");
  const [d, setD] = useState({ name: "", email: "", miniAnswers: ["", "", "", "", ""] });
  const set = (k, v) => setD((p) => ({ ...p, [k]: v }));
  const go = (ph) => { setPhase(ph); window.scrollTo({ top: 0, behavior: "smooth" }); };

  if (phase === "intro")
    return (
      <div className="se-intro">
        <style dangerouslySetInnerHTML={{ __html: SE_INTRO_CSS }} />
        <div className="se-ambient" />
        <div className="se-ring se-ring-1" />
        <div className="se-ring se-ring-2" />
        <section className="se-page">
          <div className="se-overline">Mirror Protocol for Business Alchemy</div>
          <h1 className="se-title">
            The Spiritual Entrepreneur
            <span className="se-line2">Sacred Commerce Profiles</span>
          </h1>
          <div className="se-editorial" />
          <div className="se-subtitle">
            Ancestral commerce lineages · Soul-aligned revenue<br />
            Sacred business architecture · The oracle within the founder
          </div>
          <p className="se-hook">
            Your bloodline carried trade routes, healing practices, and sacred economies for centuries before you were born. That current is still running through your business — whether you built it on purpose or not.
          </p>
          <button type="button" className="se-cta" onClick={() => go("start")}>Reveal Your Sacred Archetype</button>
        </section>
        <footer className="se-footer">
          <div className="se-footer-text">The Forgotten Code Research Institute</div>
        </footer>
      </div>
    );

  if (phase === "start")
    return (
      <div style={{ minHeight: "100vh", width: "100%", background: BAZAAR, color: WARM_CREAM, fontFamily: "'Lora', Georgia, serif", padding: "80px 24px" }}>
        <div style={{ maxWidth: 420, margin: "0 auto" }}>
          <div style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: 12, letterSpacing: "0.2em", color: INCENSE, marginBottom: 24, fontStyle: "normal" }}>BEFORE WE BEGIN</div>
          <label style={{ display: "block", fontFamily: "'Rajdhani', sans-serif", fontSize: 13, color: INCENSE, marginBottom: 6, fontStyle: "normal" }}>Your Name</label>
          <input value={d.name} onChange={(e) => set("name", e.target.value)} placeholder="First and last" style={{ width: "100%", padding: "14px 18px", background: "rgba(30,26,22,0.9)", border: "1px solid rgba(232,160,32,0.2)", color: WARM_CREAM, fontFamily: "'Lora', serif", fontSize: 16, marginBottom: 20, fontStyle: "normal" }} />
          <label style={{ display: "block", fontFamily: "'Rajdhani', sans-serif", fontSize: 13, color: INCENSE, marginBottom: 6, fontStyle: "normal" }}>Email Address</label>
          <input value={d.email} onChange={(e) => set("email", e.target.value)} placeholder="For receiving your reading" type="email" style={{ width: "100%", padding: "14px 18px", background: "rgba(30,26,22,0.9)", border: "1px solid rgba(232,160,32,0.2)", color: WARM_CREAM, fontFamily: "'Lora', serif", fontSize: 16, marginBottom: 36, fontStyle: "normal" }} />
          <Btn label="REVEAL YOUR SACRED ARCHETYPE" onClick={() => go("q1")} primary disabled={!(d.name && d.email)} />
        </div>
      </div>
    );

  const qIndex = phase === "q1" ? 0 : phase === "q2" ? 1 : phase === "q3" ? 2 : phase === "q4" ? 3 : phase === "q5" ? 4 : -1;
  const answers = d.miniAnswers || ["", "", "", "", ""];
  const setAnswer = (i, letter) => { const a = [...answers]; a[i] = letter; set("miniAnswers", a); go(i < 4 ? `q${i + 2}` : "miniResult"); };
  if (qIndex >= 0) {
    const q = SPIRITUAL_QUESTIONS[qIndex];
    const opts = [{ letter: "A", text: q.A }, { letter: "B", text: q.B }, { letter: "C", text: q.C }, { letter: "D", text: q.D }];
    return (
      <div style={{ minHeight: "100vh", width: "100%", background: BAZAAR, color: WARM_CREAM, fontFamily: "'Lora', Georgia, serif", padding: "60px 24px" }}>
        <div style={{ maxWidth: 640, margin: "0 auto" }}>
          <div style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: 11, letterSpacing: "0.2em", color: INCENSE, textAlign: "center", marginBottom: 24, fontStyle: "normal" }}>Question {qIndex + 1} of 5</div>
          <p style={{ fontFamily: "'Lora', serif", fontSize: "clamp(1.1rem,2.8vw,1.5rem)", color: WARM_CREAM, textAlign: "center", marginBottom: 40, lineHeight: 1.6, fontStyle: "italic" }}>"{q.q}"</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {opts.map(({ letter, text }) => (
              <div key={letter} onClick={() => setAnswer(qIndex, letter)} style={{ padding: "20px 24px", background: "rgba(232,160,32,0.04)", border: "1px solid rgba(232,160,32,0.15)", cursor: "pointer", fontFamily: "'Lora', serif", fontSize: "1.05rem", color: WARM_CREAM, lineHeight: 1.6, fontStyle: "normal" }}>
                {text}
              </div>
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "center", gap: 12, marginTop: 50 }}>
            {[0, 1, 2, 3, 4].map((i) => <div key={i} style={{ width: 6, height: 6, borderRadius: "50%", background: i <= qIndex ? SAFFRON : "rgba(232,160,32,0.2)" }} />)}
          </div>
        </div>
      </div>
    );
  }

  if (phase === "miniResult") {
    const dominant = getDominantAnswer(answers);
    const r = SPIRITUAL_REPORTS[dominant] || SPIRITUAL_REPORTS.MIXED;
    return (
      <div style={{ minHeight: "100vh", width: "100%", background: BAZAAR, color: WARM_CREAM, fontFamily: "'Lora', Georgia, serif", padding: "80px 24px" }}>
        <div style={{ maxWidth: 680, margin: "0 auto" }}>
          <div style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: 11, letterSpacing: "0.2em", color: INCENSE, textAlign: "center", marginBottom: 20, fontStyle: "normal" }}>Your Sacred Commerce Preview</div>
          <h2 style={{ fontFamily: "'Philosopher', serif", fontSize: "clamp(1.6rem,4vw,2.4rem)", color: SAFFRON, textAlign: "center", marginBottom: 12, fontStyle: "normal" }}>{r.archetype}</h2>
          <p style={{ fontFamily: "'Lora', serif", fontSize: "1.15rem", color: BODY_TEXT, textAlign: "center", marginBottom: 40, fontStyle: "italic" }}>{r.soulLine}</p>
          <div style={{ width: 60, height: 1, background: "rgba(232,160,32,0.3)", margin: "0 auto 40px" }} />
          <div style={{ marginBottom: 40 }}>{r.body.split("\n\n").map((para, i) => <p key={i} style={{ fontFamily: "'Lora', serif", fontSize: "1.15rem", lineHeight: 1.9, color: WARM_CREAM, marginBottom: 20, fontStyle: "normal" }}>{para}</p>)}</div>
          <div style={{ padding: "30px", border: "1px solid rgba(232,160,32,0.2)", background: "rgba(232,160,32,0.03)", textAlign: "center", marginBottom: 50 }}>
            <div style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: 10, letterSpacing: "0.2em", color: INCENSE, marginBottom: 16, fontStyle: "normal" }}>The Sealed Section</div>
            <p style={{ fontFamily: "'Lora', serif", fontSize: "1.05rem", lineHeight: 1.7, color: BODY_TEXT, fontStyle: "normal" }}>{r.sealed}</p>
          </div>
          <div style={{ textAlign: "center" }}>
            <a href="https://paypal.me/JSnider364/79" target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", padding: "18px 52px", fontFamily: "'Rajdhani', sans-serif", fontWeight: 600, fontSize: 14, letterSpacing: "3px", color: BAZAAR, background: SAFFRON, border: "none", cursor: "pointer", textDecoration: "none", fontStyle: "normal" }}>Unlock Your Full Sacred Commerce Profile</a>
            <div style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: 12, letterSpacing: "2px", color: INCENSE, marginTop: 16, fontStyle: "normal" }}>$79</div>
            <p style={{ fontFamily: "'Lora', serif", fontSize: "0.95rem", lineHeight: 1.7, color: BODY_TEXT, marginTop: 24, maxWidth: 420, margin: "24px auto 0", fontStyle: "normal" }}>Ancestral commerce lineages, soul-aligned revenue, sacred business architecture, and the oracle within the founder — mapped across 10 sections.</p>
          </div>
          <div style={{ textAlign: "center", marginTop: 40 }}><Btn label="← EDIT MY ANSWERS" onClick={() => go("q1")} /></div>
        </div>
      </div>
    );
  }

  return null;
}
