import React, { useState, useEffect, useRef } from 'react';
import GlowTracker from '../components/GlowTracker';
import useScrollAnimations from '../components/useScrollAnimations';

const TEAM_MEMBERS = [
  { name: 'Deven B',   role: 'Tele-Op',       image: '/devenb.png'   },
  { name: 'Kathy Z',   role: 'Manufacturing', image: '/kathyz.png'   },
  { name: 'Amber W',   role: 'CAD',           image: '/amberw.png'   },
  { name: 'Michael D', role: 'Autonomous',    image: '/michaeld.png' },
  { name: 'Michael J', role: 'CAD',           image: '/michaelj.png' },
  { name: 'Thomas Y',  role: 'Electrical',    image: '/thomasy.png'  },
];

const TARGET = new Date('2026-10-07T00:00:00');

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

function Countdown() {
  const [time, setTime] = useState(getTimeLeft);

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  const units = ['DAYS', 'HOURS', 'MINUTES', 'SECONDS'];

  return (
    <div style={{ display: 'flex', gap: '1.25rem', justifyContent: 'center', flexWrap: 'wrap' }}>
      {units.map((u) => (
        <div key={u} style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.07), rgba(178,34,52,0.18))',
          border: '2px solid rgba(178,34,52,0.45)',
          borderRadius: 16,
          padding: '1.4rem 1.8rem',
          textAlign: 'center',
          minWidth: 95,
        }}>
          <div style={{
            fontFamily: "'Orbitron', sans-serif",
            fontSize: '2.6rem',
            fontWeight: 900,
            color: '#fff',
            lineHeight: 1,
          }}>
            {String(time[u.toLowerCase()]).padStart(2, '0')}
          </div>
          <div style={{
            fontSize: '0.65rem',
            letterSpacing: '2px',
            color: 'rgba(255,183,197,0.85)',
            marginTop: '0.5rem',
            fontWeight: 700,
          }}>
            {u}
          </div>
        </div>
      ))}
    </div>
  );
}

function MemberCard({ member }) {
  return (
    <GlowTracker style={{
      background: 'linear-gradient(160deg, rgba(255,255,255,0.04) 0%, rgba(178,34,52,0.1) 100%)',
      border: '1px solid rgba(178,34,52,0.28)',
      borderRadius: 24,
      padding: '2rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '1.5rem',
    }}>
      {/* Member name + role */}
      <div style={{ textAlign: 'center' }}>
        <div style={{
          fontFamily: "'Orbitron', sans-serif",
          fontSize: '1.1rem',
          fontWeight: 800,
          color: '#fff',
          marginBottom: '0.3rem',
        }}>{member.name}</div>
        <div style={{
          fontSize: '0.78rem',
          letterSpacing: '2px',
          color: 'rgba(255,183,197,0.75)',
          textTransform: 'uppercase',
        }}>{member.role}</div>
      </div>

      {/* 4 photo placeholders in 2×2 grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '0.75rem',
      }}>
        {[0, 1, 2, 3].map((i) => (
          <div key={i} style={{
            aspectRatio: '1',
            borderRadius: 14,
            overflow: 'hidden',
            border: '1.5px solid rgba(178,34,52,0.3)',
            background: i === 0
              ? 'rgba(255,255,255,0.04)'
              : 'rgba(255,255,255,0.03)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            {i === 0 && member.image ? (
              <img
                src={member.image}
                alt={member.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            ) : (
              <span style={{
                fontSize: '1.5rem',
                opacity: 0.25,
              }}>🌸</span>
            )}
          </div>
        ))}
      </div>

      {/* 4-sentence blurb placeholder */}
      <div style={{
        background: 'rgba(255,255,255,0.03)',
        borderRadius: 12,
        padding: '1rem',
        border: '1px dashed rgba(178,34,52,0.2)',
      }}>
        {[1, 2, 3, 4].map((n) => (
          <div key={n} style={{
            height: 10,
            borderRadius: 5,
            background: 'rgba(255,255,255,0.07)',
            marginBottom: n < 4 ? '0.6rem' : 0,
            width: n === 4 ? '60%' : '100%',
          }} />
        ))}
      </div>
    </GlowTracker>
  );
}

function Petals() {
  const petalRef = useRef(null);

  useEffect(() => {
    const container = petalRef.current;
    if (!container) return;

    const petals = [];

    for (let i = 0; i < 22; i++) {
      const el = document.createElement('div');
      const size = 14 + Math.random() * 18;
      el.style.cssText = `
        position:absolute;
        top:-40px;
        left:${Math.random() * 100}%;
        width:${size}px;
        height:${size}px;
        opacity:0;
        pointer-events:none;
        animation: petalDrift ${9 + Math.random() * 10}s ${Math.random() * 16}s linear infinite;
      `;
      el.innerHTML = `<svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
        ${[0,72,144,216,288].map(a =>
          `<ellipse cx="${20+10*Math.cos(a*Math.PI/180)}" cy="${20+10*Math.sin(a*Math.PI/180)}"
            rx="7" ry="4.5"
            transform="rotate(${a},${20+10*Math.cos(a*Math.PI/180)},${20+10*Math.sin(a*Math.PI/180)})"
            fill="rgba(255,183,197,0.55)"/>`
        ).join('')}
        <circle cx="20" cy="20" r="3" fill="rgba(255,220,100,0.6)"/>
      </svg>`;
      container.appendChild(el);
      petals.push(el);
    }

    return () => petals.forEach((p) => p.remove());
  }, []);

  return (
    <>
      <style>{`
        @keyframes petalDrift {
          0%   { transform: translateY(0)    rotate(0deg);   opacity: 0;   }
          8%   { opacity: 0.75; }
          92%  { opacity: 0.5; }
          100% { transform: translateY(110vh) rotate(400deg); opacity: 0;   }
        }
      `}</style>
      <div
        ref={petalRef}
        style={{
          position: 'fixed',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 9999,
          overflow: 'hidden',
        }}
      />
    </>
  );
}

