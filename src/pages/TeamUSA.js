import React, { useState, useEffect, useRef, useCallback } from 'react';
import GlowTracker from '../components/GlowTracker';
import useScrollAnimations from '../components/useScrollAnimations';

/* ─── constants outside component to avoid re-renders ─── */
const TARGET = new Date('2026-10-07T00:00:00');

const TEAM_MEMBERS = [
  { name: 'Deven B',   role: 'Tele-Op',       image: '/devenb.png'   },
  { name: 'Kathy Z',   role: 'Manufacturing', image: '/kathyz.png'   },
  { name: 'Amber W',   role: 'CAD',           image: '/amberw.png'   },
  { name: 'Michael D', role: 'Autonomous',    image: '/michaeld.png' },
  { name: 'Michael J', role: 'CAD',           image: '/michaelj.png' },
  { name: 'Thomas Y',  role: 'Electrical',    image: '/thomasy.png'  },
];

const HERO_SLIDES = [
  '/fullgroupawdphoto.jpg',
  '/statepplgroup.jpg',
  '/hardatwork.jpg',
  '/Goingtofield.jpg',
  '/lockedtfin.png',
  '/wowie.png',
];

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
          background: 'linear-gradient(135deg, rgba(255,255,255,0.55), rgba(255,180,200,0.4))',
          border: '2.5px solid rgba(220,50,100,0.4)',
          borderRadius: 18,
          padding: '1.5rem 2rem',
          textAlign: 'center',
          minWidth: 100,
          boxShadow: '0 8px 32px rgba(220,50,100,0.18), inset 0 1px 0 rgba(255,255,255,0.6)',
        }}>
          <div style={{
            fontFamily: "'Orbitron', sans-serif",
            fontSize: '2.8rem',
            fontWeight: 900,
            color: '#c0003c',
            lineHeight: 1,
            textShadow: '0 2px 8px rgba(200,0,60,0.25)',
          }}>
            {String(time[u.toLowerCase()]).padStart(2, '0')}
          </div>
          <div style={{
            fontSize: '0.65rem',
            letterSpacing: '2.5px',
            color: '#c0003c',
            marginTop: '0.5rem',
            fontWeight: 800,
          }}>
            {u}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─── Hero Slideshow (custom pink variant) ─── */
