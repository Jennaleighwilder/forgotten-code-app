"use client";
import { useState, useRef, useEffect } from "react";

// Soul Map of Past Lives — $79 | Route: /past-lives
// Jennifer Leigh West | The Forgotten Code Research Institute

const VOID = "#050508";
const GOLD = "#c9a84c";
const BRONZE = "#b8860b";
const BONE = "#d9cdb8";
const ASH = "#8a8078";
const COPPER = "#7a4a2a";

const GLYPHS = ["☉", "☽", "♄", "☿", "⚶", "♆", "⚷", "☊"];

const PAST_LIVES_QUESTIONS = [
  { q: "What haunts you that didn't start in this lifetime?", A: "A fear or grief that has no origin story — it was just always there", B: "A pull toward a place, era, or civilization I have no logical connection to", C: "A relationship pattern that feels like it's replaying something ancient", D: "An ability or knowing that came too naturally — as if I'd already learned it before" },
  { q: "When you dream of other lives, what do you see?", A: "I die the same way. Different settings, same ending.", B: "Temples, libraries, or landscapes that feel more real than waking life", C: "Someone I know now — but in a completely different role or time", D: "I'm doing something sacred — ritual, healing, speaking in a language I don't know" },
  { q: "The karmic knot you keep meeting in this life is:", A: "I keep losing what I build — money, relationships, stability collapse in cycles", B: "I am drawn to spiritual systems and sacred knowledge but blocked from fully accessing them", C: "Betrayal — I trust the wrong people in the same pattern, over and over", D: "I have gifts I can feel but cannot seem to fully activate or use" },
  { q: "If your soul carried a gift across every lifetime, it would be:", A: "Survival — I have always known how to endure what should have destroyed me", B: "Sight — I sense things before they happen, read people instantly, know without being told", C: "Devotion — I love fiercely and form bonds that transcend logic or time", D: "Power — something in me knows how to move energy, command rooms, shift outcomes" },
  { q: "If you could ask your past selves one question, it would be:", A: "Why does this same wound keep following me?", B: "Where did I come from — what civilizations, temples, or lands shaped my soul?", C: "Who are the people in my life now, and what contracts did we make before?", D: "What am I supposed to do with what I carry — what is the purpose of these gifts?" },
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

const PAST_LIVES_REPORTS = {
  A: { archetype: "The Wound Carrier", soulLine: "Your soul carries scars older than your body.", body: "There is a wound in you that has no birth certificate. It did not begin with a childhood memory or a single event you can name. It was there before you had language for it — a grief, a fear, a collapse pattern that moves through your life like weather you cannot outrun.\n\nThis is the signature of a soul carrying unfinished death across lifetimes. Somewhere in your history, you ended violently, suddenly, or before something sacred was completed. The grief you feel is not depression. It is a soul still mourning what it lost in another body, another century, another world.\n\nThe cycles you keep meeting — building and losing, arriving and being expelled, almost reaching and then watching it dissolve — these are not bad luck. They are an echo. A loop. The same death reaching forward through time, trying to complete itself differently this time.\n\nYour soul does not need therapy for this. It needs a map. It needs to see where the loop started, what the original wound was, and what it is asking you to do differently now.", sealed: "Your full Soul Map traces the original wound across three to five lifetimes — identifying the death pattern, the karmic debt attached to it, and the specific action this lifetime is asking you to take to finally close the loop." },
  B: { archetype: "The Ancient", soulLine: "You remember temples your body has never visited.", body: "You are not imagining it. The places that call you — the civilizations that feel like home, the languages that stir something in your chest before your mind can translate them — these are not fantasies. They are coordinates. Your soul is showing you where it has been.\n\nYou carry the frequency of an old soul, one that has moved through many lands and learned from many systems. The pull you feel toward certain geographies, spiritual traditions, or historical periods is not random curiosity. It is recognition. Your cellular memory holds the imprint of temple floors you have walked, stars you have mapped, rituals you have performed with your own hands in another body.\n\nThe frustration you feel in this lifetime — the sense of being blocked from fully accessing what you know is in you — is the distance between what your soul remembers and what this body has been taught. You are carrying a master's knowledge in a world that handed you a beginner's curriculum.\n\nYour task is not to learn. It is to remember. And to find the doors that open what was sealed.", sealed: "Your full Soul Map identifies the specific civilizations, temple systems, and sacred geographies encoded in your karmic blueprint — including the lifetime where your deepest knowledge was acquired and the conditions required to reactivate it now." },
  C: { archetype: "The Bound Soul", soulLine: "The people in your life are not strangers. They are contracts.", body: "You have met these people before. The ones who felt immediately familiar — too familiar. The ones you trusted on instinct and the ones who betrayed you in patterns so specific they felt scripted. That is because they were. Not in this life. Before it.\n\nYour soul carries active contracts — agreements made with other souls across lifetimes about what you would do together, what debts would be repaid, what lessons would be forced. The relationship patterns you keep repeating are not psychological habits. They are karmic choreography. The same souls returning in different costumes to play out the same unfinished scene.\n\nThe betrayal pattern is the loudest thread. Somewhere in your history, trust was shattered so completely that your soul encoded a loop: find a version of that person, test them, get betrayed again, confirm the wound. This is not self-sabotage. It is a soul trying to write a different ending to the same story and not yet knowing how.\n\nThe contracts are real. But they can be renegotiated.", sealed: "Your full Soul Map identifies the specific soul contracts you are carrying — who the key players are, what the original agreements were, which contracts have been fulfilled, and which ones are still active and shaping your relationships, losses, and repeating patterns right now." },
  D: { archetype: "The Gift Carrier", soulLine: "You brought something with you. It is waiting to be used.", body: "You did not arrive empty. The abilities that feel too natural to have been learned — the way you read people before they speak, the energy you move without being taught how, the knowing that arrives fully formed before logic can explain it — these are not talents. They are carried skills. Earned in other lifetimes. Brought here on purpose.\n\nYour soul has been a practitioner. A healer, a seer, a channel, a wielder of power in systems most modern minds do not have language for. The gifts you sense inside you — the ones you can feel but not fully activate — are not broken. They are locked behind a karmic gate that requires the right conditions to open.\n\nThe frustration of carrying more than you can use is one of the oldest soul patterns. You were given these gifts before and something happened — persecution, misuse, fear, or a vow of silence that followed you into this body. The lock is not punishment. It is protection. Until you understand what happened the last time you opened that door, the door stays sealed.\n\nBut not forever. Not if you have the map.", sealed: "Your full Soul Map identifies the specific gifts encoded in your karmic blueprint — which lifetimes they were mastered in, what caused them to be sealed, and the exact spiritual conditions required to safely reactivate them in this lifetime." },
  MIXED: { archetype: "The Thread Walker", soulLine: "Your soul is weaving something that requires many lifetimes to complete.", body: "You are not a simple pattern. Your answers reveal a soul carrying multiple active threads — wounds and gifts, ancient knowledge and unfinished contracts, all running simultaneously. This is not confusion. It is complexity. You are a soul in the middle of a project that spans centuries.\n\nThe Thread Walker is rare. Most souls carry one dominant karmic signature per lifetime — a wound to close, a gift to activate, a contract to fulfill. You are carrying several. This means your past lives were not linear progressions from one lesson to the next. They were layered, overlapping, sometimes contradictory. You have been the healer and the wounded, the betrayer and the betrayed, the master and the student — sometimes in the same lifetime.\n\nThis is why simple explanations have never worked for you. No single framework captures it because no single thread explains you. You are the intersection of multiple karmic timelines converging in one body, one life, one moment.\n\nThat convergence is not an accident. It is the point. Something is being completed.", sealed: "Your full Soul Map traces all active karmic threads — the wounds, contracts, gifts, and geographical imprints running through your soul simultaneously — and identifies the convergence point: the specific thing this lifetime was designed to complete." },
};

function Btn({ label, onClick, disabled, primary }) {
  return (
    <div
      onClick={() => !disabled && onClick()}
      style={{
        display: "inline-block",
        padding: primary ? "16px 48px" : "14px 32px",
        fontFamily: "'Cinzel', serif",
        fontSize: 13,
        letterSpacing: "0.2em",
        color: disabled ? ASH + "66" : GOLD,
        border: `1px solid ${disabled ? ASH + "22" : "rgba(201,168,76,0.35)"}`,
        cursor: disabled ? "default" : "pointer",
        transition: "all 0.4s ease",
        background: primary && !disabled ? "rgba(201,168,76,0.08)" : "transparent",
        fontStyle: "normal",
      }}
    >
      {label}
    </div>
  );
}

export default function PastLivesIntake() {
  const [phase, setPhase] = useState("intro");
  const [d, setD] = useState({ name: "", email: "", miniAnswers: ["", "", "", "", ""] });
  const set = (k, v) => setD((p) => ({ ...p, [k]: v }));
  const go = (ph) => { setPhase(ph); window.scrollTo({ top: 0, behavior: "smooth" }); };

  const starCanvasRef = useRef(null);
  const hourglassCanvasRef = useRef(null);
  const rafIds = useRef({ stars: null, hourglass: null });

  // Star field — canvas (matches HTML: 300 stars, drawStars loop)
  useEffect(() => {
    if (phase !== "intro" || !starCanvasRef.current) return;
    const canvas = starCanvasRef.current;
    const ctx = canvas.getContext("2d");
    let stars = [];
    function initStars() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      stars = [];
      for (let i = 0; i < 300; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          r: Math.random() * 1.2 + 0.3,
          alpha: Math.random() * 0.6 + 0.1,
          pulse: Math.random() * Math.PI * 2,
          speed: Math.random() * 0.005 + 0.002,
        });
      }
    }
    function drawStars() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach((s) => {
        s.pulse += s.speed;
        const a = s.alpha * (0.5 + 0.5 * Math.sin(s.pulse));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(201, 168, 76, ${a})`;
        ctx.fill();
      });
      rafIds.current.stars = requestAnimationFrame(drawStars);
    }
    initStars();
    drawStars();
    const onResize = () => { initStars(); };
    window.addEventListener("resize", onResize);
    return () => {
      if (rafIds.current.stars) cancelAnimationFrame(rafIds.current.stars);
      window.removeEventListener("resize", onResize);
    };
  }, [phase]);

  // Hourglass canvas + sand (matches HTML: clientWidth*2, clientHeight*2 for retina)
  useEffect(() => {
    if (phase !== "intro" || !hourglassCanvasRef.current) return;
    const canvas = hourglassCanvasRef.current;
    const ctx = canvas.getContext("2d");
    let sandGrains = [];
    let hgTime = 0;
    function initHourglass() {
      const w = (canvas.width = canvas.clientWidth * 2);
      const h = (canvas.height = canvas.clientHeight * 2);
      const cx = w / 2;
      const topY = h * 0.08;
      const midY = h * 0.48;
      const botY = h * 0.88;
      sandGrains = [];
      for (let i = 0; i < 80; i++) {
        const t = Math.random();
        const maxW = (1 - t) * w * 0.32;
        sandGrains.push({ x: cx + (Math.random() - 0.5) * maxW, y: topY + t * (midY - topY) * 0.85, r: Math.random() * 1.5 + 0.5, falling: false, fallSpeed: 0, alpha: Math.random() * 0.6 + 0.3, delay: Math.random() * 400 });
      }
      for (let i = 0; i < 12; i++) {
        sandGrains.push({ x: cx + (Math.random() - 0.5) * 4, y: midY + Math.random() * (botY - midY) * 0.6, r: Math.random() * 1 + 0.5, falling: true, fallSpeed: Math.random() * 1.5 + 0.8, alpha: Math.random() * 0.7 + 0.3, delay: 0 });
      }
      for (let i = 0; i < 50; i++) {
        const t = Math.random();
        const maxW = t * w * 0.32;
        sandGrains.push({ x: cx + (Math.random() - 0.5) * maxW, y: botY - t * (botY - midY) * 0.35, r: Math.random() * 1.5 + 0.5, falling: false, fallSpeed: 0, alpha: Math.random() * 0.5 + 0.3, delay: 0 });
      }
    }
    function drawHourglass() {
      const w = canvas.width;
      const h = canvas.height;
      const cx = w / 2;
      ctx.clearRect(0, 0, w, h);
      hgTime++;
      ctx.strokeStyle = "rgba(201, 168, 76, 0.25)";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(cx - w * 0.35, h * 0.06);
      ctx.lineTo(cx + w * 0.35, h * 0.06);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(cx - w * 0.35, h * 0.94);
      ctx.lineTo(cx + w * 0.35, h * 0.94);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(cx - w * 0.32, h * 0.08);
      ctx.bezierCurveTo(cx - w * 0.32, h * 0.35, cx - w * 0.02, h * 0.42, cx, h * 0.5);
      ctx.bezierCurveTo(cx - w * 0.02, h * 0.58, cx - w * 0.32, h * 0.65, cx - w * 0.32, h * 0.92);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(cx + w * 0.32, h * 0.08);
      ctx.bezierCurveTo(cx + w * 0.32, h * 0.35, cx + w * 0.02, h * 0.42, cx, h * 0.5);
      ctx.bezierCurveTo(cx + w * 0.02, h * 0.58, cx + w * 0.32, h * 0.65, cx + w * 0.32, h * 0.92);
      ctx.stroke();
      sandGrains.forEach((g) => {
        if (g.falling) {
          g.y += g.fallSpeed;
          if (g.y > h * 0.82) {
            g.y = h * 0.48 + Math.random() * 10;
            g.x = cx + (Math.random() - 0.5) * 4;
          }
          g.x += Math.sin(hgTime * 0.05 + g.delay) * 0.15;
        }
        const pulse = Math.sin(hgTime * 0.02 + g.delay) * 0.15;
        ctx.beginPath();
        ctx.arc(g.x, g.y, g.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(201, 168, 76, ${g.alpha + pulse})`;
        ctx.fill();
      });
      rafIds.current.hourglass = requestAnimationFrame(drawHourglass);
    }
    initHourglass();
    drawHourglass();
    const onResize = () => initHourglass();
    window.addEventListener("resize", onResize);
    return () => {
      if (rafIds.current.hourglass) cancelAnimationFrame(rafIds.current.hourglass);
      window.removeEventListener("resize", onResize);
    };
  }, [phase]);

  // INTRO — layout matches HTML: flex center, star canvas fixed, cobra absolute, orbit-ring CSS rotation, hourglass + title in flow
  if (phase === "intro")
    return (
      <>
        <style dangerouslySetInnerHTML={{ __html: `
          .past-lives-opening { position: relative; width: 100%; min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; overflow: hidden; background: #050508; color: #d9cdb8; font-family: 'EB Garamond', serif; }
          .past-lives-star-field { position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: 0; pointer-events: none; }
          .past-lives-cobra { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 600px; height: 600px; border-radius: 50%;
            background: radial-gradient(ellipse 40% 55% at center, rgba(201,168,76,0.08) 0%, rgba(184,134,11,0.04) 30%, rgba(138,69,19,0.02) 60%, transparent 100%);
            animation: pastLivesCobraBreath 6s ease-in-out infinite; z-index: 1; pointer-events: none; }
          @keyframes pastLivesCobraBreath { 0%, 100% { opacity: 0.4; transform: translate(-50%, -50%) scale(1); } 50% { opacity: 0.9; transform: translate(-50%, -50%) scale(1.15); } }
          .past-lives-orbit-ring { position: absolute; top: 50%; left: 50%; width: 460px; height: 460px; margin-left: -230px; margin-top: -230px; border-radius: 50%;
            animation: pastLivesOrbitSpin 90s linear infinite; z-index: 3; pointer-events: none; }
          @keyframes pastLivesOrbitSpin { to { transform: rotate(360deg); } }
          .past-lives-orbit-glyph { position: absolute; font-size: 1.4rem; color: #c9a84c; opacity: 0.5; text-shadow: 0 0 8px rgba(201,168,76,0.4); font-family: 'Cinzel', serif; letter-spacing: 2px; }
          .past-lives-orbit-glyph:nth-child(1) { top: 0; left: 50%; transform: translateX(-50%); }
          .past-lives-orbit-glyph:nth-child(2) { top: 50%; right: 0; transform: translateY(-50%); }
          .past-lives-orbit-glyph:nth-child(3) { bottom: 0; left: 50%; transform: translateX(-50%); }
          .past-lives-orbit-glyph:nth-child(4) { top: 50%; left: 0; transform: translateY(-50%); }
          .past-lives-orbit-glyph:nth-child(5) { top: 12%; right: 8%; }
          .past-lives-orbit-glyph:nth-child(6) { bottom: 12%; right: 8%; }
          .past-lives-orbit-glyph:nth-child(7) { bottom: 12%; left: 8%; }
          .past-lives-orbit-glyph:nth-child(8) { top: 12%; left: 8%; }
        ` }} />
        <div className="past-lives-opening">
          <canvas ref={starCanvasRef} className="past-lives-star-field" style={{ width: "100%", height: "100%" }} />
          <div className="past-lives-cobra" />
          <div className="past-lives-orbit-ring">
            {GLYPHS.map((g, i) => (
              <span key={i} className="past-lives-orbit-glyph">{g}</span>
            ))}
          </div>
          <div style={{ position: "relative", zIndex: 5, width: 200, height: 340, marginBottom: 40 }}>
            <canvas ref={hourglassCanvasRef} width={200} height={340} style={{ width: "100%", height: "100%", filter: "drop-shadow(0 0 30px rgba(201, 168, 76, 0.3))", pointerEvents: "none" }} />
          </div>
          <div style={{ position: "relative", zIndex: 10, textAlign: "center", padding: "0 20px" }}>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.85rem", letterSpacing: "8px", color: ASH, marginBottom: 16, fontWeight: 300, fontStyle: "normal" }}>What is your soul repeating?</div>
            <h1 style={{ fontFamily: "'Cinzel', serif", fontSize: "clamp(2.2rem, 5vw, 3.8rem)", fontWeight: 700, color: GOLD, letterSpacing: "6px", textShadow: "0 0 40px rgba(201,168,76,0.3), 0 2px 4px rgba(0,0,0,0.8)", marginBottom: 12, lineHeight: 1.2, fontStyle: "normal" }}>SOUL MAP OF PAST LIVES</h1>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.15rem", color: ASH, letterSpacing: "3px", fontWeight: 300, marginBottom: 8, fontStyle: "normal" }}>Old patterns that return · Agreements across lifetimes · Gifts kept, debts remembered</div>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.75rem", letterSpacing: "6px", color: COPPER, marginTop: 20, fontStyle: "normal" }}>Mini Preview + Full Deep Intake</div>
            <p style={{ maxWidth: 560, margin: "32px auto 0", fontFamily: "'EB Garamond', serif", fontSize: "1.1rem", lineHeight: 1.8, color: BONE, opacity: 0.75, fontStyle: "normal" }}>
              You have lived before. The patterns that haunt you — the fears without origin, the places that feel like home before you arrive, the people who feel ancient the moment you meet them — these are not imagination. They are memory. Give us five answers and we will show you the thread.
            </p>
            <div style={{ marginTop: 40 }}><Btn label="ENTER THE ARCHIVE" onClick={() => go("start")} primary /></div>
          </div>
          <div style={{ position: "absolute", bottom: 30, left: "50%", transform: "translateX(-50%)", fontFamily: "'Cormorant Garamond', serif", fontSize: "0.7rem", letterSpacing: "4px", color: ASH, opacity: 0.4, zIndex: 10, fontStyle: "normal" }}>The Forgotten Code Research Institute</div>
        </div>
      </>
    );

  // START — Name + Email
  if (phase === "start")
    return (
      <div style={{ minHeight: "100vh", width: "100%", background: VOID, color: BONE, fontFamily: "'EB Garamond', serif", padding: "80px 24px" }}>
        <div style={{ maxWidth: 420, margin: "0 auto" }}>
          <div style={{ fontFamily: "'Cinzel', serif", fontSize: 11, letterSpacing: "0.3em", color: ASH, marginBottom: 24, fontStyle: "normal" }}>BEFORE WE BEGIN</div>
          <label style={{ display: "block", fontFamily: "'Cormorant Garamond', serif", fontSize: 13, color: ASH, marginBottom: 6, fontStyle: "normal" }}>Your Name</label>
          <input value={d.name} onChange={(e) => set("name", e.target.value)} placeholder="First and last" style={{ width: "100%", padding: "14px 18px", background: "rgba(201,168,76,0.03)", border: "1px solid rgba(201,168,76,0.12)", color: BONE, fontFamily: "'EB Garamond', serif", fontSize: 16, marginBottom: 20, fontStyle: "normal" }} />
          <label style={{ display: "block", fontFamily: "'Cormorant Garamond', serif", fontSize: 13, color: ASH, marginBottom: 6, fontStyle: "normal" }}>Email Address</label>
          <input value={d.email} onChange={(e) => set("email", e.target.value)} placeholder="For receiving your reading" type="email" style={{ width: "100%", padding: "14px 18px", background: "rgba(201,168,76,0.03)", border: "1px solid rgba(201,168,76,0.12)", color: BONE, fontFamily: "'EB Garamond', serif", fontSize: 16, marginBottom: 36, fontStyle: "normal" }} />
          <Btn label="ENTER THE ARCHIVE" onClick={() => go("q1")} primary disabled={!(d.name && d.email)} />
        </div>
      </div>
    );

  // QUIZ q1..q5
  const qIndex = phase === "q1" ? 0 : phase === "q2" ? 1 : phase === "q3" ? 2 : phase === "q4" ? 3 : phase === "q5" ? 4 : -1;
  const answers = d.miniAnswers || ["", "", "", "", ""];
  const setAnswer = (i, letter) => { const a = [...answers]; a[i] = letter; set("miniAnswers", a); go(i < 4 ? `q${i + 2}` : "miniResult"); };
  if (qIndex >= 0) {
    const q = PAST_LIVES_QUESTIONS[qIndex];
    const opts = [{ letter: "A", text: q.A }, { letter: "B", text: q.B }, { letter: "C", text: q.C }, { letter: "D", text: q.D }];
    return (
      <div style={{ minHeight: "100vh", background: VOID, color: BONE, fontFamily: "'EB Garamond', serif", padding: "60px 24px" }}>
        <div style={{ maxWidth: 640, margin: "0 auto" }}>
          <div style={{ fontFamily: "'Cinzel', serif", fontSize: 11, letterSpacing: "0.2em", color: COPPER, textAlign: "center", marginBottom: 24, fontStyle: "normal" }}>Thread {qIndex + 1} of V</div>
          <p style={{ fontFamily: "'EB Garamond', serif", fontSize: "clamp(1.1rem,2.8vw,1.5rem)", color: BONE, textAlign: "center", marginBottom: 40, lineHeight: 1.6, fontStyle: "normal" }}>"{q.q}"</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {opts.map(({ letter, text }) => (
              <div key={letter} onClick={() => setAnswer(qIndex, letter)} style={{ padding: "20px 24px", background: "rgba(201,168,76,0.03)", border: "1px solid rgba(201,168,76,0.12)", cursor: "pointer", fontFamily: "'EB Garamond', serif", fontSize: "1.05rem", color: BONE, lineHeight: 1.6, fontStyle: "normal" }}>
                {text}
              </div>
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "center", gap: 12, marginTop: 50 }}>
            {[0, 1, 2, 3, 4].map((i) => <div key={i} style={{ width: 6, height: 6, borderRadius: "50%", background: i <= qIndex ? GOLD : ASH + "44" }} />)}
          </div>
        </div>
      </div>
    );
  }

  // MINI RESULT
  if (phase === "miniResult") {
    const dominant = getDominantAnswer(answers);
    const r = PAST_LIVES_REPORTS[dominant] || PAST_LIVES_REPORTS.MIXED;
    return (
      <div style={{ minHeight: "100vh", background: VOID, color: BONE, fontFamily: "'EB Garamond', serif", padding: "80px 24px" }}>
        <div style={{ maxWidth: 680, margin: "0 auto" }}>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 11, letterSpacing: "0.2em", color: COPPER, textAlign: "center", marginBottom: 20, fontStyle: "normal" }}>Your Soul Map Preview</div>
          <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: "clamp(1.6rem,4vw,2.4rem)", color: GOLD, textAlign: "center", marginBottom: 12, fontStyle: "normal" }}>{r.archetype}</h2>
          <p style={{ fontFamily: "'EB Garamond', serif", fontSize: "1.15rem", color: ASH, textAlign: "center", marginBottom: 40, fontStyle: "normal" }}>{r.soulLine}</p>
          <div style={{ width: 60, height: 1, background: "rgba(201,168,76,0.3)", margin: "0 auto 40px" }} />
          <div style={{ marginBottom: 40 }}>{r.body.split("\n\n").map((para, i) => <p key={i} style={{ fontFamily: "'EB Garamond', serif", fontSize: "1.15rem", lineHeight: 1.9, color: BONE, marginBottom: 20, fontStyle: "normal" }}>{para}</p>)}</div>
          <div style={{ padding: "30px", border: "1px solid rgba(201,168,76,0.15)", background: "rgba(201,168,76,0.02)", textAlign: "center", marginBottom: 50 }}>
            <div style={{ fontFamily: "'Cinzel', serif", fontSize: 10, letterSpacing: "0.2em", color: BRONZE, marginBottom: 16, fontStyle: "normal" }}>The Sealed Chapter</div>
            <p style={{ fontFamily: "'EB Garamond', serif", fontSize: "1.05rem", lineHeight: 1.7, color: ASH, fontStyle: "normal" }}>{r.sealed}</p>
          </div>
          <div style={{ textAlign: "center" }}>
            <a href="https://paypal.me/JSnider364/79" target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", padding: "18px 52px", fontFamily: "'Cinzel', serif", fontSize: 12, fontWeight: 600, letterSpacing: "0.2em", color: VOID, background: `linear-gradient(135deg, ${GOLD}, ${BRONZE})`, border: "none", cursor: "pointer", textDecoration: "none", fontStyle: "normal" }}>Unlock Your Full Soul Map</a>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 12, letterSpacing: "2px", color: ASH, marginTop: 16, fontStyle: "normal" }}>$79</div>
            <p style={{ fontFamily: "'EB Garamond', serif", fontSize: "0.95rem", lineHeight: 1.7, color: ASH, marginTop: 24, maxWidth: 420, margin: "24px auto 0", fontStyle: "normal" }}>Your full Soul Map of Past Lives traces old patterns that return, maps agreements across lifetimes, reveals stories that echo again and again, and identifies gifts kept and debts remembered.</p>
          </div>
          <div style={{ textAlign: "center", marginTop: 40 }}><Btn label="← EDIT MY ANSWERS" onClick={() => go("q1")} /></div>
        </div>
      </div>
    );
  }

  return null;
}
