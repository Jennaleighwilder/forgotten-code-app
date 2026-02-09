"use client";
import { useState } from "react";

// Desire: The Hidden Truth — $79 | Route: /desire
// Dior/Vogue editorial — pure CSS intro (no canvas, no JS animation)
// Cormorant Garamond italic, Montserrat 200–300 | void, mauve, pearl, deep-pink

const VOID = "#0c080e";
const PEARL = "#f0e4ef";
const SMOKE = "#8a7e92";
const DEEP_PINK = "#d4709a";
const MAUVE = "#c4a8be";

const DESIRE_QUESTIONS = [
  { q: "What were you taught was unacceptable to want?", A: "Attention, praise, or being seen.", B: "Pleasure, desire, or your own body.", C: "Success, money, or power.", D: "Love, belonging, or needing anyone." },
  { q: "What do you want that you've never said out loud?", A: "To be chosen first — for once.", B: "To stop performing and be fully known.", C: "To have what others have without guilt.", D: "To be the one in charge of my own story." },
  { q: "Where did you learn to hide parts of yourself?", A: "At home — certain feelings or needs were punished or ignored.", B: "In religion or culture — desire was sinful or selfish.", C: "In relationship — I became what they wanted.", D: "In the world — it wasn't safe to want too much." },
  { q: "What would 'standing in your full sovereignty' look like for you?", A: "Saying no without apologizing.", B: "Wanting what I want without shame.", C: "Taking up space without shrinking.", D: "Being desired without performing for it." },
  { q: "If you could undress one pattern that holds you back, what would it be?", A: "The belief that I don't deserve to want.", B: "The habit of hiding my truth to keep the peace.", C: "The fear that wanting makes me bad or selfish.", D: "The story that my desires are too much for others." },
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

const DESIRE_REPORTS = {
  A: { archetype: "The Unseen", soulLine: "You learned that wanting to be seen was dangerous.", body: "You were taught — at home, in relationship, or in the world — that certain desires were unacceptable. Attention, praise, being chosen first — wanting these made you greedy or too much. So you learned to hide. To be the one who didn't need. The one who was fine.\n\nThat lesson is still running. The part of you that wants to be chosen, to be seen without performing, is the part you've been told to quiet. But it's not gone. It lives in the belief that you don't deserve to want. In the habit of putting others first so you never have to ask.\n\nYour task is not to become someone else. It is to map where that lesson was installed — and to let yourself want to be seen, without apology.", sealed: "Your full Desire Map traces the unseen pattern — where you learned to disappear your wants, and the specific practices to stand in your visibility without shame." },
  B: { archetype: "The Performer", soulLine: "You became what they wanted — and forgot what you wanted.", body: "You learned to perform. To be the version of yourself that was acceptable — in religion, in culture, in relationship. Desire was sinful or selfish. So you became what they wanted. You hid your truth to keep the peace. You learned which parts of yourself were acceptable and which ones to hide.\n\nThat lesson is still running. The part of you that wants to stop performing — to be fully known — is the part you've been told was too much. Too honest. Too desiring. So you keep the performance going. You keep the peace. And you lose the truth of what you actually want.\n\nYour task is to map where the performance began — and to let yourself be known without performing for it.", sealed: "Your full Desire Map identifies the performer pattern — where you learned to hide your truth, and the specific steps to want what you want without shame." },
  C: { archetype: "The Guilty", soulLine: "You were taught that wanting made you bad.", body: "You want what others have — success, money, power, ease. But wanting it comes with guilt. You were taught that wanting was selfish. That having more than someone else made you bad. So you've learned to hide your ambition, your desire for more, behind a story that says you don't really want it.\n\nThat lesson is still running. The part of you that wants to have — without guilt — is the part you've been told to quiet. So you sabotage. You underclaim. You tell yourself you're fine with less. The guilt is not truth. It's an old program.\n\nYour task is to map where the guilt was installed — and to let yourself want what you want without making it wrong.", sealed: "Your full Desire Map traces the guilt pattern — where wanting became dangerous, and the specific practices to prosper without apology." },
  D: { archetype: "The Sovereign", soulLine: "You're ready to be the one in charge of your own story.", body: "You've carried the story that your desires were too much — for your family, your partners, the world. So you've learned to shrink. To want less. To be the one who didn't take up space. But something in you is done with that. You want to be the one in charge of your own story. To take up space. To be desired without performing for it.\n\nThat lesson — the one that said your desires were too much — is still running. But you're not. You're the one who gets to decide what you want and how much space you take. Sovereignty isn't selfish. It's the refusal to let someone else's limits define your desires.\n\nYour task is to map where you gave away the pen — and to take it back.", sealed: "Your full Desire Map identifies the sovereignty pattern — where you learned to shrink your wants, and the specific steps to stand in your full desire without performing or apologizing." },
  MIXED: { archetype: "The Rising", soulLine: "Your desire has multiple threads — and you're the one who gets to weave them.", body: "Your answers reveal a desire pattern that doesn't fit one box. You've been unseen, you've performed, you've carried guilt, and you've felt the pull toward sovereignty — all at once. That's not confusion. It's complexity. Someone taught you which parts of yourself were acceptable. That lesson is still running in more than one way.\n\nThe good news: you're at the convergence point. You can see the patterns. You can feel where they conflict. The part of you that wants to be seen, to stop performing, to want without guilt, and to take up space — that part is rising. It's not too much. It's the truth.\n\nYour task is to map all the threads — and to become the one who weaves them into a story you choose.", sealed: "Your full Desire Map traces all desire patterns — unseen, performer, guilty, sovereign — and identifies the convergence point: the specific beliefs and behaviors to release so you can want what you want without hiding or apologizing." },
};

function Btn({ label, onClick, disabled, primary }) {
  return (
    <div
      onClick={() => !disabled && onClick()}
      style={{
        display: "inline-block",
        padding: primary ? "16px 44px" : "14px 32px",
        fontFamily: "'Montserrat', sans-serif",
        fontWeight: 300,
        fontSize: 9,
        letterSpacing: "7px",
        textTransform: "uppercase",
        color: disabled ? SMOKE + "99" : PEARL,
        background: "transparent",
        border: `1px solid ${disabled ? "rgba(212,112,154,0.15)" : "rgba(212,112,154,0.22)"}`,
        cursor: disabled ? "default" : "pointer",
        transition: "all 0.8s ease",
        fontStyle: "normal",
      }}
    >
      {label}
    </div>
  );
}

const DESIRE_INTRO_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Montserrat:wght@200;300;400&display=swap');
  .desire-intro { background: #0c080e; overflow: hidden; height: 100vh; width: 100%; position: relative; font-family: 'Cormorant Garamond', serif; }
  .desire-intro .sunrise-outer { position: fixed; bottom: -50%; left: -50%; width: 200%; height: 120%; border-radius: 50%; background: radial-gradient(ellipse at 50% 85%, rgba(220,100,140,0.18) 0%, rgba(194,80,130,0.1) 25%, transparent 65%); animation: desireRiseOuter 3s ease-out 1.5s forwards; opacity: 0; z-index: 1; }
  .desire-intro .sunrise-mid { position: fixed; bottom: -60%; left: -40%; width: 180%; height: 110%; border-radius: 50%; background: radial-gradient(ellipse at 50% 88%, rgba(240,140,170,0.22) 0%, rgba(232,120,160,0.12) 20%, transparent 60%); animation: desireRiseMid 3.5s ease-out 2s forwards; opacity: 0; z-index: 2; }
  .desire-intro .sunrise-core { position: fixed; bottom: -65%; left: -30%; width: 160%; height: 100%; border-radius: 50%; background: radial-gradient(ellipse at 50% 92%, rgba(255,200,210,0.25) 0%, rgba(250,170,190,0.14) 15%, transparent 50%); animation: desireRiseCore 4s ease-out 2.3s forwards; opacity: 0; z-index: 3; }
  .desire-intro .sunrise-hot { position: fixed; bottom: -10%; left: 50%; transform: translateX(-50%); width: 300px; height: 200px; border-radius: 50%; background: radial-gradient(ellipse at 50% 80%, rgba(255,220,230,0.2) 0%, rgba(255,180,200,0.1) 30%, transparent 70%); opacity: 0; animation: desireHotAppear 2s ease-out 3s forwards, desireHotPulse 4s ease-in-out 5s infinite; z-index: 4; }
  .desire-intro .sunrise-breathe { position: fixed; bottom: -25%; left: -50%; width: 200%; height: 100%; border-radius: 50%; background: radial-gradient(ellipse at 50% 80%, rgba(240,140,170,0.1) 0%, rgba(194,100,140,0.05) 30%, transparent 55%); animation: desireBreatheSunrise 8s ease-in-out 5s infinite; opacity: 0; z-index: 2; }
  @keyframes desireRiseOuter { 0% { bottom: -50%; opacity: 0; } 40% { opacity: 0.8; } 100% { bottom: -20%; opacity: 1; } }
  @keyframes desireRiseMid { 0% { bottom: -60%; opacity: 0; } 40% { opacity: 0.8; } 100% { bottom: -25%; opacity: 1; } }
  @keyframes desireRiseCore { 0% { bottom: -65%; opacity: 0; } 50% { opacity: 0.9; } 100% { bottom: -30%; opacity: 1; } }
  @keyframes desireHotAppear { 0% { opacity: 0; transform: translateX(-50%) scale(0.5); } 100% { opacity: 1; transform: translateX(-50%) scale(1); } }
  @keyframes desireHotPulse { 0%, 100% { opacity: 0.6; transform: translateX(-50%) scale(1); } 50% { opacity: 1; transform: translateX(-50%) scale(1.15); } }
  @keyframes desireBreatheSunrise { 0%, 100% { opacity: 0.3; transform: scale(1); } 50% { opacity: 0.8; transform: scale(1.06); } }
  .desire-intro .gauze { position: fixed; border-radius: 50%; pointer-events: none; filter: blur(70px); z-index: 4; }
  .desire-intro .gauze-1 { width: 500px; height: 400px; top: 5%; left: -8%; background: rgba(194,100,150,0.06); animation: desireDrift1 24s ease-in-out infinite; }
  .desire-intro .gauze-2 { width: 450px; height: 380px; top: 35%; right: -12%; background: rgba(160,130,180,0.05); animation: desireDrift2 28s ease-in-out infinite; }
  .desire-intro .gauze-3 { width: 550px; height: 450px; bottom: 0; left: 15%; background: rgba(220,100,150,0.05); animation: desireDrift3 32s ease-in-out infinite; }
  @keyframes desireDrift1 { 0%, 100% { transform: translate(0,0) scale(1); } 50% { transform: translate(80px,40px) scale(1.2); } }
  @keyframes desireDrift2 { 0%, 100% { transform: translate(0,0) scale(1.1); } 50% { transform: translate(-70px,-30px) scale(0.9); } }
  @keyframes desireDrift3 { 0%, 100% { transform: translate(0,0) scale(1); } 50% { transform: translate(50px,-50px) scale(1.25); } }
  .desire-intro .glow-ring { position: fixed; border-radius: 50%; border: 1px solid rgba(194,112,136,0.06); pointer-events: none; z-index: 4; }
  .desire-intro .glow-ring-1 { width: 400px; height: 400px; top: 50%; left: 50%; transform: translate(-50%, -50%); animation: desireRingPulse1 8s ease-in-out 3s infinite; opacity: 0; }
  .desire-intro .glow-ring-2 { width: 600px; height: 600px; top: 50%; left: 50%; transform: translate(-50%, -50%); animation: desireRingPulse2 10s ease-in-out 3.5s infinite; opacity: 0; }
  .desire-intro .glow-ring-3 { width: 850px; height: 850px; top: 50%; left: 50%; transform: translate(-50%, -50%); animation: desireRingPulse3 12s ease-in-out 4s infinite; opacity: 0; }
  @keyframes desireRingPulse1 { 0%, 100% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); } 50% { opacity: 0.6; transform: translate(-50%, -50%) scale(1.1); } }
  @keyframes desireRingPulse2 { 0%, 100% { opacity: 0; transform: translate(-50%, -50%) scale(0.85); } 50% { opacity: 0.4; transform: translate(-50%, -50%) scale(1.05); } }
  @keyframes desireRingPulse3 { 0%, 100% { opacity: 0; transform: translate(-50%, -50%) scale(0.9); } 50% { opacity: 0.25; transform: translate(-50%, -50%) scale(1.03); } }
  .desire-intro .light-sweep { position: fixed; top: 0; left: -100%; width: 60%; height: 100%; background: linear-gradient(90deg, transparent, rgba(255,200,220,0.015), rgba(255,220,235,0.03), transparent); z-index: 5; pointer-events: none; animation: desireLightSweep 12s ease-in-out 4s infinite; }
  @keyframes desireLightSweep { 0% { left: -60%; } 50% { left: 100%; } 100% { left: 100%; } }
  .desire-intro .mist-field { position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: 6; pointer-events: none; }
  .desire-intro .mist { position: absolute; border-radius: 50%; animation: desireMistRise linear infinite; }
  .desire-intro .mist:nth-child(1){width:2px;height:2px;left:5%;bottom:-5%;background:rgba(240,150,180,0.25);animation-duration:18s;}.desire-intro .mist:nth-child(2){width:3px;height:3px;left:12%;bottom:-5%;background:rgba(220,180,210,0.2);animation-duration:22s;animation-delay:1s;}
  .desire-intro .mist:nth-child(3){width:2px;height:2px;left:20%;bottom:-5%;background:rgba(255,200,220,0.22);animation-duration:16s;animation-delay:3s;}.desire-intro .mist:nth-child(4){width:1.5px;height:1.5px;left:28%;bottom:-5%;background:rgba(200,170,210,0.18);animation-duration:24s;}
  .desire-intro .mist:nth-child(5){width:2.5px;height:2.5px;left:33%;bottom:-5%;background:rgba(240,150,180,0.2);animation-duration:20s;animation-delay:4s;}.desire-intro .mist:nth-child(6){width:2px;height:2px;left:40%;bottom:-5%;background:rgba(180,160,200,0.15);animation-duration:26s;animation-delay:2s;}
  .desire-intro .mist:nth-child(7){width:3px;height:3px;left:47%;bottom:-5%;background:rgba(255,180,200,0.18);animation-duration:17s;animation-delay:5s;}.desire-intro .mist:nth-child(8){width:1.5px;height:1.5px;left:52%;bottom:-5%;background:rgba(220,160,190,0.22);animation-duration:21s;}
  .desire-intro .mist:nth-child(9){width:2px;height:2px;left:58%;bottom:-5%;background:rgba(240,150,180,0.16);animation-duration:19s;}.desire-intro .mist:nth-child(10){width:2.5px;height:2.5px;left:65%;bottom:-5%;background:rgba(200,180,220,0.2);animation-duration:23s;}
  @keyframes desireMistRise { 0% { transform: translateY(0); opacity: 0; } 5% { opacity: 1; } 50% { transform: translateY(-55vh); opacity: 0.8; } 95% { opacity: 0.3; } 100% { transform: translateY(-115vh); opacity: 0; } }
  .desire-intro .vignette { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: radial-gradient(ellipse at center, transparent 40%, rgba(12,8,14,0.6) 100%); z-index: 5; pointer-events: none; animation: desireVignetteBreathe 8s ease-in-out infinite; }
  @keyframes desireVignetteBreathe { 0%, 100% { opacity: 1; } 50% { opacity: 0.6; } }
  .desire-intro .mirror-line { position: fixed; top: 0; left: 50%; width: 1px; height: 100vh; background: linear-gradient(to bottom, transparent 3%, rgba(240,200,225,0.1) 35%, rgba(255,220,240,0.16) 50%, rgba(240,200,225,0.1) 65%, transparent 97%); z-index: 7; pointer-events: none; animation: desireMirrorPulse 6s ease-in-out infinite; }
  .desire-intro .mirror-line::after { content: ''; position: absolute; left: -4px; width: 9px; height: 20px; border-radius: 50%; background: radial-gradient(ellipse, rgba(255,230,245,0.3), transparent); animation: desireMirrorBead 8s ease-in-out 2s infinite; }
  @keyframes desireMirrorPulse { 0%, 100% { opacity: 0.4; } 50% { opacity: 1; } }
  @keyframes desireMirrorBead { 0% { top: -20px; opacity: 0; } 10% { opacity: 1; } 90% { opacity: 1; } 100% { top: 100vh; opacity: 0; } }
  .desire-intro .page { position: relative; z-index: 10; height: 100vh; display: flex; flex-direction: column; justify-content: center; align-items: center; padding: 40px 20px; }
  .desire-intro .overline { font-family: 'Montserrat', sans-serif; font-weight: 200; font-size: 10px; letter-spacing: 7px; text-transform: uppercase; color: #8a7e92; margin-bottom: 32px; opacity: 0; animation: desireSoftIn 2.5s ease-out 0.4s forwards; }
  .desire-intro .main-title { font-family: 'Cormorant Garamond', serif; font-weight: 300; font-style: italic; font-size: clamp(52px, 9vw, 120px); line-height: 0.95; text-align: center; letter-spacing: -1px; position: relative; opacity: 0; animation: desireTitleReveal 3s ease-out 0.8s forwards, desireShimmer 5s ease-in-out 3.5s infinite; background: linear-gradient(110deg, #f0e4ef 0%, #f0e4ef 30%, #fff 40%, #ffe8f4 46%, #fff 52%, #f0e4ef 62%, #f0e4ef 100%); background-size: 300% 100%; -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
  @keyframes desireShimmer { 0% { background-position: 100% 50%; } 100% { background-position: -100% 50%; } }
  @keyframes desireTitleReveal { 0% { opacity: 0; letter-spacing: 12px; filter: blur(5px); } 40% { opacity: 0.6; letter-spacing: 3px; filter: blur(1px); } 100% { opacity: 1; letter-spacing: -1px; filter: blur(0); } }
  .desire-intro .line2 { display: block; font-family: 'Montserrat', sans-serif; font-style: normal; font-weight: 300; font-size: clamp(10px, 1.8vw, 14px); letter-spacing: 12px; text-transform: uppercase; margin-top: 16px; color: #c4a8be; opacity: 0; animation: desireSoftIn 2.5s ease-out 2s forwards; }
  .desire-intro .editorial-line { width: 0; height: 1px; background: linear-gradient(90deg, transparent, #d4709a, #e890b0, #d4709a, transparent); margin: 28px auto; opacity: 0; animation: desireLineGrow 2s ease-out 2.4s forwards; }
  @keyframes desireLineGrow { 0% { opacity: 0; width: 0; } 100% { opacity: 0.5; width: 60px; } }
  .desire-intro .subtitle { font-family: 'Montserrat', sans-serif; font-weight: 300; font-size: 10px; letter-spacing: 3px; text-transform: uppercase; color: #8a7e92; text-align: center; line-height: 2.4; opacity: 0; animation: desireSoftIn 2.5s ease-out 2.6s forwards; }
  .desire-intro .hook-text { max-width: 400px; text-align: center; font-family: 'Cormorant Garamond', serif; font-size: 15px; font-weight: 300; font-style: italic; line-height: 2; color: #a898b0; margin-top: 32px; opacity: 0; animation: desireSoftIn 2.5s ease-out 3s forwards; }
  .desire-intro .toggle-bar { display: flex; gap: 28px; margin-top: 28px; opacity: 0; animation: desireSoftIn 2.5s ease-out 2.8s forwards; }
  .desire-intro .cta-btn { display: inline-block; margin-top: 32px; font-family: 'Montserrat', sans-serif; font-weight: 300; font-size: 9px; letter-spacing: 7px; text-transform: uppercase; color: #f0e4ef; background: transparent; padding: 16px 44px; border: 1px solid rgba(212,112,154,0.22); cursor: pointer; opacity: 0; animation: desireSoftIn 2.5s ease-out 3.4s forwards; transition: all 1s ease; position: relative; overflow: hidden; text-decoration: none; }
  .desire-intro .cta-btn::before { content: ''; position: absolute; top: 0; left: -100%; width: 100%; height: 100%; background: linear-gradient(90deg, transparent, rgba(255,220,240,0.06), transparent); animation: desireBtnShimmer 4s ease-in-out 4s infinite; }
  @keyframes desireBtnShimmer { 0% { left: -100%; } 50% { left: 100%; } 100% { left: 100%; } }
  .desire-intro .cta-btn:hover { border-color: rgba(212,112,154,0.5); letter-spacing: 10px; box-shadow: 0 0 60px rgba(212,112,154,0.08); }
  @keyframes desireSoftIn { 0% { opacity: 0; transform: translateY(10px); } 100% { opacity: 1; transform: translateY(0); } }
  .desire-intro .footer { position: fixed; bottom: 18px; left: 0; right: 0; text-align: center; z-index: 10; opacity: 0; animation: desireSoftIn 2s ease-out 4s forwards; }
  .desire-intro .footer-text { font-family: 'Montserrat', sans-serif; font-weight: 200; font-size: 8px; letter-spacing: 3px; text-transform: uppercase; color: rgba(138,126,146,0.2); }
`;

export default function DesireIntake() {
  const [phase, setPhase] = useState("intro");
  const [d, setD] = useState({ name: "", email: "", miniAnswers: ["", "", "", "", ""] });
  const set = (k, v) => setD((p) => ({ ...p, [k]: v }));
  const go = (ph) => { setPhase(ph); window.scrollTo({ top: 0, behavior: "smooth" }); };

  // INTRO — pure CSS (no canvas, no JS-driven animation)
  if (phase === "intro")
    return (
      <div className="desire-intro">
        <style dangerouslySetInnerHTML={{ __html: DESIRE_INTRO_CSS }} />
        <div className="sunrise-outer" />
        <div className="sunrise-mid" />
        <div className="sunrise-core" />
        <div className="sunrise-hot" />
        <div className="sunrise-breathe" />
        <div className="gauze gauze-1" />
        <div className="gauze gauze-2" />
        <div className="gauze gauze-3" />
        <div className="glow-ring glow-ring-1" />
        <div className="glow-ring glow-ring-2" />
        <div className="glow-ring glow-ring-3" />
        <div className="light-sweep" />
        <div className="mist-field">
          {Array.from({ length: 10 }, (_, i) => <div key={i} className="mist" />)}
        </div>
        <div className="vignette" />
        <div className="mirror-line" />
        <section className="page">
          <div className="overline">What do you actually want?</div>
          <h1 className="main-title">
            Desire
            <span className="line2">The Hidden Truth</span>
          </h1>
          <div className="editorial-line" />
          <div className="subtitle">
            Mapping your erotic self &nbsp;·&nbsp; Rising into your own beauty<br />
            Turning shame into freedom &nbsp;·&nbsp; Standing in your full sovereignty
          </div>
          <div className="toggle-bar">
            <span style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 200, fontSize: 9, letterSpacing: 3, textTransform: "uppercase", color: MAUVE, padding: "8px 0", borderBottom: "1px solid rgba(212,112,154,0.15)" }}>Mini Preview</span>
            <span style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 200, fontSize: 9, letterSpacing: 3, textTransform: "uppercase", color: MAUVE, padding: "8px 0", borderBottom: "1px solid rgba(212,112,154,0.15)" }}>Full Deep Intake</span>
          </div>
          <p className="hook-text">
            Someone taught you which parts of yourself were acceptable
            and which ones to hide. That lesson is still running.
          </p>
          <button type="button" className="cta-btn" onClick={() => go("start")}>Undress the Pattern</button>
        </section>
        <footer className="footer">
          <div className="footer-text">The Forgotten Code Research Institute</div>
        </footer>
      </div>
    );

  // START
  if (phase === "start")
    return (
      <div style={{ minHeight: "100vh", width: "100%", background: VOID, color: PEARL, fontFamily: "'Cormorant Garamond', Georgia, serif", padding: "80px 24px" }}>
        <div style={{ maxWidth: 420, margin: "0 auto" }}>
          <div style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 200, fontSize: 12, letterSpacing: "0.2em", color: SMOKE, marginBottom: 24, fontStyle: "normal" }}>BEFORE WE BEGIN</div>
          <label style={{ display: "block", fontFamily: "'Montserrat', sans-serif", fontSize: 13, color: SMOKE, marginBottom: 6, fontStyle: "normal" }}>Your Name</label>
          <input value={d.name} onChange={(e) => set("name", e.target.value)} placeholder="First and last" style={{ width: "100%", padding: "14px 18px", background: "rgba(20,16,22,0.9)", border: "1px solid rgba(212,112,154,0.2)", color: PEARL, fontFamily: "'Cormorant Garamond', serif", fontSize: 16, marginBottom: 20, fontStyle: "normal" }} />
          <label style={{ display: "block", fontFamily: "'Montserrat', sans-serif", fontSize: 13, color: SMOKE, marginBottom: 6, fontStyle: "normal" }}>Email Address</label>
          <input value={d.email} onChange={(e) => set("email", e.target.value)} placeholder="For receiving your reading" type="email" style={{ width: "100%", padding: "14px 18px", background: "rgba(20,16,22,0.9)", border: "1px solid rgba(212,112,154,0.2)", color: PEARL, fontFamily: "'Cormorant Garamond', serif", fontSize: 16, marginBottom: 36, fontStyle: "normal" }} />
          <Btn label="UNDRESS THE PATTERN" onClick={() => go("q1")} primary disabled={!(d.name && d.email)} />
        </div>
      </div>
    );

  // QUIZ
  const qIndex = phase === "q1" ? 0 : phase === "q2" ? 1 : phase === "q3" ? 2 : phase === "q4" ? 3 : phase === "q5" ? 4 : -1;
  const answers = d.miniAnswers || ["", "", "", "", ""];
  const setAnswer = (i, letter) => { const a = [...answers]; a[i] = letter; set("miniAnswers", a); go(i < 4 ? `q${i + 2}` : "miniResult"); };
  if (qIndex >= 0) {
    const q = DESIRE_QUESTIONS[qIndex];
    const opts = [{ letter: "A", text: q.A }, { letter: "B", text: q.B }, { letter: "C", text: q.C }, { letter: "D", text: q.D }];
    return (
      <div style={{ minHeight: "100vh", width: "100%", background: VOID, color: PEARL, fontFamily: "'Cormorant Garamond', Georgia, serif", padding: "60px 24px" }}>
        <div style={{ maxWidth: 640, margin: "0 auto" }}>
          <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 11, letterSpacing: "0.2em", color: SMOKE, textAlign: "center", marginBottom: 24, fontStyle: "normal" }}>Question {qIndex + 1} of 5</div>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.1rem,2.8vw,1.5rem)", color: PEARL, textAlign: "center", marginBottom: 40, lineHeight: 1.6, fontStyle: "italic" }}>"{q.q}"</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {opts.map(({ letter, text }) => (
              <div key={letter} onClick={() => setAnswer(qIndex, letter)} style={{ padding: "20px 24px", background: "rgba(212,112,154,0.04)", border: "1px solid rgba(212,112,154,0.15)", cursor: "pointer", fontFamily: "'Cormorant Garamond', serif", fontSize: "1.05rem", color: PEARL, lineHeight: 1.6, fontStyle: "normal" }}>
                {text}
              </div>
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "center", gap: 12, marginTop: 50 }}>
            {[0, 1, 2, 3, 4].map((i) => <div key={i} style={{ width: 6, height: 6, borderRadius: "50%", background: i <= qIndex ? DEEP_PINK : "rgba(212,112,154,0.2)" }} />)}
          </div>
        </div>
      </div>
    );
  }

  // MINI RESULT
  if (phase === "miniResult") {
    const dominant = getDominantAnswer(answers);
    const r = DESIRE_REPORTS[dominant] || DESIRE_REPORTS.MIXED;
    return (
      <div style={{ minHeight: "100vh", width: "100%", background: VOID, color: PEARL, fontFamily: "'Cormorant Garamond', Georgia, serif", padding: "80px 24px" }}>
        <div style={{ maxWidth: 680, margin: "0 auto" }}>
          <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 11, letterSpacing: "0.2em", color: SMOKE, textAlign: "center", marginBottom: 20, fontStyle: "normal" }}>Your Desire Preview</div>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: "clamp(1.6rem,4vw,2.4rem)", color: PEARL, textAlign: "center", marginBottom: 12 }}>{r.archetype}</h2>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.15rem", color: SMOKE, textAlign: "center", marginBottom: 40, fontStyle: "italic" }}>{r.soulLine}</p>
          <div style={{ width: 60, height: 1, background: "linear-gradient(90deg, transparent, #d4709a, #e890b0, transparent)", margin: "0 auto 40px" }} />
          <div style={{ marginBottom: 40 }}>{r.body.split("\n\n").map((para, i) => <p key={i} style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.15rem", lineHeight: 1.9, color: PEARL, marginBottom: 20, fontStyle: "normal" }}>{para}</p>)}</div>
          <div style={{ padding: "30px", border: "1px solid rgba(212,112,154,0.2)", background: "rgba(212,112,154,0.03)", textAlign: "center", marginBottom: 50 }}>
            <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 10, letterSpacing: "0.2em", color: SMOKE, marginBottom: 16, fontStyle: "normal" }}>The Sealed Section</div>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.05rem", lineHeight: 1.7, color: "rgba(240,228,239,0.9)", fontStyle: "normal" }}>{r.sealed}</p>
          </div>
          <div style={{ textAlign: "center" }}>
            <a href="https://paypal.me/JSnider364/79" target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", padding: "18px 52px", fontFamily: "'Montserrat', sans-serif", fontWeight: 300, fontSize: 9, letterSpacing: "7px", textTransform: "uppercase", color: PEARL, background: "transparent", border: "1px solid rgba(212,112,154,0.4)", cursor: "pointer", textDecoration: "none", fontStyle: "normal" }}>Unlock Your Full Desire Map</a>
            <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 12, letterSpacing: "2px", color: SMOKE, marginTop: 16, fontStyle: "normal" }}>$79</div>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.95rem", lineHeight: 1.7, color: SMOKE, marginTop: 24, maxWidth: 420, margin: "24px auto 0", fontStyle: "normal" }}>Mapping your erotic self, rising into your own beauty, turning shame into freedom, and standing in your full sovereignty.</p>
          </div>
          <div style={{ textAlign: "center", marginTop: 40 }}><Btn label="← EDIT MY ANSWERS" onClick={() => go("q1")} /></div>
        </div>
      </div>
    );
  }

  return null;
}
