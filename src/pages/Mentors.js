import React, { useState } from 'react';
import HeroSlideshow from '../components/HeroSlideshow';
import GlowTracker from '../components/GlowTracker';
import useScrollAnimations from '../components/useScrollAnimations';

const heroSlides = [
  { image: 'inmatch.png' },
  { image: 'tuffstuff.png' },
  { image: 'cadthing.png' },
];

const mentors = [
  {
    name: 'Ryan',
    role: 'Mentor',
    image: 'RyanMentor.jpg',
    desc: 'Ryan has been with Blu Cru since the beginning, helping guide the team through every season with technical expertise and unwavering dedication. A robotics veteran who keeps the team grounded and focused.',
  },
  {
    name: 'Bob Ekman',
    role: 'Mentor',
    image: null,
    desc: 'Coming soon!',
  },
  {
    name: 'Neil Perkins',
    role: 'Mentor',
    image: null,
    desc: 'Coming soon!',
  },
  {
    name: 'Manny Gancayo',
    role: 'Mentor',
    image: null,
    desc: 'Coming soon!',
  },
  {
    name: 'Shawn Pourifarsi',
    role: 'Mentor',
    image: null,
    desc: 'Coming soon!',
  },
  {
    name: 'Kevin Dong',
    role: 'Mentor',
    image: null,
    desc: 'Coming soon!',
  },
];

function MentorCard({ mentor }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="mentor-card-wrapper"
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
      onClick={() => setFlipped((v) => !v)}
    >
      <div className={`mentor-flip-inner ${flipped ? 'flipped' : ''}`}>
        {/* Front */}
        <div className="mentor-flip-front">
          <div className="mentor-photo-wrap">
            {mentor.image ? (
              <img src={mentor.image} alt={mentor.name} className="mentor-photo" />
            ) : (
              <div className="mentor-photo-placeholder">
                {mentor.name.charAt(0)}
              </div>
            )}
          </div>
          <div className="mentor-name">{mentor.name}</div>
          <div className="mentor-role">{mentor.role}</div>
          <div className="mentor-flip-hint">hover to learn more</div>
        </div>

        {/* Back */}
        <div className="mentor-flip-back">
          <div className="mentor-back-name">{mentor.name}</div>
          <p className="mentor-back-desc">{mentor.desc}</p>
        </div>
      </div>
    </div>
  );
}

export default function Mentors() {
  useScrollAnimations();

  return (
    <div>
      <HeroSlideshow
        slides={heroSlides}
        compact
        badge="LEADERSHIP"
        title={[
          { text: 'OUR ', highlight: false },
          { text: 'MENTORS', highlight: true },
        ]}
        subtitle="The people who guide, support, and inspire Blu Cru behind the scenes."
      />

      <section className="mentors-section section-dark">
        <div className="section-header">
          <span className="section-label">THE GUIDES</span>
          <h2 className="section-title">Meet Our Mentors</h2>
          <p className="section-subtitle">Hover over a card to learn more about each mentor.</p>
        </div>
        <div className="mentors-grid">
          {mentors.map((mentor, i) => (
            <GlowTracker key={i} className="mentor-card-container">
              <MentorCard mentor={mentor} />
            </GlowTracker>
          ))}
        </div>
      </section>
    </div>
  );
}
