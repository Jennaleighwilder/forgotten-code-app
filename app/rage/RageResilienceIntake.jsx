"use client";
import { useState, useRef, useEffect } from "react";

// Rage & Resilience — $79 | Route: /rage
// War memoir — Oswald, Merriweather, Anonymous Pro | charred, blood, bone, ember

const CHARRED = "#0d0d0d";
const BLOOD = "#8b0000";
const BONE = "#e8e0d4";
const EMBER = "#cc4400";
const ASH = "#4a4a4a";
const WHITE = "#f5f0eb";

const RAGE_QUESTIONS = [
  { q: "What almost destroyed you — and didn't?", A: "Betrayal by someone I trusted completely.", B: "Loss of safety, home, or body autonomy.", C: "Being silenced or crushed by an institution or person in power.", D: "A collapse that should have ended me — health, mind, or circumstance." },
  { q: "How did you learn to survive?", A: "I shut down — I went numb until it passed.", B: "I fought — I became the one who couldn't be hurt.", C: "I escaped — I left, physically or emotionally.", D: "I adapted — I learned to read the room and become what was needed." },
  { q: "Where does your rage live now?", A: "In my body — tension, illness, or explosive moments.", B: "In my relationships — I push people away or pick fights.", C: "In my silence — I don't speak up when I should.", D: "In my drive — I use it as fuel but never really address it." },
  { q: "What did the fire forge in you that no one can take away?", A: "The ability to endure anything.", B: "The clarity to see who is safe and who is not.", C: "The refusal to be small again.", D: "A kind of strength I didn't know I had." },
  { q: "If your rage could speak one sentence, what would it say?", A: "I will not be erased again.", B: "I am not the one who was wrong.", C: "I have the right to take up space.", D: "What happened to me matters." },
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

const RAGE_REPORTS = {
  A: { archetype: "The Endurer", soulLine: "You learned to survive by going through — not around.", body: "Something almost killed you. Not metaphorically. Something that should have ended you — betrayal, loss, collapse — and you are still here. You didn't survive by fighting your way out or by escaping. You survived by enduring. You went numb when you had to. You held on when there was nothing to hold. That capacity is not weakness. It is a kind of strength that cannot be taught — only forged.\n\nYour rage lives in your body now. In the tension you carry, the illness that flares, the moments when something explodes out of you before you can stop it. That rage is not random. It is the part of you that was not allowed to speak when it mattered. It is still trying to be heard.\n\nThe fire forged something in you that no one can take away: the ability to endure anything. The question is not whether you are strong enough. It is whether you are ready to let that strength serve something beyond survival — to let your rage become a voice instead of a symptom.", sealed: "Your full War Codex maps the original trial — what almost destroyed you, how you survived, and how to channel your rage into sovereignty instead of symptom." },
  B: { archetype: "The Warrior", soulLine: "You became the one who couldn't be hurt — and your rage is the proof that you were.", body: "You learned to survive by fighting. When the world tried to crush you, you became harder. You became the one who couldn't be hurt. But your rage — the way it lives in your relationships, the way you push people away or pick fights — is the proof that you were hurt. That you still are.\n\nThe fire forged something in you: the clarity to see who is safe and who is not. You don't trust easily. You don't have to. But the same instinct that protected you can also isolate you. Your rage is not the enemy. It is the part of you that refused to be erased. The sentence it speaks — I am not the one who was wrong — is true. The work is to let that truth stand without having to fight everyone to prove it.\n\nYour task is not to soften. It is to choose where to deploy your fire — and where to lay down your arms.", sealed: "Your full War Codex identifies the original battle — who or what tried to erase you — and maps the path from defensive rage to sovereign power." },
  C: { archetype: "The Escaped", soulLine: "You got out — but your rage stayed behind, waiting to be spoken.", body: "You survived by leaving. Physically or emotionally, you escaped what would have destroyed you. That was the right move. But escape is not the same as resolution. Your rage lives in your silence now — in the times you don't speak up when you should, in the words you swallow because it was never safe to say them.\n\nThe fire forged something in you: the refusal to be small again. You will not go back to the place or the role that almost killed you. But the part of you that has the right to take up space — that part is still learning to speak. Your rage is not gone. It is waiting. It is the sentence you have never said out loud: I have the right to take up space.\n\nYour task is to map where you escaped from — and to give your rage a voice so it doesn't have to live in silence anymore.", sealed: "Your full War Codex traces the escape — what you left, what you carried — and identifies the specific ways to let your rage speak without having to fight or flee." },
  D: { archetype: "The Forged", soulLine: "You were remade in the fire — and your rage is the fuel you've been running on.", body: "You didn't just survive. You were remade. The collapse — health, mind, circumstance — that should have ended you became the crucible. You learned to adapt. To read the room. To become what was needed. You use that same fire as fuel now — in your drive, your work, your refusal to quit. But you've never really addressed the rage itself. It runs the engine. You don't get to rest.\n\nThe fire forged a kind of strength you didn't know you had. That strength is real. But the sentence your rage is speaking — what happened to me matters — is not just past tense. It is a demand. Your system is asking to be seen. To have the story acknowledged. To have the cost of your survival named.\n\nYour task is not to work harder. It is to let the rage be witnessed — and to let yourself rest without guilt.", sealed: "Your full War Codex maps the collapse that forged you — and identifies how to honor your rage without burning out, so your fire can sustain you instead of consuming you." },
  MIXED: { archetype: "The Phoenix", soulLine: "Your survival cannot be reduced to one strategy — and neither can your rage.", body: "You have endured, fought, escaped, and adapted. Your answers reveal a survivor who used every tool — numbness, hardness, flight, and shape-shifting — to stay alive. Your rage lives in more than one place: in your body, your relationships, your silence, your drive. That is not confusion. It is complexity. You are the phoenix — the one who was burned and rose, not once but many times.\n\nThe fire forged multiple things in you: the ability to endure, the clarity to see who is safe, the refusal to be small, and a strength you didn't know you had. Your rage speaks more than one sentence. It says: I will not be erased. I am not the one who was wrong. I have the right to take up space. What happened to me matters. All of it is true.\n\nYour task is to map all the fires — and to let your rage become a coherent voice instead of scattered embers.", sealed: "Your full War Codex traces every survival strategy and every location of your rage — and identifies the convergence point: how to channel your fire into sovereignty instead of symptom, fight, silence, or burnout." },
};

function Btn({ label, onClick, disabled, primary }) {
  return (
    <div
      onClick={() => !disabled && onClick()}
      style={{
        display: "inline-block",
        padding: primary ? "16px 52px" : "14px 32px",
        fontFamily: "'Oswald', sans-serif",
        fontSize: 16,
        letterSpacing: "4px",
        color: disabled ? ASH : primary ? CHARRED : BONE,
        background: primary && !disabled ? EMBER : "transparent",
        border: `1px solid ${disabled ? "rgba(139,0,0,0.2)" : "rgba(204,68,0,0.4)"}`,
        cursor: disabled ? "default" : "pointer",
        transition: "all 0.3s ease",
        fontStyle: "normal",
      }}
    >
      {label}
    </div>
  );
}

export default function RageResilienceIntake() {
  const [phase, setPhase] = useState("intro");
  const [d, setD] = useState({ name: "", email: "", miniAnswers: ["", "", "", "", ""] });
  const set = (k, v) => setD((p) => ({ ...p, [k]: v }));
  const go = (ph) => { setPhase(ph); window.scrollTo({ top: 0, behavior: "smooth" }); };

  const emberCanvasRef = useRef(null);
  const rafId = useRef(null);

  // Ember particles — canvas (60 particles: hot embers, ash, sparks)
  useEffect(() => {
    if (phase !== "intro" || !emberCanvasRef.current) return;
    const canvas = emberCanvasRef.current;
    const ctx = canvas.getContext("2d");
    let particles = [];
    function init() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particles = [];
      for (let i = 0; i < 60; i++) {
        const t = Math.random();
        const hue = t < 0.5 ? 15 : t < 0.8 ? 0 : 45;
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.4,
          vy: -Math.random() * 0.8 - 0.2,
          r: Math.random() * 2 + 0.5,
          alpha: Math.random() * 0.5 + 0.2,
          hue,
          life: Math.random() * 0.5 + 0.5,
        });
      }
    }
    function draw() {
      ctx.fillStyle = CHARRED;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.alpha *= 0.998;
        p.life -= 0.002;
        if (p.life <= 0 || p.y < -10) {
          p.x = Math.random() * canvas.width;
          p.y = canvas.height + 5;
          p.vy = -Math.random() * 0.8 - 0.2;
          p.alpha = Math.random() * 0.5 + 0.2;
          p.life = 1;
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 80%, 50%, ${p.alpha})`;
        ctx.fill();
      });
      rafId.current = requestAnimationFrame(draw);
    }
    init();
    draw();
    window.addEventListener("resize", init);
    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
      window.removeEventListener("resize", init);
    };
  }, [phase]);

  // INTRO
  if (phase === "intro")
    return (
      <>
        <style dangerouslySetInnerHTML={{ __html: `
          @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@400;500&family=Merriweather:ital,wght@0,400;0,700;1,400&family=Anonymous+Pro:ital,wght@0,400;0,700&display=swap');
          @keyframes rageHeartbeat { 0%, 100% { opacity: 0.4; } 50% { opacity: 1; } }
        ` }} />
        <div style={{ minHeight: "100vh", width: "100%", background: CHARRED, color: BONE, fontFamily: "'Merriweather', Georgia, serif", position: "relative", overflow: "hidden" }}>
          <canvas ref={emberCanvasRef} style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", zIndex: 1, pointerEvents: "none" }} />
          {/* Vignette */}
          <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", background: "radial-gradient(ellipse at center, transparent 40%, rgba(139,0,0,0.15) 100%)", zIndex: 2, pointerEvents: "none" }} />
          {/* Heartbeat bar */}
          <div style={{ position: "fixed", bottom: 0, left: 0, width: "100%", height: 3, background: BLOOD, zIndex: 10, animation: "rageHeartbeat 1.2s ease-in-out infinite", opacity: 0.7 }} />
          {/* Scar lines */}
          {[20, 50, 80].map((top) => (
            <div key={top} style={{ position: "fixed", left: 0, top: `${top}%`, width: "100%", height: 1, background: "linear-gradient(90deg, transparent, rgba(139,0,0,0.12), transparent)", zIndex: 2, pointerEvents: "none" }} />
          ))}
          <div style={{ position: "relative", minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: "80px 24px 80px", zIndex: 5 }}>
            <div style={{ fontFamily: "'Anonymous Pro', monospace", fontSize: 14, letterSpacing: "0.3em", color: ASH, marginBottom: 16, fontStyle: "normal" }}>⚔</div>
            <div style={{ fontFamily: "'Anonymous Pro', monospace", fontSize: 12, letterSpacing: "0.2em", color: BONE, marginBottom: 24, textAlign: "center", maxWidth: 480, fontStyle: "normal" }}>How did you survive what should have killed you?</div>
            <h1 style={{ fontFamily: "'Oswald', sans-serif", fontSize: "clamp(52px, 10vw, 120px)", letterSpacing: "2px", lineHeight: 0.95, textAlign: "center", fontStyle: "normal" }}>
              <span style={{ color: BLOOD, textShadow: "0 0 40px rgba(139,0,0,0.4)" }}>RAGE</span>
              <span style={{ color: BONE, marginLeft: "0.08em" }}>& RESILIENCE</span>
            </h1>
            <div style={{ fontFamily: "'Merriweather', serif", fontSize: "clamp(1rem,2.2vw,1.35rem)", fontStyle: "italic", color: ASH, marginTop: 16, textAlign: "center", fontStyle: "italic" }}>How Trauma Shapes Your Fire</div>
            <div style={{ fontFamily: "'Anonymous Pro', monospace", fontSize: 11, letterSpacing: "0.15em", color: "rgba(232,224,212,0.6)", marginTop: 24, textAlign: "center", fontStyle: "normal" }}>Warrior-response map · Adaptive survival codes · Battle-scar gifts · Sacred rage channeling</div>
            <p style={{ maxWidth: 520, textAlign: "center", fontSize: 16, lineHeight: 1.8, color: "rgba(232,224,212,0.9)", marginTop: 48, fontStyle: "italic", fontWeight: 300 }}>
              Something almost killed you. You're still here. Your rage is not the enemy — it's the part of you that refused to be erased. Five questions. We'll show you the pattern.
            </p>
            <div style={{ marginTop: 48 }}><Btn label="ENTER THE TRIAL" onClick={() => go("start")} primary /></div>
          </div>
        </div>
      </>
    );

  // START
  if (phase === "start")
    return (
      <div style={{ minHeight: "100vh", width: "100%", background: CHARRED, color: BONE, fontFamily: "'Merriweather', Georgia, serif", padding: "80px 24px" }}>
        <div style={{ maxWidth: 420, margin: "0 auto" }}>
          <div style={{ fontFamily: "'Anonymous Pro', monospace", fontSize: 12, letterSpacing: "0.2em", color: ASH, marginBottom: 24, fontStyle: "normal" }}>BEFORE WE BEGIN</div>
          <label style={{ display: "block", fontFamily: "'Anonymous Pro', monospace", fontSize: 13, color: ASH, marginBottom: 6, fontStyle: "normal" }}>Your Name</label>
          <input value={d.name} onChange={(e) => set("name", e.target.value)} placeholder="First and last" style={{ width: "100%", padding: "14px 18px", background: "rgba(30,30,30,0.9)", border: "1px solid rgba(139,0,0,0.2)", color: BONE, fontFamily: "'Merriweather', serif", fontSize: 16, marginBottom: 20, fontStyle: "normal" }} />
          <label style={{ display: "block", fontFamily: "'Anonymous Pro', monospace", fontSize: 13, color: ASH, marginBottom: 6, fontStyle: "normal" }}>Email Address</label>
          <input value={d.email} onChange={(e) => set("email", e.target.value)} placeholder="For receiving your reading" type="email" style={{ width: "100%", padding: "14px 18px", background: "rgba(30,30,30,0.9)", border: "1px solid rgba(139,0,0,0.2)", color: BONE, fontFamily: "'Merriweather', serif", fontSize: 16, marginBottom: 36, fontStyle: "normal" }} />
          <Btn label="ENTER THE TRIAL" onClick={() => go("q1")} primary disabled={!(d.name && d.email)} />
        </div>
      </div>
    );

  // QUIZ
  const qIndex = phase === "q1" ? 0 : phase === "q2" ? 1 : phase === "q3" ? 2 : phase === "q4" ? 3 : phase === "q5" ? 4 : -1;
  const answers = d.miniAnswers || ["", "", "", "", ""];
  const setAnswer = (i, letter) => { const a = [...answers]; a[i] = letter; set("miniAnswers", a); go(i < 4 ? `q${i + 2}` : "miniResult"); };
  if (qIndex >= 0) {
    const q = RAGE_QUESTIONS[qIndex];
    const opts = [{ letter: "A", text: q.A }, { letter: "B", text: q.B }, { letter: "C", text: q.C }, { letter: "D", text: q.D }];
    return (
      <div style={{ minHeight: "100vh", width: "100%", background: CHARRED, color: BONE, fontFamily: "'Merriweather', Georgia, serif", padding: "60px 24px" }}>
        <div style={{ maxWidth: 640, margin: "0 auto" }}>
          <div style={{ fontFamily: "'Anonymous Pro', monospace", fontSize: 11, letterSpacing: "0.2em", color: ASH, textAlign: "center", marginBottom: 24, fontStyle: "normal" }}>Question {qIndex + 1} of 5</div>
          <p style={{ fontFamily: "'Merriweather', serif", fontSize: "clamp(1.1rem,2.8vw,1.5rem)", color: BONE, textAlign: "center", marginBottom: 40, lineHeight: 1.6, fontStyle: "normal" }}>"{q.q}"</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {opts.map(({ letter, text }) => (
              <div key={letter} onClick={() => setAnswer(qIndex, letter)} style={{ padding: "20px 24px", background: "rgba(139,0,0,0.06)", border: "1px solid rgba(139,0,0,0.2)", cursor: "pointer", fontFamily: "'Merriweather', serif", fontSize: "1.05rem", color: BONE, lineHeight: 1.6, fontStyle: "normal" }}>
                {text}
              </div>
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "center", gap: 12, marginTop: 50 }}>
            {[0, 1, 2, 3, 4].map((i) => <div key={i} style={{ width: 6, height: 6, borderRadius: "50%", background: i <= qIndex ? EMBER : "rgba(139,0,0,0.2)" }} />)}
          </div>
        </div>
      </div>
    );
  }

  // MINI RESULT
  if (phase === "miniResult") {
    const dominant = getDominantAnswer(answers);
    const r = RAGE_REPORTS[dominant] || RAGE_REPORTS.MIXED;
    return (
      <div style={{ minHeight: "100vh", width: "100%", background: CHARRED, color: BONE, fontFamily: "'Merriweather', Georgia, serif", padding: "80px 24px" }}>
        <div style={{ maxWidth: 680, margin: "0 auto" }}>
          <div style={{ fontFamily: "'Anonymous Pro', monospace", fontSize: 11, letterSpacing: "0.2em", color: ASH, textAlign: "center", marginBottom: 20, fontStyle: "normal" }}>Your Warrior-Response Preview</div>
          <h2 style={{ fontFamily: "'Oswald', sans-serif", fontSize: "clamp(1.6rem,4vw,2.4rem)", color: BLOOD, textAlign: "center", marginBottom: 12, fontStyle: "normal" }}>{r.archetype}</h2>
          <p style={{ fontFamily: "'Merriweather', serif", fontSize: "1.15rem", color: ASH, textAlign: "center", marginBottom: 40, fontStyle: "italic" }}>{r.soulLine}</p>
          <div style={{ width: 60, height: 1, background: "rgba(139,0,0,0.4)", margin: "0 auto 40px" }} />
          <div style={{ marginBottom: 40 }}>{r.body.split("\n\n").map((para, i) => <p key={i} style={{ fontFamily: "'Merriweather', serif", fontSize: "1.15rem", lineHeight: 1.9, color: BONE, marginBottom: 20, fontStyle: "normal" }}>{para}</p>)}</div>
          <div style={{ padding: "30px", border: "1px solid rgba(139,0,0,0.2)", background: "rgba(139,0,0,0.04)", textAlign: "center", marginBottom: 50 }}>
            <div style={{ fontFamily: "'Anonymous Pro', monospace", fontSize: 10, letterSpacing: "0.2em", color: ASH, marginBottom: 16, fontStyle: "normal" }}>The Sealed Section</div>
            <p style={{ fontFamily: "'Merriweather', serif", fontSize: "1.05rem", lineHeight: 1.7, color: "rgba(232,224,212,0.85)", fontStyle: "normal" }}>{r.sealed}</p>
          </div>
          <div style={{ textAlign: "center" }}>
            <a href="https://paypal.me/JSnider364/79" target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", padding: "18px 52px", fontFamily: "'Oswald', sans-serif", fontSize: 16, letterSpacing: "4px", color: CHARRED, background: EMBER, border: "none", cursor: "pointer", textDecoration: "none", fontStyle: "normal" }}>BEGIN THE WAR CODEX</a>
            <div style={{ fontFamily: "'Anonymous Pro', monospace", fontSize: 12, letterSpacing: "2px", color: ASH, marginTop: 16, fontStyle: "normal" }}>$79</div>
            <p style={{ fontFamily: "'Merriweather', serif", fontSize: "0.95rem", lineHeight: 1.7, color: ASH, marginTop: 24, maxWidth: 420, margin: "24px auto 0", fontStyle: "normal" }}>The Full Book of Forbidden War — warrior-response mapping, adaptive survival codes, battle-scar gifts, and sacred rage channeling.</p>
          </div>
          <div style={{ textAlign: "center", marginTop: 40 }}><Btn label="← EDIT MY ANSWERS" onClick={() => go("q1")} /></div>
        </div>
      </div>
    );
  }

  return null;
}
