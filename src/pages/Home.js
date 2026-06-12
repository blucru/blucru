import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import HeroSlideshow from '../components/HeroSlideshow';
import GlowTracker from '../components/GlowTracker';

const heroSlides = [
  { image: "/fullgroupawdphoto.jpg" },
  { image: "/Goingtofield.jpg" },
  { image: "/driverprep.jpg" },
  { image: "/statepplgroup.jpg" },
  { image: "/DrivingLock.jpg" },
  { image: "/robopark.jpg" },
  { image: "/chsinspire.png" },
  { image: "/wowie.png" },
  { image: "/thomasduck.png" },
  { image: "/lockedtfin.png" },
  { image: "/sonnymehra.png" },
];

const achievements = [
  { season: 'DECODE 25-26', items: [
    'Goodall Inspire 1 Winners',
    'Chesapeake Championship Inspire Award Winners',
    'Chesapeake Championship Red Cardinal Alliance 7 Captain',
    'Qualified for FIRST World Championship',
    { text: 'Team USA - Selected to represent the USA at the FIRST GLOBAL Challenge', link: '/usa', isTeamUSA: true }
  ]},
  { season: 'INTO THE DEEP 24-25', items: [
    'Worlds Divisional Innovate #3',
    'World Divisional Alliance 8 Captain',
    'Attended MTI',
    'Chesapeake Championship Finalist Alliance Captain',
    'Design Award - Chesapeake Championship'
  ]},
  { season: 'CENTERSTAGE 23-24', items: [
    'Chesapeake Championship Finalist Alliance',
    'Chesapeake Championship Control #3',
    'Attended MTI'
  ]},
];

const teamMembers = [
  { name: 'Amber W', role: 'CAD', image:'amberw.png' },
  { name: 'Michael J', role: 'CAD', image:'michaelj.png'},
  { name: 'Kathy Z', role: 'Manufacturing', image:'kathyz.png'},
  { name: 'Michael D', role: 'Autonomous', image:'michaeld.png'},
  { name: 'Deven B', role: 'Tele-Op', image: 'devenb.png' },
  { name: 'Chase L', role: 'Software' },
  { name: 'Thomas Y', role: 'Electrical',image:'thomasy.png'},
];

const alumniMembers = [
  { name: 'Annika B', role: 'Portfolio + Judging', image:'annikab.png', college: 'Carnegie Mellon University' },
  { name: 'Cooper L', role: 'Systems', image:'cooperl.png', college: 'Stanford University' },
  { name: 'John H', role: 'Manufacturing', image:'johnh.png', college: 'UC Berkeley' },
  { name: 'Ethan Z', role: 'Systems', image: 'ethanz.png', college: 'University of Pennsylvania' },
];

