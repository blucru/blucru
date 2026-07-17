import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import HeroSlideshow from '../components/HeroSlideshow';
import GlowTracker from '../components/GlowTracker';
import useScrollAnimations from '../components/useScrollAnimations';

const heroSlides = [
  { image: "/gg.png" },
  { image: "/tuffstuff.png"},
  { image: "/greengangworkings.png"},
  { image: "/michianaGreenGangITD.jpg"},
  { image: "/greengangawards.png"}
];

// 📷 Green Gang outreach photos — drop the real images into /public and swap the
// `src` filenames below. Any slot still set to an `ADD_...` name renders an
// "Add outreach photo" placeholder, so it's safe to leave some unfilled.
const ggOutreach = [
  { src: 'ADD_OUTREACH_1.png', alt: 'Green Gang community outreach' },
  { src: 'ADD_OUTREACH_2.png', alt: 'Green Gang community outreach' },
  { src: 'ADD_OUTREACH_3.png', alt: 'Green Gang community outreach' },
  { src: 'ADD_OUTREACH_4.png', alt: 'Green Gang community outreach' },
];

const achievements = [
  { season: 'DECODE', items: [
    'Winning Alliance Captain at Both Qualifiers',
    'Chesapeake Championship Red Cardinal Alliance 7 Pick'
  ]},
  { season: 'INTO THE DEEP', items: [
    'Advanced to Michiana Premier Event',
    'Chesapeake Championship Dulaman Alliance 3 Captain'
  ]}
];

const teamMembers = [
  { name: 'Nicholas Y', role: 'Mechanical', image:"nicholasy.png", captain: true },
  { name: 'Alex C', role: 'Mechanical | Software', image:"alexc.png", captain: true },
  { name: 'Ana W', role: 'Mechanical', image: "anaw.png" },
  { name: 'Caleb L', role: 'Member', image: "calebl.png" },
  { name: 'Matthew B', role: 'Software',image:"matthewb.png" },
  { name: 'Krish J', role: 'Mechanical', image:"krishj.png" },
  { name: 'Saiya J', role: 'Member', image:"saiyaj.png" },
  { name: 'Jonah P', role: 'Mechanical', image:"jonahp.png" },
  { name: 'Aiden Z', role: 'Mechanical', image:"aidenz.png" },
  { name: 'Cameron L', role: 'Member', image:"cameronl.png" },
  { name: 'Vir S', role: 'Mechanical', image:"virs.png" },
];

// Team photos laid out as a turtle's carapace — rows of hexagonal scutes.
const shellRows = [[0, 1, 2], [3, 4, 5, 6], [7, 8, 9], [10]];

const HEX_CLIP = 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)';
const HEX_W = 'clamp(84px, 22vw, 130px)';
const HEX_H = 'clamp(97px, 25.4vw, 150px)';

// A single hexagonal shell scute holding one member's photo, name labeled below.
function ShellScute({ member }) {
  const [failed, setFailed] = useState(false);
  const showImage = member.image && !failed;
  return (
    <div style={{ width: HEX_W, margin: '0 3px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{
        width: HEX_W,
        height: HEX_H,
        clipPath: HEX_CLIP,
        background: 'linear-gradient(135deg, #22c55e, #14532d)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        filter: 'drop-shadow(0 4px 10px rgba(34, 197, 94, 0.35))',
      }}>
        <div style={{
          width: 'calc(100% - 7px)',
          height: 'calc(100% - 7px)',
          clipPath: HEX_CLIP,
          position: 'relative',
          overflow: 'hidden',
          background: '#0a0f0a',
        }}>
          {showImage ? (
            <img
              src={`/${member.image}`}
              alt={member.name}
              onError={() => setFailed(true)}
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
            />
          ) : (
            <div style={{
              position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: "'Orbitron', sans-serif", fontSize: '1.8rem', fontWeight: 900, color: '#86efac',
              background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.25), rgba(20, 83, 45, 0.5))',
            }}>
              {member.name.charAt(0)}
            </div>
          )}
        </div>
      </div>
      <div style={{ marginTop: '8px', fontSize: 'clamp(0.62rem, 1.9vw, 0.78rem)', fontWeight: 700, color: '#86efac', textAlign: 'center', lineHeight: 1.15 }}>
        {member.name}
      </div>
      <div style={{ marginTop: '2px', fontSize: 'clamp(0.52rem, 1.6vw, 0.66rem)', fontWeight: 500, color: 'var(--gray-400)', textAlign: 'center', lineHeight: 1.1 }}>
        {member.role}
      </div>
    </div>
  );
}

// Fills its tile with an outreach photo; shows an "add photo" placeholder for
// empty slots (src still an ADD_ name) or images that fail to load.
function OutreachPhoto({ src, alt }) {
  const [failed, setFailed] = useState(false);
  const missing = failed || !src || src.startsWith('ADD_');
  if (missing) {
    return (
      <div style={{
        position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', gap: '0.4rem',
        color: '#86efac', fontSize: '0.85rem', fontWeight: 600,
        background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.12), rgba(20, 83, 45, 0.35))',
      }}>
        <span style={{ fontSize: '1.8rem' }}>📷</span>
        Add outreach photo
      </div>
    );
  }
  return (
    <img
      src={`/${src}`}
      alt={alt}
      onError={() => setFailed(true)}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
    />
  );
}

