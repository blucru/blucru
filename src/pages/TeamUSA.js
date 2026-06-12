import React, { useState, useEffect, useRef, useCallback } from 'react';
import GlowTracker from '../components/GlowTracker';
import useScrollAnimations from '../components/useScrollAnimations';

const TARGET = new Date('2026-10-07T00:00:00');

const TEAM_MEMBERS = [
  { name: 'Deven B',   role: 'Tele-Op',       image: '/devenb.png'   },
  { name: 'Kathy Z',   role: 'Manufacturing', image: '/kathyz.png'   },
  { name: 'Amber W',   role: 'CAD',           image: '/amberw.png'   },
  { name: 'Michael D', role: 'Autonomous',    image: '/michaeld.png' },
  { name: 'Michael J', role: 'CAD',           image: '/michaelj.png' },
  { name: 'Thomas Y',  role: 'Electrical',    image: '/thomasy.png'  },
];

const MENTORS = [
  {
    name: 'Cooper L',
    title: 'Technical Mentor',
    affiliation: 'Stanford University',
    type: 'Blu Cru Alum',
    email: 'copperli1234@gmail.com',
    image: '/cooperl.png',
  },
  {
    name: 'Ethan Z',
    title: 'Technical Mentor',
    affiliation: 'University of Pennsylvania',
    type: 'Blu Cru Alum',
    email: 'ezhoumd@gmail.com',
    image: '/ethanz.png',
  },
  {
    name: 'Annika B',
    title: 'Judging + Documentation Mentor',
    affiliation: 'Carnegie Mellon University',
    type: 'Blu Cru Alum',
    email: 'annikavbalaji@gmail.com',
    image: '/annikab.png',
  },
  {
    name: 'John H',
    title: 'Technical Mentor',
    affiliation: 'UC Berkeley',
    type: 'Blu Cru Alum',
    email: 'huangjohn16@gmail.com',
    image: '/johnh.png',
  },
];

const HERO_SLIDES = [
  '/fullgroupawdphoto.jpg',
  '/statepplgroup.jpg',
  '/hardatwork.jpg',
  '/Goingtofield.jpg',
  '/lockedtfin.png',
  '/wowie.png',
];

/* shared font styles */
const SERIF = "'Raleway', 'Nunito', sans-serif";
const SANS  = "'Nunito', 'Raleway', sans-serif";

function getTimeLeft() {
  const diff = TARGET - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days:    Math.floor(diff / 86400000),
    hours:   Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000)  / 60000),
    seconds: Math.floor((diff % 60000)    / 1000),
  };
}

/* ─── Countdown ─── */
function Countdown() {
  const [time, setTime] = useState(getTimeLeft);
  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div style={{ display: 'flex', gap: '1.25rem', justifyContent: 'center', flexWrap: 'wrap' }}>
      {['DAYS','HOURS','MINUTES','SECONDS'].map((u) => (
        <div key={u} style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.75), rgba(255,180,200,0.5))',
          border: '2px solid rgba(220,50,100,0.35)',
          borderRadius: 18,
          padding: '1.5rem 2rem',
          textAlign: 'center',
          minWidth: 105,
          boxShadow: '0 8px 32px rgba(220,50,100,0.15), inset 0 1px 0 rgba(255,255,255,0.7)',
        }}>
          <div style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '2.8rem', fontWeight: 900, color: '#c0003c', lineHeight: 1 }}>
            {String(time[u.toLowerCase()]).padStart(2, '0')}
          </div>
          <div style={{ fontFamily: SERIF, fontSize: '0.75rem', letterSpacing: '2px', color: '#c0003c', marginTop: '0.5rem', fontWeight: 700 }}>
            {u}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─── Hero ─── */
