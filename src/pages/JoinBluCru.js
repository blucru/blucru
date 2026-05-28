import React from 'react';
import HeroSlideshow from '../components/HeroSlideshow';
import useScrollAnimations from '../components/useScrollAnimations';

// Swap these out with actual team/recruitment photos
const heroSlides = [
  { image: "/holymoly.png" },
  { image: "/DrivingLock.jpg" },
  { image: "postinspire.png" },
  { image: "/robopark.jpg" },
  { image: 'hardatwork.jpg' },
  { image: "/drive.jpg" },
  { image: "/lockedwithcrazyalliance.jpg" },
  { image: "/evenmorelocked.jpg" },
];

export default function JoinBluCru() {
  useScrollAnimations();

  return (
    <div>
      <HeroSlideshow
        slides={heroSlides}
        compact
        className="hero-tall"
        badge="GET INVOLVED"
        title={[
          { text: 'JOIN OUR ', highlight: false },
          { text: 'CRU', highlight: true },
        ]}
        subtitle="Interested in joining our team for the 2026-2027 season?<br />Fill out the application below and we'll be in touch!<br />Applicants will be placed on either Blu Cru or Green Gang based on where we feel they'd be the best fit."
      />

      <section className="join-section" style={{ paddingTop: '3rem', paddingBottom: '4rem' }}>
        <div style={{
          background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.15), rgba(30, 58, 95, 0.2))',
          border: '2px solid rgba(59, 130, 246, 0.3)',
          borderRadius: '12px',
          padding: '3rem',
          maxWidth: '800px',
          margin: '0 auto'
        }}>
          <h3 style={{
            color: 'var(--blue-accent)',
            fontSize: '1.3rem',
            marginBottom: '1rem',
            textAlign: 'center'
          }}>
            2026-27 Season Applications Closed
          </h3>
          <p style={{
            color: 'var(--gray-300)',
            fontSize: '1.05rem',
            lineHeight: '1.6',
            marginBottom: '1rem',
            textAlign: 'center'
          }}>
            Thank you for your interest in Blu Cru! The application form for the 2026-27 season is now closed.
          </p>
          <p style={{
            color: 'var(--gray-300)',
            fontSize: '1.05rem',
            lineHeight: '1.6',
            marginBottom: '1rem',
            textAlign: 'center'
          }}>
            If you have a late application, please submit it directly to us at <strong>blucru6417@gmail.com</strong>
          </p>
          <p style={{
            color: 'var(--gray-400)',
            fontSize: '1rem',
            textAlign: 'center',
            fontStyle: 'italic'
          }}>
            If you applied, expect to hear from us by mid June.
          </p>
        </div>
      </section>
    </div>
  );
}
