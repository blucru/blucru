import React, { useState } from 'react';
import HeroSlideshow from '../components/HeroSlideshow';
import GlowTracker from '../components/GlowTracker';
import useScrollAnimations from '../components/useScrollAnimations';

const heroSlides = [
  { image: null },
  { image: null },
  { image: null },
];

const resourcesData = {
  'DECODE': {
    season: 'DECODE 25-26',
    description: 'Access resources from our DECODE season championship-winning robot.',
    sections: [
      {
        title: 'Robot CAD',
        description: 'View the CAD models and design files for our championship-winning Dugtrio robot.',
        icon: '📐',
        links: [
          { label: 'View Dugtrio CAD on OnShape', url: 'https://cad.onshape.com/documents/1cf2882d6cfccc771986090c/w/8fe42fcaeea70f5eb38f5ab8/e/c92871d549064e32c8f23842' }
        ]
      },
      {
        title: 'Portfolio',
        description: 'Review our award-winning portfolio that led to our Goodall Inspire Award.',
        icon: '📋',
        links: [
          { label: 'View DECODE Portfolio (PDF)', url: 'https://drive.google.com/file/d/18aUvFSsZpxOcQPPABLQv0E8hnOZliFLA/preview' }
        ]
      }
    ]
  },
  'INTO THE DEEP': {
    season: 'INTO THE DEEP 24-25',
    description: 'Explore resources from our Worlds Divisional Innovate championship run.',
    sections: [
      {
        title: 'Robot CAD',
        description: 'Dive into the CAD designs that achieved Divisional Innovate at Worlds.',
        icon: '📐',
        links: [
          // Add CAD links here
        ]
      },
      {
        title: 'Portfolio',
        description: 'View the portfolio that helped us achieve outstanding results.',
        icon: '📋',
        links: [
          // Add portfolio links here
        ]
      }
    ]
  }
};

export default function Resources() {
  useScrollAnimations();
  const [selectedYear, setSelectedYear] = useState('DECODE');

  const currentResource = resourcesData[selectedYear];

  return (
    <div>
      <HeroSlideshow
        slides={heroSlides}
        compact
        badge="LEARN FROM US"
        title={[
          { text: 'RESOURCES', highlight: true },
        ]}
        subtitle="Access our Robot CAD and Portfolio documents from championship seasons."
      />

      <section className="resources-section" style={{ paddingTop: '4rem', paddingBottom: '4rem' }}>
        {/* Year Selector */}
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto 3rem',
          paddingX: '2rem',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '1.5rem'
        }}>
          <label style={{
            fontSize: '1.1rem',
            fontWeight: 600,
            color: 'var(--gray-200)'
          }}>
            Select Season:
          </label>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            style={{
              padding: '0.75rem 1.25rem',
              fontSize: '1rem',
              borderRadius: '8px',
              border: '2px solid var(--blue-accent)',
              background: 'rgba(59, 130, 246, 0.1)',
              color: 'var(--gray-100)',
              cursor: 'pointer',
              minWidth: '250px',
              fontWeight: 500
            }}
          >
            <option value="DECODE">DECODE 25-26</option>
            <option value="INTO THE DEEP">INTO THE DEEP 24-25</option>
          </select>
        </div>

        {/* Season Resources */}
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ marginBottom: '3rem', textAlign: 'center' }}>
            <h2 className="section-title">{currentResource.season}</h2>
            <p style={{
              fontSize: '1.05rem',
              color: 'var(--gray-300)',
              marginTop: '1rem'
            }}>
              {currentResource.description}
            </p>
          </div>

          {/* Resource Sections */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
            gap: '2rem',
            marginBottom: '2rem'
          }}>
            {currentResource.sections.map((section, idx) => (
              <GlowTracker key={idx} className="resource-card">
                <div style={{
                  padding: '2.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1.5rem'
                }}>
                  <div style={{
                    fontSize: '2.5rem',
                    textAlign: 'center'
                  }}>
                    {section.icon}
                  </div>
                  <div>
                    <h3 style={{
                      fontSize: '1.4rem',
                      fontWeight: 700,
                      color: 'var(--blue-accent)',
                      marginBottom: '0.75rem'
                    }}>
                      {section.title}
                    </h3>
                    <p style={{
                      color: 'var(--gray-300)',
                      lineHeight: '1.6',
                      fontSize: '1rem'
                    }}>
                      {section.description}
                    </p>
                  </div>

                  {section.links && section.links.length > 0 ? (
                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.75rem',
                      marginTop: 'auto'
                    }}>
                      {section.links.map((link, linkIdx) => (
                        <a
                          key={linkIdx}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            padding: '0.75rem 1rem',
                            backgroundColor: 'rgba(59, 130, 246, 0.15)',
                            border: '1px solid rgba(59, 130, 246, 0.3)',
                            borderRadius: '6px',
                            color: 'var(--blue-accent)',
                            textDecoration: 'none',
                            transition: 'all 0.3s ease',
                            fontSize: '0.95rem'
                          }}
                          onMouseEnter={(e) => {
                            e.target.style.backgroundColor = 'rgba(59, 130, 246, 0.25)';
                            e.target.style.borderColor = 'rgba(59, 130, 246, 0.5)';
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.backgroundColor = 'rgba(59, 130, 246, 0.15)';
                            e.target.style.borderColor = 'rgba(59, 130, 246, 0.3)';
                          }}
                        >
                          {link.label}
                          <span>→</span>
                        </a>
                      ))}
                    </div>
                  ) : (
                    <div style={{
                      marginTop: 'auto',
                      padding: '1rem',
                      textAlign: 'center',
                      backgroundColor: 'rgba(107, 114, 128, 0.1)',
                      borderRadius: '6px',
                      color: 'var(--gray-400)',
                      fontSize: '0.9rem'
                    }}>
                      Coming Soon
                    </div>
                  )}
                </div>
              </GlowTracker>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