function HeroPink() {
  const [current, setCurrent] = useState(0);
  const next = useCallback(() => setCurrent((p) => (p + 1) % HERO_SLIDES.length), []);
  useEffect(() => {
    const id = setInterval(next, 6500);
    return () => clearInterval(id);
  }, [next]);

  return (
    <section style={{ position: 'relative', height: '100vh', overflow: 'hidden', minHeight: 600 }}>
      {HERO_SLIDES.map((src, i) => (
        <div key={src} style={{
          position: 'absolute', inset: 0,
          backgroundImage: `url(${src})`,
          backgroundSize: 'cover', backgroundPosition: 'center',
          opacity: i === current ? 1 : 0,
          transition: 'opacity 1.2s ease',
        }} />
      ))}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(160deg, rgba(255,100,150,0.55) 0%, rgba(255,20,80,0.3) 40%, rgba(180,0,60,0.45) 100%)' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 40%, rgba(255,220,235,0.15) 80%, #fff0f5 100%)' }} />

      <div style={{ position: 'relative', zIndex: 2, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '6rem 2rem 4rem' }}>
        <div style={{ display: 'inline-block', background: 'rgba(255,255,255,0.25)', backdropFilter: 'blur(12px)', border: '1.5px solid rgba(255,255,255,0.5)', borderRadius: 40, padding: '0.5rem 1.6rem', fontFamily: SERIF, fontSize: '1rem', letterSpacing: '2px', color: '#fff', marginBottom: '1.5rem', fontWeight: 700 }}>
          🌸 FIRST GLOBAL CHALLENGE 2026 🌸
        </div>
        <h1 style={{ fontFamily: SERIF, fontSize: 'clamp(1.8rem, 5vw, 4rem)', fontWeight: 900, lineHeight: 1.1, marginBottom: '1rem', textShadow: '0 4px 24px rgba(180,0,60,0.4)', color: '#fff', letterSpacing: '0.02em', whiteSpace: 'nowrap' }}>
          Team United States of America
        </h1>
        <p style={{ fontFamily: SANS, fontSize: 'clamp(1.1rem, 2.2vw, 1.4rem)', color: 'rgba(255,255,255,0.93)', maxWidth: 620, lineHeight: 1.7, fontWeight: 500, textShadow: '0 2px 8px rgba(0,0,0,0.3)', marginBottom: '1.25rem', fontStyle: 'italic' }}>
          Representing 5,000+ USA teams at the FIRST Global Challenge in Incheon, South Korea this October 2026.
        </p>
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          {['🌸 DC Region', '🤖 FTC #6417', '🇰🇷 Incheon 2026', '🏆 Goodall Inspire 1'].map((t) => (
            <span key={t} style={{ fontFamily: SERIF, background: 'rgba(255,255,255,0.22)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.4)', borderRadius: 20, padding: '0.4rem 1rem', fontSize: '0.95rem', color: '#fff', fontWeight: 600 }}>{t}</span>
          ))}
        </div>
      </div>

      <div style={{ position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '0.5rem', zIndex: 3 }}>
        {HERO_SLIDES.map((_, i) => (
          <button key={i} onClick={() => setCurrent(i)} aria-label={`Slide ${i + 1}`}
            style={{ width: i === current ? 28 : 10, height: 10, borderRadius: 5, border: 'none', background: i === current ? '#fff' : 'rgba(255,255,255,0.45)', cursor: 'pointer', transition: 'all 0.3s', padding: 0 }} />
        ))}
      </div>
    </section>
  );
}

/* ─── Background Flower Scatter ─── */

const BG_FLOWERS = [
  { x:3,  y:4,  r:22, rot:20,  op:0.5  },
  { x:90, y:3,  r:26, rot:-15, op:0.55 },
  { x:7,  y:18, r:16, rot:45,  op:0.4  },
  { x:94, y:20, r:18, rot:-30, op:0.42 },
  { x:2,  y:38, r:20, rot:10,  op:0.48 },
  { x:96, y:40, r:16, rot:60,  op:0.4  },
  { x:5,  y:58, r:18, rot:-20, op:0.45 },
  { x:93, y:60, r:22, rot:35,  op:0.48 },
  { x:3,  y:76, r:16, rot:50,  op:0.42 },
  { x:91, y:78, r:20, rot:-40, op:0.45 },
  { x:6,  y:92, r:24, rot:25,  op:0.5  },
  { x:89, y:90, r:18, rot:-55, op:0.45 },
  { x:22, y:8,  r:13, rot:55,  op:0.35 },
  { x:76, y:6,  r:15, rot:-40, op:0.38 },
  { x:38, y:2,  r:12, rot:30,  op:0.32 },
  { x:60, y:1,  r:14, rot:-50, op:0.35 },
  { x:18, y:50, r:11, rot:70,  op:0.3  },
  { x:82, y:48, r:13, rot:-25, op:0.32 },
  { x:45, y:12, r:16, rot:15,  op:0.38 },
  { x:28, y:72, r:12, rot:-60, op:0.33 },
  { x:70, y:70, r:14, rot:40,  op:0.36 },
  { x:50, y:85, r:15, rot:-15, op:0.4  },
  { x:55, y:55, r:11, rot:80,  op:0.28 },
  { x:32, y:30, r:10, rot:-70, op:0.28 },
  { x:68, y:28, r:12, rot:65,  op:0.3  },
  { x:14, y:84, r:14, rot:-35, op:0.38 },
  { x:85, y:85, r:12, rot:20,  op:0.35 },
  { x:42, y:45, r:10, rot:-45, op:0.25 },
  { x:75, y:92, r:16, rot:30,  op:0.4  },
  { x:25, y:95, r:13, rot:-20, op:0.38 },
];

