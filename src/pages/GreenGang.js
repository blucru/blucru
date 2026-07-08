import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import HeroSlideshow from '../components/HeroSlideshow';
import GlowTracker from '../components/GlowTracker';
import useScrollAnimations from '../components/useScrollAnimations';

const heroSlides = [
  { image: "/tuffstuff.png"},
  { image: "/gg.png" },
  { image: "/inmatch.png" },
  { image: "/greengangworkings.png"},
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

const teamMembers = [
  { name: 'Nicholas Y', role: 'Hardware', image:"nicholasy.png", captain: true },
  { name: 'Alex C', role: 'CAD', image:"alexc.png", captain: true },
  { name: 'Ana W', role: 'Mechanical', image: "anaw.png" },
  { name: 'Caleb L', role: 'Mechanical', image: "calebl.png" },
  { name: 'Matthew B', role: 'Software',image:"matthewb.png" },
  { name: 'Krish J', role: 'Member', image:"krishj.png" },
  { name: 'Vir S', role: 'Member', image:"virs.png" },
  { name: 'Saiya J', role: 'Member', image:"saiyaj.png" },
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

export default function GreenGang() {
  useScrollAnimations();

  // Optional custom cursor: only apply it if public/greengangcursor.png exists.
  const [hasCustomCursor, setHasCustomCursor] = useState(false);
  useEffect(() => {
    const img = new Image();
    img.onload = () => setHasCustomCursor(true);
    img.onerror = () => setHasCustomCursor(false);
    img.src = '/greengangcursor.png';
  }, []);

  return (
    <div
      className="green-gang-page"
      style={hasCustomCursor ? { cursor: "url('/greengangcursor.png') 16 16, auto" } : undefined}
    >
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

      {/* Current Season Robot */}
      <section className="season-section section-dark">
        <div className="section-header">
          <span className="section-label green">CURRENT SEASON</span>
          <h2 className="section-title">Our Robot</h2>
        </div>
        <GlowTracker className="season-card green-theme" color="green">
          <div className="season-info">
            <span className="season-year green">2025-26 SEASON</span>
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
                    <h4 className="green">{group.season}</h4>
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