function FlagCursor() {
  const flag = '🇺🇸';
  const cursorRef = useRef(null);

  useEffect(() => {
    const el = cursorRef.current;
    if (!el) return;

    const move = (e) => {
      el.style.left = `${e.clientX + 12}px`;
      el.style.top  = `${e.clientY + 12}px`;
    };

    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);

  return (
    <div
      ref={cursorRef}
      style={{
        position: 'fixed',
        pointerEvents: 'none',
        fontSize: '1.1rem',
        zIndex: 10000,
        transform: 'translate(-50%, -50%)',
        userSelect: 'none',
      }}
    >
      {flag}
    </div>
  );
}

export default function TeamUSA() {
  useScrollAnimations();

  return (
    <div style={{ background: '#0a0010', minHeight: '100vh', color: '#fff' }}>
      <Petals />
      <FlagCursor />

      {/* ── HERO ── */}
      <section style={{
        position: 'relative',
        minHeight: '92vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '8rem 2rem 5rem',
        background: 'linear-gradient(180deg, #0d0018 0%, #1a0028 55%, #0a0010 100%)',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse at 25% 35%, rgba(178,34,52,0.14) 0%, transparent 55%), radial-gradient(ellipse at 75% 65%, rgba(10,49,97,0.18) 0%, transparent 55%)',
          pointerEvents: 'none',
        }} />

        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{
            display: 'inline-block',
            background: 'linear-gradient(135deg, rgba(178,34,52,0.3), rgba(10,49,97,0.3))',
            border: '1px solid rgba(178,34,52,0.5)',
            borderRadius: 40,
            padding: '0.45rem 1.5rem',
            fontSize: '0.75rem',
            fontFamily: "'Orbitron', sans-serif",
            letterSpacing: '3px',
            color: 'rgba(255,183,197,0.95)',
            marginBottom: '1.75rem',
          }}>
            FIRST GLOBAL CHALLENGE 2026
          </div>

          <div style={{ fontSize: '4.5rem', marginBottom: '0.5rem', lineHeight: 1 }}>🇺🇸</div>

          <h1 style={{
            fontFamily: "'Orbitron', sans-serif",
            fontSize: 'clamp(2.8rem, 8vw, 6rem)',
            fontWeight: 900,
            lineHeight: 1.05,
            marginBottom: '1.25rem',
          }}>
            <span style={{ color: '#B22234' }}>TEAM </span>
            <span style={{ color: '#fff' }}>USA</span>
          </h1>

          <p style={{
            fontSize: '1.15rem',
            color: 'rgba(255,255,255,0.68)',
            maxWidth: 560,
            lineHeight: 1.75,
            margin: '0 auto 2.25rem',
          }}>
            Blu Cru has been selected to represent the United States at the
            FIRST GLOBAL Challenge 2026 in Seoul, South Korea.
          </p>

          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            {['🌸 DC Region', '🤖 FTC #6417', '🇰🇷 Seoul 2026'].map((t) => (
              <span key={t} style={{
                background: 'rgba(255,183,197,0.09)',
                border: '1px solid rgba(255,183,197,0.22)',
                borderRadius: 20,
                padding: '0.4rem 1rem',
                fontSize: '0.85rem',
                color: 'rgba(255,255,255,0.72)',
              }}>{t}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── COUNTDOWN ── */}
      <section style={{ padding: '5rem 2rem', textAlign: 'center' }}>
        <span style={{
          fontFamily: "'Orbitron', sans-serif",
          fontSize: '0.7rem',
          letterSpacing: '3px',
          color: 'rgba(255,183,197,0.7)',
          textTransform: 'uppercase',
          display: 'block',
          marginBottom: '0.65rem',
        }}>COMPETITION BEGINS</span>
        <h2 style={{
          fontFamily: "'Orbitron', sans-serif",
          fontSize: 'clamp(1.6rem, 3.5vw, 2.5rem)',
          fontWeight: 800,
          marginBottom: '0.4rem',
        }}>October 7, 2026</h2>
        <p style={{ color: 'rgba(255,255,255,0.45)', marginBottom: '2.5rem' }}>
          Seoul, South Korea 🇰🇷
        </p>
        <Countdown />
      </section>

      {/* ── ABOUT FGC ── */}
      <section style={{ padding: '5rem 2rem', background: 'rgba(178,34,52,0.04)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span style={{
              fontFamily: "'Orbitron', sans-serif",
              fontSize: '0.7rem',
              letterSpacing: '3px',
              color: 'rgba(255,183,197,0.7)',
              textTransform: 'uppercase',
              display: 'block',
              marginBottom: '0.65rem',
            }}>THE COMPETITION</span>
            <h2 style={{
              fontFamily: "'Orbitron', sans-serif",
              fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)',
              fontWeight: 800,
            }}>About FIRST GLOBAL</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {[
              {
                icon: '🌍',
                title: 'A Global Robotics Olympiad',
                body: 'FIRST GLOBAL is an annual international robotics challenge where student teams from 190+ nations compete together—not against each other—to solve one of humanity\'s greatest engineering challenges. Think of it as the Olympics of robotics, uniting the next generation of innovators from every corner of the globe.',
              },
              {
                icon: '🇰🇷',
                title: 'South Korea — Fall 2026',
                body: 'The 2026 FIRST GLOBAL Challenge takes place this fall in Seoul, South Korea — a global hub of technology, innovation, and culture. Teams will gather to collaborate, compete, and build friendships that span continents, all while tackling a shared engineering mission on the world stage.',
              },
              {
                icon: '🌸',
                title: 'Representing the DC Region',
                body: 'Rooted at the Rockville Science Center in Maryland, Blu Cru is proud to carry the cherry blossom spirit of Washington DC to Seoul. Selected to represent the United States, we bring our passion for creative robotics, community impact, and STEM access to an audience of nations.',
              },
            ].map(({ icon, title, body }) => (
              <GlowTracker key={title} style={{
                background: 'linear-gradient(160deg, rgba(255,255,255,0.04), rgba(178,34,52,0.08))',
                border: '1px solid rgba(178,34,52,0.2)',
                borderRadius: 20,
                padding: '2rem',
              }}>
                <div style={{ fontSize: '2.2rem', marginBottom: '0.9rem' }}>{icon}</div>
                <h3 style={{
                  fontFamily: "'Orbitron', sans-serif",
                  fontSize: '0.95rem',
                  fontWeight: 700,
                  color: 'rgba(255,183,197,0.9)',
                  marginBottom: '0.75rem',
                }}>{title}</h3>
                <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.8, fontSize: '0.93rem' }}>{body}</p>
              </GlowTracker>
            ))}
          </div>
        </div>
      </section>

      {/* ── TEAM MEMBERS ── */}
      <section style={{ padding: '5rem 2rem' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span style={{
              fontFamily: "'Orbitron', sans-serif",
              fontSize: '0.7rem',
              letterSpacing: '3px',
              color: 'rgba(255,183,197,0.7)',
              textTransform: 'uppercase',
              display: 'block',
              marginBottom: '0.65rem',
            }}>THE ROSTER</span>
            <h2 style={{
              fontFamily: "'Orbitron', sans-serif",
              fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)',
              fontWeight: 800,
            }}>Team USA Members</h2>
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
      <section style={{ padding: '5rem 2rem', background: 'rgba(178,34,52,0.05)' }}>
        <div style={{ maxWidth: 850, margin: '0 auto', textAlign: 'center' }}>
          <span style={{
            fontFamily: "'Orbitron', sans-serif",
            fontSize: '0.7rem',
            letterSpacing: '3px',
            color: 'rgba(255,183,197,0.7)',
            textTransform: 'uppercase',
            display: 'block',
            marginBottom: '0.65rem',
          }}>OUR STORY</span>
          <h2 style={{
            fontFamily: "'Orbitron', sans-serif",
            fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)',
            fontWeight: 800,
            marginBottom: '2rem',
          }}>Blu Cru Goes Global 🌏</h2>

          <GlowTracker style={{
            background: 'linear-gradient(160deg, rgba(255,255,255,0.04), rgba(178,34,52,0.09))',
            border: '1px solid rgba(178,34,52,0.22)',
            borderRadius: 24,
            padding: '2.5rem',
            textAlign: 'left',
            lineHeight: 1.85,
            fontSize: '1.02rem',
            color: 'rgba(255,255,255,0.68)',
          }}>
            <p style={{ marginBottom: '1.25rem' }}>
              Blu Cru is a community-based FIRST Tech Challenge robotics team based at Explorer Post 1010
              at the Rockville Science Center in Maryland. We've spent years competing, innovating, and
              reaching into underserved communities — and now we're taking that mission global.
            </p>
            <p style={{ marginBottom: '1.25rem' }}>
              This season, we became Goodall Inspire 1 Winners at the FIRST World Championship, placing us
              among the very top teams in the world. That excellence earned us an invitation we're
              incredibly proud of: representing the United States at the FIRST GLOBAL Challenge 2026.
            </p>
            <p>
              We are beyond excited to take the Blu Cru spirit — our creativity, our drive, and our
              commitment to people — to Seoul, South Korea this fall. We can't wait to meet teams from
              across the world and show what this crew is made of. 🇺🇸🌸
            </p>
          </GlowTracker>
        </div>
      </section>

    </div>
  );
}