function BackgroundFlowers() {
  return (
    <div style={{ position:'fixed', inset:0, pointerEvents:'none', zIndex:3, overflow:'hidden' }}>
      {BG_FLOWERS.map((f, i) => {
        const tip = -f.r, wc = f.r * 0.52;
        const p = `M 0 0 C ${-wc} ${f.r * -0.12} ${-wc} ${tip * 0.88} 0 ${tip} C ${wc} ${tip * 0.88} ${wc} ${f.r * -0.12} 0 0`;
        const cx = f.r * 1.6, cy = f.r * 1.6;
        return (
          <div key={i} style={{ position:'absolute', left:`${f.x}%`, top:`${f.y}%`, opacity:f.op }}>
            <svg width={f.r * 3.2} height={f.r * 3.2} viewBox={`0 0 ${f.r * 3.2} ${f.r * 3.2}`} xmlns="http://www.w3.org/2000/svg">
              <g transform={`translate(${cx},${cy})`}>
                {[0,72,144,216,288].map(a => (
                  <path key={a} d={p} transform={`rotate(${a + f.rot})`} fill="#FFB8D4" stroke="#F07098" strokeWidth="0.5" opacity="0.88"/>
                ))}
                {[18,90,162,234,306].map(a => {
                  const rad = (a + f.rot) * Math.PI / 180;
                  return (
                    <g key={a}>
                      <line x1={0} y1={0} x2={f.r*0.42*Math.sin(rad)} y2={-f.r*0.42*Math.cos(rad)} stroke="#C45070" strokeWidth="0.7" opacity="0.5"/>
                      <circle cx={f.r*0.44*Math.sin(rad)} cy={-f.r*0.44*Math.cos(rad)} r="1.2" fill="#EEC030" opacity="0.9"/>
                    </g>
                  );
                })}
                <circle r={f.r * 0.21} fill="#FFE0A0" opacity="0.9"/>
              </g>
            </svg>
          </div>
        );
      })}
    </div>
  );
}

/* ─── Falling Petals ─── */
function FallingPetals() {
  const ref = useRef(null);
  useEffect(() => {
    const container = ref.current;
    if (!container) return;
    const els = [];
    for (let i = 0; i < 35; i++) {
      const el = document.createElement('div');
      const size = 16 + Math.random() * 22;
      const colors = ['#FFB7D5','#FF8CB4','#FFC8DC','#FFD6E7','#FF6BA3'];
      const c = colors[Math.floor(Math.random() * colors.length)];
      el.style.cssText = `position:fixed;top:-50px;left:${Math.random()*100}%;width:${size}px;height:${size}px;pointer-events:none;z-index:9998;animation:petalFall ${10+Math.random()*12}s ${-(Math.random()*20)}s linear infinite;`;
      el.innerHTML = `<svg viewBox="0 0 40 40"><g>${[0,72,144,216,288].map(a=>{const r=(a*Math.PI/180);const px=20+11*Math.cos(r);const py=20+11*Math.sin(r);return `<ellipse cx="${px}" cy="${py}" rx="8" ry="5" transform="rotate(${a},${px},${py})" fill="${c}" opacity="0.85"/>`;}).join('')}<circle cx="20" cy="20" r="3.5" fill="#FFE566" opacity="0.9"/></g></svg>`;
      container.appendChild(el);
      els.push(el);
    }
    return () => els.forEach((e) => e.remove());
  }, []);
  return (
    <>
      <style>{`@keyframes petalFall{0%{transform:translateY(0) rotate(0deg) translateX(0);opacity:0}6%{opacity:0.85}50%{transform:translateY(50vh) rotate(180deg) translateX(30px)}94%{opacity:0.6}100%{transform:translateY(110vh) rotate(360deg) translateX(-20px);opacity:0}}`}</style>
      <div ref={ref} />
    </>
  );
}

