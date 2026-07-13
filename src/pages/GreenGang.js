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

const KICKOFF = new Date('2026-09-12T00:00:00');

function getTimeLeft() {
  const diff = KICKOFF - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days:    Math.floor(diff / 86400000),
    hours:   Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000)  / 60000),
    seconds: Math.floor((diff % 60000)    / 1000),
  };
}

// Live countdown to the FTC season kickoff (like Team USA's competition countdown).
function KickoffCountdown() {
  const [time, setTime] = useState(getTimeLeft);
  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div style={{ display: 'flex', gap: '1.25rem', justifyContent: 'center', flexWrap: 'wrap' }}>
      {['DAYS','HOURS','MINUTES','SECONDS'].map((u) => (
        <div key={u} style={{
          background: 'linear-gradient(135deg, rgba(134, 239, 172, 0.08), rgba(20, 83, 45, 0.35))',
          border: '1px solid rgba(34, 197, 94, 0.35)',
          borderRadius: 18,
          padding: '1.5rem 2rem',
          textAlign: 'center',
          minWidth: 105,
          boxShadow: '0 8px 32px rgba(34, 197, 94, 0.12)',
        }}>
          <div style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '2.8rem', fontWeight: 900, color: 'var(--green-primary)', lineHeight: 1 }}>
            {String(time[u.toLowerCase()]).padStart(2, '0')}
          </div>
          <div style={{ fontSize: '0.75rem', letterSpacing: '2px', color: 'var(--gray-400)', marginTop: '0.5rem', fontWeight: 700 }}>
            {u}
          </div>
        </div>
      ))}
    </div>
  );
}

const teamMembers = [
  { name: 'Nicholas Y', role: 'Mechanical', image:"nicholasy.png", captain: true },
  { name: 'Alex C', role: 'Mechanical | Software', image:"alexc.png", captain: true },
  { name: 'Ana W', role: 'Mechanical', image: "anaw.png" },
  { name: 'Caleb L', role: 'Member', image: "calebl.png" },
  { name: 'Matthew B', role: 'Software',image:"matthewb.png" },
  { name: 'Krish J', role: 'Mechanical', image:"krishj.png" },
  { name: 'Vir S', role: 'Member', image:"virs.png" },
  { name: 'Saiya J', role: 'Member', image:"saiyaj.png" },
  { name: 'Jonah P', role: 'Mechanical', image:"jonahp.png" },
  { name: 'Aiden', role: 'Member', image:"aiden.png" },
];

// Shows the member's photo when it loads; falls back to the initial otherwise.
function MemberPhoto({ member }) {
  const [failed, setFailed] = useState(false);
  const showImage = member.image && !failed;
  return (
    <div className="team-member-photo green">
      {showImage ? (
        <img
          src={`/${member.image}`}
          alt={member.name}
          onError={() => setFailed(true)}
        />
      ) : (
        <div className="placeholder-avatar">{member.name.charAt(0)}</div>
      )}
    </div>
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

      {/* Kickoff Countdown */}
      <section className="season-section section-dark" style={{ textAlign: 'center' }}>
        <div className="section-header">
          <span className="section-label green">SEASON KICKOFF</span>
          <h2 className="section-title">Countdown to Kickoff</h2>
          <p className="section-subtitle">The 2026-27 FTC season game reveals on September 12. See you there.</p>
        </div>
        <KickoffCountdown />
      </section>

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
        <div className="team-grid">
          {teamMembers.map((member, i) => (
            <div key={i} className={`team-member${member.captain ? ' captain' : ''}`}>
              <MemberPhoto member={member} />
              {member.captain && <div className="captain-badge">Captain</div>}
              <div className="team-member-name">{member.name}</div>
              <div className="team-member-role">{member.role}</div>
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
