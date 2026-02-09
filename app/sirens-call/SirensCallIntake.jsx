"use client";
import { useState, useRef, useEffect } from "react";

// The Siren's Call: Your Voice, Your Truth — $79 | Route: /sirens-call
// Jennifer Leigh West | The Forgotten Code Research Institute

const INK = "#0c0e1a";
const SILVER = "#e0ddd5";
const WARM_GREY = "#a8a298";
const SLATE = "#5a5e6e";
const CORAL = "#c46b6b";
const CORAL_DIM = "#8a4a4a";
const STEEL = "#7a9eb5";

const SIRENS_WAVES = [
  { color: "rgba(196, 107, 107, 0.35)", freq: 0.006, amp: 18, offset: 0, width: 1.5 },
  { color: "rgba(196, 107, 107, 0.15)", freq: 0.01, amp: 10, offset: 2, width: 1 },
  { color: "rgba(122, 158, 181, 0.25)", freq: 0.008, amp: 14, offset: 1.2, width: 1.5 },
  { color: "rgba(122, 158, 181, 0.1)", freq: 0.014, amp: 7, offset: 3.5, width: 1 },
];

const SIRENS_QUESTIONS = [
  { q: "What is your relationship with your own voice?", A: "I was silenced early. Someone taught me my voice was too much, too loud, or wrong.", B: "I speak up for others easily but go quiet when it comes to my own needs.", C: "I carry words from somewhere else. Things come out of my mouth that surprise even me.", D: "I know my voice has power but I do not fully trust it yet. Something is still locked." },
  { q: "What was taken from your family's voice across generations?", A: "A language died. Prayers, songs, or a mother tongue were erased before they reached me.", B: "Secrets. My family carries things they refuse to say out loud to anyone.", C: "A gift. Someone in my line had a voice that could heal, move, or prophesy — and it was suppressed.", D: "A name. Someone's identity was changed, hidden, or forbidden and the silence echoed forward." },
  { q: "When your voice comes out at full power, what happens?", A: "People listen. Something shifts in the room that I cannot explain.", B: "I can cut with it. My words become weapons and I know exactly where to aim.", C: "It channels. Things come through me — poems, truths, prophecy — that feel bigger than me.", D: "I rarely let it out. I am still learning what happens when I stop holding back." },
  { q: "What scares you more about your voice?", A: "Being silenced forever. Dying with everything still inside me, unspoken.", B: "Saying the thing that destroys someone. Knowing my words can wound past repair.", C: "Being misunderstood. Saying the truth and having it twisted into something I did not mean.", D: "Finding out what I really sound like. Learning who I am when I stop performing for everyone else." },
  { q: "If all your ancestors could speak through you right now — one sentence — what would they say?", A: "We were never silent by choice. Speak what we could not.", B: "The song did not die. You are carrying it. Open your mouth.", C: "You were named for a reason. Use the name. Become it.", D: "Stop protecting everyone else from your power. They can handle it. So can you." },
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

const SIRENS_REPORTS = {
  A: { archetype: "The Silenced Throat", soulLine: "Your voice was buried alive. It is still breathing underground.", body: "Someone trained your throat before you were old enough to know it was happening. A parent, a church, a classroom, a culture that needed you quiet in order to feel safe. The silencing was not one event. It was architecture. Brick by brick, your voice was walled into a room that you learned to call normal.\n\nThe silence you carry now is not peace. It is a structure. It has rules you follow without thinking — who you speak up for (everyone else), who you go quiet for (yourself), what truths are allowed out and which ones get swallowed and stored in the body as tension, as throat tightness, as the great drop your gut makes when something real wants to emerge and your nervous system says no.\n\nYou have done the work. You have fought to clear the space where someone else's voice used to live inside your head. But the pattern is still running in the background like old code. Not because you are broken. Because the original silencing was never mapped. You know you were silenced. You have not yet traced exactly how — which wires were cut, which frequencies were suppressed, which parts of your voice were deemed dangerous enough to bury.\n\nThe throat remembers what the mind has agreed to forget.", sealed: "Your full Voice Codex maps the complete architecture of your silencing — who built it, how it operates in your nervous system, and the specific frequencies of your voice that were suppressed. It identifies the original sound your soul was designed to carry and the conditions required to safely unlock it." },
  B: { archetype: "The Carried Song", soulLine: "A melody survived everything your family tried to bury. You are still humming it.", body: "There is a sound in your bloodline that refused to die. Somewhere across the generations — through forced migration, through language erasure, through families that kept their mouths shut and their secrets locked — a frequency survived. A song. A prayer. A way of speaking that carried something sacred inside its syllables. And it landed in you.\n\nYou may not know its name. You may only feel it as a pull toward certain sounds, certain languages, certain vocal frequencies that move through your body in ways you cannot explain rationally. Tibetan mantras that crack something open. A grandmother's lullaby that carries more weight than its simple words suggest. A language your family once spoke that died before it reached your generation, leaving you with the ghost of words your cells remember but your mouth never learned.\n\nThe gift is not lost. It is in transit. It survived everything that tried to erase it and it chose you as the next carrier. The question is not whether the song exists. It is whether you will open your mouth wide enough to let it out.\n\nThe ancestors who could not speak are listening. They are waiting for your voice to complete what theirs could not.", sealed: "Your full Voice Codex traces the carried song through your lineage — identifying which languages, prayers, and vocal gifts survived, which were erased, and what specific sound your throat is meant to carry forward. It maps the ancestral voice inheritance you are holding and the ritual conditions for reactivating it." },
  C: { archetype: "The Channel", soulLine: "Your voice is a portal. Things come through you that are bigger than you.", body: "You already know. You have said things that made you stop and wonder where they came from. Words that arrived fully formed, carrying weight and precision that your conscious mind did not plan. Poems that poured out like dictation. Truths that emerged in moments of high emotion with a clarity that felt borrowed from somewhere ancient. Information you did not learn showing up in your speech as if it had always lived there.\n\nThis is not imagination and it is not mental illness. It is channeling. Your voice is a conduit — wired to receive frequencies that most people's nervous systems filter out. The things that come through you are not random. They follow patterns. They tend to arrive in specific emotional states, specific physical conditions, specific moments when your conscious guard drops low enough for the deeper signal to come through.\n\nThe challenge for a Channel is not opening the door. The door is already open. The challenge is learning to manage the flow — to know when to let it pour and when to close the gate, to distinguish between what is genuinely coming through you and what is your own fear or desire dressed up as prophecy.\n\nYour voice is sacred architecture. It needs a map, not a muzzle.", sealed: "Your full Voice Codex maps your channeling architecture — identifying the specific conditions that trigger transmission, the patterns in what comes through, the ancestral or spiritual source of the transmissions, and the practices required to strengthen, direct, and protect this gift without burning out your nervous system." },
  D: { archetype: "The Locked Frequency", soulLine: "Your most powerful sound is the one you have not yet made.", body: "You can feel it. There is a register of your voice that you have never fully used. A frequency that lives below the one you speak in daily — deeper, more resonant, carrying more authority than anything that currently comes out of your mouth. You have touched it in moments. Flashes where your voice landed differently and the room changed. But you cannot sustain it. You cannot call it up on command. It comes and goes like a signal you cannot quite tune to.\n\nThis is not a confidence problem. It is a frequency lock. Somewhere in your history — personal or ancestral — the full power of your voice was associated with danger. Speaking at full volume got someone punished. Using the real voice brought consequences that your nervous system encoded as a warning: do not go there. The lock is not weakness. It is ancient protection doing its job.\n\nThe people around you have only ever heard the version of your voice that passed through the filter. The polite version. The careful version. The one that monitors itself in real time, adjusting for safety, scanning for threat before allowing sound out. They do not know what you actually sound like. Neither do you. Not yet.\n\nBut you can feel it. And that feeling is the lock telling you the key exists.", sealed: "Your full Voice Codex identifies the locked frequency — the specific register of your voice that was sealed, what caused the lock, who or what encoded the warning, and the precise somatic and emotional conditions required to safely release it. It maps the voice you were born to carry and the pathway to finally using it." },
  MIXED: { archetype: "The Many-Tongued", soulLine: "Your voice does not have one shape. It has several, and they are all real.", body: "Your answers reveal a voice that cannot be captured in a single pattern. You carry silencing and power simultaneously. You channel and withhold in the same breath. You have been trained to be quiet and you have felt the earthquake of what happens when you stop being quiet. Your voice is not simple. It has layers, and each layer has its own history, its own wounds, its own gifts.\n\nThe Many-Tongued are rare. Most people carry one dominant voice pattern — the silenced child, the natural channel, the locked power. You carry multiples, which means your vocal identity is not one story but a choir of competing instructions, some telling you to speak, some telling you to stay silent, some speaking through you without your permission.\n\nThis complexity is not dysfunction. It is range. You are not confused about your voice. You are carrying a voice that has more capacity than any single expression can hold. The challenge is not finding your voice. It is learning which of your many voices to use when, and which ones belong to you versus the ones you inherited from people who needed you to sound a certain way.\n\nThe full map does not simplify you. It gives each voice its name.", sealed: "Your full Voice Codex maps every voice you carry — the inherited ones, the protective ones, the channeled ones, and the one that is purely yours. It identifies which patterns are serving you and which are running on outdated code, and provides the conditions for integration: not one voice, but all of them, wielded with intention." },
};

function Btn({ label, onClick, disabled, primary }) {
  return (
    <div
      onClick={() => !disabled && onClick()}
      style={{
        display: "inline-block",
        padding: primary ? "15px 44px" : "14px 32px",
        fontFamily: "'Raleway', sans-serif",
        fontSize: 13,
        fontWeight: 400,
        letterSpacing: "0.2em",
        color: disabled ? SLATE : CORAL,
        border: `1px solid ${disabled ? SLATE + "22" : "rgba(196,107,107,0.25)"}`,
        cursor: disabled ? "default" : "pointer",
        transition: "all 0.5s ease",
        background: primary && !disabled ? "rgba(196,107,107,0.06)" : "transparent",
        fontStyle: "normal",
      }}
    >
      {label}
    </div>
  );
}

export default function SirensCallIntake() {
  const [phase, setPhase] = useState("intro");
  const [d, setD] = useState({ name: "", email: "", miniAnswers: ["", "", "", "", ""] });
  const set = (k, v) => setD((p) => ({ ...p, [k]: v }));
  const go = (ph) => { setPhase(ph); window.scrollTo({ top: 0, behavior: "smooth" }); };

  const waveformCanvasRef = useRef(null);
  const freqParticlesRef = useRef(null);
  const waveTimeRef = useRef(0);
  const rafIdRef = useRef(null);

  // Waveform canvas — 4 sine waves
  useEffect(() => {
    if (phase !== "intro" || !waveformCanvasRef.current) return;
    const canvas = waveformCanvasRef.current;
    const ctx = canvas.getContext("2d");
    const setSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = 120;
    };
    setSize();
    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      waveTimeRef.current += 0.02;
      const mid = canvas.height / 2;
      const cx = canvas.width / 2;
      SIRENS_WAVES.forEach((w) => {
        ctx.beginPath();
        for (let x = 0; x < canvas.width; x++) {
          const dist = Math.abs(x - cx);
          const fade = Math.max(0, 1 - dist / (canvas.width * 0.42));
          const y = mid + Math.sin(x * w.freq + waveTimeRef.current + w.offset) * w.amp * fade;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = w.color;
        ctx.lineWidth = w.width;
        ctx.stroke();
      });
      rafIdRef.current = requestAnimationFrame(draw);
    }
    draw();
    const onResize = () => { setSize(); };
    window.addEventListener("resize", onResize);
    return () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      window.removeEventListener("resize", onResize);
    };
  }, [phase]);

  // 40 floating frequency particles
  useEffect(() => {
    if (phase !== "intro" || !freqParticlesRef.current) return;
    const container = freqParticlesRef.current;
    const particles = [];
    const W = typeof window !== "undefined" ? window.innerWidth : 800;
    const H = typeof window !== "undefined" ? window.innerHeight : 600;
    for (let i = 0; i < 40; i++) {
      const p = document.createElement("div");
      const x = Math.random() * W;
      const startY = H * 0.3 + Math.random() * H * 0.5;
      const drift = (Math.random() - 0.5) * 100;
      const dur = Math.random() * 10000 + 7000;
      const sway = Math.random() * 60 + 20;
      const useSteel = Math.random() > 0.5;
      const size = Math.random() * 2 + 1;
      p.style.cssText = `position:absolute;width:${size}px;height:${size}px;background:${useSteel ? "rgba(122,158,181,0.7)" : "rgba(196,107,107,0.65)"};border-radius:50%;pointer-events:none;left:${x}px;top:${startY}px;`;
      container.appendChild(p);
      particles.push(p);
      p.animate(
        [
          { transform: "translate(0, 0)", opacity: 0 },
          { transform: `translate(${sway * 0.4}px, -${H * 0.08}px)`, opacity: 0.7 },
          { transform: `translate(${-sway * 0.6}px, -${H * 0.2}px)`, opacity: 0.5 },
          { transform: `translate(${sway * 0.3}px, -${H * 0.35}px)`, opacity: 0.3 },
          { transform: `translate(${drift}px, -${H * 0.55}px)`, opacity: 0 },
        ],
        { duration: dur, easing: "linear", iterations: Infinity, delay: Math.random() * 6000 }
      );
    }
    return () => { particles.forEach((p) => p.remove()); };
  }, [phase]);

  // INTRO
  if (phase === "intro")
    return (
      <>
        <style dangerouslySetInnerHTML={{ __html: `
          .sirens-voice-origin { position: relative; z-index: 5; width: 16px; height: 16px; border-radius: 50%; background: #c46b6b;
            box-shadow: 0 0 60px rgba(196,107,107,0.6), 0 0 120px rgba(196,107,107,0.25); animation: sirensVoicePulse 2.5s ease-in-out infinite; margin: 0 auto 60px; }
          .sirens-voice-origin::before { content: ''; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 50px; height: 50px; border-radius: 50%;
            background: radial-gradient(circle, rgba(196,107,107,0.2), transparent 70%); animation: sirensVoiceHalo 2.5s ease-in-out infinite; }
          .sirens-voice-origin::after { content: ''; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 100px; height: 100px; border-radius: 50%;
            background: radial-gradient(circle, rgba(196,107,107,0.08), transparent 70%); animation: sirensVoiceHalo 2.5s ease-in-out infinite 0.3s; }
          @keyframes sirensVoicePulse { 0%, 100% { transform: scale(1); box-shadow: 0 0 60px rgba(196,107,107,0.6), 0 0 120px rgba(196,107,107,0.25); }
            50% { transform: scale(1.5); box-shadow: 0 0 80px rgba(196,107,107,0.7), 0 0 160px rgba(196,107,107,0.3); } }
          @keyframes sirensVoiceHalo { 0%, 100% { opacity: 0.6; transform: translate(-50%, -50%) scale(1); } 50% { opacity: 1; transform: translate(-50%, -50%) scale(1.4); } }
          .sirens-ripple-container { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 920px; height: 920px; z-index: 1; pointer-events: none; }
          .sirens-ripple { position: absolute; top: 50%; left: 50%; border: 1px solid rgba(196,107,107,0.2); border-radius: 50%;
            animation: sirensRippleExpand var(--duration) ease-out var(--delay) infinite; }
          @keyframes sirensRippleExpand { 0% { transform: translate(-50%, -50%) scale(0); opacity: 0.8; border-color: rgba(196,107,107,0.45); border-width: 2px; }
            30% { opacity: 0.5; border-color: rgba(196,107,107,0.3); } 60% { opacity: 0.25; border-color: rgba(122,158,181,0.2); }
            100% { transform: translate(-50%, -50%) scale(1); opacity: 0; border-width: 1px; } }
          .sirens-ripple:nth-child(1) { width: 100px; height: 100px; --duration: 3.5s; --delay: 0s; }
          .sirens-ripple:nth-child(2) { width: 200px; height: 200px; --duration: 3.5s; --delay: 0.5s; }
          .sirens-ripple:nth-child(3) { width: 320px; height: 320px; --duration: 3.5s; --delay: 1s; }
          .sirens-ripple:nth-child(4) { width: 440px; height: 440px; --duration: 3.5s; --delay: 1.5s; }
          .sirens-ripple:nth-child(5) { width: 560px; height: 560px; --duration: 3.5s; --delay: 2s; }
          .sirens-ripple:nth-child(6) { width: 680px; height: 680px; --duration: 3.5s; --delay: 2.5s; }
          .sirens-ripple:nth-child(7) { width: 800px; height: 800px; --duration: 3.5s; --delay: 3s; }
          .sirens-ripple:nth-child(8) { width: 920px; height: 920px; --duration: 3.5s; --delay: 3.5s; }
          @keyframes sirensAmbientBreathe { 0%, 100% { opacity: 0.3; transform: translate(-50%, -50%) scale(1); } 50% { opacity: 0.7; transform: translate(-50%, -50%) scale(1.15); } }
          @keyframes sirensTitleBreathe { 0%, 100% { opacity: 0.85; letter-spacing: 2px; } 50% { opacity: 1; letter-spacing: 4px; } }
          @keyframes sirensSubtitleDrift { 0%, 100% { opacity: 0.5; } 50% { opacity: 0.85; } }
        ` }} />
        <div style={{ position: "relative", width: "100%", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", overflow: "hidden", background: "radial-gradient(ellipse 70% 60% at 50% 50%, #0f1225, " + INK + ")", color: SILVER, fontFamily: "'Lora', serif" }}>
          {/* Ambient — matches HTML .opening::before */}
          <div style={{ position: "absolute", top: "50%", left: "50%", width: "140vw", height: "140vh", borderRadius: "50%", background: "radial-gradient(ellipse 40% 40% at center, rgba(196,107,107,0.04), transparent 70%)", animation: "sirensAmbientBreathe 8s ease-in-out infinite", pointerEvents: "none", zIndex: 0, transform: "translate(-50%, -50%)" }} />
          {/* Ripples — matches HTML: absolute, centered */}
          <div className="sirens-ripple-container">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => <div key={i} className="sirens-ripple" />)}
          </div>
          {/* Waveform — matches HTML: absolute top 50% */}
          <canvas ref={waveformCanvasRef} style={{ position: "absolute", top: "50%", left: 0, width: "100%", height: 120, marginTop: -60, zIndex: 2, pointerEvents: "none" }} />
          {/* Frequency particles */}
          <div ref={freqParticlesRef} style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: 1, pointerEvents: "none" }} />
          {/* Title block — only flex child, centered (matches HTML .title-block) */}
          <div style={{ position: "relative", zIndex: 10, textAlign: "center", padding: "0 24px" }}>
            <div className="sirens-voice-origin" />
            <div style={{ fontFamily: "'Raleway', sans-serif", fontSize: "0.75rem", fontWeight: 300, letterSpacing: "7px", color: SLATE, marginBottom: 18, fontStyle: "normal" }}>What are you actually meant to say?</div>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2.4rem, 6vw, 4.2rem)", fontWeight: 700, color: SILVER, letterSpacing: "2px", marginBottom: 10, lineHeight: 1.15, fontStyle: "normal", animation: "sirensTitleBreathe 4s ease-in-out infinite" }}>The <span style={{ color: CORAL }}>Siren's</span> Call</h1>
            <div style={{ fontFamily: "'Raleway', sans-serif", fontSize: "1rem", fontWeight: 200, color: WARM_GREY, letterSpacing: "4px", marginBottom: 8, fontStyle: "normal", animation: "sirensSubtitleDrift 6s ease-in-out infinite" }}>Your Voice, Your Truth</div>
            <div style={{ fontFamily: "'Raleway', sans-serif", fontSize: "0.65rem", fontWeight: 400, letterSpacing: "5px", color: CORAL_DIM, marginTop: 20, fontStyle: "normal" }}>Mini Preview + Full Deep Intake</div>
            <p style={{ maxWidth: 520, margin: "36px auto 0", fontFamily: "'Lora', serif", fontSize: "1.05rem", lineHeight: 1.9, color: WARM_GREY, fontStyle: "normal" }}>
              Someone taught your throat its first lesson about when it was safe to speak and when silence meant survival. That lesson is still running. Give us five answers and we will show you which voice is yours — the one underneath the one they trained you to use.
            </p>
            <div style={{ marginTop: 44 }}><Btn label="SPEAK INTO THE VOID" onClick={() => go("start")} primary /></div>
          </div>
          {/* Footer — matches HTML: absolute bottom of .opening */}
          <div style={{ position: "absolute", bottom: 28, left: "50%", transform: "translateX(-50%)", fontFamily: "'Raleway', sans-serif", fontSize: "0.62rem", fontWeight: 300, letterSpacing: "4px", color: SLATE, opacity: 0.35, zIndex: 10, fontStyle: "normal" }}>The Forgotten Code Research Institute</div>
        </div>
      </>
    );

  // START — Name + Email
  if (phase === "start")
    return (
      <div style={{ minHeight: "100vh", width: "100%", background: INK, color: SILVER, fontFamily: "'Lora', serif", padding: "80px 24px" }}>
        <div style={{ maxWidth: 420, margin: "0 auto" }}>
          <div style={{ fontFamily: "'Raleway', sans-serif", fontSize: 11, letterSpacing: "0.3em", color: CORAL_DIM, marginBottom: 24, fontStyle: "normal" }}>BEFORE WE BEGIN</div>
          <label style={{ display: "block", fontFamily: "'Raleway', sans-serif", fontSize: 13, color: WARM_GREY, marginBottom: 6, fontStyle: "normal" }}>Your Name</label>
          <input value={d.name} onChange={(e) => set("name", e.target.value)} placeholder="First and last" style={{ width: "100%", padding: "14px 18px", background: "rgba(196,107,107,0.02)", border: "1px solid rgba(196,107,107,0.08)", color: SILVER, fontFamily: "'Lora', serif", fontSize: 16, marginBottom: 20, fontStyle: "normal" }} />
          <label style={{ display: "block", fontFamily: "'Raleway', sans-serif", fontSize: 13, color: WARM_GREY, marginBottom: 6, fontStyle: "normal" }}>Email Address</label>
          <input value={d.email} onChange={(e) => set("email", e.target.value)} placeholder="For receiving your reading" type="email" style={{ width: "100%", padding: "14px 18px", background: "rgba(196,107,107,0.02)", border: "1px solid rgba(196,107,107,0.08)", color: SILVER, fontFamily: "'Lora', serif", fontSize: 16, marginBottom: 36, fontStyle: "normal" }} />
          <Btn label="SPEAK INTO THE VOID" onClick={() => go("q1")} primary disabled={!(d.name && d.email)} />
        </div>
      </div>
    );

  // QUIZ q1..q5
  const qIndex = phase === "q1" ? 0 : phase === "q2" ? 1 : phase === "q3" ? 2 : phase === "q4" ? 3 : phase === "q5" ? 4 : -1;
  const answers = d.miniAnswers || ["", "", "", "", ""];
  const setAnswer = (i, letter) => { const a = [...answers]; a[i] = letter; set("miniAnswers", a); go(i < 4 ? `q${i + 2}` : "miniResult"); };
  if (qIndex >= 0) {
    const q = SIRENS_QUESTIONS[qIndex];
    const opts = [{ letter: "A", text: q.A }, { letter: "B", text: q.B }, { letter: "C", text: q.C }, { letter: "D", text: q.D }];
    return (
      <div style={{ minHeight: "100vh", background: INK, color: SILVER, fontFamily: "'Lora', serif", padding: "80px 24px" }}>
        <div style={{ maxWidth: 620, margin: "0 auto" }}>
          <div style={{ fontFamily: "'Raleway', sans-serif", fontSize: 11, letterSpacing: "0.2em", color: CORAL_DIM, textAlign: "center", marginBottom: 32, fontStyle: "normal" }}>Frequency {qIndex + 1} of V</div>
          <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.1rem,2.8vw,1.45rem)", color: SILVER, textAlign: "center", marginBottom: 42, lineHeight: 1.6, fontStyle: "normal" }}>"{q.q}"</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {opts.map(({ letter, text }) => (
              <div key={letter} onClick={() => setAnswer(qIndex, letter)} style={{ padding: "18px 22px", background: "rgba(196,107,107,0.02)", border: "1px solid rgba(196,107,107,0.08)", cursor: "pointer", fontFamily: "'Lora', serif", fontSize: "1rem", color: WARM_GREY, lineHeight: 1.65, fontStyle: "normal" }}>
                {text}
              </div>
            ))}
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 20, marginTop: 55, flexWrap: "wrap" }}>
            {[0, 1, 2, 3, 4].map((i) => (
              <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 20 }}>
                <div style={{ width: 5, height: 5, borderRadius: "50%", background: i <= qIndex ? CORAL : "rgba(196,107,107,0.12)" }} />
                {i < 4 && <div style={{ width: 20, height: 1, background: "rgba(196,107,107,0.08)" }} />}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // MINI RESULT
  if (phase === "miniResult") {
    const dominant = getDominantAnswer(answers);
    const r = SIRENS_REPORTS[dominant] || SIRENS_REPORTS.MIXED;
    return (
      <div style={{ minHeight: "100vh", background: INK, color: SILVER, fontFamily: "'Lora', serif", padding: "80px 24px" }}>
        <div style={{ maxWidth: 640, margin: "0 auto" }}>
          <div style={{ fontFamily: "'Raleway', sans-serif", fontSize: 11, letterSpacing: "0.2em", color: CORAL_DIM, textAlign: "center", marginBottom: 22, fontStyle: "normal" }}>Your Voice Codex Preview</div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.6rem,4vw,2.5rem)", fontWeight: 700, color: SILVER, textAlign: "center", marginBottom: 12, fontStyle: "normal" }}>{r.archetype}</h2>
          <p style={{ fontFamily: "'Lora', serif", fontSize: "1.05rem", color: CORAL, textAlign: "center", marginBottom: 40, fontStyle: "normal" }}>{r.soulLine}</p>
          <div style={{ width: 40, height: 1, background: "rgba(196,107,107,0.3)", margin: "0 auto 40px" }} />
          <div style={{ marginBottom: 40 }}>{r.body.split("\n\n").map((para, i) => <p key={i} style={{ fontFamily: "'Lora', serif", fontSize: "1.1rem", lineHeight: 1.95, color: SILVER, marginBottom: 22, fontStyle: "normal" }}>{para}</p>)}</div>
          <div style={{ padding: "28px", border: "1px solid rgba(196,107,107,0.12)", background: "rgba(196,107,107,0.02)", textAlign: "center", marginBottom: 50 }}>
            <div style={{ fontFamily: "'Raleway', sans-serif", fontSize: 11, letterSpacing: "0.2em", color: CORAL_DIM, marginBottom: 16, fontStyle: "normal" }}>The Sealed Frequency</div>
            <p style={{ fontFamily: "'Lora', serif", fontSize: "1rem", lineHeight: 1.75, color: WARM_GREY, fontStyle: "normal" }}>{r.sealed}</p>
          </div>
          <div style={{ textAlign: "center" }}>
            <a href="https://paypal.me/JSnider364/79" target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", padding: "16px 48px", fontFamily: "'Raleway', sans-serif", fontSize: 12, fontWeight: 500, letterSpacing: "0.2em", color: INK, background: `linear-gradient(135deg, ${CORAL}, ${CORAL_DIM})`, border: "none", cursor: "pointer", textDecoration: "none", fontStyle: "normal" }}>Unlock Your Full Voice Codex</a>
            <div style={{ fontFamily: "'Raleway', sans-serif", fontSize: 12, letterSpacing: "2px", color: SLATE, marginTop: 16, fontStyle: "normal" }}>$79</div>
            <p style={{ fontFamily: "'Lora', serif", fontSize: "0.92rem", lineHeight: 1.7, color: WARM_GREY, marginTop: 22, maxWidth: 420, margin: "22px auto 0", opacity: 0.7, fontStyle: "normal" }}>Your full Siren's Call reveals where your words come from, how your message naturally moves, how you build honest expression, and how your inner signal comes alive.</p>
          </div>
          <div style={{ textAlign: "center", marginTop: 40 }}><Btn label="← EDIT MY ANSWERS" onClick={() => go("q1")} /></div>
        </div>
      </div>
    );
  }

  return null;
}
