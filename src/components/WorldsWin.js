import React, { useEffect, useRef, useCallback } from 'react';

// ── Constellation canvas (carried over from the old countdown section) ────────
const NODE_COUNT = 70;
const CONNECTION_DIST = 160;
const COLORS = ['#3b82f6', '#60a5fa', '#f5e04b', '#fbbf24', '#93c5fd'];

function ConstellationCanvas() {
  const canvasRef = useRef(null);
  const nodes = useRef([]);
  const animRef = useRef(null);

  const init = useCallback((w, h) => {
    nodes.current = Array.from({ length: NODE_COUNT }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      r: 1.5 + Math.random() * 2.5,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      pulse: Math.random() * Math.PI * 2,
    }));
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      init(canvas.width, canvas.height);
    };
    resize();
    window.addEventListener('resize', resize);

    const draw = () => {
      const { width: w, height: h } = canvas;
      ctx.clearRect(0, 0, w, h);

      const ns = nodes.current;

      ns.forEach((n) => {
        n.x += n.vx;
        n.y += n.vy;
        n.pulse += 0.025;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;
      });

      for (let i = 0; i < ns.length; i++) {
        for (let j = i + 1; j < ns.length; j++) {
          const dx = ns[i].x - ns[j].x;
          const dy = ns[i].y - ns[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECTION_DIST) {
            const alpha = (1 - dist / CONNECTION_DIST) * 0.45;
            ctx.save();
            ctx.globalAlpha = alpha;
            ctx.strokeStyle = ns[i].color;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(ns[i].x, ns[i].y);
            ctx.lineTo(ns[j].x, ns[j].y);
            ctx.stroke();
            ctx.restore();
          }
        }
      }

      ns.forEach((n) => {
        const pulseR = n.r + Math.sin(n.pulse) * 0.8;
        const g = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, pulseR * 5);
        g.addColorStop(0, n.color + 'aa');
        g.addColorStop(1, 'transparent');
        ctx.save();
        ctx.globalAlpha = 0.4 + Math.sin(n.pulse) * 0.15;
        ctx.beginPath();
        ctx.arc(n.x, n.y, pulseR * 5, 0, Math.PI * 2);
        ctx.fillStyle = g;
        ctx.fill();
        ctx.restore();

        ctx.save();
        ctx.globalAlpha = 0.85;
        ctx.beginPath();
        ctx.arc(n.x, n.y, pulseR, 0, Math.PI * 2);
        ctx.fillStyle = n.color;
        ctx.fill();
        ctx.restore();
      });

      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [init]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        opacity: 0.75,
        maskImage: 'linear-gradient(to bottom, transparent 0%, black 8%, black 88%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 8%, black 88%, transparent 100%)',
      }}
    />
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function WorldsWin() {
  return (
    <section className="worlds-win-section">
      <ConstellationCanvas />
      <div className="worlds-win-inner">
        <div className="worlds-win-eyebrow">
          <span className="section-label">FIRST WORLD CHAMPIONSHIP · GOODALL DIVISION</span>
        </div>
        <div className="worlds-win-trophy">🏆</div>
        <h2 className="worlds-win-title">
          <span className="worlds-win-highlight">Goodall Inspire 1</span> Winners
        </h2>
        <p className="worlds-win-subtitle">
          Houston, TX · April 29 – May 2, 2026.
        </p>
        <div className="worlds-win-photo">
          <img src="/fullgroupawdphoto.jpg" alt="Blu Cru wins Goodall Inspire 1 at Worlds" />
        </div>
      </div>
    </section>
  );
}
