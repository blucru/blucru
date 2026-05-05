import React, { useState, useEffect } from 'react';

export default function AnnouncementBanner() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (dismissed) return null;

  const messages = [
    '🏆 Blu Cru Goodall Inspire 1 Winners!',
    '🏆 Blu Cru Wins Chesapeake Inspire! Off to Worlds!',
    '📢 Blu Cru and Green Gang are now accepting applications for the 2026 - 27 season. Applications close May 20th',
  ];

  // Duplicate the list so the marquee can loop seamlessly via translateX(-50%).
  const track = [...messages, ...messages];

  return (
    <div className={`announcement-banner ${visible ? 'announcement-banner--visible' : ''}`}>
      <div className="announcement-banner__marquee">
        <div className="announcement-banner__track">
          {track.map((msg, i) => (
            <span key={i} className="announcement-banner__item">{msg}</span>
          ))}
        </div>
      </div>
      <button
        className="announcement-banner__close"
        onClick={() => setDismissed(true)}
        aria-label="Dismiss"
      >
        ×
      </button>
    </div>
  );
}
