import React, { useState } from 'react';
import HeroSlideshow from '../components/HeroSlideshow';
import GlowTracker from '../components/GlowTracker';
import useScrollAnimations from '../components/useScrollAnimations';
import ScratchReveal from '../components/ScratchReveal';

const heroSlides = [
  { image: "cadthing.png" },
  { image: "tuffaf.png" },
  { image: "hardatwork.jpg" },
];

const robots = [
  {
    season: 'DECODE',
    name: 'DUGTRIO',
    image: 'dugtrio.png',
    pokeImage: '/dugtriopoke.png',
    description: 'Our most ambitious and innovative design yet! After hundreds of iterations, we created the world\'s only triple-shooter on a turret. DUGTRIO also features an 18 inch wide intake, and a 6 wheel serpentine belt drive.',
    tags: ['Innovative Design', 'High Performance', 'Autonomous Excellence'],
  },
  {
    season: 'INTO THE DEEP',
    name: 'WARTORTLE',
    image: 'wartortle.png',
    pokeImage: '/wartortlepoke.png',
    description: 'Built for the INTO THE DEEP challenge, WARTORTLE featured a boxtube extension for efficient sample and specimen operations. This feature won Innovate #3 at the World Championships. Also featured a magnetic ascent mechanism.',
    tags: ['Precision Placement', 'Climbing System', 'State Finalist'],
  },
  {
    season: 'CENTERSTAGE',
    name: 'MELTAN',
    image: 'meltan.png',
    pokeImage: '/meltanpoke.png',
    description: 'Built for the CENTERSTAGE challenge, MELTAN was our first competitive robot as a team. A foundational build that helped shape our team culture and engineering process.',
    tags: ['Team Foundation', 'Learning Season', 'Chesapeake Competitor'],
  }
];

const quizQuestions = [
  {
    question: 'Which Allen key do you most resonate with?',
    options: [
      { label: 'Dugtrio — 3.0', value: 'Dugtrio' },
      { label: 'Wartortle — 2.5', value: 'Wartortle' },
      { label: 'Meltan — 2.0', value: 'Meltan' },
    ],
  },
  {
    question: 'Which of these tools is your go-to?',
    options: [
      { label: 'Dugtrio — Dremel', value: 'Dugtrio' },
      { label: 'Wartortle — Soldering Iron', value: 'Wartortle' },
      { label: 'Meltan — Swiss Army Knife', value: 'Meltan' },
    ],
  },
  {
    question: 'What is your favorite part of an FTC match?',
    options: [
      { label: 'Dugtrio — Autonomous', value: 'Dugtrio' },
      { label: 'Wartortle — Endgame', value: 'Wartortle' },
      { label: 'Meltan — Teleop', value: 'Meltan' },
    ],
  },
  {
    question: 'What is your pre-competition routine?',
    options: [
      { label: 'Dugtrio — Got home at 3am from working on the bot. I will drink 3 Monsters tomorrow.', value: 'Dugtrio' },
      { label: 'Wartortle — Sleep is the key to success. I sleep the entire car ride, and make sure to get hot chocolate before judging.', value: 'Wartortle' },
      { label: 'Meltan — I have none. I rely on my lucky GoBilda socks.', value: 'Meltan' },
    ],
  },
  {
    question: 'Best competition lunch?',
    options: [
      { label: 'Dugtrio — Chipotle', value: 'Dugtrio' },
      { label: 'Wartortle — Pizza', value: 'Wartortle' },
      { label: 'Meltan — Taco Bell', value: 'Meltan' },
    ],
  },
  {
    question: 'Where would you rather sleep?',
    options: [
      { label: 'Dugtrio — On a spinny chair', value: 'Dugtrio' },
      { label: 'Wartortle — On the FTC field', value: 'Wartortle' },
      { label: 'Meltan — At home in my bed', value: 'Meltan' },
    ],
  },
  {
    question: 'What best describes you?',
    options: [
      { label: 'Dugtrio — The life of the party. Unique with a flair. Very memorable!', value: 'Dugtrio' },
      { label: 'Wartortle — Team parent! Strong morals, steady and consistent.', value: 'Wartortle' },
      { label: 'Meltan — There for the snacks.', value: 'Meltan' },
    ],
  },
  {
    question: 'Favorite robotics provider?',
    options: [
      { label: 'Dugtrio — REV', value: 'Dugtrio' },
      { label: 'Wartortle — AndyMark', value: 'Wartortle' },
      { label: 'Meltan — GoBilda', value: 'Meltan' },
    ],
  },
  {
    question: 'How do you commute to your team?',
    options: [
      { label: 'Dugtrio — Walk across 3 mountains, an active volcano, trek through grizzly bear country, the city of Baltimore, and Rockville Pike rush hour.', value: 'Dugtrio' },
      { label: 'Wartortle — I wake up. I walk downstairs.', value: 'Wartortle' },
      { label: 'Meltan — I drive.', value: 'Meltan' },
    ],
  },
  {
    question: 'What is your favorite thing outside of robotics?',
    options: [
      { label: 'Dugtrio — Sleep and Valorant', value: 'Dugtrio' },
      { label: 'Wartortle — Crocheting and Dungeons & Dragons', value: 'Wartortle' },
      { label: 'Meltan — Hypixel Skyblock while playing Geometry Dash while watching Arcane', value: 'Meltan' },
    ],
  },
];

