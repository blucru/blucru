import React from 'react';
import HeroSlideshow from '../components/HeroSlideshow';
import GlowTracker from '../components/GlowTracker';
import useScrollAnimations from '../components/useScrollAnimations';

const coaches = [
  {
    name: 'Ryan',
    role: 'Lead Mentor',
    subteam: 'Judging & Strategy',
    since: 2023,
    image: 'RyanMentor.jpg',
  },
];

const heroSlides = [{ image: undefined }];

export default function Coaches() {
  useScrollAnimations();
  return (
    <div className="coaches-page">
      <HeroSlideshow
        slides={heroSlides}
        variant="blue"
        badge="BLU CRU"
        title={[
          { text: 'COACHES ', highlight: false },
          { text: '& MENTORS', highlight: true },
        ]}
        subtitle="The dedicated adults who guide, support, and inspire Blu Cru every season."
      />

      <section className="coaches-section section-dark">
        <div className="section-header">
          <span className="section-label">OUR STAFF</span>
          <h2 className="section-title">Coaches &amp; Mentors</h2>
          <p className="section-subtitle">
            Meet the people who make it all possible.
          </p>
        </div>
        <div className="coaches-grid">
          {coaches.map((coach, i) => (
            <GlowTracker key={i} className="coach-card">
              <div className="coach-photo">
                {coach.image
                  ? <img src={`/${coach.image}`} alt={coach.name} />
                  : <div className="coming-soon-avatar"><span>SOON</span></div>
                }
              </div>
              <div className="coach-name">{coach.name}</div>
              <div className="coach-role">{coach.role}</div>
              <div className="coach-subteam">{coach.subteam}</div>
              <div className="coach-since">Since {coach.since}</div>
            </GlowTracker>
          ))}
        </div>
      </section>
    </div>
  );
}
