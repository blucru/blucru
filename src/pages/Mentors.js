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
    name: 'Ryan K',
    role: 'Mentor',
    image: null,
    front: 'Ryan K',
    desc: 'Ryan has been with Blu Cru since the beginning, helping guide the team through every season with technical expertise and unwavering dedication. A robotics veteran who keeps the team grounded and focused.',
  },
  {
    name: 'Wasabi',
    role: 'Mentor',
    image: 'wasabi.png',
    front: 'Wasabi',
    desc: 'Wasabi brings energy and creativity to every meeting. A key part of the team\'s culture, always ready to help problem-solve and keep spirits high during the long build nights.',
  },
  {
    name: 'Thomas D',
    role: 'Mentor',
    image: 'thomasduck.png',
    front: 'Thomas D',
    desc: 'Thomas Duck brings wisdom and calm to the chaos of build season. Known for his meticulous attention to detail, he helps the team think through complex engineering challenges from first principles.',
  },
  {
    name: 'John P',
    role: 'Mentor',
    image: 'johnpork.png',
    front: 'John P',
    desc: 'John Pork is the team\'s go-to for all things mechanical. With years of hands-on experience, he teaches the team how to build robust, competition-ready systems that actually work when it matters most.',
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
