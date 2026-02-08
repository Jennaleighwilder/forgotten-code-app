"use client";
import { useState, useEffect, useMemo } from "react";

// ═══════════════════════════════════════════════════════════════
// BLOODLINE — ANCESTRAL HERITAGE DOSSIER
// Full flow: Intro → Mini Report → Gate → Access Code → Deep Intake
// Jennifer Leigh West | The Forgotten Code Research Institute
// ═══════════════════════════════════════════════════════════════

const R = { blood:"#8b1a1a", scarlet:"#a52a2a", crimson:"#6b0f0f", wine:"#4a0e0e", ember:"#c44b2f", rose:"#c9544d" };
const E = { bark:"#3b2718", leather:"#5c3a24", amber:"#8b6914", honey:"#a67c28", parchment:"#d4c4a0" };
const D = { void:"#0a0806", earth:"#1a1410", loam:"#221c14" };
const T = { bone:"#c8b89a", sand:"#b8a882", dust:"#9a8a6e", sage:"#8a9a7a", copper:"#b87333" };

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700&family=Crimson+Text:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Inter:wght@300;400;500&display=swap');
*{box-sizing:border-box;margin:0;padding:0}
html,body{overflow-x:hidden}
::selection{background:#8b1a1a44;color:#d4c4a0}
@keyframes snowFall{0%{transform:translateY(-20px) translateX(0) rotate(0deg);opacity:0}10%{opacity:0.7}90%{opacity:0.4}100%{transform:translateY(var(--fall)) translateX(var(--drift)) rotate(360deg);opacity:0}}
@keyframes petalDrift{0%{transform:translateY(-20px) translateX(0) rotate(0deg) scale(1);opacity:0}12%{opacity:0.8}40%{transform:translateY(calc(var(--fall)*0.4)) translateX(calc(var(--drift)*1.2)) rotate(140deg) scale(0.9)}70%{transform:translateY(calc(var(--fall)*0.7)) translateX(calc(var(--drift)*-0.5)) rotate(280deg) scale(0.75)}100%{transform:translateY(var(--fall)) translateX(var(--drift)) rotate(420deg) scale(0.3);opacity:0}}
@keyframes leafTumble{0%{transform:translateY(-15px) translateX(0) rotate(0deg) scaleX(1);opacity:0}8%{opacity:0.85}25%{transform:translateY(calc(var(--fall)*0.25)) translateX(calc(var(--drift)*0.8)) rotate(90deg) scaleX(0.3)}50%{transform:translateY(calc(var(--fall)*0.5)) translateX(calc(var(--drift)*-0.3)) rotate(200deg) scaleX(1)}75%{transform:translateY(calc(var(--fall)*0.75)) translateX(calc(var(--drift)*1.1)) rotate(310deg) scaleX(0.5)}100%{transform:translateY(var(--fall)) translateX(calc(var(--drift)*0.2)) rotate(440deg) scaleX(0.8);opacity:0}}
@keyframes fireflyGlow{0%,100%{opacity:0.06;transform:translate(0,0) scale(0.6)}25%{opacity:0.7;transform:translate(var(--dx),var(--dy)) scale(1.3)}50%{opacity:0.15;transform:translate(calc(var(--dx)*-0.5),calc(var(--dy)*1.5)) scale(0.9)}75%{opacity:0.6;transform:translate(calc(var(--dx)*0.8),calc(var(--dy)*-0.3)) scale(1.4)}}
@keyframes seasonFade{0%{opacity:0}15%{opacity:0.25}85%{opacity:0.25}100%{opacity:0}}
@keyframes canopyBreathe{0%,100%{transform:scale(1)}50%{transform:scale(1.008) translateY(-0.5px)}}
@keyframes titleShimmer{0%{background-position:-200% center}100%{background-position:200% center}}
@keyframes subtitlePulse{0%,100%{opacity:0.45;text-shadow:0 0 8px #8b1a1a00}50%{opacity:0.65;text-shadow:0 0 18px #8b1a1a22}}
@keyframes fadeUp{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}
@keyframes bloodPulse{0%,100%{border-color:#8b1a1a18;box-shadow:0 0 8px #0e0a0800}50%{border-color:#8b1a1a55;box-shadow:0 0 25px #8b1a1a12}}
@keyframes dustDrift{0%{transform:translateY(0) translateX(0);opacity:0}15%{opacity:var(--peak,0.25)}85%{opacity:calc(var(--peak,0.25)*0.5)}100%{transform:translateY(-80vh) translateX(30px);opacity:0}}
@keyframes dnaPulse{0%,100%{opacity:0.4}50%{opacity:1}}
@keyframes emberDrift{0%{transform:translateY(0) translateX(0);opacity:0}10%{opacity:var(--peak,0.2)}90%{opacity:0}100%{transform:translateY(var(--rise,-120px)) translateX(var(--drift-x,0));opacity:0}}
@keyframes scrollPulse{0%,100%{opacity:0.35;transform:translateY(0)}50%{opacity:0.7;transform:translateY(4px)}}
@keyframes btnSweep{0%{transform:translateX(-100%) skewX(-12deg)}100%{transform:translateX(200%) skewX(-12deg)}}
`;

// ════════════════════════════════════════════════
// SEEDED RNG + FRACTAL TREE
// ════════════════════════════════════════════════

function sRng(seed) { let s=seed; return()=>{s=(s*16807+0)%2147483647;return(s-1)/2147483646} }

function generateTree(seed=777) {
  const rng=sRng(seed); const branches=[]; const leafSpots=[];
  function branch(x1,y1,angle,length,width,depth,maxD) {
    if(depth>maxD||length<3)return;
    const curve=(rng()-0.5)*0.15;
    const x2=x1+Math.sin(angle+curve)*length, y2=y1-Math.cos(angle+curve)*length;
    const bend=(rng()-0.5)*length*0.3;
    const mx=(x1+x2)/2+Math.cos(angle)*bend, my=(y1+y2)/2+Math.sin(angle)*bend;
    branches.push({x1,y1,mx,my,x2,y2,width,depth});
    if(depth>=3)leafSpots.push({x:x2,y:y2});
    if(depth>=2)leafSpots.push({x:mx,y:my});
    if(depth>=4){const t=0.3+rng()*0.4;leafSpots.push({x:x1+(x2-x1)*t,y:y1+(y2-y1)*t})}
    const n=depth<2?2+Math.floor(rng()*2):2+Math.floor(rng()*1.5);
    const sp=depth<2?0.5+rng()*0.3:0.4+rng()*0.5;
    for(let i=0;i<n;i++){const t=n===1?0:(i/(n-1))*2-1;
      branch(x2,y2,angle+t*sp+(rng()-0.5)*0.2,length*(0.62+rng()*0.18),Math.max(0.5,width*(0.55+rng()*0.15)),depth+1,maxD)}
  }
  branch(250,430,(sRng(seed)()-0.5)*0.05,100,18,0,7);
  return{branches,leafSpots};
}

const SEASONS=[
  {name:"WINTER",leafColors:null,ground:"#2a3a50"},
  {name:"SPRING",leafColors:["#ffb7c5","#ff91a4","#ffd1dc","#e8a0bf","#f7cad0","#ffccd5","#f4a0b0","#ffe0e8","#fbb4c4"],ground:"#4a3028",pColors:["#ffb7c5","#ffd1dc","#ff91a4","#f7cad0","#ffe0e8"]},
  {name:"SUMMER",leafColors:["#2d6b1e","#3a8028","#4a9535","#3b7a2a","#5ca042","#6baa4f","#2f7520","#488a30","#5c9545","#3d8830"],ground:"#2a3518"},
  {name:"AUTUMN",leafColors:["#c44b2f","#d4782f","#e8a035","#8b1a1a","#b87333","#a52a2a","#d4a030","#c9544d","#9c3c2e","#d48040"],ground:"#3a2818",pColors:["#c44b2f","#d4782f","#e8a035","#8b1a1a","#b87333","#a52a2a","#9c3c2e"]}
];

// ════════════════════════════════════════════════
// FOUR SEASONS TREE
// ════════════════════════════════════════════════

function FourSeasonsTree() {
  const [si,setSi]=useState(0); const [vis,setVis]=useState(1);
  const tree=useMemo(()=>generateTree(777),[]);
  const season=SEASONS[si]; const isW=si===0;
  useEffect(()=>{const t=setInterval(()=>{setVis(0);setTimeout(()=>{setSi(s=>(s+1)%4);setVis(1)},900)},5500);return()=>clearInterval(t)},[]);
  const canopyLeaves=useMemo(()=>{if(!season.leafColors)return[];const rng=sRng(si*1000+42);const lv=[];
    tree.leafSpots.forEach((s,idx)=>{const c=2+Math.floor(rng()*3);for(let j=0;j<c;j++)lv.push({cx:s.x+(rng()-0.5)*22,cy:s.y+(rng()-0.5)*18,r:si===1?2+rng()*5:3+rng()*7,color:season.leafColors[(idx+j)%season.leafColors.length],opacity:0.45+rng()*0.35,delay:rng()*0.6})});return lv},[si,tree.leafSpots]);
  const particles=useMemo(()=>{const p=[];
    if(si===0){for(let i=0;i<40;i++)p.push({type:"snow",x:5+Math.random()*90,delay:Math.random()*6,dur:3+Math.random()*4,size:1+Math.random()*2.5,color:"#c8d8e8",drift:`${-15+Math.random()*30}px`,fall:`${350+Math.random()*150}px`})}
    else if(si===1){for(let i=0;i<30;i++)p.push({type:"petal",x:15+Math.random()*70,delay:Math.random()*5,dur:4+Math.random()*5,size:3+Math.random()*5,color:season.pColors[i%season.pColors.length],drift:`${-30+Math.random()*60}px`,fall:`${350+Math.random()*150}px`})}
    else if(si===2){for(let i=0;i<20;i++)p.push({type:"firefly",x:20+Math.random()*60,y:10+Math.random()*60,dur:3+Math.random()*4,delay:Math.random()*5,size:2+Math.random()*3,dx:`${-15+Math.random()*30}px`,dy:`${-20+Math.random()*15}px`,color:i%3===0?"#f0e68c":"#c8d890"})}
    else{for(let i=0;i<35;i++)p.push({type:"leaf",x:10+Math.random()*80,delay:Math.random()*6,dur:4+Math.random()*6,size:4+Math.random()*6,color:season.pColors[i%season.pColors.length],drift:`${-40+Math.random()*80}px`,fall:`${350+Math.random()*150}px`})}
    return p},[si]);
  return <div style={{position:"relative",width:"100%",maxWidth:450,height:460,margin:"0 auto 10px"}}>
    <div style={{position:"absolute",inset:0,overflow:"hidden",pointerEvents:"none",zIndex:3}}>
      {particles.map((p,i)=>{if(p.type==="firefly")return<div key={`${si}-p-${i}`}style={{position:"absolute",left:`${p.x}%`,top:`${p.y}%`,width:p.size,height:p.size,borderRadius:"50%",background:p.color,boxShadow:`0 0 ${p.size*3}px ${p.color}88`,'--dx':p.dx,'--dy':p.dy,animation:`fireflyGlow ${p.dur}s ease-in-out ${p.delay}s infinite`}}/>;
        return<div key={`${si}-p-${i}`}style={{position:"absolute",left:`${p.x}%`,top:-15,width:p.size,height:p.size,borderRadius:p.type==="snow"?"50%":p.type==="petal"?"50% 0 50% 0":"3px 0 3px 0",background:p.color,'--drift':p.drift,'--fall':p.fall,animation:`${p.type==="snow"?"snowFall":p.type==="petal"?"petalDrift":"leafTumble"} ${p.dur}s linear ${p.delay}s infinite`,boxShadow:p.type==="petal"?`0 0 4px ${p.color}44`:"none"}}/>})}
    </div>
    <svg viewBox="0 0 500 480" width="100%" height="100%" style={{position:"relative",zIndex:1}}>
      <defs><radialGradient id="gG" cx="50%" cy="50%" r="55%"><stop offset="0%" stopColor={season.ground} stopOpacity="0.22"/><stop offset="100%" stopColor="#0a0806" stopOpacity="0"/></radialGradient>
        <filter id="leafGlow"><feGaussianBlur stdDeviation="2.5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
      <ellipse cx="250" cy="445" rx="130" ry="18" fill="url(#gG)"/>
      <g>{tree.branches.map((b,i)=>{const c=b.depth===0?"#5a4432":b.depth===1?"#544030":b.depth===2?"#4e3a2a":"#453525";const o=b.depth<=1?0.9:b.depth<=3?0.7:isW?0.45:0.15;return<path key={`b${i}`}d={`M${b.x1} ${b.y1} Q${b.mx} ${b.my} ${b.x2} ${b.y2}`}stroke={c}strokeWidth={Math.max(0.5,b.width)}fill="none"strokeLinecap="round"opacity={o}/>})}</g>
      {tree.branches.filter(b=>b.depth===0).map((b,i)=><path key={`bk${i}`}d={`M${b.x1+2} ${b.y1} Q${b.mx+2} ${b.my} ${b.x2+1} ${b.y2}`}stroke="#2a1e12"strokeWidth="0.5"fill="none"opacity="0.2"/>)}
      {!isW&&canopyLeaves.length>0&&<g filter="url(#leafGlow)"style={{transition:"opacity 0.8s ease",opacity:vis,animation:"canopyBreathe 8s ease-in-out infinite"}}>
        {canopyLeaves.map((l,i)=><circle key={`${si}-leaf-${i}`}cx={l.cx}cy={l.cy}r={l.r}fill={l.color}opacity={l.opacity}style={{transition:`all 0.5s ease ${l.delay}s`}}/>)}</g>}
    </svg>
    <div key={si} style={{textAlign:"center",fontFamily:"'Cinzel',serif",fontSize:11,letterSpacing:"0.6em",color:"#9a8a6e28",marginTop:-8,animation:"seasonFade 5.5s ease-in-out forwards"}}>{season.name}</div>
  </div>;
}

// ════════════════════════════════════════════════
// DNA HELIX
// ════════════════════════════════════════════════

function DNAHelix({size=55}) {
  const [tick,setTick]=useState(0);
  useEffect(()=>{const i=setInterval(()=>setTick(t=>t+1),60);return()=>clearInterval(i)},[]);
  const strands=16; const phase=tick*0.1;
  const pts1=[],pts2=[];
  for(let i=0;i<strands;i++){const y=4+i*(92/strands);const p=phase+i*0.5;pts1.push({x:50+Math.sin(p)*18,y});pts2.push({x:50-Math.sin(p)*18,y})}
  return<div style={{width:size,height:size*1.1,margin:"0 auto"}}><svg viewBox="0 0 100 100" width="100%" height="100%">
    <defs><filter id="hGlow"><feGaussianBlur stdDeviation="2" result="g"/><feMerge><feMergeNode in="g"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
    <g filter="url(#hGlow)">{Array.from({length:strands},(_,i)=>{const d=(Math.sin(phase+i*0.5)+1)/2;return<line key={`r-${i}`}x1={pts1[i].x}y1={pts1[i].y}x2={pts2[i].x}y2={pts2[i].y}stroke={R.blood}strokeWidth={0.3+d*0.4}opacity={0.05+d*0.12}/>})}
      <path d={pts1.map((p,i)=>`${i===0?'M':'L'}${p.x} ${p.y}`).join(' ')}fill="none"stroke={R.blood}strokeWidth="1.2"opacity="0.35"/>
      <path d={pts2.map((p,i)=>`${i===0?'M':'L'}${p.x} ${p.y}`).join(' ')}fill="none"stroke={T.copper}strokeWidth="1.2"opacity="0.25"/>
      {pts1.map((p,i)=>{const d=(Math.sin(phase+i*0.5)+1)/2;return d>0.35?<circle key={`n1-${i}`}cx={p.x}cy={p.y}r={1+d*2}fill={R.scarlet}opacity={0.3+d*0.6}style={{animation:`dnaPulse 2s ease ${i*0.12}s infinite`}}/>:null})}
      {pts2.map((p,i)=>{const d=1-(Math.sin(phase+i*0.5)+1)/2;return d>0.35?<circle key={`n2-${i}`}cx={p.x}cy={p.y}r={1+d*2}fill={T.copper}opacity={0.3+d*0.5}style={{animation:`dnaPulse 2s ease ${i*0.12+1}s infinite`}}/>:null})}
    </g></svg></div>;
}

// ════════════════════════════════════════════════
// SHARED UI
// ════════════════════════════════════════════════

function DustMotes(){const m=Array.from({length:40},(_,i)=>({left:Math.random()*100,delay:Math.random()*12,dur:7+Math.random()*10,size:0.5+Math.random()*2.5,color:[T.copper,R.ember,E.honey,T.bone,R.rose][i%5],peak:0.1+Math.random()*0.2}));
  return<div style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:0,overflow:"hidden"}}>{m.map((m,i)=><div key={i}style={{position:"absolute",left:`${m.left}%`,bottom:-10,width:m.size,height:m.size,borderRadius:"50%",background:m.color,'--peak':m.peak,animation:`dustDrift ${m.dur}s linear ${m.delay}s infinite`}}/>)}</div>}

function Divider(){return<div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:12,margin:"32px 0"}}>
  <div style={{width:50,height:1,background:`linear-gradient(90deg,transparent,${R.blood}22)`}}/>
  <div style={{width:4,height:4,borderRadius:"50%",background:R.blood,opacity:0.15}}/>
  <div style={{width:6,height:6,border:`1px solid ${R.blood}22`,transform:"rotate(45deg)"}}/>
  <div style={{width:4,height:4,borderRadius:"50%",background:R.blood,opacity:0.15}}/>
  <div style={{width:50,height:1,background:`linear-gradient(90deg,${R.blood}22,transparent)`}}/></div>}

function FilmGrain(){const svg="data:image/svg+xml,"+encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg"><filter id="bf"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/></filter><rect width="100%" height="100%" filter="url(%23bf)"/></svg>');
  return<div style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:0,backgroundImage:`url("${svg}")`,backgroundRepeat:"repeat",opacity:0.04}}/>;}
function Shell({children,step}){const[show,setShow]=useState(false);useEffect(()=>{setShow(false);setTimeout(()=>setShow(true),100)},[step]);
  return<div style={{minHeight:"100vh",padding:"50px 24px 100px",background:D.void,position:"relative"}}>
    <style>{CSS}</style><FilmGrain/><DustMotes/>
    <div style={{position:"fixed",inset:0,pointerEvents:"none",background:`radial-gradient(ellipse at 25% 65%,${R.wine}0a,transparent 55%),radial-gradient(ellipse at 75% 25%,${E.bark}0c,transparent 50%)`}}/>
    <div style={{position:"relative",zIndex:10,maxWidth:640,margin:"0 auto",opacity:show?1:0,transform:show?"translateY(0)":"translateY(25px)",transition:"all 0.7s ease"}}>{children}</div></div>}

const inputBase={width:"100%",padding:"14px 18px",background:`${D.loam}cc`,border:`1px solid ${E.bark}55`,color:E.parchment,fontFamily:"'Crimson Text',serif",fontSize:16,transition:"all 0.3s",lineHeight:1.7,borderRadius:2};
const labelStyle={fontFamily:"'Cinzel',serif",fontSize:13,color:`${T.dust}99`,letterSpacing:"0.08em",display:"block",marginBottom:6,marginTop:22};
const hintStyle={fontFamily:"'Crimson Text',serif",fontSize:13,color:`${T.sage}55`,fontStyle:"italic",marginTop:4,marginBottom:2};

function TI({label,hint,value,onChange,placeholder,multi,rows}){const Tag=multi?"textarea":"input";
  return<div><label style={labelStyle}>{label}</label>{hint&&<p style={hintStyle}>{hint}</p>}
    <Tag value={value}onChange={e=>onChange(e.target.value)}placeholder={placeholder}rows={rows||3}
      style={{...inputBase,...(multi?{resize:"vertical",minHeight:80}:{})}}
      onFocus={e=>{e.target.style.borderColor=`${R.blood}44`;e.target.style.boxShadow=`0 0 18px ${R.blood}10`}}
      onBlur={e=>{e.target.style.borderColor=`${E.bark}55`;e.target.style.boxShadow="none"}}/></div>}

function CG({label,options,selected,onToggle,cols=2}){return<div><label style={{...labelStyle,marginBottom:12}}>{label}</label>
  <div style={{display:"grid",gridTemplateColumns:`repeat(${cols}, 1fr)`,gap:8}}>{options.map(o=>{const a=selected.includes(o);
    return<div key={o}onClick={()=>onToggle(o)}style={{padding:"10px 14px",cursor:"pointer",border:`1px solid ${a?R.blood+"45":E.bark+"22"}`,background:a?`${R.wine}28`:`${D.loam}88`,color:a?E.parchment:`${T.dust}44`,fontFamily:"'Crimson Text',serif",fontSize:14,transition:"all 0.3s",borderRadius:2,boxShadow:a?`inset 0 0 20px ${R.blood}0c`:""}}>{o}</div>})}</div></div>}

function SI({label,value,onChange,options}){return<div><label style={labelStyle}>{label}</label>
  <select value={value}onChange={e=>onChange(e.target.value)}style={{...inputBase,cursor:"pointer",appearance:"none",backgroundImage:`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%239a8a6e' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`,backgroundRepeat:"no-repeat",backgroundPosition:"right 16px center"}}>
    <option value="">{label}</option>{options.map(o=><option key={o}value={o}>{o}</option>)}</select></div>}

function Btn({label,onClick,disabled,primary,full,gold}){const[h,setH]=useState(false);
  return<div onClick={()=>!disabled&&onClick()} onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)}
  style={{position:"relative",overflow:"hidden",display:full?"block":"inline-block",padding:primary?"18px 50px":"14px 35px",
    border:`1px solid ${disabled?T.dust+"08":gold?"rgba(180,140,80,0.6)":primary?R.blood+"44":E.bark+"44"}`,
    cursor:disabled?"default":"pointer",textAlign:"center",fontFamily:"'Cinzel',serif",fontSize:primary?(gold?17:16):13,letterSpacing:"0.15em",
    color:disabled?`${T.dust}15`:primary?E.parchment:T.dust,transition:"border-color 0.3s, box-shadow 0.3s",borderRadius:2,
    background:primary&&!disabled?`${R.wine}33`:"transparent",animation:primary&&!disabled&&!gold?"bloodPulse 3s ease-in-out infinite":"none",opacity:disabled?0.3:1,
    boxShadow:gold&&h?"0 0 25px rgba(180,140,80,0.3)":"none"}}>
  {h&&!disabled&&<div style={{position:"absolute",inset:0,background:"linear-gradient(105deg,transparent 0%,transparent 40%,rgba(255,248,240,0.1) 50%,transparent 60%,transparent 100%)",animation:"btnSweep 0.5s ease-out forwards",pointerEvents:"none"}}/>}
  <span style={{position:"relative",zIndex:1}}>{label}</span></div>}

function Header({title,sub,progress}){return<div style={{textAlign:"center",marginBottom:40}}>
  {progress!==undefined&&<div style={{width:"100%",height:2,background:`${E.bark}33`,marginBottom:25,position:"relative",overflow:"hidden"}}>
    <div style={{width:`${progress}%`,height:"100%",background:`linear-gradient(90deg,${R.crimson}55,${R.blood}88,${T.copper}66)`,boxShadow:`0 0 12px ${R.blood}22`,transition:"width 0.6s ease"}}/>
    <div style={{position:"absolute",top:-3,left:`${progress}%`,width:8,height:8,borderRadius:"50%",background:R.ember,boxShadow:`0 0 10px ${R.ember}55`,transition:"left 0.6s ease",transform:"translateX(-50%)"}}/></div>}
  <DNAHelix size={55}/>
  <div style={{fontFamily:"'Cinzel',serif",fontSize:"clamp(1.5rem,5vw,2.2rem)",color:E.parchment,letterSpacing:"0.12em",fontWeight:500,marginTop:8,textShadow:`0 0 15px ${R.blood}22`}}>{title}</div>
  <div style={{fontFamily:"'Crimson Text',serif",fontSize:"clamp(0.95rem,2.5vw,1.15rem)",color:`${T.dust}55`,fontStyle:"italic",marginTop:8}}>{sub}</div>
  <Divider/></div>}

// ════════════════════════════════════════════════
// OPTION LISTS
// ════════════════════════════════════════════════

const DNA_OPTS=["Not tested","23andMe","AncestryDNA","MyHeritage","FamilyTreeDNA","Other"];
const TRAIT_OPTS=["Different colored eyes","Unusual birthmarks","Red hair gene","Extra digits/polydactyly","Albinism or partial","Left-handedness runs strong","Extremely early grey hair","Heterochromia","Widow's peak","Unusual scarring patterns"];
const CONDITION_OPTS=["Blood disorders","Connective tissue disorders","Autoimmune patterns","Extreme sensitivities","Unusual immunities","Seizure history","Synesthesia","Hypermobility"];
const GIFT_OPTS=["Healing touch","Prophetic dreams","Seeing spirits/entities","Animal communication","Weather sensitivity","Knowing things before they happen","Empathic absorption","Herbal/plant knowledge","Fire-gazing/scrying","Bone-setting/body work"];
const TRADITION_OPTS=["Christianity (folk/mystical)","Catholicism","Judaism","Islam/Sufism","Hinduism","Buddhism","Indigenous practices","African diasporic","Wicca/Witchcraft","Hoodoo/Rootwork","Brujería","Norse/Germanic","Celtic","Romani","Appalachian folk magic","Kitchen witchery","None known"];

// ════════════════════════════════════════════════
// MAIN COMPONENT — FLOW CONTROLLER
// ════════════════════════════════════════════════
// Phases: intro → mini1 → miniResult → gate → code → deep1..deep10 → complete

const ACCESS_CODE = "BLOODLINE2026";
const INTRO_EMBERS = Array.from({length:18},()=>({left:5+Math.random()*90,bottom:10+Math.random()*40,size:1.5+Math.random()*2,delay:Math.random()*8,dur:12+Math.random()*10,rise:-(80+Math.random()*80),peak:0.08+Math.random()*0.12}));

export default function BloodlineIntake() {
  const [phase, setPhase] = useState("intro");
  const [d, setD] = useState({
    name:"",email:"",dob:"",tob:"",pob:"",location:"",otherNames:"",
    miniWhisper:"",miniSurnames:"",miniCountries:"",miniPatterns:[],miniMystery:"",
    accessCode:"",codeError:false,
    dnaSource:"",dnaNotes:"",
    currentSurname:"",birthSurname:"",maternalSurnames:"",paternalSurnames:"",nameChanges:"",
    countries:"",regions:"",migrationTales:"",culturalTraditions:"",
    birthmarks:"",physicalTraits:[],conditions:[],familyTraits:"",eyeHairSkin:"",
    familyGifts:[],personalGifts:"",suppressedPractices:"",spiritualAwakening:"",
    familySecrets:"",legends:"",supernaturalEvents:"",unusualDeaths:"",hiddenPaternity:"",
    heirlooms:"",recurringSymbols:"",recipes:"",sacredLocations:"",traditions:[],traditionInfluence:"",
    heritageQuestions:"",patternsToHeal:"",ultimateHope:"",anythingElse:""
  });

  const set=(k,v)=>setD(p=>({...p,[k]:v}));
  const tog=(k,v)=>setD(p=>({...p,[k]:p[k].includes(v)?p[k].filter(x=>x!==v):[...p[k],v]}));
  const go=ph=>{setPhase(ph);window.scrollTo({top:0,behavior:"smooth"})};
  const nav=(back,next,label="CONTINUE",dis=false)=><div style={{display:"flex",justifyContent:back?"space-between":"flex-end",marginTop:40}}>
    {back&&<Btn label="← BACK" onClick={()=>go(back)}/>}<Btn label={label} onClick={()=>go(next)} primary disabled={dis}/></div>;

  // ── INTRO ──
  if(phase==="intro") return<Shell step="intro">
      <div style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:1,background:"radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.25) 70%, rgba(0,0,0,0.4) 100%)"}}/>
      <div style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:2,overflow:"hidden"}}>
        {INTRO_EMBERS.map((e,i)=><div key={i} style={{position:"absolute",left:`${e.left}%`,bottom:e.bottom+"%",width:e.size,height:e.size,borderRadius:"50%",background:"linear-gradient(180deg,#d4a030,#8b6914)",boxShadow:"0 0 6px rgba(212,160,48,0.4)",opacity:0.6,"--rise":e.rise+"px","--peak":e.peak,"--drift-x":(Math.random()-0.5)*20+"px",animation:`emberDrift ${e.dur}s linear ${e.delay}s infinite`}}/>)}
      </div>
    <div style={{minHeight:"90vh",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",textAlign:"center",position:"relative",zIndex:10}}>
      <FourSeasonsTree/>
      <h1 style={{fontFamily:"'Cinzel',serif",fontSize:"clamp(3.2rem,12vw,5.5rem)",fontWeight:700,letterSpacing:"0.14em",lineHeight:1,marginTop:18,
        background:"linear-gradient(90deg,#d4c4a0 0%,#f0e0c0 20%,#ffffff 35%,#f5ddb5 50%,#d4c4a0 65%,#c8a870 80%,#d4c4a0 100%)",backgroundSize:"200% 100%",
        WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text",animation:"titleShimmer 6s ease-in-out infinite",
        filter:"drop-shadow(0 2px 12px #8b1a1a33) drop-shadow(0 0 40px #8b1a1a18)",textShadow:"0 0 40px rgba(180,140,80,0.2), 0 0 80px rgba(180,140,80,0.1)"}}>BLOODLINE</h1>
      <p style={{fontFamily:"'Crimson Text',serif",fontSize:"clamp(1.2rem,3.5vw,1.65rem)",color:"#C4B59A",marginTop:12,letterSpacing:"0.04em",animation:"subtitlePulse 5s ease-in-out infinite"}}>Ancestral Heritage Dossier</p>
      <div style={{fontFamily:"'Cinzel',serif",fontSize:11,letterSpacing:"0.4em",color:"rgba(255,248,240,0.7)",marginTop:20}}>MINI PREVIEW + FULL DEEP INTAKE</div>
      <Divider/>
      <p style={{fontFamily:"'Crimson Text',serif",fontSize:"clamp(1.05rem,2.5vw,1.18rem)",color:"rgba(255,248,240,0.85)",lineHeight:2,maxWidth:480,fontStyle:"italic"}}>
        Your blood carries codes older than language. Give us your name and one whisper — receive a free ancestral glimpse. If the ancestors call you deeper, unlock the full Heritage Dossier.</p>
      <p style={{fontFamily:"'Inter',sans-serif",fontSize:"clamp(0.82rem,1.6vw,0.88rem)",color:"rgba(255,248,240,0.65)",lineHeight:1.9,maxWidth:460,marginTop:12}}>
        Jennifer personally reads every word and crafts your dossier by hand. No AI generation. Your ancestors deserve that.</p>
      <div style={{marginTop:40}}><Btn label="BEGIN THE BLOODLINE" onClick={()=>go("mini1")} primary gold/></div>
      <div style={{marginTop:60,display:"flex",alignItems:"center",gap:12}}>
        <div style={{width:30,height:1,background:`${R.blood}0c`}}/>
        <p style={{fontFamily:"'Cinzel',serif",fontSize:9,color:"rgba(255,248,240,0.65)",letterSpacing:"0.2em"}}>The Forgotten Code Research Institute</p>
        <div style={{width:30,height:1,background:`${R.blood}0c`}}/></div>
      <div style={{position:"fixed",bottom:24,left:"50%",transform:"translateX(-50%)",fontFamily:"'Cinzel',serif",fontSize:10,letterSpacing:"0.3em",color:"rgba(255,248,240,0.5)",animation:"scrollPulse 2.5s ease-in-out infinite",zIndex:20}}>scroll</div>
    </div></Shell>;

  // ── MINI INTAKE: Step 1 — Identity ──
  if(phase==="mini1") return<Shell step="mini1">
    <Header title="FIRST THREAD" sub="Before the ancestors will speak, they need your name"/>
    <TI label="Full Name" value={d.name} onChange={v=>set("name",v)} placeholder="First, middle, last"/>
    <TI label="Email Address" value={d.email} onChange={v=>set("email",v)} placeholder="For receiving your reading"/>
    <TI label="In one sentence — what does your bloodline whisper to you at night?" hint="The thing you can't explain but can't stop feeling" value={d.miniWhisper} onChange={v=>set("miniWhisper",v)} placeholder="I've always felt that my family..." multi rows={3}/>
    
    {nav(null,"miniResult","REVEAL MY BLOODLINE GLIMPSE",!(d.name&&d.email))}</Shell>;

  

  

  // ── MINI RESULT ──
  if(phase==="miniResult") return<MiniResult data={d} onDeeper={()=>go("gate")} onBack={()=>go("mini1")}/>;

  // ── GATE — Pay & Get Access Code ──
  if(phase==="gate") return<Shell step="gate">
    <div style={{textAlign:"center"}}>
      <DNAHelix size={70}/>
      <h2 style={{fontFamily:"'Cinzel',serif",fontSize:"clamp(1.8rem,5vw,2.5rem)",color:E.parchment,marginTop:15,letterSpacing:"0.1em"}}>UNLOCK THE FULL BLOODLINE</h2>
      <p style={{fontFamily:"'Crimson Text',serif",fontSize:"clamp(1.05rem,2.5vw,1.18rem)",color:`${T.bone}44`,fontStyle:"italic",marginTop:12,lineHeight:2,maxWidth:480,margin:"12px auto 0"}}>
        Your ancestral glimpse revealed the surface. The full Heritage Dossier goes seven generations deep — tracing physical markers, spiritual gifts, family mysteries, sacred objects, and the hidden codes written in your blood.</p>
      <Divider/>

      <div style={{background:`${D.loam}cc`,border:`1px solid ${E.bark}33`,padding:"30px 25px",borderRadius:2,textAlign:"left",maxWidth:460,margin:"0 auto 30px"}}>
        <div style={{fontFamily:"'Cinzel',serif",fontSize:12,letterSpacing:"0.2em",color:`${T.dust}55`,marginBottom:18}}>YOUR HERITAGE DOSSIER INCLUDES</div>
        {["Deep ancestral bloodline tracing — seven generations","Physical markers, genetic patterns, and body memory","Spiritual gifts, suppressed abilities, and awakening map","Family mysteries, secrets, and supernatural events","Sacred objects, symbols, and tradition mapping","Generational pattern analysis and healing pathways"].map((s,i)=>
          <div key={i} style={{display:"flex",gap:12,alignItems:"flex-start",marginBottom:12}}>
            <div style={{color:`${R.blood}55`,fontSize:12,marginTop:2,flexShrink:0}}>◈</div>
            <p style={{fontFamily:"'Crimson Text',serif",fontSize:14,color:`${T.bone}44`,lineHeight:1.6}}>{s}</p></div>)}
        <p style={{fontFamily:"'Crimson Text',serif",fontSize:13,color:`${T.dust}33`,fontStyle:"italic",marginTop:14,lineHeight:1.7}}>
          Hand-crafted personally by Jennifer. No AI generation. Delivered within 5-7 days.</p>
      </div>

      <div style={{fontFamily:"'Cinzel',serif",fontSize:"clamp(1.5rem,4vw,2rem)",color:E.parchment,letterSpacing:"0.15em",marginBottom:8}}>$111</div>
      <p style={{fontFamily:"'Crimson Text',serif",fontSize:13,color:`${T.dust}33`,fontStyle:"italic",marginBottom:25}}>One-time payment · Lifetime access</p>

      <div style={{display:"flex",flexDirection:"column",gap:12,maxWidth:380,margin:"0 auto"}}>
        {[
          {label:"PAY WITH STRIPE",href:"https://buy.stripe.com/PLACEHOLDER",icon:"◇",note:"Credit / Debit Card"},
          {label:"PAY WITH VENMO",href:"https://venmo.com/u/Jennifer-Coley-4",icon:"◈",note:"@Jennifer-Coley-4"},
          {label:"PAY WITH CASHAPP",href:"https://cash.app/$jenniferWilderWest",icon:"◆",note:"$jenniferWilderWest"},
          {label:"PAY WITH PAYPAL",href:"https://paypal.me/JSnider364/111",icon:"◉",note:"PayPal.me/JSnider364"}
        ].map((pm,i)=>
          <a key={i} href={pm.href} target="_blank" rel="noopener noreferrer"
            style={{display:"block",padding:"16px 20px",border:`1px solid ${E.bark}44`,textDecoration:"none",borderRadius:2,
              background:`${D.loam}cc`,transition:"all 0.3s",textAlign:"center"}}>
            <div style={{fontFamily:"'Cinzel',serif",fontSize:13,letterSpacing:"0.15em",color:E.parchment}}>{pm.icon} {pm.label}</div>
            <div style={{fontFamily:"'Crimson Text',serif",fontSize:12,color:`${T.dust}33`,marginTop:4}}>{pm.note}</div>
          </a>)}
      </div>

      <p style={{fontFamily:"'Crimson Text',serif",fontSize:12,color:`${T.dust}22`,marginTop:18,lineHeight:1.7}}>
        Include <strong style={{color:`${T.dust}44`}}>"{d.name}"</strong> and <strong style={{color:`${T.dust}44`}}>"{d.email}"</strong> in your payment note.</p>

      <Divider/>
      <p style={{fontFamily:"'Cinzel',serif",fontSize:12,letterSpacing:"0.15em",color:`${T.dust}44`,marginBottom:12}}>ALREADY PAID?</p>
      <p style={{fontFamily:"'Crimson Text',serif",fontSize:14,color:`${T.bone}33`,lineHeight:1.8,maxWidth:420,margin:"0 auto 18px",fontStyle:"italic"}}>
        Let Jennifer know so she can send your access code.</p>
      <a href={`mailto:theforgottencode780@gmail.com?subject=${encodeURIComponent(`Bloodline Payment Confirmation — ${d.name}`)}&body=${encodeURIComponent(`Hi Jennifer,\n\nI just completed payment for the Bloodline Heritage Dossier ($111).\n\nName: ${d.name}\nEmail: ${d.email}\nPayment method: [Venmo/CashApp/PayPal/Stripe]\n\nPlease send my access code when ready.\n\nThank you.`)}`}
        style={{display:"block",width:"min(100%,380px)",padding:"16px 25px",margin:"0 auto",border:`1px solid ${R.blood}33`,textDecoration:"none",textAlign:"center",fontFamily:"'Cinzel',serif",fontSize:13,letterSpacing:"0.12em",color:E.parchment,background:`${R.wine}22`,borderRadius:2}}>
        ✉ I'VE PAID — NOTIFY JENNIFER</a>
      <p style={{fontFamily:"'Crimson Text',serif",fontSize:12,color:`${T.dust}18`,marginTop:12}}>
        theforgottencode780@gmail.com · (423) 388-8304</p>

      <Divider/>
      <p style={{fontFamily:"'Cinzel',serif",fontSize:12,letterSpacing:"0.15em",color:`${T.dust}44`,marginBottom:18}}>HAVE YOUR ACCESS CODE?</p>
      <div style={{maxWidth:350,margin:"0 auto"}}>
        <input value={d.accessCode} onChange={e=>{set("accessCode",e.target.value.toUpperCase());set("codeError",false)}} placeholder="ENTER ACCESS CODE"
          style={{...inputBase,textAlign:"center",letterSpacing:"0.3em",fontFamily:"'Cinzel',serif",fontSize:14}}
          onFocus={e=>{e.target.style.borderColor=`${R.blood}44`}}
          onBlur={e=>{e.target.style.borderColor=`${E.bark}55`}}/>
        {d.codeError&&<p style={{fontFamily:"'Crimson Text',serif",fontSize:13,color:R.ember,textAlign:"center",marginTop:8,fontStyle:"italic"}}>Invalid access code. Please check and try again.</p>}
        <div style={{marginTop:18,textAlign:"center"}}>
          <Btn label="UNLOCK FULL INTAKE" onClick={()=>{if(d.accessCode===ACCESS_CODE)go("deep1");else set("codeError",true)}} primary/></div>
      </div>
      <div style={{marginTop:35,textAlign:"center"}}><Btn label="\u2190 BACK" onClick={()=>go("miniResult")}/></div>
    </div></Shell>;

  // ── DEEP INTAKE SECTIONS ──
  const deepSteps=["deep1","deep2","deep3","deep4","deep5","deep6","deep7","deep8","deep9","deep10","complete"];
  const deepIdx=deepSteps.indexOf(phase);
  const deepProgress=deepIdx>=0?((deepIdx)/(deepSteps.length-1))*100:0;
  const dn=(back,next,label="CONTINUE",dis=false)=>nav(back,next,label,dis);

  if(phase==="deep1") return<Shell step="deep1">
    <Header title="SACRED IDENTITY" sub="The name your blood answers to" progress={deepProgress}/>
    <TI label="Full Legal Name" value={d.name} onChange={v=>set("name",v)} placeholder="First, middle, last"/>
    <TI label="Other Names" hint="Nicknames, spiritual names, maiden name" value={d.otherNames} onChange={v=>set("otherNames",v)} placeholder="Optional"/>
    <TI label="Date of Birth" value={d.dob} onChange={v=>set("dob",v)} placeholder="MM/DD/YYYY"/>
    <TI label="Time of Birth" hint="If known — for astrological mapping" value={d.tob} onChange={v=>set("tob",v)} placeholder="e.g. 4:12 PM"/>
    <TI label="Place of Birth" value={d.pob} onChange={v=>set("pob",v)} placeholder="City, State/Region, Country"/>
    <TI label="Current Location" value={d.location} onChange={v=>set("location",v)} placeholder="City, State"/>
    <TI label="Email Address" value={d.email} onChange={v=>set("email",v)} placeholder="For receiving your Heritage Dossier"/>
    {dn("gate","deep2","CONTINUE",!(d.name&&d.email))}</Shell>;

  if(phase==="deep2") return<Shell step="deep2">
    <Header title="GENETIC FOUNDATION" sub="The science beneath the story" progress={deepProgress}/>
    <p style={{...hintStyle,marginBottom:20}}>DNA data is optional but enriches your dossier. Even without it, your surnames, physical markers, and family stories carry deep ancestral information.</p>
    <SI label="DNA Testing Source" value={d.dnaSource} onChange={v=>set("dnaSource",v)} options={DNA_OPTS}/>
    <TI label="Notes about DNA results" hint="Percentages, surprising findings, haplogroups" value={d.dnaNotes} onChange={v=>set("dnaNotes",v)} placeholder="Optional — share what you know or 'not tested'" multi rows={4}/>
    {dn("deep1","deep3")}</Shell>;

  if(phase==="deep3") return<Shell step="deep3">
    <Header title="ANCESTRAL BLOODLINES" sub="Each surname carries power" progress={deepProgress}/>
    <TI label="Current surname and its meaning (if known)" value={d.currentSurname} onChange={v=>set("currentSurname",v)} placeholder="Surname and any known meaning, origin, or legend" multi/>
    <TI label="Birth surname (if different)" value={d.birthSurname} onChange={v=>set("birthSurname",v)} placeholder="Maiden name or original family name"/>
    <TI label="ALL known maternal line surnames" hint="Mother, grandmother, great-grandmother — go as far back as you can" value={d.maternalSurnames} onChange={v=>set("maternalSurnames",v)} placeholder="List every surname..." multi rows={4}/>
    <TI label="ALL known paternal line surnames" hint="Father, grandfather, great-grandfather" value={d.paternalSurnames} onChange={v=>set("paternalSurnames",v)} placeholder="List every surname..." multi rows={4}/>
    <TI label="Known name changes or variations" hint="Immigration changes, spelling variations, adoptions" value={d.nameChanges} onChange={v=>set("nameChanges",v)} placeholder="Any shifts, losses, or deliberate changes..." multi/>
    {dn("deep2","deep4")}</Shell>;

  if(phase==="deep4") return<Shell step="deep4">
    <Header title="GEOGRAPHIC ORIGINS" sub="Where your blood has traveled" progress={deepProgress}/>
    <TI label="Known countries and regions of ancestry" hint="List everything — even uncertain or rumored" value={d.countries} onChange={v=>set("countries",v)} placeholder="Ireland, West Africa, Appalachia..." multi rows={3}/>
    <TI label="Specific towns, villages, or regions" value={d.regions} onChange={v=>set("regions",v)} placeholder="The more specific, the deeper..." multi rows={3}/>
    <TI label="Migration stories and patterns" hint="How and why did your ancestors move?" value={d.migrationTales} onChange={v=>set("migrationTales",v)} placeholder="Europe → Ellis Island → Appalachia..." multi rows={4}/>
    <TI label="Cultural traditions preserved in your family" hint="Foods, language, holidays, customs that survived" value={d.culturalTraditions} onChange={v=>set("culturalTraditions",v)} placeholder="What survived? What was lost?" multi rows={3}/>
    {dn("deep3","deep5")}</Shell>;

  if(phase==="deep5") return<Shell step="deep5">
    <Header title="PHYSICAL MARKERS" sub="What the body remembers" progress={deepProgress}/>
    <p style={{...hintStyle,marginBottom:20}}>Your body is a living archive. Birthmarks, eye color, unusual features — signatures your ancestors left in your flesh.</p>
    <TI label="Birthmarks, scars, or markings that run in the family" value={d.birthmarks} onChange={v=>set("birthmarks",v)} placeholder="Location, shape, who else has them..." multi rows={3}/>
    <CG label="Unusual physical traits" options={TRAIT_OPTS} selected={d.physicalTraits} onToggle={v=>tog("physicalTraits",v)}/>
    <CG label="Known genetic conditions or patterns" options={CONDITION_OPTS} selected={d.conditions} onToggle={v=>tog("conditions",v)}/>
    <TI label="Eye color, hair color, skin features" hint="Include family patterns — who shares what" value={d.eyeHairSkin} onChange={v=>set("eyeHairSkin",v)} placeholder="Blue eyes that skip a generation..." multi rows={3}/>
    <TI label="Family traits shared across generations" value={d.familyTraits} onChange={v=>set("familyTraits",v)} placeholder="Everyone on mom's side has the same hands..." multi rows={3}/>
    {dn("deep4","deep6")}</Shell>;

  if(phase==="deep6") return<Shell step="deep6">
    <Header title="SPIRITUAL HERITAGE" sub="The gifts your blood carries" progress={deepProgress}/>
    <CG label="Known gifts or abilities in your family line" options={GIFT_OPTS} selected={d.familyGifts} onToggle={v=>tog("familyGifts",v)}/>
    <TI label="Your own spiritual gifts or abilities" hint="What do you sense, feel, know, or do that others don't?" value={d.personalGifts} onChange={v=>set("personalGifts",v)} placeholder="I've always been able to..." multi rows={4}/>
    <TI label="Suppressed or hidden spiritual practices" hint="Gifts that were silenced, shamed, or hidden?" value={d.suppressedPractices} onChange={v=>set("suppressedPractices",v)} placeholder="Grandmother who 'knew things'..." multi rows={3}/>
    <TI label="Your spiritual awakening story" hint="When did you first know you were different?" value={d.spiritualAwakening} onChange={v=>set("spiritualAwakening",v)} placeholder="The moment, the age, the event..." multi rows={4}/>
    {dn("deep5","deep7")}</Shell>;

  if(phase==="deep7") return<Shell step="deep7">
    <Header title="FAMILY MYSTERIES" sub="What the silence holds" progress={deepProgress}/>
    <TI label="Family secrets — whispered, suspected, or confirmed" value={d.familySecrets} onChange={v=>set("familySecrets",v)} placeholder="Affairs, hidden children, shame..." multi rows={4}/>
    <TI label="Family legends, myths, or impossible stories" hint="The ones nobody stops telling" value={d.legends} onChange={v=>set("legends",v)} placeholder="Great-grandmother who could stop bleeding..." multi rows={4}/>
    <TI label="Unexplained phenomena or supernatural events" value={d.supernaturalEvents} onChange={v=>set("supernaturalEvents",v)} placeholder="Hauntings, premonitions..." multi rows={3}/>
    <TI label="Unusual or patterned deaths" hint="Recurring ages, similar causes" value={d.unusualDeaths} onChange={v=>set("unusualDeaths",v)} placeholder="Optional — 'none known' is valid" multi/>
    <TI label="Hidden paternity, adoption, or unknown ancestry" value={d.hiddenPaternity} onChange={v=>set("hiddenPaternity",v)} placeholder="Rumored, confirmed, or suspected..." multi/>
    {dn("deep6","deep8")}</Shell>;

  if(phase==="deep8") return<Shell step="deep8">
    <Header title="SACRED OBJECTS & TRADITIONS" sub="The vessels of ancestral power" progress={deepProgress}/>
    <TI label="Family heirlooms passed down" hint="Jewelry, clocks, bibles, weapons, quilts" value={d.heirlooms} onChange={v=>set("heirlooms",v)} placeholder="Grandmother's ring..." multi rows={3}/>
    <TI label="Recurring symbols, animals, or imagery" hint="In stories, dreams, art, crests" value={d.recurringSymbols} onChange={v=>set("recurringSymbols",v)} placeholder="Cardinals always appear when..." multi rows={3}/>
    <TI label="Traditional recipes, remedies, or rituals" hint="Kitchen medicine, folk cures" value={d.recipes} onChange={v=>set("recipes",v)} placeholder="Grandmother's bone broth..." multi rows={3}/>
    <TI label="Sacred locations or land" value={d.sacredLocations} onChange={v=>set("sacredLocations",v)} placeholder="The family cemetery..." multi rows={3}/>
    <CG label="Spiritual traditions in your family or practice" options={TRADITION_OPTS} selected={d.traditions} onToggle={v=>tog("traditions",v)}/>
    <TI label="How have these traditions shaped you?" value={d.traditionInfluence} onChange={v=>set("traditionInfluence",v)} placeholder="Raised Catholic but always drawn to..." multi rows={3}/>
    {dn("deep7","deep9")}</Shell>;

  if(phase==="deep9") return<Shell step="deep9">
    <Header title="GOALS & INTENTIONS" sub="What your ancestors want you to know" progress={deepProgress}/>
    <TI label="What questions do you have about your heritage?" value={d.heritageQuestions} onChange={v=>set("heritageQuestions",v)} placeholder="Why does everyone in my family..." multi rows={4}/>
    <TI label="Life patterns to understand or heal" hint="Money, relationships, health, addiction, loss" value={d.patternsToHeal} onChange={v=>set("patternsToHeal",v)} placeholder="Every generation struggles with..." multi rows={4}/>
    <TI label="Your ultimate hope for this dossier" value={d.ultimateHope} onChange={v=>set("ultimateHope",v)} placeholder="I want to finally understand..." multi rows={4}/>
    <TI label="Anything else unspoken" value={d.anythingElse} onChange={v=>set("anythingElse",v)} placeholder="Whatever your gut says to add..." multi rows={4}/>
    {dn("deep8","complete","SEAL THE BLOODLINE")}</Shell>;

  // ── COMPLETE ──
  if(phase==="complete") return<Complete data={d} onBack={()=>go("deep9")}/>;

  return null;
}

// ════════════════════════════════════════════════
// MINI RESULT — Free preview reading
// ════════════════════════════════════════════════

function MiniResult({data:d,onDeeper,onBack}) {
  const [show,setShow]=useState(false);
  useEffect(()=>{setTimeout(()=>setShow(true),300)},[]);

  const hasWhisper=d.miniWhisper&&d.miniWhisper.trim().length>0;

  return<Shell step="miniResult">
    <div style={{opacity:show?1:0,transform:show?"translateY(0)":"translateY(30px)",transition:"all 1s ease",textAlign:"center"}}>
      <DNAHelix size={70}/>
      <h2 style={{fontFamily:"'Cinzel',serif",fontSize:"clamp(1.8rem,5vw,2.8rem)",color:E.parchment,marginTop:15,letterSpacing:"0.1em",textShadow:`0 0 20px ${R.blood}33`}}>YOUR BLOODLINE GLIMPSE</h2>
      <p style={{fontFamily:"'Crimson Text',serif",fontSize:"clamp(1rem,2.5vw,1.15rem)",color:`${T.dust}55`,fontStyle:"italic",marginTop:12,lineHeight:1.9,maxWidth:460,margin:"12px auto 0"}}>
        The ancestors have noticed you.</p>
      <Divider/>

      {/* Mini reading content */}
      <div style={{background:`${D.loam}cc`,border:`1px solid ${E.bark}33`,padding:"30px 25px",borderRadius:2,textAlign:"left",marginBottom:30}}>
        <div style={{fontFamily:"'Cinzel',serif",fontSize:12,letterSpacing:"0.25em",color:`${T.dust}22`,marginBottom:25}}>INITIAL TRACE</div>
        
        <p style={{fontFamily:"'Crimson Text',serif",fontSize:16,color:`${T.bone}55`,lineHeight:2,fontStyle:"italic",marginBottom:20}}>
          {d.name} — something in your blood is trying to speak. The fact that you're here means a thread has been activated in your ancestral line.</p>

        {hasWhisper&&<div style={{marginBottom:22,padding:"18px 20px",borderLeft:`2px solid ${R.blood}33`,background:`${R.wine}0a`}}>
          <div style={{fontFamily:"'Cinzel',serif",fontSize:10,letterSpacing:"0.2em",color:`${R.blood}44`,marginBottom:8}}>YOUR WHISPER</div>
          <p style={{fontFamily:"'Crimson Text',serif",fontSize:15,color:`${T.bone}44`,lineHeight:1.9,fontStyle:"italic"}}>"{d.miniWhisper}"</p>
        </div>}

        <p style={{fontFamily:"'Crimson Text',serif",fontSize:15,color:`${T.dust}44`,lineHeight:2}}>
          This whisper is the surface of something much deeper. Your full Heritage Dossier will trace the surnames, migration patterns, physical markers, spiritual gifts, generational trauma, family secrets, and sacred codes that live in your blood — going back seven generations.</p>
      </div>



      <div style={{display:"flex",flexDirection:"column",gap:14,alignItems:"center"}}>
        <Btn label="UNLOCK THE FULL BLOODLINE →" onClick={onDeeper} primary full/>
      </div>

      <div style={{marginTop:30}}><Btn label="← EDIT MY ANSWERS" onClick={onBack}/></div>
    </div></Shell>;
}

// ════════════════════════════════════════════════
// COMPLETION — Full intake done
// ════════════════════════════════════════════════

function Complete({data:d,onBack}) {
  const [show,setShow]=useState(false);
  const [copied,setCopied]=useState(false);
  useEffect(()=>{setTimeout(()=>setShow(true),300)},[]);

  const build=()=>{let s=`════════════════════════════════════════\nBLOODLINE — ANCESTRAL HERITAGE DOSSIER\nFULL DEEP INTAKE\n════════════════════════════════════════\n\n`;
    const add=(h,pairs)=>{s+=`═══ ${h} ═══\n`;pairs.forEach(([k,v])=>{if(v&&(typeof v==="string"?v.trim():v.length))s+=`${k}: ${Array.isArray(v)?v.join(", "):v}\n`});s+="\n"};
    add("SACRED IDENTITY",[["Name",d.name],["Other Names",d.otherNames],["Email",d.email],["DOB",d.dob],["TOB",d.tob],["POB",d.pob],["Location",d.location]]);
    add("GENETIC FOUNDATION",[["DNA Source",d.dnaSource],["DNA Notes",d.dnaNotes]]);
    add("ANCESTRAL BLOODLINES",[["Current Surname",d.currentSurname],["Birth Surname",d.birthSurname],["Maternal Surnames",d.maternalSurnames],["Paternal Surnames",d.paternalSurnames],["Name Changes",d.nameChanges]]);
    add("GEOGRAPHIC ORIGINS",[["Countries",d.countries],["Regions",d.regions],["Migration Stories",d.migrationTales],["Cultural Traditions",d.culturalTraditions]]);
    add("PHYSICAL MARKERS",[["Birthmarks",d.birthmarks],["Physical Traits",d.physicalTraits],["Conditions",d.conditions],["Eye/Hair/Skin",d.eyeHairSkin],["Family Traits",d.familyTraits]]);
    add("SPIRITUAL HERITAGE",[["Family Gifts",d.familyGifts],["Personal Gifts",d.personalGifts],["Suppressed Practices",d.suppressedPractices],["Awakening",d.spiritualAwakening]]);
    add("FAMILY MYSTERIES",[["Secrets",d.familySecrets],["Legends",d.legends],["Supernatural Events",d.supernaturalEvents],["Unusual Deaths",d.unusualDeaths],["Hidden Paternity",d.hiddenPaternity]]);
    add("SACRED OBJECTS",[["Heirlooms",d.heirlooms],["Recurring Symbols",d.recurringSymbols],["Recipes/Remedies",d.recipes],["Sacred Locations",d.sacredLocations],["Traditions",d.traditions],["Tradition Influence",d.traditionInfluence]]);
    add("GOALS & INTENTIONS",[["Heritage Questions",d.heritageQuestions],["Patterns to Heal",d.patternsToHeal],["Ultimate Hope",d.ultimateHope],["Anything Else",d.anythingElse]]);
    s+=`════════════════════════════════════════\n© Jennifer Leigh West · The Forgotten Code Research Institute\n`;return s};
  const summary=build();

  return<Shell step="complete">
    <div style={{opacity:show?1:0,transform:show?"translateY(0)":"translateY(30px)",transition:"all 1s ease",textAlign:"center"}}>
      <DNAHelix size={80}/>
      <h2 style={{fontFamily:"'Cinzel',serif",fontSize:"clamp(2rem,6vw,3rem)",color:E.parchment,marginTop:20,letterSpacing:"0.1em",
        background:"linear-gradient(90deg,#d4c4a0 0%,#f0e0c0 20%,#ffffff 35%,#f5ddb5 50%,#d4c4a0 65%,#c8a870 80%,#d4c4a0 100%)",backgroundSize:"200% 100%",
        WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text",animation:"titleShimmer 6s ease-in-out infinite",
        filter:"drop-shadow(0 2px 12px #8b1a1a33)"}}>BLOODLINE SEALED</h2>
      <p style={{fontFamily:"'Crimson Text',serif",fontSize:"clamp(1rem,2.5vw,1.15rem)",color:`${T.dust}55`,fontStyle:"italic",marginTop:12,lineHeight:1.9,maxWidth:460,margin:"12px auto 0"}}>
        Your ancestral codes have been captured. Jennifer will personally trace every thread and craft your Heritage Dossier by hand.</p>
      <Divider/>
      <div style={{display:"flex",flexDirection:"column",gap:14,alignItems:"center",marginBottom:40}}>
        <a href={`mailto:theforgottencode780@gmail.com?subject=${encodeURIComponent(`Bloodline Full Heritage Intake — ${d.name}`)}&body=${encodeURIComponent(summary)}`}
          style={{display:"block",width:"min(100%,400px)",padding:"18px 30px",border:`2px solid ${R.blood}40`,textDecoration:"none",textAlign:"center",fontFamily:"'Cinzel',serif",fontSize:15,letterSpacing:"0.15em",color:E.parchment,background:`${R.wine}33`,borderRadius:2,animation:"bloodPulse 3s ease-in-out infinite"}}>
          ✉ SEND BLOODLINE VIA EMAIL</a>
        <div onClick={()=>{navigator.clipboard.writeText(summary).then(()=>{setCopied(true);setTimeout(()=>setCopied(false),2500)})}}
          style={{width:"min(100%,400px)",padding:"14px 30px",cursor:"pointer",textAlign:"center",border:`1px solid ${E.bark}33`,borderRadius:2,fontFamily:"'Cinzel',serif",fontSize:13,letterSpacing:"0.12em",color:copied?T.copper:`${T.dust}25`,transition:"all 0.3s"}}>
          {copied?"✓ COPIED TO CLIPBOARD":"⊏ COPY ALL RESPONSES"}</div>
      </div>
      <div style={{background:`${D.loam}cc`,border:`1px solid ${E.bark}33`,padding:"25px 20px",textAlign:"left",borderRadius:2}}>
        <div style={{fontFamily:"'Cinzel',serif",fontSize:11,letterSpacing:"0.3em",color:`${T.dust}18`,marginBottom:15}}>INTAKE PREVIEW</div>
        <div style={{maxHeight:350,overflow:"auto",paddingRight:8}}>
          <pre style={{fontFamily:"'Crimson Text',serif",fontSize:13,color:`${T.bone}25`,lineHeight:1.8,whiteSpace:"pre-wrap",wordBreak:"break-word"}}>{summary}</pre></div>
      </div>
      <p style={{fontFamily:"'Crimson Text',serif",fontSize:13,color:`${T.dust}25`,marginTop:35,lineHeight:1.9,fontStyle:"italic"}}>
        Your Heritage Dossier will be delivered within 5-7 days.<br/>
        <span style={{color:`${R.blood}33`}}>theforgottencode780@gmail.com</span> · (423) 388-8304</p>
      <p style={{fontFamily:"'Inter',sans-serif",fontSize:9,color:`${E.bark}22`,marginTop:40,letterSpacing:"0.15em"}}>
        © Jennifer Leigh West · The Forgotten Code Research Institute</p>
    </div></Shell>;
}