function HeroPink() {
  const [current, setCurrent] = useState(0);
  const next = useCallback(() => setCurrent((p) => (p + 1) % HERO_SLIDES.length), []);

  useEffect(() => {
    const id = setInterval(next, 6500);
    return () => clearInterval(id);
  }, [next]);

  return (
    <section style={{ position: 'relative', height: '100vh', overflow: 'hidden', minHeight: 600 }}>
      {/* slides */}
      {HERO_SLIDES.map((src, i) => (
        <div key={src} style={{
          position: 'absolute', inset: 0,
          backgroundImage: `url(${src})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: i === current ? 1 : 0,
          transition: 'opacity 1.2s ease',
        }} />
      ))}

      {/* bright pink tint overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(160deg, rgba(255,100,150,0.55) 0%, rgba(255,20,80,0.3) 40%, rgba(180,0,60,0.45) 100%)',
      }} />
      {/* bottom fade */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to bottom, transparent 40%, rgba(255,220,235,0.15) 80%, #fff0f5 100%)',
      }} />

      {/* content */}
      <div style={{
        position: 'relative', zIndex: 2,
        height: '100%',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        textAlign: 'center',
        padding: '6rem 2rem 4rem',
      }}>
        <div style={{
          display: 'inline-block',
          background: 'rgba(255,255,255,0.25)',
          backdropFilter: 'blur(12px)',
          border: '1.5px solid rgba(255,255,255,0.5)',
          borderRadius: 40,
          padding: '0.45rem 1.6rem',
          fontSize: '0.75rem',
          fontFamily: "'Orbitron', sans-serif",
          letterSpacing: '3px',
          color: '#fff',
          marginBottom: '1.5rem',
          fontWeight: 700,
        }}>
          🌸 FIRST GLOBAL CHALLENGE 2026 🌸
        </div>

        <div style={{ fontSize: '4rem', marginBottom: '0.25rem', lineHeight: 1 }}>🇺🇸</div>

        <h1 style={{
          fontFamily: "'Orbitron', sans-serif",
          fontSize: 'clamp(3rem, 9vw, 7rem)',
          fontWeight: 900,
          lineHeight: 1,
          marginBottom: '1rem',
          textShadow: '0 4px 24px rgba(180,0,60,0.4)',
        }}>
          <span style={{ color: '#fff' }}>TEAM </span>
          <span style={{ color: '#ffe0ea' }}>USA</span>
        </h1>

        <p style={{
          fontSize: 'clamp(1rem, 2vw, 1.25rem)',
          color: 'rgba(255,255,255,0.92)',
          maxWidth: 620,
          lineHeight: 1.7,
          fontWeight: 500,
          textShadow: '0 2px 8px rgba(0,0,0,0.3)',
          marginBottom: '1rem',
        }}>
          Representing 5,000+ USA teams at the FIRST Global Challenge — Seoul, South Korea, October 2026.
        </p>

        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          {['🌸 DC Region', '🤖 FTC #6417', '🇰🇷 Seoul 2026', '🏆 Goodall Inspire 1'].map((t) => (
            <span key={t} style={{
              background: 'rgba(255,255,255,0.22)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255,255,255,0.4)',
              borderRadius: 20,
              padding: '0.4rem 1rem',
              fontSize: '0.82rem',
              color: '#fff',
              fontWeight: 600,
            }}>{t}</span>
          ))}
        </div>
      </div>

      {/* slide dots */}
      <div style={{
        position: 'absolute', bottom: '2rem', left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex', gap: '0.5rem', zIndex: 3,
      }}>
        {HERO_SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Slide ${i + 1}`}
            style={{
              width: i === current ? 28 : 10,
              height: 10,
              borderRadius: 5,
              border: 'none',
              background: i === current ? '#fff' : 'rgba(255,255,255,0.45)',
              cursor: 'pointer',
              transition: 'all 0.3s',
              padding: 0,
            }}
          />
        ))}
      </div>
    </section>
  );
}

/* ─── Cherry Blossom Branch SVG ─── */
function BlossomBranch({ flip = false, style = {} }) {
  return (
    <svg
      viewBox="0 0 320 480"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        position: 'absolute',
        width: 260,
        opacity: 0.92,
        pointerEvents: 'none',
        transform: flip ? 'scaleX(-1)' : 'none',
        ...style,
      }}
    >
      {/* Main branch */}
      <path d="M30 480 Q80 360 120 280 Q150 220 180 160 Q200 110 210 60"
        stroke="#8B4A6B" strokeWidth="7" fill="none" strokeLinecap="round"/>
      {/* Sub-branch 1 */}
      <path d="M90 370 Q130 330 160 290 Q185 260 200 230"
        stroke="#8B4A6B" strokeWidth="4.5" fill="none" strokeLinecap="round"/>
      {/* Sub-branch 2 */}
      <path d="M140 290 Q170 250 190 200"
        stroke="#8B4A6B" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
      {/* Sub-branch 3 */}
      <path d="M165 230 Q195 210 220 180"
        stroke="#9B5A7B" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      {/* Sub-branch 4 */}
      <path d="M185 165 Q205 145 230 120 Q250 100 260 70"
        stroke="#9B5A7B" strokeWidth="2.5" fill="none" strokeLinecap="round"/>

      {/* Blossoms — each is 5 petals around a center */}
      {[
        [200, 230, 18],
        [190, 200, 16],
        [165, 248, 15],
        [215, 180, 20],
        [260, 70,  22],
        [240, 120, 17],
        [220, 155, 15],
        [155, 292, 14],
        [205, 100, 18],
        [195, 65,  16],
        [170, 170, 13],
        [145, 220, 16],
        [100, 330, 14],
        [130, 300, 12],
        [175, 135, 14],
        [230, 90,  13],
      ].map(([cx, cy, r], idx) => (
        <g key={idx}>
          {[0,72,144,216,288].map((angle) => {
            const rad = (angle * Math.PI) / 180;
            const px = cx + r * 0.85 * Math.cos(rad);
            const py = cy + r * 0.85 * Math.sin(rad);
            return (
              <ellipse
                key={angle}
                cx={px} cy={py}
                rx={r * 0.65} ry={r * 0.42}
                transform={`rotate(${angle},${px},${py})`}
                fill={idx % 3 === 0 ? '#FFB7D5' : idx % 3 === 1 ? '#FF8CB4' : '#FFC8DC'}
                opacity="0.95"
              />
            );
          })}
          <circle cx={cx} cy={cy} r={r * 0.28} fill="#FFE566" opacity="0.9"/>
        </g>
      ))}
    </svg>
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
      el.style.cssText = `
        position:fixed;top:-50px;
        left:${Math.random()*100}%;
        width:${size}px;height:${size}px;
        pointer-events:none;z-index:9998;
        animation:petalFall ${10+Math.random()*12}s ${-(Math.random()*20)}s linear infinite;
      `;
      el.innerHTML = `<svg viewBox="0 0 40 40"><g>${
        [0,72,144,216,288].map(a=>{
          const r=(a*Math.PI/180);
          const px=20+11*Math.cos(r);const py=20+11*Math.sin(r);
          return `<ellipse cx="${px}" cy="${py}" rx="8" ry="5"
            transform="rotate(${a},${px},${py})" fill="${c}" opacity="0.85"/>`;
        }).join('')
      }<circle cx="20" cy="20" r="3.5" fill="#FFE566" opacity="0.9"/></g></svg>`;
      container.appendChild(el);
      els.push(el);
    }
    return () => els.forEach((e) => e.remove());
  }, []);

  return (
    <>
      <style>{`
        @keyframes petalFall {
          0%   { transform:translateY(0) rotate(0deg) translateX(0);   opacity:0; }
          6%   { opacity:0.85; }
          50%  { transform:translateY(50vh) rotate(180deg) translateX(30px); }
          94%  { opacity:0.6; }
          100% { transform:translateY(110vh) rotate(360deg) translateX(-20px); opacity:0; }
        }
      `}</style>
      <div ref={ref} />
    </>
  );
}