// Shows the robot's photo when it loads; falls back to a green placeholder otherwise.
function RobotPhoto({ src, name }) {
  const [failed, setFailed] = useState(false);
  if (failed) return <div className="placeholder green">Robot Photo - {name}</div>;
  return (
    <img
      src={src}
      alt={`${name} Robot`}
      style={{ width: '100%', height: '100%', objectFit: 'contain' }}
      onError={() => setFailed(true)}
    />
  );
}

// "Slow and steady wins the race" — a turtle crawls along the bottom edge of
// the screen to show scroll progress, trailing a glowing green track.
function TurtleProgress() {
  const trackRef = useRef(null);
  const turtleRef = useRef(null);

  useEffect(() => {
    let raf = null;
    const update = () => {
      raf = null;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      if (trackRef.current) trackRef.current.style.width = `${p * 100}%`;
      if (turtleRef.current) turtleRef.current.style.left = `calc(${p * 100}% - ${p * 34}px)`;
    };
    const onScroll = () => { if (raf == null) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf != null) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div style={{ position: 'fixed', left: 0, right: 0, bottom: 0, zIndex: 9999, pointerEvents: 'none' }}>
      {/* scaleX(-1) flips the emoji to face its direction of travel */}
      <style>{`@keyframes ggWaddle{0%,100%{transform:scaleX(-1) rotate(-6deg)}50%{transform:scaleX(-1) rotate(6deg)}}`}</style>
      <div ref={turtleRef} style={{ position: 'absolute', bottom: 3, left: 0, fontSize: 24, lineHeight: 1, animation: 'ggWaddle 0.9s ease-in-out infinite', filter: 'drop-shadow(0 0 6px rgba(34,197,94,0.6))' }}>🐢</div>
      <div ref={trackRef} style={{ height: 4, width: '0%', background: 'linear-gradient(90deg, #14532d, #22c55e, #86efac)', boxShadow: '0 0 10px rgba(34,197,94,0.5)', borderRadius: '0 2px 2px 0' }} />
    </div>
  );
}

// Green Gang custom cursor: an image that trails the pointer (like Team USA's flag).
// Optional — only renders if public/greengangcursor.png exists.
function GreenGangCursor() {
  const ref = useRef(null);
  const [hasImage, setHasImage] = useState(false);

  useEffect(() => {
    const probe = new Image();
    probe.onload = () => setHasImage(true);
    probe.onerror = () => setHasImage(false);
    probe.src = '/greengangcursor.png';
  }, []);

  useEffect(() => {
    if (!hasImage) return;
    const el = ref.current;
    if (!el) return;
    const move = (e) => {
      const x = e.clientX ?? e.touches?.[0]?.clientX;
      const y = e.clientY ?? e.touches?.[0]?.clientY;
      if (x == null) return;
      el.style.left = `${x}px`;
      el.style.top = `${y}px`;
    };
    window.addEventListener('mousemove', move);
    window.addEventListener('touchmove', move, { passive: true });
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('touchmove', move);
    };
  }, [hasImage]);

  if (!hasImage) return null;

  return (
    <div ref={ref} style={{ position: 'fixed', top: 0, left: 0, pointerEvents: 'none', zIndex: 10000, userSelect: 'none', transform: 'translate(8px, 8px)' }}>
      {/* soft green glow ring behind the image */}
      <div style={{ position: 'absolute', width: 46, height: 46, borderRadius: '50%', background: 'radial-gradient(circle, rgba(34,197,94,0.55) 0%, rgba(34,197,94,0.25) 50%, transparent 75%)', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', animation: 'ggCursorPulse 1.8s ease-in-out infinite' }} />
      <style>{`@keyframes ggCursorPulse{0%,100%{transform:translate(-50%,-50%) scale(1);opacity:0.85}50%{transform:translate(-50%,-50%) scale(1.35);opacity:0.5}}`}</style>
      <img src="/greengangcursor.png" alt="" style={{ width: 40, height: 40, objectFit: 'contain', display: 'block', filter: 'drop-shadow(0 0 6px rgba(34,197,94,0.7))' }} />
    </div>
  );
}

export default function GreenGang() {
  useScrollAnimations();

  return (
    <div className="green-gang-page">
      <GreenGangCursor />
      <TurtleProgress />
      <HeroSlideshow
        slides={heroSlides}
        variant="green"
        badge="FTC TEAM #24158"
        title={[
          { text: 'GREEN ', highlight: true },
          { text: 'GANG', highlight: true },
        ]}
        subtitle=" Community-based robotics team from Rockville, Maryland. The JV sister team to Blu Cru."
        buttons={
          <>
            <Link to="/join" className="btn btn-primary-green">Join Our Team</Link>
          </>
        }
      />

      {/* Robots */}
      <section className="season-section section-dark">
        <div className="section-header">
          <span className="section-label green">THE ROBOTS</span>
          <h2 className="section-title">Our Robots</h2>
        </div>
        <GlowTracker className="season-card green-theme" color="green" style={{ marginBottom: '3rem' }}>
          <div className="season-info">
            <span className="season-year green">DECODE</span>
            <h3 className="season-name">Wasabi</h3>
            <p className="season-desc">
              KISS — Keep it Super Simple. Wasabi is highly effective due to its endless fail-safes and well-thought-out design. One of the most consistent robots in Chesapeake, with endless software enhancements.</p>
            <div className="season-tags">
              <span className="season-tag green">Efficient Design</span>
              <span className="season-tag green">Strategic Play</span>
              <span className="season-tag green">Alliance Collaboration</span>
            </div>
          </div>
          <div className="season-image">
            <img src="/wasabireal.png" alt="Wasabi Robot" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
          </div>
        </GlowTracker>
        <GlowTracker className="season-card green-theme" color="green">
          <div className="season-image">
            <RobotPhoto src="/yurtleRobot.png" name="Yurtle" />
          </div>
          <div className="season-info">
            <span className="season-year green">INTO THE DEEP</span>
            <h3 className="season-name">Yurtle</h3>
            <p className="season-desc">
              Slow and steady wins the race. Yurtle carried Green Gang through the INTO THE DEEP season, advancing to the Michiana Premier Event and captaining Dulaman Alliance 3 at the Chesapeake Championship.
            </p>
            <div className="season-tags">
              <span className="season-tag green">Fast Cycle Time</span>
              <span className="season-tag green">Consistent Cycles</span>
              <span className="season-tag green">Strategic End Effector</span>
            </div>
          </div>
        </GlowTracker>
      </section>

      {/* Outreach */}
      <section className="season-section section-dark">
        <div className="section-header">
          <span className="section-label green">IN THE COMMUNITY</span>
          <h2 className="section-title">Our Outreach</h2>
          <p className="section-subtitle">Green Gang out in the community — spreading STEM wherever we roll.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem', maxWidth: 1200, margin: '0 auto' }}>
          {ggOutreach.map((p, i) => (
            <div key={i} style={{
              position: 'relative', aspectRatio: '4 / 3', borderRadius: 16, overflow: 'hidden',
              border: '1px solid rgba(34, 197, 94, 0.35)', boxShadow: '0 8px 32px rgba(34, 197, 94, 0.12)',
            }}>
              <OutreachPhoto src={p.src} alt={p.alt} />
            </div>
          ))}
        </div>
      </section>

      {/* Achievements */}
      <section className="achievements-section">
        <div className="section-header">
          <span className="section-label green">ACCOMPLISHMENTS</span>
          <h2 className="section-title">Our Achievements</h2>
          <p className="section-subtitle">Green Gang's growing list of accomplishments.</p>
        </div>
        {achievements.map((group) => (
          <div key={group.season} style={{ maxWidth: 1200, margin: '0 auto 2.5rem' }}>
            <h3 style={{
              fontFamily: "'Orbitron', sans-serif",
              fontSize: '1rem',
              fontWeight: 700,
              color: 'var(--green-primary)',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              marginBottom: '1rem',
              paddingLeft: '0.5rem'
            }}>{group.season}</h3>
            <div className="achievements-grid" style={{ marginBottom: 0 }}>
              {group.items.map((item, i) => (
                <GlowTracker key={i} className="achievement-card green-theme" color="green">
                  <div className="achievement-icon">🏆</div>
                  <div className="achievement-content">
                    <p>{item}</p>
                  </div>
                </GlowTracker>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* Team */}
      <section className="team-section section-dark">
        <div className="section-header">
          <span className="section-label green">THE GANG</span>
          <h2 className="section-title">Our Team</h2>
          <p className="section-subtitle">Meet the members of Green Gang.</p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: '100%' }}>
          {shellRows.map((row, ri) => (
            <div key={ri} style={{ display: 'flex', justifyContent: 'center', marginTop: ri === 0 ? 0 : '6px' }}>
              {row.map((idx) => (
                <ShellScute key={idx} member={teamMembers[idx]} />
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section className="season-section section-dark" style={{ textAlign: 'center' }}>
        <div className="section-header">
          <span className="section-label green">GET IN TOUCH</span>
          <h2 className="section-title">Contact Us</h2>
          <p className="section-subtitle">
            Questions, sponsorship, or just want to connect? We'd love to hear from you.
          </p>
        </div>
        <a href="mailto:greengangftc@gmail.com" className="btn btn-primary-green">
          ✉️ greengangftc@gmail.com
        </a>
        <p style={{ color: 'var(--gray-400)', marginTop: '1.5rem', fontSize: '0.9rem' }}>
          FTC Team #24158 · Rockville, Maryland
        </p>
      </section>
    </div>
  );
}