/* ─── Constellations ─── */
function Constellations() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener('resize', resize);
    const stars = Array.from({ length: 90 }, () => ({ x: Math.random()*window.innerWidth, y: Math.random()*window.innerHeight, r: 0.8+Math.random()*2, vx: (Math.random()-0.5)*0.18, vy: (Math.random()-0.5)*0.18, pulse: Math.random()*Math.PI*2 }));
    let raf;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach((s) => {
        s.x+=s.vx; s.y+=s.vy; s.pulse+=0.02;
        if(s.x<0)s.x=canvas.width; if(s.x>canvas.width)s.x=0;
        if(s.y<0)s.y=canvas.height; if(s.y>canvas.height)s.y=0;
        ctx.beginPath(); ctx.arc(s.x,s.y,s.r,0,Math.PI*2);
        ctx.fillStyle=`rgba(255,140,180,${0.5+0.4*Math.sin(s.pulse)})`; ctx.fill();
      });
      for(let i=0;i<stars.length;i++) for(let j=i+1;j<stars.length;j++){
        const dx=stars[i].x-stars[j].x, dy=stars[i].y-stars[j].y, dist=Math.sqrt(dx*dx+dy*dy);
        if(dist<120){ctx.beginPath();ctx.moveTo(stars[i].x,stars[i].y);ctx.lineTo(stars[j].x,stars[j].y);ctx.strokeStyle=`rgba(255,140,180,${0.22*(1-dist/120)})`;ctx.lineWidth=0.7;ctx.stroke();}
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, []);
  return <canvas ref={canvasRef} style={{ position:'fixed', inset:0, pointerEvents:'none', zIndex:0, opacity:0.7 }} />;
}

/* ─── Flag Cursor ─── */
function FlagCursor() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const move = (e) => { el.style.left=`${e.clientX}px`; el.style.top=`${e.clientY}px`; };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);
  return (
    <div ref={ref} style={{ position:'fixed', pointerEvents:'none', zIndex:10000, userSelect:'none', transform:'translate(4px, 4px)' }}>
      {/* gradient pink glow ring */}
      <div style={{
        position:'absolute',
        width:48, height:48,
        borderRadius:'50%',
        background:'radial-gradient(circle, rgba(255,105,180,0.55) 0%, rgba(255,20,120,0.25) 50%, transparent 75%)',
        transform:'translate(-50%,-50%)',
        top:'50%', left:'50%',
        animation:'cursorPulse 1.8s ease-in-out infinite',
      }}/>
      <style>{`@keyframes cursorPulse{0%,100%{transform:translate(-50%,-50%) scale(1);opacity:0.8}50%{transform:translate(-50%,-50%) scale(1.35);opacity:0.5}}`}</style>
      <span style={{ fontSize:'2rem', lineHeight:1, display:'block', filter:'drop-shadow(0 0 6px rgba(255,80,160,0.7))' }}>🇺🇸</span>
    </div>
  );
}

