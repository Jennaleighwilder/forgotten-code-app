"use client";
import { useState } from "react";

// Attachment Bonds — Your Love Architecture — $79 | Route: /attachment-bonds
// Versailles / Marie Antoinette — LIGHT bg #d4c4b8 — Bodoni Moda, Josefin Sans
// Pure CSS intro (no JS, no canvas)

const WARM_CREAM_BG = "#d4c4b8";
const ANTIQUE_GOLD = "rgba(155,120,55,0.85)";
const DARK_TEXT = "rgba(55,38,25,0.85)";
const BODY_TEXT = "rgba(42,28,18,0.82)";
const FROSTED = "rgba(212,196,184,0.72)";

const ATTACHMENT_QUESTIONS = [
  { q: "What bond pattern keeps repeating in your relationships?", A: "I chase — and they pull away. Or they chase — and I pull away.", B: "I merge completely — then feel smothered and need to escape.", C: "I pick people who can't fully show up — then blame them for not being enough.", D: "I don't let anyone close enough to really see me — so no one can leave." },
  { q: "Where did you learn what love was supposed to look like?", A: "At home — from my parents' marriage or their absence.", B: "From stories — books, films, religion — a template I've been trying to fit.", C: "From early heartbreak — I learned what to avoid but not what to build.", D: "I'm not sure — it was never modeled clearly; I'm still figuring it out." },
  { q: "What chemical signature did your nervous system learn in childhood?", A: "Love is unstable — here one day, gone the next. I'm always braced for loss.", B: "Love is conditional — I have to perform, achieve, or be good to be loved.", C: "Love is dangerous — getting close means getting hurt. Distance is safer.", D: "Love is scarce — there's never enough. I have to fight for it or go without." },
  { q: "If you could break one toxic cycle in your bonding pattern, what would it be?", A: "The push-pull — I want to be able to stay close without fleeing or chasing.", B: "The merger — I want to love without losing myself in the other.", C: "The picking — I want to choose people who can actually meet me.", D: "The wall — I want to let someone in without the fear that they'll destroy me." },
  { q: "What would 'bond alchemy' — turning old wounds into secure attachment — look like for you?", A: "Knowing that I'm lovable even when I'm not performing — and that they're not leaving.", B: "Being able to need someone without shame — and to receive without guilt.", C: "Choosing partners who are capable of reciprocity — and believing I deserve that.", D: "Letting someone see the parts I've hidden — and surviving the vulnerability." },
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

const ATTACHMENT_REPORTS = {
  A: { archetype: "The Chase Cycle", soulLine: "Your nervous system learned that love is unstable — and you're always braced for loss.", body: "You chase — and they pull away. Or they chase — and you pull away. It's not random. It's the chemical signature your nervous system learned in childhood. Love was here one day, gone the next. So you learned to brace for loss. To chase to keep it, or to pull away before it leaves. The push-pull isn't a character flaw. It's an adaptation.\n\nBond alchemy for you means learning that you're lovable even when you're not performing — and that they're not leaving. It means giving your system new evidence: stability is possible. Your task is to map where the instability was installed — and to start building the pattern that says: I can stay close without fleeing or chasing.", sealed: "Your full Love Architecture report traces the chase cycle — and identifies the specific beliefs and practices to build secure attachment without push-pull." },
  B: { archetype: "The Merger", soulLine: "Your nervous system learned that love is conditional — and you have to become someone else to be loved.", body: "You merge completely — then feel smothered and need to escape. You've learned that love means becoming what they need. Performing. Achieving. Being good enough. So you lose yourself in the other — and then the part of you that knows you've disappeared pulls the emergency brake. The merger isn't love. It's the old story that said: I have to be someone else to be loved.\n\nBond alchemy for you means being able to need someone without shame — and to receive without guilt. It means loving without losing yourself. Your task is to map where the conditional love was installed — and to build the pattern that says: I get to be me and still be loved.", sealed: "Your full Love Architecture report traces the merger pattern — and identifies the specific beliefs and practices to bond without losing yourself." },
  C: { archetype: "The Picker", soulLine: "Your nervous system learned that love is dangerous — so you pick people who can't fully show up.", body: "You pick people who can't fully show up — then blame them for not being enough. It's not bad luck. It's protection. If you choose someone who can't meet you, you never have to risk being fully seen — or fully left. Getting close means getting hurt. So your system picks at a distance. The picker pattern isn't stupidity. It's the old story that said: love is dangerous.\n\nBond alchemy for you means choosing partners who are capable of reciprocity — and believing you deserve that. It means letting your system learn that safe love is possible. Your task is to map where the danger was installed — and to build the pattern that says: I get to choose someone who can actually meet me.", sealed: "Your full Love Architecture report traces the picker pattern — and identifies the specific beliefs and practices to choose and receive reciprocal love." },
  D: { archetype: "The Wall", soulLine: "Your nervous system learned that love is scarce — so you don't let anyone close enough to leave.", body: "You don't let anyone close enough to really see you — so no one can leave. Or so it feels. The wall isn't coldness. It's the belief that there's never enough. That if you need too much, you'll be abandoned. So you don't need. You don't ask. You don't let them in. Distance is safer. But the wall also keeps out the love you want.\n\nBond alchemy for you means letting someone see the parts you've hidden — and surviving the vulnerability. It means giving your system new evidence: I can be seen and not destroyed. Your task is to map where the scarcity was installed — and to build the pattern that says: I get to need and still be loved.", sealed: "Your full Love Architecture report traces the wall pattern — and identifies the specific beliefs and practices to let love in without collapse." },
  MIXED: { archetype: "The Alchemist", soulLine: "Your love architecture has multiple threads — and you're at the convergence point.", body: "Your answers reveal a bonding pattern that doesn't fit one box. Chase, merger, picker, wall — you've lived more than one. That's not confusion. It's complexity. Every bond you've ever formed left a chemical signature in your nervous system. Some of those signatures are medicine. Some are poison. You're learning to tell the difference.\n\nBond alchemy for you means mapping all the threads — and becoming the one who doesn't have to repeat the old pattern. You get to break the cycle. You get to build something new. Your task is to see where each signature was installed — and to choose which ones to keep and which to release.", sealed: "Your full Love Architecture report traces all attachment patterns — chase, merger, picker, wall — and identifies the convergence point: the specific beliefs and practices to build secure attachment and bond alchemy." },
};

function Btn({ label, onClick, disabled, primary }) {
  return (
    <div
      onClick={() => !disabled && onClick()}
      style={{
        display: "inline-block",
        padding: primary ? "16px 44px" : "14px 32px",
        fontFamily: "'Josefin Sans', sans-serif",
        fontWeight: 400,
        fontSize: 10,
        letterSpacing: "4px",
        textTransform: "uppercase",
        color: disabled ? "rgba(55,38,25,0.5)" : DARK_TEXT,
        background: "transparent",
        border: `1px solid ${disabled ? "rgba(155,120,55,0.2)" : "rgba(155,120,55,0.45)"}`,
        cursor: disabled ? "default" : "pointer",
        transition: "all 0.4s ease",
        fontStyle: "normal",
      }}
    >
      {label}
    </div>
  );
}

const AB_INTRO_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@200;300;400&family=Bodoni+Moda:ital,wght@0,400;0,500;0,600;1,400;1,500&display=swap');
  .ab-intro { background: #d4c4b8; overflow: hidden; height: 100vh; width: 100%; position: relative; font-family: 'Bodoni Moda', serif; }
  .ab-intro .ab-frame { position: fixed; top: 20px; left: 20px; right: 20px; bottom: 20px; border: 3px solid rgba(155,120,55,0.45); border-radius: 6px; z-index: 2; pointer-events: none; animation: abFrameBreathe 10s ease-in-out infinite; }
  .ab-intro .ab-frame::before { content: ''; position: absolute; top: 8px; left: 8px; right: 8px; bottom: 8px; border: 1.5px solid rgba(155,120,55,0.25); border-radius: 3px; }
  @keyframes abFrameBreathe { 0%, 100% { border-color: rgba(155,120,55,0.35); } 50% { border-color: rgba(155,120,55,0.65); } }
  .ab-intro .ab-fdl { position: fixed; pointer-events: none; z-index: 3; font-size: 32px; color: rgba(155,120,55,0.5); animation: abFdlPulse 6s ease-in-out infinite; }
  .ab-intro .ab-fdl-tl { top: 28px; left: 30px; }
  .ab-intro .ab-fdl-tr { top: 28px; right: 30px; animation-delay: 1.5s; }
  .ab-intro .ab-fdl-bl { bottom: 28px; left: 30px; animation-delay: 3s; }
  .ab-intro .ab-fdl-br { bottom: 28px; right: 30px; animation-delay: 4.5s; }
  @keyframes abFdlPulse { 0%, 100% { opacity: 0.5; } 50% { opacity: 1; } }
  .ab-intro .ab-panel { position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); width: min(520px, 86vw); min-height: min(400px, 70vh); background: rgba(212,196,184,0.72); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); border: 1px solid rgba(155,120,55,0.1); border-radius: 4px; z-index: 10; pointer-events: none; }
  .ab-intro .ab-page { position: relative; z-index: 20; height: 100vh; display: flex; flex-direction: column; justify-content: center; align-items: center; padding: 40px 20px; }
  .ab-intro .ab-overline { font-family: 'Josefin Sans', sans-serif; font-weight: 300; font-size: 10px; letter-spacing: 6px; text-transform: uppercase; color: rgba(55,38,25,0.85); margin-bottom: 28px; opacity: 0; animation: abSoftIn 2.5s ease-out 0.4s forwards; }
  .ab-intro .ab-title { font-family: 'Bodoni Moda', serif; font-weight: 600; font-size: clamp(44px, 8vw, 96px); line-height: 0.95; text-align: center; letter-spacing: 2px; opacity: 0; animation: abTitleReveal 3.5s ease-out 0.8s forwards, abGildShimmer 7s ease-in-out 4s infinite; background: linear-gradient(115deg, #4a3218 0%, #a87830 25%, #d8bc70 50%, #a87830 75%, #4a3218 100%); background-size: 300% 100%; -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
  @keyframes abGildShimmer { 0% { background-position: 100% 50%; } 100% { background-position: -100% 50%; } }
  @keyframes abTitleReveal { 0% { opacity: 0; letter-spacing: 16px; filter: blur(8px); } 40% { opacity: 0.7; letter-spacing: 4px; filter: blur(2px); } 100% { opacity: 1; letter-spacing: 2px; filter: blur(0); } }
  .ab-intro .ab-line2 { display: block; font-family: 'Josefin Sans', sans-serif; font-weight: 300; font-size: clamp(10px, 1.6vw, 14px); letter-spacing: 8px; text-transform: uppercase; margin-top: 14px; color: rgba(55,38,25,0.8); -webkit-text-fill-color: rgba(55,38,25,0.8); opacity: 0; animation: abSoftIn 2.5s ease-out 2.2s forwards; }
  .ab-intro .ab-divider { font-size: 14px; letter-spacing: 12px; color: rgba(140,108,48,0.7); margin: 20px 0; opacity: 0; animation: abSoftIn 2s ease-out 2.5s forwards; }
  .ab-intro .ab-subtitle { font-family: 'Josefin Sans', sans-serif; font-weight: 300; font-size: 10px; letter-spacing: 3px; text-transform: uppercase; color: rgba(55,38,25,0.85); text-align: center; line-height: 2.4; opacity: 0; animation: abSoftIn 2.5s ease-out 2.8s forwards; }
  .ab-intro .ab-hook { max-width: 400px; text-align: center; font-family: 'Bodoni Moda', serif; font-size: 15px; font-weight: 400; font-style: italic; line-height: 2; color: rgba(42,28,18,0.82); margin-top: 28px; opacity: 0; animation: abSoftIn 2.5s ease-out 3.2s forwards; }
  .ab-intro .ab-cta { display: inline-block; margin-top: 32px; font-family: 'Josefin Sans', sans-serif; font-weight: 400; font-size: 9px; letter-spacing: 6px; text-transform: uppercase; color: rgba(55,38,25,0.85); background: transparent; padding: 16px 44px; border: 1px solid rgba(155,120,55,0.35); cursor: pointer; opacity: 0; animation: abSoftIn 2.5s ease-out 3.6s forwards; transition: all 0.4s ease; text-decoration: none; }
  .ab-intro .ab-cta:hover { border-color: rgba(155,120,55,0.6); }
  @keyframes abSoftIn { 0% { opacity: 0; transform: translateY(10px); } 100% { opacity: 1; transform: translateY(0); } }
  .ab-intro .ab-footer { position: fixed; bottom: 18px; left: 0; right: 0; text-align: center; z-index: 20; opacity: 0; animation: abSoftIn 2s ease-out 4s forwards; }
  .ab-intro .ab-footer-text { font-family: 'Josefin Sans', sans-serif; font-weight: 200; font-size: 8px; letter-spacing: 3px; text-transform: uppercase; color: rgba(55,38,25,0.35); }
`;

export default function AttachmentBondsIntake() {
  const [phase, setPhase] = useState("intro");
  const [d, setD] = useState({ name: "", email: "", miniAnswers: ["", "", "", "", ""] });
  const set = (k, v) => setD((p) => ({ ...p, [k]: v }));
  const go = (ph) => { setPhase(ph); window.scrollTo({ top: 0, behavior: "smooth" }); };

  if (phase === "intro")
    return (
      <div className="ab-intro">
        <style dangerouslySetInnerHTML={{ __html: AB_INTRO_CSS }} />
        <div className="ab-frame" />
        <div className="ab-fdl ab-fdl-tl">⚜</div>
        <div className="ab-fdl ab-fdl-tr">⚜</div>
        <div className="ab-fdl ab-fdl-bl">⚜</div>
        <div className="ab-fdl ab-fdl-br">⚜</div>
        <div className="ab-panel" />
        <section className="ab-page">
          <div className="ab-overline">Love Pattern Forensics</div>
          <h1 className="ab-title">
            Attachment Bonds
            <span className="ab-line2">Your Love Architecture</span>
          </h1>
          <div className="ab-divider">⚜ &nbsp; ⚜ &nbsp; ⚜</div>
          <div className="ab-subtitle">
            Attachment architecture · Toxic cycle breaking<br />
            Twin flame mapping · Bond alchemy & repair
          </div>
          <p className="ab-hook">
            Every bond you've ever formed left a chemical signature in your nervous system. Some of those signatures are medicine. Some are poison. This report knows the difference.
          </p>
          <button type="button" className="ab-cta" onClick={() => go("start")}>Map Your Attachment Code</button>
        </section>
        <footer className="ab-footer">
          <div className="ab-footer-text">The Forgotten Code Research Institute</div>
        </footer>
      </div>
    );

  if (phase === "start")
    return (
      <div style={{ minHeight: "100vh", width: "100%", background: WARM_CREAM_BG, color: DARK_TEXT, fontFamily: "'Bodoni Moda', Georgia, serif", padding: "80px 24px" }}>
        <div style={{ maxWidth: 420, margin: "0 auto" }}>
          <div style={{ fontFamily: "'Josefin Sans', sans-serif", fontSize: 12, letterSpacing: "0.2em", color: "rgba(55,38,25,0.7)", marginBottom: 24, fontStyle: "normal" }}>BEFORE WE BEGIN</div>
          <label style={{ display: "block", fontFamily: "'Josefin Sans', sans-serif", fontSize: 13, color: DARK_TEXT, marginBottom: 6, fontStyle: "normal" }}>Your Name</label>
          <input value={d.name} onChange={(e) => set("name", e.target.value)} placeholder="First and last" style={{ width: "100%", padding: "14px 18px", background: FROSTED, border: "1px solid rgba(155,120,55,0.2)", color: "rgba(42,28,18,0.9)", fontFamily: "'Bodoni Moda', serif", fontSize: 16, marginBottom: 20, fontStyle: "normal" }} />
          <label style={{ display: "block", fontFamily: "'Josefin Sans', sans-serif", fontSize: 13, color: DARK_TEXT, marginBottom: 6, fontStyle: "normal" }}>Email Address</label>
          <input value={d.email} onChange={(e) => set("email", e.target.value)} placeholder="For receiving your reading" type="email" style={{ width: "100%", padding: "14px 18px", background: FROSTED, border: "1px solid rgba(155,120,55,0.2)", color: "rgba(42,28,18,0.9)", fontFamily: "'Bodoni Moda', serif", fontSize: 16, marginBottom: 36, fontStyle: "normal" }} />
          <Btn label="MAP YOUR ATTACHMENT CODE" onClick={() => go("q1")} primary disabled={!(d.name && d.email)} />
        </div>
      </div>
    );

  const qIndex = phase === "q1" ? 0 : phase === "q2" ? 1 : phase === "q3" ? 2 : phase === "q4" ? 3 : phase === "q5" ? 4 : -1;
  const answers = d.miniAnswers || ["", "", "", "", ""];
  const setAnswer = (i, letter) => { const a = [...answers]; a[i] = letter; set("miniAnswers", a); go(i < 4 ? `q${i + 2}` : "miniResult"); };
  if (qIndex >= 0) {
    const q = ATTACHMENT_QUESTIONS[qIndex];
    const opts = [{ letter: "A", text: q.A }, { letter: "B", text: q.B }, { letter: "C", text: q.C }, { letter: "D", text: q.D }];
    return (
      <div style={{ minHeight: "100vh", width: "100%", background: WARM_CREAM_BG, color: DARK_TEXT, fontFamily: "'Bodoni Moda', Georgia, serif", padding: "60px 24px" }}>
        <div style={{ maxWidth: 640, margin: "0 auto" }}>
          <div style={{ fontFamily: "'Josefin Sans', sans-serif", fontSize: 11, letterSpacing: "0.2em", color: "rgba(55,38,25,0.7)", textAlign: "center", marginBottom: 24, fontStyle: "normal" }}>Question {qIndex + 1} of 5</div>
          <p style={{ fontFamily: "'Bodoni Moda', serif", fontSize: "clamp(1.1rem,2.8vw,1.5rem)", color: BODY_TEXT, textAlign: "center", marginBottom: 40, lineHeight: 1.6, fontStyle: "italic" }}>"{q.q}"</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {opts.map(({ letter, text }) => (
              <div key={letter} onClick={() => setAnswer(qIndex, letter)} style={{ padding: "20px 24px", background: "rgba(212,196,184,0.5)", border: "1px solid rgba(155,120,55,0.2)", cursor: "pointer", fontFamily: "'Bodoni Moda', serif", fontSize: "1.05rem", color: BODY_TEXT, lineHeight: 1.6, fontStyle: "normal" }}>
                {text}
              </div>
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "center", gap: 12, marginTop: 50 }}>
            {[0, 1, 2, 3, 4].map((i) => <div key={i} style={{ width: 6, height: 6, borderRadius: "50%", background: i <= qIndex ? ANTIQUE_GOLD : "rgba(155,120,55,0.25)" }} />)}
          </div>
        </div>
      </div>
    );
  }

  if (phase === "miniResult") {
    const dominant = getDominantAnswer(answers);
    const r = ATTACHMENT_REPORTS[dominant] || ATTACHMENT_REPORTS.MIXED;
    return (
      <div style={{ minHeight: "100vh", width: "100%", background: WARM_CREAM_BG, color: DARK_TEXT, fontFamily: "'Bodoni Moda', Georgia, serif", padding: "80px 24px" }}>
        <div style={{ maxWidth: 680, margin: "0 auto" }}>
          <div style={{ fontFamily: "'Josefin Sans', sans-serif", fontSize: 11, letterSpacing: "0.2em", color: "rgba(55,38,25,0.7)", textAlign: "center", marginBottom: 20, fontStyle: "normal" }}>Your Love Architecture Preview</div>
          <h2 style={{ fontFamily: "'Bodoni Moda', serif", fontSize: "clamp(1.6rem,4vw,2.4rem)", color: "rgba(74,50,24,0.95)", textAlign: "center", marginBottom: 12, fontStyle: "normal" }}>{r.archetype}</h2>
          <p style={{ fontFamily: "'Bodoni Moda', serif", fontSize: "1.15rem", color: BODY_TEXT, textAlign: "center", marginBottom: 40, fontStyle: "italic" }}>{r.soulLine}</p>
          <div style={{ width: 60, height: 1, background: "rgba(155,120,55,0.4)", margin: "0 auto 40px" }} />
          <div style={{ marginBottom: 40 }}>{r.body.split("\n\n").map((para, i) => <p key={i} style={{ fontFamily: "'Bodoni Moda', serif", fontSize: "1.15rem", lineHeight: 1.9, color: BODY_TEXT, marginBottom: 20, fontStyle: "normal" }}>{para}</p>)}</div>
          <div style={{ padding: "30px", border: "1px solid rgba(155,120,55,0.25)", background: "rgba(212,196,184,0.6)", textAlign: "center", marginBottom: 50 }}>
            <div style={{ fontFamily: "'Josefin Sans', sans-serif", fontSize: 10, letterSpacing: "0.2em", color: "rgba(55,38,25,0.7)", marginBottom: 16, fontStyle: "normal" }}>The Sealed Section</div>
            <p style={{ fontFamily: "'Bodoni Moda', serif", fontSize: "1.05rem", lineHeight: 1.7, color: BODY_TEXT, fontStyle: "normal" }}>{r.sealed}</p>
          </div>
          <div style={{ textAlign: "center" }}>
            <a href="https://paypal.me/JSnider364/79" target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", padding: "18px 52px", fontFamily: "'Josefin Sans', sans-serif", fontWeight: 400, fontSize: 10, letterSpacing: "5px", color: DARK_TEXT, background: "transparent", border: "1px solid rgba(155,120,55,0.5)", cursor: "pointer", textDecoration: "none", fontStyle: "normal" }}>Unlock Your Full Love Architecture Report</a>
            <div style={{ fontFamily: "'Josefin Sans', sans-serif", fontSize: 12, letterSpacing: "2px", color: "rgba(55,38,25,0.7)", marginTop: 16, fontStyle: "normal" }}>$79</div>
            <p style={{ fontFamily: "'Bodoni Moda', serif", fontSize: "0.95rem", lineHeight: 1.7, color: BODY_TEXT, marginTop: 24, maxWidth: 420, margin: "24px auto 0", fontStyle: "normal" }}>Attachment architecture, toxic cycle breaking, twin flame mapping, and bond alchemy & repair.</p>
          </div>
          <div style={{ textAlign: "center", marginTop: 40 }}><Btn label="← EDIT MY ANSWERS" onClick={() => go("q1")} /></div>
        </div>
      </div>
    );
  }

  return null;
}