export default function Home() {
  const [bannerOpen, setBannerOpen] = useState(true);

  return (
    <div>
      <div className={`announcement-banner ${bannerOpen ? 'announcement-banner--visible' : ''}`}
        style={{ background: 'linear-gradient(90deg, #c0003c, #ff6b9d, #c0003c)' }}>
        <div className="announcement-banner__marquee">
          <div className="announcement-banner__track">
            {[...Array(6)].map((_, i) => (
              <span key={i} className="announcement-banner__item">
                🇺🇸 Blu Cru is Honored to Be FGC Team United States of America! &nbsp;🌸&nbsp; See you in Incheon, South Korea — October 2026!
              </span>
            ))}
          </div>
        </div>
        <button className="announcement-banner__close" onClick={() => setBannerOpen(false)} aria-label="Close banner">×</button>
      </div>

      <HeroSlideshow
        slides={heroSlides}
        badge="FTC TEAM #6417"
        title={[
          { text: 'BLU ', highlight: true },
          { text: 'CRU', highlight: true },
        ]}
        subtitle="Based at Explorer Post 1010 at the Rockville Science Center"
        buttons={
          <div className="hero-btn-group" style={{ gap: '1.25rem' }}>
            <Link to="/contact" className="btn hero-btn-gradient">Contact Us</Link>
            <Link to="/outreach" className="btn hero-btn-gradient">Our Outreach</Link>
            <Link to="/our-robots" className="btn hero-btn-gradient">Our Robots</Link>
          </div>
        }
      />

      {/* About Us Section */}
      <section className="about-section section-dark">
        <div className="section-header">
          <span className="section-label">WHO WE ARE</span>
          <h2 className="section-title">About Blu Cru</h2>
        </div>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <GlowTracker className="about-card" style={{
            background: 'linear-gradient(135deg, var(--blue-medium), rgba(30, 58, 95, 0.3))',
            border: '1px solid rgba(59, 130, 246, 0.1)',
            borderRadius: 20,
            padding: '3rem',
            lineHeight: 1.8,
            fontSize: '1.05rem',
            color: 'var(--gray-300)',
          }}>
            <p style={{ marginBottom: '1.5rem' }}>
              Blu Cru is a community-based FIRST Tech Challenge robotics team dedicated to building innovative, creative designs and impacting underserved communities both locally in Maryland and across the globe in places like Uganda.
            </p>
            <p style={{ marginBottom: '1.5rem' }}>
              This DECODE season, we qualified for the FIRST World Championship by winning the Chesapeake Regional Inspire Award—placing us #1 among 250+ teams in our region. We then went on to become Goodall Inspire 1 Winners at the FIRST World Championship.
            </p>
            <p>
              We operate under the 501(c)(3) Rockville Science Center as Explorer Post 1010, fostering hands-on STEM learning and robotics mentorship for the next generation of engineers and innovators.
            </p>
          </GlowTracker>
        </div>
      </section>

      {/* Current Season Robot */}
      <section className="season-section section-dark">
        <div className="section-header">
          <span className="section-label">CURRENT SEASON</span>
          <h2 className="section-title">Our Robot</h2>
        </div>
        <GlowTracker className="season-card" pokeImage="/dugtriopoke.png">
          <div className="season-info">
            <span className="season-year">2025-26 SEASON</span>
            <h3 className="season-name">Dugtrio</h3>
            <p className="season-desc">
              Our DECODE competition robot, Dugtrio, is the only triple-shooter turret design in the entire world. We have a dynamic 18 inch intake, three independently driven shooters, and a 6 wheel drivetrain.
            </p>
            <div className="season-tags">
              <span className="season-tag">Innovative Design</span>
              <span className="season-tag">High Performance</span>
              <span className="season-tag">Autonomous Excellence</span>
            </div>
          </div>
          <div className="season-image">
            <img src="dugtrio.png" alt="the bot"/>
          </div>
        </GlowTracker>
      </section>

      {/* Achievements */}
      <section className="achievements-section">
        <div className="section-header">
          <span className="section-label">ACCOMPLISHMENTS</span>
          <h2 className="section-title">Our Achievements</h2>
          <p className="section-subtitle">Our track record at competitions across Chesapeake and beyond.</p>
        </div>
        {achievements.map((group) => (
          <div key={group.season} style={{ maxWidth: 1200, margin: '0 auto 2.5rem' }}>
            <h3 style={{
              fontFamily: "'Orbitron', sans-serif",
              fontSize: '1rem',
              fontWeight: 700,
              color: 'var(--blue-accent)',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              marginBottom: '1rem',
              paddingLeft: '0.5rem'
            }}>{group.season}</h3>
            <div className="achievements-grid" style={{ marginBottom: 0 }}>
              {group.items.map((item, i) => {
                const isTeamUSA = typeof item === 'object' && item.isTeamUSA;
                const itemText = typeof item === 'string' ? item : item.text;
                const itemLink = typeof item === 'object' ? item.link : null;
                const content = (
                  <GlowTracker key={i} className="achievement-card" style={isTeamUSA ? { background: 'linear-gradient(160deg, rgba(255,184,210,0.8), rgba(255,150,190,0.6))', border: '2px solid rgba(220,80,130,0.4)' } : {}}>
                    <div className="achievement-icon">{isTeamUSA ? '🌸' : '🏆'}</div>
                    <div className="achievement-content">
                      <h4 style={isTeamUSA ? { color: '#c0003c' } : {}}>{group.season}</h4>
                      <p style={isTeamUSA ? { color: '#8B003C', fontWeight: 600 } : {}}>{itemText}</p>
                    </div>
                  </GlowTracker>
                );
                return itemLink ? <Link key={i} to={itemLink} style={{ textDecoration: 'none' }}>{content}</Link> : content;
              })}
            </div>
          </div>
        ))}
      </section>

      {/* Team */}
      <section className="team-section section-dark">
        <div className="section-header">
          <span className="section-label">THE CRU</span>
          <h2 className="section-title">Our Team</h2>
        </div>
        <div className="team-grid">
          {teamMembers.map((member, i) => (
            <div key={i} className="team-member">
             <div className="team-member-photo">
  {/* If an image exists in the data, show it; otherwise, show the letter */}
  {member.comingSoon ? (
    <div className="placeholder-avatar coming-soon-avatar">
      <span>Coming Soon!</span>
    </div>
  ) : member.image ? (
    <img
      src={member.image}
      alt={member.name}
      style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }}
    />
  ) : (
    <div className="placeholder-avatar">
      {member.name.charAt(0)}
    </div>
  )}
</div>
              <div className="team-member-name">{member.name}</div>
              <div className="team-member-role">{member.role}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Alumni */}
      <section className="alumni-section section-dark">
        <div className="section-header">
          <span className="section-label">PAST THE FLOCK</span>
          <h2 className="section-title">Alumni</h2>
        </div>
        <div style={{ paddingBottom: '2rem' }}>
          <h3 style={{
            fontFamily: "'Orbitron', sans-serif",
            fontSize: '1rem',
            fontWeight: 700,
            color: 'var(--blue-accent)',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            marginBottom: '2rem',
            paddingLeft: '0.5rem',
            textAlign: 'center'
          }}>Class of 2026</h3>
          <div className="team-grid">
            {alumniMembers.map((member, i) => (
              <div key={i} className="team-member" style={{ textAlign: 'center' }}>
                <div className="team-member-photo" style={{ margin: '0 auto 1rem' }}>
                  {member.comingSoon ? (
                    <div className="placeholder-avatar coming-soon-avatar">
                      <span>Coming Soon!</span>
                    </div>
                  ) : member.image ? (
                    <img
                      src={member.image}
                      alt={member.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }}
                    />
                  ) : (
                    <div className="placeholder-avatar">
                      {member.name.charAt(0)}
                    </div>
                  )}
                </div>
                <div className="team-member-name">{member.name}</div>
                <div className="team-member-role">{member.role}</div>
                <div style={{ fontSize: '0.9rem', color: 'var(--gray-400)', marginTop: '0.5rem' }}>
                  {member.college}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