/* ─── Member Card ─── */
function MemberCard({ member }) {
  return (
    <GlowTracker style={{ background:'linear-gradient(160deg, rgba(255,255,255,0.72), rgba(255,200,220,0.55))', border:'2px solid rgba(220,80,130,0.3)', borderRadius:24, padding:'2rem', display:'flex', flexDirection:'column', gap:'1.25rem', boxShadow:'0 12px 40px rgba(220,50,100,0.14), inset 0 1px 0 rgba(255,255,255,0.8)', backdropFilter:'blur(8px)' }}>
      <div style={{ textAlign:'center' }}>
        <div style={{ fontFamily: SERIF, fontSize:'1.2rem', fontWeight:700, color:'#8B003C', marginBottom:'0.3rem' }}>{member.name}</div>
        <div style={{ fontFamily: SERIF, fontSize:'0.82rem', letterSpacing:'1.5px', color:'#c0406a', textTransform:'uppercase', fontWeight:600 }}>{member.role}</div>
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0.6rem' }}>
        {[0,1,2,3].map((i) => (
          <div key={i} style={{ aspectRatio:'1', borderRadius:12, overflow:'hidden', border:'1.5px solid rgba(220,80,130,0.25)', background:'rgba(255,180,210,0.18)', display:'flex', alignItems:'center', justifyContent:'center' }}>
            {i===0&&member.image ? <img src={member.image} alt={member.name} style={{ width:'100%', height:'100%', objectFit:'cover' }}/> : <span style={{ fontSize:'1.4rem', opacity:0.35 }}>🌸</span>}
          </div>
        ))}
      </div>
      <div style={{ background:'rgba(255,180,210,0.15)', borderRadius:10, padding:'0.9rem', border:'1px dashed rgba(220,80,130,0.22)' }}>
        {[1,2,3,4].map((n) => (
          <div key={n} style={{ height:9, borderRadius:4, background:'rgba(200,50,100,0.13)', marginBottom:n<4?'0.55rem':0, width:n===4?'55%':'100%' }}/>
        ))}
      </div>
    </GlowTracker>
  );
}

