import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [bannerOffset, setBannerOffset] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  useEffect(() => {
    const measure = () => {
      const banner = document.querySelector('.announcement-banner--visible');
      setBannerOffset(banner ? banner.offsetHeight : 0);
    };
    measure();
    const observer = new MutationObserver(measure);
    observer.observe(document.body, { subtree: true, attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  const links = [
    { to: '/', label: 'Home' },
    { to: '/green-gang', label: 'Green Gang' },
    { to: '/our-robots', label: 'Our Robots' },
    { to: '/outreach', label: 'Outreach' },
    { to: '/join', label: 'Join Our Cru' },
    { to: '/sponsors', label: 'Sponsors' },
    { to: '/media', label: 'Media' },
    { to: '/resources', label: 'Resources' },
    { to: '/contact', label: 'Contact Us' },
  ];

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="navbar-container">
          <Link to="/" className="navbar-logo">
            <img src="/duckylogo.png" alt="Blu Cru Logo" />
            BLU CRU
          </Link>
          <div className="nav-links">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`nav-link ${location.pathname === link.to ? 'active' : ''}`}
              >
                {link.label}
              </Link>
            ))}
          </div>
          <button
            className="mobile-toggle"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>
      <div className={`mobile-menu ${mobileOpen ? 'open' : ''}`} style={{ top: `${70 + bannerOffset}px` }}>
        {links.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className={`nav-link ${location.pathname === link.to ? 'active' : ''}`}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </>
  );
}
