"use client";
import { useState } from "react";

// The Calling — Sacred Gifts & Prophetic Identity — $79 | Route: /the-calling
// Biblical reverence + cosmic wonder — Cinzel, Cormorant Garamond, Raleway
// Dark #0a0812 — ALL RED text (blood of Christ) — Pure CSS intro

const NIGHT = "#0a0812";
const CRIMSON = "rgba(180,60,60,0.85)";
const CRIMSON_LIGHT = "rgba(200,120,120,0.7)";
const CRIMSON_MUTED = "rgba(160,70,70,0.45)";
const CRIMSON_DIM = "rgba(180,60,60,0.25)";

const CALLING_QUESTIONS = [
  { q: "When did you first sense that you were set apart for something?", A: "As a child — I had experiences I couldn't explain.", B: "In crisis — when everything fell apart, something else opened.", C: "Through others — people kept telling me I had a gift.", D: "I'm still not sure — but I feel a pull I can't name." },
  { q: "What spiritual gift do you suspect you carry (even if you've doubted it)?", A: "Seeing — I sense things before they happen, or know things I wasn't told.", B: "Healing — I've seen prayer or presence shift something in others.", C: "Speaking — words come through me that feel like they're not mine.", D: "Leading — people are drawn to me for direction or wisdom." },
  { q: "What has blocked you from stepping fully into your calling?", A: "Fear — of being wrong, of pride, of getting it wrong.", B: "Past wounding — the church or spiritual authority hurt me.", C: "Uncertainty — I don't know how to activate what I carry.", D: "Others' opinions — I've been told to stay small or quiet." },
  { q: "If you could receive one prophetic word about your assignment, what would you want it to address?", A: "What I'm actually called to do — the specific assignment.", B: "How to get past the block — the next step to take.", C: "That I'm not crazy — confirmation that what I sense is real.", D: "That I'm forgiven and free — to move without the old weight." },
  { q: "What scripture or promise has carried you when you couldn't see the way?", A: "Jeremiah 29:11 — plans to prosper, not to harm.", B: "Ephesians 2:10 — we are His workmanship, created for good works.", C: "Romans 8:28 — all things work together for good.", D: "I don't have one yet — but I'm looking." },
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

const CALLING_REPORTS = {
  A: { archetype: "The Seer", soulLine: "You were set apart to see what others miss — and to speak what Heaven is saying.", body: "You've known things you couldn't explain. Seen things before they happened. Felt the weight of what others couldn't see. That's not coincidence. It's the seer anointing — the gift of perception that comes from the Holy Spirit. Your fear of being wrong, or of pride, is the enemy's attempt to silence what God has activated.\n\nYour assignment isn't to have it all figured out. It's to steward what you see — with humility, with accountability, and with courage. The block isn't the gift. The block is the lie that you're not qualified to carry it. Your next step is to find one person who can hold you accountable — and to begin to speak what you see, in the right context, with the right covering.\n\nYou are His workmanship. Created for good works. The seer gift is one of them.", sealed: "Your full Sacred Gifts & Prophetic Identity report traces the seer anointing — and identifies the specific next steps to activate and steward your gift with wisdom and authority." },
  B: { archetype: "The Healer", soulLine: "You were set apart to carry His presence into the broken places — and to see restoration come.", body: "You've seen prayer or presence shift something in others. You've felt the pull toward the hurting, the sick, the bound. That's not sentiment. It's the healing anointing — the gift of carrying God's power into the places that need it most. Your past wounding — whether from the church or from spiritual authority — is real. But it's not the end of your story. It's the very place God often uses to commission those who will carry healing without abusing power.\n\nYour assignment isn't to fix everyone. It's to show up in the authority of Christ — with humility, with boundaries, and with the Word. The block isn't the gift. The block is the lie that you're disqualified because you were hurt. Your next step is to receive inner healing for what was broken — and to ask God for one clear opportunity to step out in the healing gift, with covering.\n\nYou are His workmanship. Created for good works. The healing gift is one of them.", sealed: "Your full Sacred Gifts & Prophetic Identity report traces the healing anointing — and identifies the specific next steps to activate and steward your gift with integrity and authority." },
  C: { archetype: "The Voice", soulLine: "You were set apart to speak what Heaven is saying — and to release the word that shifts atmospheres.", body: "Words come through you that feel like they're not yours. You've had moments when you spoke and something shifted — in a conversation, in a room, in someone's heart. That's not ego. It's the prophetic voice — the gift of speaking God's heart with clarity and power. Your uncertainty about how to activate what you carry is common. The enemy loves to make the prophetic feel dangerous or presumptuous. But the Bible is full of people who spoke what God gave them — and the world needed it.\n\nYour assignment isn't to have the perfect word every time. It's to steward the voice — with humility, with testing, and with submission to authority. The block isn't the gift. The block is the lie that you're not allowed to speak. Your next step is to find a safe, biblically grounded context (church, ministry, mentor) where you can practice and be corrected — and to ask God for one clear opportunity to release a word.\n\nYou are His workmanship. Created for good works. The prophetic voice is one of them.", sealed: "Your full Sacred Gifts & Prophetic Identity report traces the prophetic voice — and identifies the specific next steps to activate and steward your gift with wisdom and accountability." },
  D: { archetype: "The Shepherd-Leader", soulLine: "You were set apart to lead others into their calling — and to build what God is building.", body: "People are drawn to you for direction or wisdom. You've felt the weight of responsibility for others — not in a controlling way, but in a way that says you're meant to help them find their path. That's not pride. It's the shepherd-leader anointing — the gift of building, guiding, and releasing others into their assignment. Others' opinions — the ones that told you to stay small or quiet — have tried to shrink what God is growing. But leadership in the Kingdom isn't about position. It's about stewardship.\n\nYour assignment isn't to have all the answers. It's to lead from a place of intimacy with God — with humility, with servanthood, and with the willingness to release others into their own calling. The block isn't the gift. The block is the lie that you're not allowed to lead. Your next step is to identify one person or one sphere where you're already leading (even informally) — and to ask God to clarify and expand that assignment.\n\nYou are His workmanship. Created for good works. The shepherd-leader gift is one of them.", sealed: "Your full Sacred Gifts & Prophetic Identity report traces the shepherd-leader anointing — and identifies the specific next steps to step into your assignment with humility and authority." },
  MIXED: { archetype: "The Multi-Gifted", soulLine: "You carry more than one thread of calling — and God is weaving them into a single assignment.", body: "Your answers reveal someone who doesn't fit one box. Seer, healer, voice, shepherd-leader — you've sensed more than one. That's not confusion. It's the way God often builds. He doesn't give one gift and call it done. He weaves multiple threads into a single assignment. Your calling might look like seeing and speaking. Or healing and leading. Or a combination that only you will carry.\n\nYour next step isn't to pick one and drop the rest. It's to ask God to show you the convergence point — the specific assignment where all the threads meet. And to find a spiritual father or mother who can help you discern and steward the mix. You are His workmanship. Created for good works. The mix isn't a mistake. It's the design.", sealed: "Your full Sacred Gifts & Prophetic Identity report traces all active gift threads — and identifies the convergence point: the specific assignment and next steps to activate your calling in full." },
};

function Btn({ label, onClick, disabled, primary }) {
  return (
    <div
      onClick={() => !disabled && onClick()}
      style={{
        display: "inline-block",
        padding: primary ? "16px 44px" : "14px 32px",
        fontFamily: "'Raleway', sans-serif",
        fontWeight: 300,
        fontSize: 9,
        letterSpacing: "7px",
        textTransform: "uppercase",
        color: disabled ? CRIMSON_DIM : CRIMSON,
        background: "transparent",
        border: `1px solid ${disabled ? "rgba(180,60,60,0.2)" : "rgba(180,60,60,0.3)"}`,
        cursor: disabled ? "default" : "pointer",
        transition: "all 0.4s ease",
        fontStyle: "normal",
      }}
    >
      {label}
    </div>
  );
}

const TC_INTRO_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Raleway:wght@200;300;400&display=swap');
  .tc-intro { background: #0a0812; overflow: hidden; height: 100vh; width: 100%; position: relative; font-family: 'Cormorant Garamond', serif; }
  .tc-intro .tc-sky { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: radial-gradient(ellipse at 50% 20%, rgba(25,15,60,0.5) 0%, transparent 55%), radial-gradient(ellipse at 20% 60%, rgba(60,15,30,0.25) 0%, transparent 45%), linear-gradient(180deg, #0a0812 0%, #12101e 40%, #0e0a18 70%, #08060e 100%); z-index: 0; pointer-events: none; }
  .tc-intro .tc-cross { position: fixed; top: 12%; left: 50%; transform: translateX(-50%); width: 2px; height: 28vh; background: linear-gradient(to bottom, rgba(255,255,255,0.12), rgba(255,255,255,0.02) 60%, transparent); z-index: 4; pointer-events: none; animation: tcCrossBreathe 10s ease-in-out infinite; }
  .tc-intro .tc-cross::before { content: ''; position: absolute; top: 35%; left: 50%; transform: translate(-50%, -50%); width: 16vw; height: 2px; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent); }
  .tc-intro .tc-cross::after { content: ''; position: absolute; top: 35%; left: 50%; transform: translate(-50%, -50%); width: 30px; height: 30px; border-radius: 50%; background: radial-gradient(circle, rgba(255,255,255,0.08), transparent); }
  @keyframes tcCrossBreathe { 0%, 100% { opacity: 0.5; } 50% { opacity: 1; } }
  .tc-intro .tc-spirit { position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: 5; pointer-events: none; }
  .tc-intro .tc-sp { position: absolute; top: -3%; width: 3px; height: 3px; border-radius: 50%; background: rgba(255,255,255,0.7); box-shadow: 0 0 8px rgba(255,255,255,0.4); animation: tcSpiritFall linear infinite; }
  .tc-intro .tc-sp:nth-child(1){ left: 10%; animation-duration: 14s; animation-delay: 0s; }
  .tc-intro .tc-sp:nth-child(2){ left: 25%; animation-duration: 16s; animation-delay: 2s; width: 2px; height: 2px; }
  .tc-intro .tc-sp:nth-child(3){ left: 40%; animation-duration: 12s; animation-delay: 4s; }
  .tc-intro .tc-sp:nth-child(4){ left: 55%; animation-duration: 15s; animation-delay: 1s; width: 2px; height: 2px; }
  .tc-intro .tc-sp:nth-child(5){ left: 70%; animation-duration: 13s; animation-delay: 3s; }
  .tc-intro .tc-sp:nth-child(6){ left: 85%; animation-duration: 17s; animation-delay: 2.5s; width: 2px; height: 2px; }
  @keyframes tcSpiritFall { 0% { transform: translateY(0) translateX(0); opacity: 0; } 5% { opacity: 0.8; } 50% { transform: translateY(50vh) translateX(8px); opacity: 0.5; } 95% { opacity: 0.1; } 100% { transform: translateY(110vh) translateX(-4px); opacity: 0; } }
  .tc-intro .tc-page { position: relative; z-index: 20; height: 100vh; display: flex; flex-direction: column; justify-content: center; align-items: center; padding: 40px 20px; }
  .tc-intro .tc-overline { font-family: 'Raleway', sans-serif; font-weight: 300; font-size: 10px; letter-spacing: 6px; text-transform: uppercase; color: rgba(180,60,60,0.75); margin-bottom: 28px; opacity: 0; animation: tcSoftIn 2.5s ease-out 0.4s forwards; }
  .tc-intro .tc-title { font-family: 'Cinzel', serif; font-weight: 500; font-size: clamp(48px, 10vw, 110px); line-height: 0.95; text-align: center; letter-spacing: 3px; opacity: 0; animation: tcTitleReveal 3.5s ease-out 0.8s forwards, tcCrimsonShimmer 6s ease-in-out 4s infinite; background: linear-gradient(110deg, #e8a0a0 0%, #d44040 25%, #c83030 50%, #e85050 75%, #e8a0a0 100%); background-size: 300% 100%; -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
  @keyframes tcCrimsonShimmer { 0% { background-position: 100% 50%; } 100% { background-position: -100% 50%; } }
  @keyframes tcTitleReveal { 0% { opacity: 0; letter-spacing: 16px; filter: blur(8px); } 40% { opacity: 0.7; letter-spacing: 6px; filter: blur(2px); } 100% { opacity: 1; letter-spacing: 3px; filter: blur(0); } }
  .tc-intro .tc-line2 { display: block; font-family: 'Raleway', sans-serif; font-weight: 300; font-size: clamp(10px, 1.8vw, 14px); letter-spacing: 8px; text-transform: uppercase; margin-top: 14px; color: rgba(180,60,60,0.7); -webkit-text-fill-color: rgba(180,60,60,0.7); opacity: 0; animation: tcSoftIn 2.5s ease-out 2.2s forwards; }
  .tc-intro .tc-divider { font-size: 14px; letter-spacing: 10px; color: rgba(180,60,60,0.4); margin: 20px 0; opacity: 0; animation: tcSoftIn 2s ease-out 2.5s forwards; }
  .tc-intro .tc-subtitle { font-family: 'Raleway', sans-serif; font-weight: 300; font-size: 10px; letter-spacing: 3px; text-transform: uppercase; color: rgba(180,70,70,0.6); text-align: center; line-height: 2.4; opacity: 0; animation: tcSoftIn 2.5s ease-out 2.8s forwards; }
  .tc-intro .tc-hook { max-width: 420px; text-align: center; font-family: 'Cormorant Garamond', serif; font-size: 16px; font-weight: 300; font-style: italic; line-height: 2; color: rgba(200,120,120,0.7); margin-top: 28px; opacity: 0; animation: tcSoftIn 2.5s ease-out 3.2s forwards; }
  .tc-intro .tc-cta { display: inline-block; margin-top: 32px; font-family: 'Raleway', sans-serif; font-weight: 300; font-size: 9px; letter-spacing: 7px; text-transform: uppercase; color: rgba(200,80,80,0.8); background: transparent; padding: 16px 44px; border: 1px solid rgba(180,60,60,0.3); cursor: pointer; opacity: 0; animation: tcSoftIn 2.5s ease-out 3.6s forwards; transition: all 0.4s ease; text-decoration: none; }
  .tc-intro .tc-cta:hover { border-color: rgba(180,60,60,0.6); color: rgba(220,90,90,0.9); }
  .tc-intro .tc-scripture { font-family: 'Cormorant Garamond', serif; font-weight: 300; font-style: italic; font-size: 12px; color: rgba(160,70,70,0.45); margin-top: 24px; opacity: 0; animation: tcSoftIn 2s ease-out 4s forwards; }
  @keyframes tcSoftIn { 0% { opacity: 0; transform: translateY(10px); } 100% { opacity: 1; transform: translateY(0); } }
  .tc-intro .tc-footer { position: fixed; bottom: 18px; left: 0; right: 0; text-align: center; z-index: 20; opacity: 0; animation: tcSoftIn 2s ease-out 4.4s forwards; }
  .tc-intro .tc-footer-text { font-family: 'Raleway', sans-serif; font-weight: 200; font-size: 8px; letter-spacing: 3px; text-transform: uppercase; color: rgba(180,60,60,0.25); }
`;

export default function TheCallingIntake() {
  const [phase, setPhase] = useState("intro");
  const [d, setD] = useState({ name: "", email: "", miniAnswers: ["", "", "", "", ""] });
  const set = (k, v) => setD((p) => ({ ...p, [k]: v }));
  const go = (ph) => { setPhase(ph); window.scrollTo({ top: 0, behavior: "smooth" }); };

  if (phase === "intro")
    return (
      <div className="tc-intro">
        <style dangerouslySetInnerHTML={{ __html: TC_INTRO_CSS }} />
        <div className="tc-sky" />
        <div className="tc-cross" />
        <div className="tc-spirit">
          {[1, 2, 3, 4, 5, 6].map((i) => <div key={i} className="tc-sp" />)}
        </div>
        <section className="tc-page">
          <div className="tc-overline">Sacred Gifts & Prophetic Identity</div>
          <h1 className="tc-title">
            The Calling
            <span className="tc-line2">Your Kingdom Assignment</span>
          </h1>
          <div className="tc-divider">✝ &nbsp; ✝ &nbsp; ✝</div>
          <div className="tc-subtitle">
            Spiritual gift forensics · Prophetic identity mapping<br />
            Divine assignment · Anointing architecture
          </div>
          <p className="tc-hook">
            Before you were formed in the womb, He knew you. Before you were born, He set you apart. This report maps the gifts He placed inside you — and the assignment they were built for.
          </p>
          <button type="button" className="tc-cta" onClick={() => go("start")}>Discover Your Sacred Gifts</button>
          <div className="tc-scripture">Ephesians 2:10</div>
        </section>
        <footer className="tc-footer">
          <div className="tc-footer-text">The Forgotten Code Research Institute</div>
        </footer>
      </div>
    );

  if (phase === "start")
    return (
      <div style={{ minHeight: "100vh", width: "100%", background: NIGHT, color: CRIMSON_LIGHT, fontFamily: "'Cormorant Garamond', Georgia, serif", padding: "80px 24px" }}>
        <div style={{ maxWidth: 420, margin: "0 auto" }}>
          <div style={{ fontFamily: "'Raleway', sans-serif", fontSize: 12, letterSpacing: "0.2em", color: CRIMSON, marginBottom: 24, fontStyle: "normal" }}>BEFORE WE BEGIN</div>
          <label style={{ display: "block", fontFamily: "'Raleway', sans-serif", fontSize: 13, color: CRIMSON, marginBottom: 6, fontStyle: "normal" }}>Your Name</label>
          <input value={d.name} onChange={(e) => set("name", e.target.value)} placeholder="First and last" style={{ width: "100%", padding: "14px 18px", background: "rgba(18,16,30,0.9)", border: "1px solid rgba(180,60,60,0.25)", color: CRIMSON_LIGHT, fontFamily: "'Cormorant Garamond', serif", fontSize: 16, marginBottom: 20, fontStyle: "normal" }} />
          <label style={{ display: "block", fontFamily: "'Raleway', sans-serif", fontSize: 13, color: CRIMSON, marginBottom: 6, fontStyle: "normal" }}>Email Address</label>
          <input value={d.email} onChange={(e) => set("email", e.target.value)} placeholder="For receiving your reading" type="email" style={{ width: "100%", padding: "14px 18px", background: "rgba(18,16,30,0.9)", border: "1px solid rgba(180,60,60,0.25)", color: CRIMSON_LIGHT, fontFamily: "'Cormorant Garamond', serif", fontSize: 16, marginBottom: 36, fontStyle: "normal" }} />
          <Btn label="DISCOVER YOUR SACRED GIFTS" onClick={() => go("q1")} primary disabled={!(d.name && d.email)} />
        </div>
      </div>
    );

  const qIndex = phase === "q1" ? 0 : phase === "q2" ? 1 : phase === "q3" ? 2 : phase === "q4" ? 3 : phase === "q5" ? 4 : -1;
  const answers = d.miniAnswers || ["", "", "", "", ""];
  const setAnswer = (i, letter) => { const a = [...answers]; a[i] = letter; set("miniAnswers", a); go(i < 4 ? `q${i + 2}` : "miniResult"); };
  if (qIndex >= 0) {
    const q = CALLING_QUESTIONS[qIndex];
    const opts = [{ letter: "A", text: q.A }, { letter: "B", text: q.B }, { letter: "C", text: q.C }, { letter: "D", text: q.D }];
    return (
      <div style={{ minHeight: "100vh", width: "100%", background: NIGHT, color: CRIMSON_LIGHT, fontFamily: "'Cormorant Garamond', Georgia, serif", padding: "60px 24px" }}>
        <div style={{ maxWidth: 640, margin: "0 auto" }}>
          <div style={{ fontFamily: "'Raleway', sans-serif", fontSize: 11, letterSpacing: "0.2em", color: CRIMSON, textAlign: "center", marginBottom: 24, fontStyle: "normal" }}>Question {qIndex + 1} of 5</div>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.1rem,2.8vw,1.5rem)", color: CRIMSON_LIGHT, textAlign: "center", marginBottom: 40, lineHeight: 1.6, fontStyle: "italic" }}>"{q.q}"</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {opts.map(({ letter, text }) => (
              <div key={letter} onClick={() => setAnswer(qIndex, letter)} style={{ padding: "20px 24px", background: "rgba(180,60,60,0.06)", border: "1px solid rgba(180,60,60,0.2)", cursor: "pointer", fontFamily: "'Cormorant Garamond', serif", fontSize: "1.05rem", color: CRIMSON_LIGHT, lineHeight: 1.6, fontStyle: "normal" }}>
                {text}
              </div>
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "center", gap: 12, marginTop: 50 }}>
            {[0, 1, 2, 3, 4].map((i) => <div key={i} style={{ width: 6, height: 6, borderRadius: "50%", background: i <= qIndex ? "rgba(200,80,80,0.8)" : "rgba(180,60,60,0.2)" }} />)}
          </div>
        </div>
      </div>
    );
  }

  if (phase === "miniResult") {
    const dominant = getDominantAnswer(answers);
    const r = CALLING_REPORTS[dominant] || CALLING_REPORTS.MIXED;
    return (
      <div style={{ minHeight: "100vh", width: "100%", background: NIGHT, color: CRIMSON_LIGHT, fontFamily: "'Cormorant Garamond', Georgia, serif", padding: "80px 24px" }}>
        <div style={{ maxWidth: 680, margin: "0 auto" }}>
          <div style={{ fontFamily: "'Raleway', sans-serif", fontSize: 11, letterSpacing: "0.2em", color: CRIMSON, textAlign: "center", marginBottom: 20, fontStyle: "normal" }}>Your Sacred Gifts Preview</div>
          <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: "clamp(1.6rem,4vw,2.4rem)", color: "rgba(232,160,160,0.95)", textAlign: "center", marginBottom: 12, fontStyle: "normal" }}>{r.archetype}</h2>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.15rem", color: CRIMSON_LIGHT, textAlign: "center", marginBottom: 40, fontStyle: "italic" }}>{r.soulLine}</p>
          <div style={{ width: 60, height: 1, background: "rgba(180,60,60,0.4)", margin: "0 auto 40px" }} />
          <div style={{ marginBottom: 40 }}>{r.body.split("\n\n").map((para, i) => <p key={i} style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.15rem", lineHeight: 1.9, color: CRIMSON_LIGHT, marginBottom: 20, fontStyle: "normal" }}>{para}</p>)}</div>
          <div style={{ padding: "30px", border: "1px solid rgba(180,60,60,0.2)", background: "rgba(180,60,60,0.04)", textAlign: "center", marginBottom: 50 }}>
            <div style={{ fontFamily: "'Raleway', sans-serif", fontSize: 10, letterSpacing: "0.2em", color: CRIMSON, marginBottom: 16, fontStyle: "normal" }}>The Sealed Section</div>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.05rem", lineHeight: 1.7, color: "rgba(200,120,120,0.85)", fontStyle: "normal" }}>{r.sealed}</p>
          </div>
          <div style={{ textAlign: "center" }}>
            <a href="https://paypal.me/JSnider364/79" target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", padding: "18px 52px", fontFamily: "'Raleway', sans-serif", fontWeight: 300, fontSize: 9, letterSpacing: "7px", color: "rgba(200,80,80,0.9)", background: "transparent", border: "1px solid rgba(180,60,60,0.4)", cursor: "pointer", textDecoration: "none", fontStyle: "normal" }}>Unlock Your Full Sacred Gifts & Prophetic Identity Report</a>
            <div style={{ fontFamily: "'Raleway', sans-serif", fontSize: 12, letterSpacing: "2px", color: CRIMSON, marginTop: 16, fontStyle: "normal" }}>$79</div>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.95rem", lineHeight: 1.7, color: CRIMSON_MUTED, marginTop: 24, maxWidth: 420, margin: "24px auto 0", fontStyle: "normal" }}>Spiritual gift forensics, prophetic identity mapping, divine assignment, and anointing architecture.</p>
          </div>
          <div style={{ textAlign: "center", marginTop: 40 }}><Btn label="← EDIT MY ANSWERS" onClick={() => go("q1")} /></div>
        </div>
      </div>
    );
  }

  return null;
}