/* ─── Mentor Card ─── */
function MentorCard({ mentor }) {
  return (
    <GlowTracker style={{ background:'linear-gradient(160deg, rgba(255,255,255,0.8), rgba(255,210,230,0.6))', border:'2px solid rgba(220,80,130,0.28)', borderRadius:22, padding:'2rem', display:'flex', flexDirection:'column', alignItems:'center', gap:'1rem', textAlign:'center', boxShadow:'0 10px 36px rgba(220,50,100,0.12)', backdropFilter:'blur(8px)' }}>
      <div style={{ width:110, height:110, borderRadius:'50%', overflow:'hidden', border:'3px solid rgba(220,80,130,0.4)', boxShadow:'0 4px 20px rgba(220,50,100,0.2)', flexShrink:0 }}>
        {mentor.image
          ? <img src={mentor.image} alt={mentor.name} style={{ width:'100%', height:'100%', objectFit:'cover' }}/>
          : <div style={{ width:'100%', height:'100%', background:'rgba(255,180,210,0.3)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'2.5rem' }}>🌸</div>}
      </div>
      <div>
        <div style={{ fontFamily: SERIF, fontSize:'1.3rem', fontWeight:700, color:'#8B003C', marginBottom:'0.2rem' }}>{mentor.name}</div>
        <div style={{ fontFamily: SERIF, fontSize:'0.9rem', color:'#c0406a', fontWeight:600, marginBottom:'0.15rem' }}>{mentor.title}</div>
        <div style={{ fontFamily: SERIF, fontSize:'0.85rem', color:'#6a2040', marginBottom:'0.15rem' }}>{mentor.affiliation}</div>
        <div style={{ display:'inline-block', background:'rgba(192,64,106,0.12)', border:'1px solid rgba(192,64,106,0.25)', borderRadius:20, padding:'0.2rem 0.75rem', fontSize:'0.75rem', color:'#c0406a', fontFamily: SERIF, fontWeight:600, marginBottom:'0.5rem' }}>
          {mentor.type}
        </div>
        <div>
          <a href={`mailto:${mentor.email}`} style={{ fontFamily: SERIF, fontSize:'0.85rem', color:'#c0003c', textDecoration:'none', fontStyle:'italic', borderBottom:'1px dotted rgba(192,0,60,0.4)' }}>
            {mentor.email}
          </a>
        </div>
      </div>
    </GlowTracker>
  );
}

/* ─── Page ─── */
export default function TeamUSA() {
  useScrollAnimations();

  const sec = { position:'relative', zIndex:4 };
  const label = { fontFamily: SERIF, fontSize:'0.85rem', letterSpacing:'3px', color:'#c0406a', textTransform:'uppercase', display:'block', marginBottom:'0.5rem', fontWeight:700 };
  const h2 = { fontFamily: SERIF, fontSize:'clamp(2rem, 4vw, 3rem)', fontWeight:800, color:'#7a002e', letterSpacing:'0.01em' };

  return (
    <div style={{ background:'#fff0f5', minHeight:'100vh', color:'#3a001a' }}>
      <FallingPetals />
      <FlagCursor />
      <Constellations />
      <BackgroundFlowers />

      {/* HERO */}
      <div style={{ position:'relative', zIndex:1 }}><HeroPink /></div>

      {/* COUNTDOWN */}
      <section style={{ ...sec, padding:'6rem 2rem 5rem', textAlign:'center', background:'linear-gradient(180deg,#ffe0ee,#fff0f7)' }}>
        <span style={label}>Competition Begins</span>
        <h2 style={{ ...h2, marginBottom:'0.4rem' }}>October 7, 2026</h2>
        <p style={{ fontFamily:SERIF, color:'#c0406a', marginBottom:'2.5rem', fontWeight:600, fontSize:'1.15rem', fontStyle:'italic' }}>Incheon, South Korea 🇰🇷</p>
        <Countdown />
      </section>

      {/* ABOUT FGC */}
      <section style={{ ...sec, padding:'5rem 2rem', background:'linear-gradient(180deg,#fff0f7,#ffe8f2)' }}>
        <div style={{ maxWidth:1100, margin:'0 auto' }}>
          <div style={{ textAlign:'center', marginBottom:'3rem' }}>
            <span style={label}>The Competition</span>
            <h2 style={h2}>About FIRST GLOBAL</h2>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(280px, 1fr))', gap:'1.5rem', position:'relative', zIndex:1 }}>
            {[
              { icon:'🌍', title:'A Global Robotics Olympiad', body:"FIRST GLOBAL is an international robotics challenge where student teams from 190+ nations come together to take on one of humanity's biggest engineering problems. It's basically the Olympics of robotics, and teams from every corner of the world show up." },
              { icon:'🇰🇷', title:'South Korea, Fall 2026', body:"The 2026 FIRST GLOBAL Challenge is happening in Incheon, South Korea this fall. It's a massive gathering where teams from all over the world come together to compete, collaborate, and make some unforgettable memories along the way." },
              { icon:'🌸', title:'Representing 5,000+ USA Teams', body:"We were selected to represent the United States from among 5,000+ American FIRST teams, and we're bringing the cherry blossom spirit of the DC region all the way to Incheon. Our passion for creative robotics and community impact is going global." },
            ].map(({ icon, title, body }) => (
              <GlowTracker key={title} style={{ background:'linear-gradient(160deg, rgba(255,255,255,0.85), rgba(255,200,225,0.6))', border:'1.5px solid rgba(220,80,130,0.28)', borderRadius:22, padding:'2rem', boxShadow:'0 8px 32px rgba(220,50,100,0.1)', position:'relative', zIndex:1 }}>
                <div style={{ fontSize:'2.2rem', marginBottom:'0.9rem' }}>{icon}</div>
                <h3 style={{ fontFamily:SERIF, fontSize:'1.15rem', fontWeight:700, color:'#8B003C', marginBottom:'0.75rem' }}>{title}</h3>
                <p style={{ fontFamily:SANS, color:'#6a2040', lineHeight:1.85, fontSize:'1rem', fontStyle:'italic' }}>{body}</p>
              </GlowTracker>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM MEMBERS */}
      <section style={{ ...sec, padding:'5rem 2rem', background:'linear-gradient(180deg,#ffe8f2,#ffd6e8)' }}>
        <div style={{ maxWidth:1200, margin:'0 auto', position:'relative', zIndex:1 }}>
          <div style={{ textAlign:'center', marginBottom:'3rem' }}>
            <span style={label}>The Roster</span>
            <h2 style={h2}>Team USA Members</h2>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(310px, 1fr))', gap:'2rem' }}>
            {TEAM_MEMBERS.map((m) => <MemberCard key={m.name} member={m}/>)}
          </div>
        </div>
      </section>

      {/* MENTORS */}
      <section style={{ ...sec, padding:'5rem 2rem', background:'linear-gradient(180deg,#ffd6e8,#ffcce0)' }}>
        <div style={{ maxWidth:1100, margin:'0 auto', position:'relative', zIndex:1 }}>
          <div style={{ textAlign:'center', marginBottom:'3rem' }}>
            <span style={label}>Our Guides</span>
            <h2 style={h2}>Mentors</h2>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(240px, 1fr))', gap:'1.75rem' }}>
            {MENTORS.map((m) => <MentorCard key={m.name} mentor={m}/>)}
          </div>
        </div>
      </section>

      {/* TEAM BIO */}
      <section style={{ ...sec, padding:'5rem 2rem', background:'linear-gradient(180deg,#ffcce0,#ffbcd6)' }}>
        <div style={{ maxWidth:860, margin:'0 auto', textAlign:'center', position:'relative', zIndex:1 }}>
          <span style={label}>Our Story</span>
          <h2 style={{ ...h2, marginBottom:'2rem' }}>Blu Cru Goes Global 🌏</h2>
          <GlowTracker style={{ background:'linear-gradient(160deg, rgba(255,255,255,0.8), rgba(255,200,225,0.6))', border:'2px solid rgba(220,80,130,0.3)', borderRadius:26, padding:'2.5rem', textAlign:'left', lineHeight:1.9, fontSize:'1.08rem', color:'#5a1530', boxShadow:'0 16px 48px rgba(220,50,100,0.15)', position:'relative', zIndex:1, fontFamily:SANS, fontStyle:'italic' }}>
            <p style={{ marginBottom:'1.25rem' }}>
              Blu Cru is a community-based FIRST Tech Challenge team operating out of Explorer Post 1010 at the Rockville Science Center in Maryland. We've spent years competing, building robots, and doing outreach in underserved communities. Now we're taking it to the world stage.
            </p>
            <p style={{ marginBottom:'1.25rem' }}>
              This past season we won the Goodall Inspire Award at the FIRST World Championship, which put us among the very top teams globally. That's what got us here, representing 5,000+ American FIRST teams at FGC. We don't take that lightly at all.
            </p>
            <p style={{ marginBottom:'1.25rem' }}>
              The DC cherry blossoms are kind of our thing. We're a Maryland team through and through, and we're bringing that energy, that creativity, and that heart with us to Incheon this fall.
            </p>
            <p style={{ fontWeight:700, fontStyle:'normal', color:'#8B003C', fontFamily:SERIF }}>
              We genuinely cannot wait to connect with teams from all over the globe, trade stories, and see what everyone has been building. See you in Incheon! 🇺🇸🌸🇰🇷
            </p>
          </GlowTracker>
        </div>
      </section>

      {/* CONTACT BOX */}
      <section style={{ ...sec, padding:'5rem 2rem', background:'linear-gradient(135deg,#ff6b9d,#c0003c,#ff6b9d)', textAlign:'center' }}>
        <div style={{ maxWidth:700, margin:'0 auto' }}>
          <div style={{ fontSize:'2.5rem', marginBottom:'1rem' }}>🌸 🤝 🌏</div>
          <h2 style={{ fontFamily:SERIF, fontSize:'clamp(1.8rem,4vw,2.8rem)', fontWeight:800, color:'#fff', marginBottom:'0.75rem', letterSpacing:'0.01em', textShadow:'0 2px 12px rgba(0,0,0,0.2)' }}>
            Connect with Blu Cru at FGC!
          </h2>
          <p style={{ fontFamily:SANS, color:'rgba(255,255,255,0.9)', fontSize:'1.15rem', lineHeight:1.75, marginBottom:'2rem', fontStyle:'italic' }}>
            Are you a FIRST GLOBAL team heading to Incheon? We would love to meet you, exchange pins, and connect before and during the challenge. Send us an email and let's make it happen!
          </p>
          <a href="mailto:blucru6417@gmail.com" style={{
            display:'inline-block',
            background:'rgba(255,255,255,0.95)',
            color:'#c0003c',
            fontFamily:SERIF,
            fontSize:'1.1rem',
            fontWeight:700,
            padding:'1rem 2.5rem',
            borderRadius:50,
            textDecoration:'none',
            boxShadow:'0 8px 32px rgba(0,0,0,0.2)',
            letterSpacing:'0.5px',
            transition:'transform 0.2s',
          }}>
            ✉️ &nbsp;blucru6417@gmail.com
          </a>
          <p style={{ fontFamily:SERIF, color:'rgba(255,255,255,0.7)', marginTop:'1.25rem', fontSize:'0.9rem' }}>
            FTC Team #6417 · Rockville, Maryland · FIRST GLOBAL 2026
          </p>
        </div>
      </section>
    </div>
  );
}