const robotDescriptions = {
  Dugtrio: {
    pokeImage: '/dugtriopoke.png',
    tagline: 'You are DUGTRIO!',
    desc: 'Bold, energetic, and unforgettable — you bring the hype and lead the charge. You\'re the triple-threat: Dremel in hand, Monster in the other, living for Autonomous.',
  },
  Wartortle: {
    pokeImage: '/wartortlepoke.png',
    tagline: 'You are WARTORTLE!',
    desc: 'Steady, reliable, and the backbone of the team. You\'re the team parent — calm under pressure, and you always know where the hot chocolate is.',
  },
  Meltan: {
    pokeImage: '/meltanpoke.png',
    tagline: 'You are MELTAN!',
    desc: 'Laid-back, resourceful, and fueled by snacks. You\'ve got lucky GoBilda socks, a Swiss Army Knife, and an unmatched Taco Bell order.',
  },
};

function RobotQuizModal({ onClose }) {
  const [step, setStep] = useState(0); // 0 = intro, 1..N = questions, N+1 = result
  const [answers, setAnswers] = useState([]);
  const [selected, setSelected] = useState(null);

  const totalQuestions = quizQuestions.length;
  const isIntro = step === 0;
  const isResult = step === totalQuestions + 1;
  const questionIndex = step - 1;

  const handleStart = () => setStep(1);

  const handleSelect = (value) => setSelected(value);

  const handleNext = () => {
    if (selected === null) return;
    const newAnswers = [...answers, selected];
    if (step === totalQuestions) {
      setAnswers(newAnswers);
      setStep(totalQuestions + 1);
    } else {
      setAnswers(newAnswers);
      setSelected(null);
      setStep(step + 1);
    }
  };

  const handleRestart = () => {
    setStep(0);
    setAnswers([]);
    setSelected(null);
  };

  const getResult = () => {
    const counts = { Dugtrio: 0, Wartortle: 0, Meltan: 0 };
    answers.forEach((a) => { if (counts[a] !== undefined) counts[a]++; });
    return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0];
  };

  const result = isResult ? getResult() : null;
  const resultData = result ? robotDescriptions[result] : null;

  // Progress bar for question steps
  const progress = isResult ? 100 : step === 0 ? 0 : (step / totalQuestions) * 100;

  return (
    <div className="quiz-overlay" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="quiz-modal">
        {/* Close button */}
        <button className="quiz-close" onClick={onClose} aria-label="Close quiz">×</button>

        {isIntro && (
          <div className="quiz-slide quiz-intro">
            <div className="quiz-badge">PERSONALITY QUIZ</div>
            <h2 className="quiz-title">What's Your Robot<br /><span className="quiz-highlight">Spirit Animal?</span></h2>
            <p className="quiz-subtitle">10 questions to reveal which Blu Cru robot matches your personality.</p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', margin: '1.5rem 0' }}>
              <img src="/dugtriopoke.png" alt="Dugtrio" style={{ height: 70, objectFit: 'contain', filter: 'drop-shadow(0 0 12px rgba(59,130,246,0.5))' }} />
              <img src="/wartortlepoke.png" alt="Wartortle" style={{ height: 70, objectFit: 'contain', filter: 'drop-shadow(0 0 12px rgba(59,130,246,0.5))' }} />
              <img src="/meltanpoke.png" alt="Meltan" style={{ height: 70, objectFit: 'contain', filter: 'drop-shadow(0 0 12px rgba(59,130,246,0.5))' }} />
            </div>
            <button className="quiz-btn-primary" onClick={handleStart}>Start Quiz →</button>
          </div>
        )}

        {!isIntro && !isResult && (
          <div className="quiz-slide quiz-question-slide">
            {/* Progress bar */}
            <div className="quiz-progress-track">
              <div className="quiz-progress-bar" style={{ width: `${progress}%` }} />
            </div>
            <div className="quiz-step-label">Question {step} of {totalQuestions}</div>
            <h3 className="quiz-question">{quizQuestions[questionIndex].question}</h3>
            <div className="quiz-options">
              {quizQuestions[questionIndex].options.map((opt) => (
                <button
                  key={opt.value}
                  className={`quiz-option ${selected === opt.value ? 'selected' : ''}`}
                  onClick={() => handleSelect(opt.value)}
                >
                  {opt.label}
                </button>
              ))}
            </div>
            <button
              className="quiz-btn-primary"
              onClick={handleNext}
              disabled={selected === null}
              style={{ opacity: selected === null ? 0.4 : 1, marginTop: '1rem' }}
            >
              {step === totalQuestions ? 'See My Result →' : 'Next →'}
            </button>
          </div>
        )}

        {isResult && resultData && (
          <div className="quiz-slide quiz-result-slide">
            <div className="quiz-badge">YOUR RESULT</div>
            <img src={resultData.pokeImage} alt={result} className="quiz-result-pokemon" />
            <h2 className="quiz-title quiz-result-title">{resultData.tagline}</h2>
            <p className="quiz-result-desc">{resultData.desc}</p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginTop: '1.5rem' }}>
              <button className="quiz-btn-primary" onClick={handleRestart}>Retake Quiz</button>
              <button className="quiz-btn-outline" onClick={onClose}>Close</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function OurRobots() {
  useScrollAnimations();
  const [scratchEnabled, setScratchEnabled] = useState(false);
  const [quizOpen, setQuizOpen] = useState(false);

  return (
    <div>
      <HeroSlideshow
        slides={heroSlides}
        compact
        badge="ENGINEERING"
        title={[
          { text: 'OUR ', highlight: false },
          { text: 'ROBOTS', highlight: true },
        ]}
        subtitle="Each season brings new challenges and new robots. Here's a look at the machines we've built."
      />

      {/* Scratch-to-reveal toggle */}
      <div style={{
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        maxWidth: 1200,
        margin: '2rem auto 0',
        padding: '0 2rem',
        gap: '0.75rem',
      }}>
        <span style={{ fontSize: '0.85rem', color: 'var(--gray-400)', fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase' }}>
          Scratch to Reveal
        </span>
        <button
          onClick={() => setScratchEnabled((v) => !v)}
          aria-label="Toggle scratch to reveal"
          style={{
            width: 52,
            height: 28,
            borderRadius: 14,
            border: 'none',
            cursor: 'pointer',
            background: scratchEnabled
              ? 'linear-gradient(135deg, var(--gold), var(--blue-accent))'
              : 'rgba(59,130,246,0.15)',
            position: 'relative',
            transition: 'background 0.3s ease',
            boxShadow: scratchEnabled ? '0 0 10px rgba(245,224,75,0.3)' : 'none',
            flexShrink: 0,
          }}
        >
          <span style={{
            position: 'absolute',
            top: 3,
            left: scratchEnabled ? 27 : 3,
            width: 22,
            height: 22,
            borderRadius: '50%',
            background: 'white',
            transition: 'left 0.3s ease',
            boxShadow: '0 1px 4px rgba(0,0,0,0.3)',
          }} />
        </button>
        <span style={{ fontSize: '0.75rem', color: scratchEnabled ? 'var(--gold)' : 'var(--gray-600)', fontWeight: 600, minWidth: 28 }}>
          {scratchEnabled ? 'ON' : 'OFF'}
        </span>
      </div>

      <section className="robots-section">
        {robots.map((robot, index) => (
          <GlowTracker key={index} className="robot-card" pokeImage={robot.pokeImage || null}>
            {index % 2 === 0 ? (
              <>
                <div className="robot-info">
                  <span className="robot-season">{robot.season}</span>
                  <h2 className="robot-name">{robot.name}</h2>
                  <p className="robot-desc">{robot.description}</p>
                  <div className="season-tags">
                    {robot.tags.map((tag, i) => (
                      <span key={i} className="season-tag">{tag}</span>
                    ))}
                  </div>
                </div>
                <div className="robot-image">
                  {scratchEnabled ? (
                    <ScratchReveal width="100%" height="100%" cursor={robot.cursor}>
                      <img src={robot.image} alt={robot.name} className="robot-photo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </ScratchReveal>
                  ) : (
                    <img src={robot.image} alt={robot.name} className="robot-photo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  )}
                </div>
              </>
            ) : (
              <>
                <div className="robot-image">
                  {scratchEnabled ? (
                    <ScratchReveal width="100%" height="100%" cursor={robot.cursor}>
                      {robot.image
                        ? <img src={robot.image} alt={robot.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        : <div className="placeholder">Robot Photo - {robot.name}</div>
                      }
                    </ScratchReveal>
                  ) : (
                    robot.image
                      ? <img src={robot.image} alt={robot.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      : <div className="placeholder">Robot Photo - {robot.name}</div>
                  )}
                </div>
                <div className="robot-info">
                  <span className="robot-season">{robot.season}</span>
                  <h2 className="robot-name">{robot.name}</h2>
                  <p className="robot-desc">{robot.description}</p>
                  <div className="season-tags">
                    {robot.tags.map((tag, i) => (
                      <span key={i} className="season-tag">{tag}</span>
                    ))}
                  </div>
                </div>
              </>
            )}
          </GlowTracker>
        ))}
      </section>

      {/* Robot Spirit Animal Quiz Section */}
      <section className="quiz-section section-dark">
        <div className="section-header">
          <span className="section-label">PERSONALITY QUIZ</span>
          <h2 className="section-title">What's Your Robot Spirit Animal?</h2>
          <p className="section-subtitle">Find out which Blu Cru robot matches your personality in 10 quick questions.</p>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '3rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
          {[
            { name: 'DUGTRIO', img: '/dugtriopoke.png', desc: 'The life of the party' },
            { name: 'WARTORTLE', img: '/wartortlepoke.png', desc: 'The team parent' },
            { name: 'MELTAN', img: '/meltanpoke.png', desc: 'There for the snacks' },
          ].map((r) => (
            <div key={r.name} style={{ textAlign: 'center' }}>
              <img src={r.img} alt={r.name} style={{ height: 80, objectFit: 'contain', filter: 'drop-shadow(0 0 16px rgba(59,130,246,0.4))' }} />
              <div style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '0.75rem', fontWeight: 700, color: 'var(--blue-accent)', letterSpacing: 2, marginTop: '0.5rem' }}>{r.name}</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--gray-400)', marginTop: '0.2rem' }}>{r.desc}</div>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <button
            className="btn btn-primary"
            style={{
              background: 'linear-gradient(135deg, var(--gold), var(--blue-accent))',
              color: '#0a0e1a',
              fontSize: '1rem',
              padding: '0.85rem 2.5rem',
              fontWeight: 700,
              letterSpacing: 1,
            }}
            onClick={() => setQuizOpen(true)}
          >
            Take the Quiz →
          </button>
        </div>
      </section>

      {quizOpen && <RobotQuizModal onClose={() => setQuizOpen(false)} />}
    </div>
  );
}