/* ─── Constellation Background ─── */
function Constellations() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const stars = Array.from({ length: 90 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: 0.8 + Math.random() * 2,
      vx: (Math.random() - 0.5) * 0.18,
      vy: (Math.random() - 0.5) * 0.18,
      pulse: Math.random() * Math.PI * 2,
    }));

    let raf;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      stars.forEach((s) => {
        s.x += s.vx; s.y += s.vy; s.pulse += 0.02;
        if (s.x < 0) s.x = canvas.width;
        if (s.x > canvas.width) s.x = 0;
        if (s.y < 0) s.y = canvas.height;
        if (s.y > canvas.height) s.y = 0;

        const alpha = 0.5 + 0.4 * Math.sin(s.pulse);
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,140,180,${alpha})`;
        ctx.fill();
      });

      for (let i = 0; i < stars.length; i++) {
        for (let j = i + 1; j < stars.length; j++) {
          const dx = stars[i].x - stars[j].x;
          const dy = stars[i].y - stars[j].y;
          const dist = Math.sqrt(dx*dx + dy*dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(stars[i].x, stars[i].y);
            ctx.lineTo(stars[j].x, stars[j].y);
            ctx.strokeStyle = `rgba(255,140,180,${0.22 * (1 - dist/120)})`;
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }
      }

      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed', inset: 0,
        pointerEvents: 'none',
        zIndex: 0,
        opacity: 0.7,
      }}
    />
  );
}

/* ─── Flag cursor trail ─── */
function FlagCursor() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const move = (e) => {
      el.style.left = `${e.clientX + 14}px`;
      el.style.top  = `${e.clientY + 14}px`;
    };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);

  return (
    <div ref={ref} style={{
      position: 'fixed',
      fontSize: '1.2rem',
      pointerEvents: 'none',
      zIndex: 10000,
      userSelect: 'none',
      lineHeight: 1,
    }}>
      🇺🇸
    </div>
  );
}

/* ─── Member Card ─── */
function MemberCard({ member }) {
  return (
    <GlowTracker style={{
      background: 'linear-gradient(160deg, rgba(255,255,255,0.72), rgba(255,200,220,0.55))',
      border: '2px solid rgba(220,80,130,0.3)',
      borderRadius: 24,
      padding: '2rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '1.25rem',
      boxShadow: '0 12px 40px rgba(220,50,100,0.14), inset 0 1px 0 rgba(255,255,255,0.8)',
      backdropFilter: 'blur(8px)',
    }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{
          fontFamily: "'Orbitron', sans-serif",
          fontSize: '1.05rem',
          fontWeight: 800,
          color: '#8B003C',
          marginBottom: '0.3rem',
        }}>{member.name}</div>
        <div style={{
          fontSize: '0.72rem',
          letterSpacing: '2px',
          color: '#c0406a',
          textTransform: 'uppercase',
          fontWeight: 700,
        }}>{member.role}</div>
      </div>

      {/* 2×2 photo grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem' }}>
        {[0,1,2,3].map((i) => (
          <div key={i} style={{
            aspectRatio: '1',
            borderRadius: 12,
            overflow: 'hidden',
            border: '1.5px solid rgba(220,80,130,0.25)',
            background: 'rgba(255,180,210,0.18)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            {i === 0 && member.image ? (
              <img
                src={member.image}
                alt={member.name}
                style={{ width:'100%', height:'100%', objectFit:'cover' }}
              />
            ) : (
              <span style={{ fontSize: '1.4rem', opacity: 0.35 }}>🌸</span>
            )}
          </div>
        ))}
      </div>

      {/* blurb placeholder lines */}
      <div style={{
        background: 'rgba(255,180,210,0.15)',
        borderRadius: 10,
        padding: '0.9rem',
        border: '1px dashed rgba(220,80,130,0.22)',
      }}>
        {[1,2,3,4].map((n) => (
          <div key={n} style={{
            height: 9,
            borderRadius: 4,
            background: 'rgba(200,50,100,0.13)',
            marginBottom: n < 4 ? '0.55rem' : 0,
            width: n === 4 ? '55%' : '100%',
          }} />
        ))}
      </div>
    </GlowTracker>
  );
}

/* ─── Page ─── */
export default function TeamUSA() {
  useScrollAnimations();

  const sectionStyle = {
    position: 'relative',
    zIndex: 1,
  };

  const labelStyle = {
    fontFamily: "'Orbitron', sans-serif",
    fontSize: '0.7rem',
    letterSpacing: '3px',
    color: '#c0406a',
    textTransform: 'uppercase',
    display: 'block',
    marginBottom: '0.65rem',
    fontWeight: 800,
  };

  const h2Style = {
    fontFamily: "'Orbitron', sans-serif",
    fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)',
    fontWeight: 800,
    color: '#7a002e',
  };

  return (
    <div style={{ background: '#fff0f5', minHeight: '100vh', color: '#3a001a' }}>
      <FallingPetals />
      <FlagCursor />
      <Constellations />

      {/* ── HERO ── */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <HeroPink />
      </div>

      {/* cherry blossom branch decorations */}
      <div style={{ position: 'relative' }}>
        <BlossomBranch style={{ top: 0, left: -30, zIndex: 2 }} />
        <BlossomBranch flip style={{ top: 0, right: -30, zIndex: 2 }} />
      </div>

      {/* ── COUNTDOWN ── */}
      <section style={{ ...sectionStyle, padding: '6rem 2rem 5rem', textAlign: 'center',
        background: 'linear-gradient(180deg, #ffe0ee 0%, #fff0f7 100%)' }}>
        <span style={labelStyle}>COMPETITION BEGINS</span>
        <h2 style={{ ...h2Style, marginBottom: '0.4rem' }}>October 7, 2026</h2>
        <p style={{ color: '#c0406a', marginBottom: '2.5rem', fontWeight: 600, fontSize: '1.05rem' }}>
          Seoul, South Korea 🇰🇷
        </p>
        <Countdown />
      </section>

      {/* ── ABOUT FGC ── */}
      <section style={{ ...sectionStyle, padding: '5rem 2rem',
        background: 'linear-gradient(180deg, #fff0f7 0%, #ffe8f2 100%)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span style={labelStyle}>THE COMPETITION</span>
            <h2 style={h2Style}>About FIRST GLOBAL</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', position: 'relative' }}>
            {/* small branch accent */}
            <div style={{ position: 'absolute', right: -60, top: -40, zIndex: 0 }}>
              <BlossomBranch style={{ width: 180, opacity: 0.5 }} />
            </div>
            {[
              {
                icon: '🌍',
                title: 'A Global Robotics Olympiad',
                body: 'FIRST GLOBAL is an annual international challenge where student teams from 190+ nations compete together to solve one of humanity\'s greatest engineering challenges. It\'s the Olympics of robotics, uniting the next generation of innovators from every corner of the globe.',
              },
              {
                icon: '🇰🇷',
                title: 'South Korea — Fall 2026',
                body: 'The 2026 FIRST GLOBAL Challenge takes place this fall in Seoul, South Korea — a global hub of technology, innovation, and culture. Teams will collaborate, compete, and build friendships that span continents while tackling a shared engineering mission.',
              },
              {
                icon: '🌸',
                title: 'Representing 5,000+ USA Teams',
                body: 'Selected to represent the United States from among 5,000+ American FIRST teams, Blu Cru carries the cherry blossom spirit of Washington DC to Seoul. We bring our passion for creative robotics and community impact to the world stage.',
              },
            ].map(({ icon, title, body }) => (
              <GlowTracker key={title} style={{
                background: 'linear-gradient(160deg, rgba(255,255,255,0.85), rgba(255,200,225,0.6))',
                border: '1.5px solid rgba(220,80,130,0.28)',
                borderRadius: 22,
                padding: '2rem',
                boxShadow: '0 8px 32px rgba(220,50,100,0.1)',
                position: 'relative', zIndex: 1,
              }}>
                <div style={{ fontSize: '2.2rem', marginBottom: '0.9rem' }}>{icon}</div>
                <h3 style={{
                  fontFamily: "'Orbitron', sans-serif",
                  fontSize: '0.92rem',
                  fontWeight: 700,
                  color: '#8B003C',
                  marginBottom: '0.75rem',
                }}>{title}</h3>
                <p style={{ color: '#6a2040', lineHeight: 1.8, fontSize: '0.93rem' }}>{body}</p>
              </GlowTracker>
            ))}
          </div>
        </div>
      </section>

      {/* ── TEAM MEMBERS ── */}
      <section style={{ ...sectionStyle, padding: '5rem 2rem',
        background: 'linear-gradient(180deg, #ffe8f2 0%, #ffd6e8 100%)' }}>
        <div style={{ position: 'absolute', left: -40, top: 40 }}>
          <BlossomBranch style={{ width: 200, opacity: 0.55 }} />
        </div>
        <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span style={labelStyle}>THE ROSTER</span>
            <h2 style={h2Style}>Team USA Members</h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))',
            gap: '2rem',
          }}>
            {TEAM_MEMBERS.map((m) => (
              <MemberCard key={m.name} member={m} />
            ))}
          </div>
        </div>
      </section>

      {/* ── TEAM DESCRIPTION ── */}
      <section style={{ ...sectionStyle, padding: '5rem 2rem',
        background: 'linear-gradient(180deg, #ffd6e8 0%, #ffcce0 100%)' }}>
        <div style={{ maxWidth: 860, margin: '0 auto', textAlign: 'center', position: 'relative' }}>
          <div style={{ position: 'absolute', right: -80, top: -60 }}>
            <BlossomBranch flip style={{ width: 200, opacity: 0.55 }} />
          </div>
          <span style={labelStyle}>OUR STORY</span>
          <h2 style={{ ...h2Style, marginBottom: '2rem' }}>Blu Cru Goes Global 🌏</h2>

          <GlowTracker style={{
            background: 'linear-gradient(160deg, rgba(255,255,255,0.8), rgba(255,200,225,0.6))',
            border: '2px solid rgba(220,80,130,0.3)',
            borderRadius: 26,
            padding: '2.5rem',
            textAlign: 'left',
            lineHeight: 1.85,
            fontSize: '1.04rem',
            color: '#5a1530',
            boxShadow: '0 16px 48px rgba(220,50,100,0.15)',
            position: 'relative', zIndex: 1,
          }}>
            <p style={{ marginBottom: '1.25rem' }}>
              Blu Cru is a community-based FIRST Tech Challenge robotics team based at Explorer Post 1010
              at the Rockville Science Center in Maryland. We've spent years competing, innovating, and
              reaching into underserved communities — and now we're taking that mission global.
            </p>
            <p style={{ marginBottom: '1.25rem' }}>
              This season, we became Goodall Inspire 1 Winners at the FIRST World Championship — representing
              5,000+ American FIRST teams as we head to Seoul. That recognition is one we don't take lightly.
              It's a call to show up with everything we have.
            </p>
            <p style={{ marginBottom: '1.25rem' }}>
              The cherry blossoms of Washington DC are famous around the world — and so is the spirit of the people who live beneath them. We're bringing that same energy, creativity, and heart to South Korea this fall.
            </p>
            <p style={{ fontWeight: 600, color: '#8B003C' }}>
              We are so excited to connect with teams from across the globe, share our story, and learn from the brilliant minds of 190+ nations. See you in Seoul. 🇺🇸🌸🇰🇷
            </p>
          </GlowTracker>
        </div>
      </section>

      {/* ── FOOTER BANNER ── */}
      <section style={{ ...sectionStyle, padding: '3.5rem 2rem', textAlign: 'center',
        background: 'linear-gradient(135deg, #ff6b9d 0%, #c0003c 50%, #ff6b9d 100%)' }}>
        <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>🇺🇸 🌸 🇰🇷</div>
        <h3 style={{
          fontFamily: "'Orbitron', sans-serif",
          fontSize: 'clamp(1.2rem, 3vw, 1.8rem)',
          fontWeight: 800,
          color: '#fff',
          textShadow: '0 2px 12px rgba(0,0,0,0.25)',
          margin: 0,
        }}>
          Proudly Representing the United States
        </h3>
        <p style={{ color: 'rgba(255,255,255,0.82)', marginTop: '0.5rem', fontSize: '1rem' }}>
          FTC Team #6417 · Rockville, Maryland · FIRST GLOBAL 2026
        </p>
      </section>
    </div>
  );
}
