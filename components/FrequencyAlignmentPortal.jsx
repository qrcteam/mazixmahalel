"use client";

import React, { useState, useEffect } from 'react';

// Color palette from mazixmahalel.com
const colors = {
  black: '#0a0a0a',
  blackSoft: '#1a1a1a',
  blackLighter: '#2a2a2a',
  gold: '#c9a962',
  goldLight: '#e2c992',
  goldDark: '#a08540',
  white: '#ffffff',
  textLight: '#e0e0e0',
  champagne: '#f5e6d3',
};

// Merkaba Component - Animated 8-pointed star
const Merkaba = ({ active, size = 200 }) => {
  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {/* Outer glow */}
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={colors.goldLight} />
            <stop offset="100%" stopColor={colors.gold} />
          </linearGradient>
        </defs>
        
        {/* Upward triangle - centered on 50,50 */}
        <polygon
          points="50,15 84.3,70 15.7,70"
          fill="none"
          stroke="url(#goldGradient)"
          strokeWidth="1.5"
          filter="url(#glow)"
          style={{
            animation: active ? 'spin 20s linear infinite' : 'none',
            transformOrigin: '50px 50px',
          }}
        />
        
        {/* Downward triangle - centered on 50,50 */}
        <polygon
          points="50,85 15.7,30 84.3,30"
          fill="none"
          stroke="url(#goldGradient)"
          strokeWidth="1.5"
          filter="url(#glow)"
          style={{
            animation: active ? 'spinReverse 20s linear infinite' : 'none',
            transformOrigin: '50px 50px',
          }}
        />
        
        {/* Center point */}
        <circle
          cx="50"
          cy="50"
          r="4"
          fill={colors.gold}
          filter="url(#glow)"
          style={{
            animation: active ? 'pulse 2s ease-in-out infinite' : 'none',
          }}
        />
      </svg>
      
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes spinReverse {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.6; r: 4; }
          50% { opacity: 1; r: 6; }
        }
      `}</style>
    </div>
  );
};

// Breathing Timer Component - 20 second cycle
const BreathingTimer = ({ onComplete }) => {
  const [phase, setPhase] = useState('ready');
  const [progress, setProgress] = useState(0);
  const [cycleCount, setCycleCount] = useState(0);
  const [isActive, setIsActive] = useState(false);
  
  const totalCycles = 3;
  const phaseDurations = { inhale: 5, hold: 5, exhale: 10 };
  
  useEffect(() => {
    if (!isActive) return;
    
    let interval;
    let currentPhase = 'inhale';
    let phaseTime = 0;
    
    const phases = ['inhale', 'hold', 'exhale'];
    let phaseIndex = 0;
    let cycles = 0;
    
    interval = setInterval(() => {
      phaseTime += 0.1;
      const currentDuration = phaseDurations[currentPhase];
      const phaseProgress = (phaseTime / currentDuration) * 100;
      
      setProgress(phaseProgress);
      setPhase(currentPhase);
      
      if (phaseTime >= currentDuration) {
        phaseTime = 0;
        phaseIndex++;
        
        if (phaseIndex >= phases.length) {
          phaseIndex = 0;
          cycles++;
          setCycleCount(cycles);
          
          if (cycles >= totalCycles) {
            setIsActive(false);
            setPhase('complete');
            if (onComplete) onComplete();
            clearInterval(interval);
            return;
          }
        }
        
        currentPhase = phases[phaseIndex];
      }
    }, 100);
    
    return () => clearInterval(interval);
  }, [isActive]);
  
  const startBreathing = () => {
    setIsActive(true);
    setCycleCount(0);
    setPhase('inhale');
    setProgress(0);
  };
  
  const getPhaseText = () => {
    switch (phase) {
      case 'ready': return 'Begin when ready';
      case 'inhale': return 'Breathe In';
      case 'hold': return 'Hold';
      case 'exhale': return 'Release';
      case 'complete': return 'Encoded';
      default: return '';
    }
  };
  
  const circleSize = 200;
  const strokeWidth = 4;
  const radius = (circleSize - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;
  
  return (
    <div className="flex flex-col items-center gap-6">
      <div className="relative" style={{ width: circleSize, height: circleSize }}>
        <svg width={circleSize} height={circleSize} className="transform -rotate-90">
          <circle
            cx={circleSize / 2}
            cy={circleSize / 2}
            r={radius}
            fill="none"
            stroke={colors.blackLighter}
            strokeWidth={strokeWidth}
          />
          <circle
            cx={circleSize / 2}
            cy={circleSize / 2}
            r={radius}
            fill="none"
            stroke={colors.gold}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={isActive ? strokeDashoffset : circumference}
            style={{ transition: 'stroke-dashoffset 0.1s linear' }}
          />
        </svg>
        
        <div 
          className="absolute inset-0 flex flex-col items-center justify-center"
          style={{
            animation: phase === 'inhale' ? 'breatheIn 5s ease-in-out' :
                      phase === 'exhale' ? 'breatheOut 10s ease-in-out' : 'none'
          }}
        >
          <span style={{ color: colors.gold, fontSize: '1.25rem', fontWeight: 300 }}>
            {getPhaseText()}
          </span>
          {isActive && (
            <span style={{ color: colors.textLight, fontSize: '0.875rem', marginTop: '0.5rem' }}>
              Cycle {cycleCount + 1} of {totalCycles}
            </span>
          )}
        </div>
      </div>
      
      {!isActive && phase !== 'complete' && (
        <button
          onClick={startBreathing}
          style={{
            background: `linear-gradient(135deg, ${colors.gold}, ${colors.goldDark})`,
            color: colors.black,
            padding: '0.75rem 2rem',
            borderRadius: '9999px',
            fontWeight: 500,
            border: 'none',
            cursor: 'pointer',
            transition: 'transform 0.2s, box-shadow 0.2s',
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'scale(1.05)';
            e.target.style.boxShadow = `0 0 20px ${colors.gold}40`;
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'scale(1)';
            e.target.style.boxShadow = 'none';
          }}
        >
          Start 20-Second Encoding
        </button>
      )}
      
      {phase === 'complete' && (
        <p style={{ color: colors.champagne, textAlign: 'center', maxWidth: '300px' }}>
          Your frequency has been transmitted to every cell. 
          The cord to your future self strengthens.
        </p>
      )}
      
      <style>{`
        @keyframes breatheIn {
          0% { transform: scale(1); }
          100% { transform: scale(1.1); }
        }
        @keyframes breatheOut {
          0% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }
      `}</style>
    </div>
  );
};

// Section Component
const Section = ({ children, id, className = '' }) => (
  <section 
    id={id}
    className={`min-h-screen flex flex-col items-center justify-center px-6 py-20 ${className}`}
    style={{ backgroundColor: colors.black }}
  >
    {children}
  </section>
);

// Main Portal Component
const FrequencyAlignmentPortal = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [safetyLevel, setSafetyLevel] = useState(5);
  const [visionText, setVisionText] = useState('');
  const [completedSections, setCompletedSections] = useState([]);

  const sections = ['welcome', 'anchor', 'illuminate', 'cord', 'encode', 'integrate'];

  // Track scroll position to update current section
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i]);
        if (element && element.offsetTop <= scrollPosition) {
          setCurrentSection(i);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Check initial position

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const markComplete = (section) => {
    if (!completedSections.includes(section)) {
      setCompletedSections([...completedSections, section]);
    }
  };

  const goToSection = (index) => {
    setCurrentSection(index);
    document.getElementById(sections[index])?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const NavDots = () => (
    <div className="fixed right-6 top-1/2 transform -translate-y-1/2 flex flex-col gap-3 z-50">
      {sections.map((section, index) => (
        <button
          key={section}
          onClick={() => goToSection(index)}
          className="w-3 h-3 rounded-full transition-all duration-300"
          style={{
            backgroundColor: currentSection === index ? colors.gold : 
                           completedSections.includes(section) ? colors.goldDark : colors.blackLighter,
            border: `1px solid ${colors.goldDark}`,
            cursor: 'pointer',
          }}
          title={section.charAt(0).toUpperCase() + section.slice(1)}
        />
      ))}
    </div>
  );
  
  return (
    <div style={{ backgroundColor: colors.black, color: colors.textLight, fontFamily: 'system-ui, sans-serif' }}>
      {/* Navigation */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 border-b"
        style={{
          backgroundColor: 'rgba(10, 10, 10, 0.9)',
          backdropFilter: 'blur(8px)',
          borderColor: `${colors.gold}1a`
        }}
      >
        <div className="max-w-7xl mx-auto px-8 py-5 flex justify-between items-center">
          <a
            href="/"
            className="text-xl tracking-widest"
            style={{ color: colors.gold, fontFamily: 'Cinzel, serif' }}
          >
            MAZIX MAHALEL
          </a>
          <div className="hidden md:flex items-center gap-10">
            <a
              href="#anchor"
              className="text-sm tracking-widest uppercase font-medium transition-colors"
              style={{ color: currentSection === 1 ? colors.gold : colors.white }}
              onMouseEnter={(e) => e.target.style.color = colors.gold}
              onMouseLeave={(e) => e.target.style.color = currentSection === 1 ? colors.gold : colors.white}
            >
              Anchor
            </a>
            <a
              href="#illuminate"
              className="text-sm tracking-widest uppercase font-medium transition-colors"
              style={{ color: currentSection === 2 ? colors.gold : colors.white }}
              onMouseEnter={(e) => e.target.style.color = colors.gold}
              onMouseLeave={(e) => e.target.style.color = currentSection === 2 ? colors.gold : colors.white}
            >
              Illuminate
            </a>
            <a
              href="#cord"
              className="text-sm tracking-widest uppercase font-medium transition-colors"
              style={{ color: currentSection === 3 ? colors.gold : colors.white }}
              onMouseEnter={(e) => e.target.style.color = colors.gold}
              onMouseLeave={(e) => e.target.style.color = currentSection === 3 ? colors.gold : colors.white}
            >
              Cord
            </a>
            <a
              href="#encode"
              className="text-sm tracking-widest uppercase font-medium transition-colors"
              style={{ color: currentSection === 4 ? colors.gold : colors.white }}
              onMouseEnter={(e) => e.target.style.color = colors.gold}
              onMouseLeave={(e) => e.target.style.color = currentSection === 4 ? colors.gold : colors.white}
            >
              Encode
            </a>
          </div>
          <a
            href="/"
            className="text-sm font-semibold tracking-widest uppercase px-6 py-3 transition-all"
            style={{
              border: `1px solid ${colors.gold}80`,
              color: colors.gold
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = colors.gold;
              e.target.style.color = colors.black;
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'transparent';
              e.target.style.color = colors.gold;
            }}
          >
            Home
          </a>
        </div>
      </nav>

      <NavDots />

      {/* Welcome Section */}
      <Section id="welcome">
        <Merkaba active={currentSection === 0} size={180} />
        <h1 
          className="text-4xl md:text-5xl font-light mt-8 mb-4 text-center"
          style={{ color: colors.white }}
        >
          Frequency Alignment Portal
        </h1>
        <p 
          className="text-lg md:text-xl max-w-xl text-center mb-2"
          style={{ color: colors.champagne }}
        >
          Connect with the version of you that already has what you seek
        </p>
        <p 
          className="text-sm max-w-md text-center mb-8 opacity-70"
          style={{ color: colors.textLight }}
        >
          A guided journey through the Merkaba — from safety to embodiment
        </p>
        <button
          onClick={() => goToSection(1)}
          style={{
            background: 'transparent',
            border: `1px solid ${colors.gold}`,
            color: colors.gold,
            padding: '1rem 2.5rem',
            borderRadius: '9999px',
            fontSize: '1rem',
            cursor: 'pointer',
            transition: 'all 0.3s',
          }}
          onMouseEnter={(e) => {
            e.target.style.background = colors.gold;
            e.target.style.color = colors.black;
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'transparent';
            e.target.style.color = colors.gold;
          }}
        >
          Begin Your Alignment
        </button>
      </Section>
      
      {/* Anchor Section - Safety */}
      <Section id="anchor">
        <div className="max-w-2xl text-center">
          <span style={{ color: colors.goldDark, letterSpacing: '0.2em', fontSize: '0.75rem' }}>
            STEP ONE
          </span>
          <h2 
            className="text-3xl md:text-4xl font-light mt-2 mb-6"
            style={{ color: colors.gold }}
          >
            Anchor in Safety
          </h2>
          <p className="mb-8" style={{ color: colors.textLight, lineHeight: 1.8 }}>
            Safety is the foundation. Without it, pleasure and power cannot be sustained.
            Your nervous system must feel safe before it can hold the frequency of abundance.
          </p>
          
          <div 
            className="p-8 rounded-lg mb-8"
            style={{ backgroundColor: colors.blackSoft }}
          >
            <p className="mb-6" style={{ color: colors.champagne }}>
              Right now, how safe do you feel in your body?
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-4">
              <span style={{ color: colors.goldDark }}>Unsafe</span>
              <input
                type="range"
                min="1"
                max="10"
                value={safetyLevel}
                onChange={(e) => setSafetyLevel(e.target.value)}
                className="safety-slider w-64 h-12 cursor-pointer"
                style={{ accentColor: colors.gold }}
              />
              <span style={{ color: colors.goldLight }}>Completely Safe</span>
            </div>
            <style>{`
              .safety-slider {
                -webkit-appearance: none;
                appearance: none;
                background: transparent;
              }
              .safety-slider::-webkit-slider-runnable-track {
                height: 8px;
                background: ${colors.blackLighter};
                border-radius: 4px;
              }
              .safety-slider::-webkit-slider-thumb {
                -webkit-appearance: none;
                appearance: none;
                width: 40px;
                height: 40px;
                background: ${colors.gold};
                border-radius: 50%;
                cursor: pointer;
                margin-top: -16px;
                box-shadow: 0 0 10px ${colors.gold}80;
              }
              .safety-slider::-moz-range-track {
                height: 8px;
                background: ${colors.blackLighter};
                border-radius: 4px;
              }
              .safety-slider::-moz-range-thumb {
                width: 40px;
                height: 40px;
                background: ${colors.gold};
                border-radius: 50%;
                cursor: pointer;
                border: none;
                box-shadow: 0 0 10px ${colors.gold}80;
              }
            `}</style>
            <p style={{ color: colors.gold, fontSize: '2rem' }}>{safetyLevel}</p>
          </div>
          
          <p className="text-sm mb-8" style={{ color: colors.textLight, opacity: 0.8 }}>
            If below 7, take three deep breaths. Feel your feet on the ground. 
            You are here. You are now. You are safe.
          </p>
          
          <button
            onClick={() => { markComplete('anchor'); goToSection(2); }}
            style={{
              background: `linear-gradient(135deg, ${colors.gold}, ${colors.goldDark})`,
              color: colors.black,
              padding: '0.75rem 2rem',
              borderRadius: '9999px',
              fontWeight: 500,
              border: 'none',
              cursor: 'pointer',
            }}
          >
            I Feel Anchored →
          </button>
        </div>
      </Section>
      
      {/* Illuminate Section - Vision */}
      <Section id="illuminate">
        <div className="max-w-2xl text-center">
          <span style={{ color: colors.goldDark, letterSpacing: '0.2em', fontSize: '0.75rem' }}>
            STEP TWO
          </span>
          <h2 
            className="text-3xl md:text-4xl font-light mt-2 mb-6"
            style={{ color: colors.gold }}
          >
            Illuminate Your Vision
          </h2>
          <p className="mb-8" style={{ color: colors.textLight, lineHeight: 1.8 }}>
            Whatever details are illuminating and exciting contain the frequency you need.
            Don't think about what's "realistic" — feel into what lights you up.
          </p>
          
          <div 
            className="p-8 rounded-lg mb-8 text-left"
            style={{ backgroundColor: colors.blackSoft }}
          >
            <p className="mb-4" style={{ color: colors.champagne }}>
              Describe the version of you who already has what you desire. 
              How do they feel? What do they do? How do they move through the world?
            </p>
            <textarea
              value={visionText}
              onChange={(e) => setVisionText(e.target.value)}
              placeholder="I wake up feeling... My days are filled with... I know I am successful because..."
              rows={6}
              className="w-full p-4 rounded-lg resize-none"
              style={{
                backgroundColor: colors.blackLighter,
                color: colors.white,
                border: `1px solid ${colors.goldDark}`,
                outline: 'none',
              }}
            />
          </div>
          
          <p className="text-sm mb-8" style={{ color: colors.textLight, opacity: 0.8 }}>
            The scope of your vision determines the energy required. 
            A vision that requires billions will attract billions.
          </p>
          
          <button
            onClick={() => { markComplete('illuminate'); goToSection(3); }}
            style={{
              background: `linear-gradient(135deg, ${colors.gold}, ${colors.goldDark})`,
              color: colors.black,
              padding: '0.75rem 2rem',
              borderRadius: '9999px',
              fontWeight: 500,
              border: 'none',
              cursor: 'pointer',
            }}
          >
            My Vision is Clear →
          </button>
        </div>
      </Section>
      
      {/* Cord Section - Timeline Connection */}
      <Section id="cord">
        <div className="max-w-2xl text-center">
          <span style={{ color: colors.goldDark, letterSpacing: '0.2em', fontSize: '0.75rem' }}>
            STEP THREE
          </span>
          <h2 
            className="text-3xl md:text-4xl font-light mt-2 mb-6"
            style={{ color: colors.gold }}
          >
            Cord to Your Twin
          </h2>
          <p className="mb-8" style={{ color: colors.textLight, lineHeight: 1.8 }}>
            On another timeline, a version of you has already achieved everything you desire.
            This is your Twin. They are not separate from you — they ARE you.
          </p>
          
          <div 
            className="p-8 rounded-lg mb-8"
            style={{ backgroundColor: colors.blackSoft }}
          >
            <div className="relative h-32 mb-6">
              <div 
                className="absolute top-1/2 left-0 right-0 h-px"
                style={{ backgroundColor: colors.goldDark }}
              />
              <div 
                className="absolute left-8 top-1/2 transform -translate-y-1/2 w-4 h-4 rounded-full"
                style={{ backgroundColor: colors.gold, boxShadow: `0 0 20px ${colors.gold}` }}
              />
              <span 
                className="absolute left-4 top-full mt-2 text-xs"
                style={{ color: colors.textLight }}
              >
                You Now
              </span>
              
              <div 
                className="absolute top-1/2 left-12 right-12 h-px"
                style={{ 
                  background: `linear-gradient(90deg, ${colors.gold}, ${colors.goldLight})`,
                  animation: 'pulse 2s ease-in-out infinite'
                }}
              />
              
              <div 
                className="absolute right-8 top-1/2 transform -translate-y-1/2 w-4 h-4 rounded-full"
                style={{ backgroundColor: colors.goldLight, boxShadow: `0 0 20px ${colors.goldLight}` }}
              />
              <span 
                className="absolute right-4 top-full mt-2 text-xs"
                style={{ color: colors.champagne }}
              >
                Your Twin
              </span>
            </div>
            
            <p style={{ color: colors.champagne, fontStyle: 'italic' }}>
              "Step into the body of your Twin on the prosperous timeline. 
              Look back at your current self with love. 
              The struggle is complete."
            </p>
          </div>
          
          <p className="text-sm mb-8" style={{ color: colors.textLight, opacity: 0.8 }}>
            Connect to the version that has the result NOW — not in the future.
            Placing it in the future weakens the cord.
          </p>
          
          <button
            onClick={() => { markComplete('cord'); goToSection(4); }}
            style={{
              background: `linear-gradient(135deg, ${colors.gold}, ${colors.goldDark})`,
              color: colors.black,
              padding: '0.75rem 2rem',
              borderRadius: '9999px',
              fontWeight: 500,
              border: 'none',
              cursor: 'pointer',
            }}
          >
            I Am Connected →
          </button>
        </div>
      </Section>
      
      {/* Encode Section - 20 Second Breath */}
      <Section id="encode">
        <div className="max-w-2xl text-center">
          <span style={{ color: colors.goldDark, letterSpacing: '0.2em', fontSize: '0.75rem' }}>
            STEP FOUR
          </span>
          <h2 
            className="text-3xl md:text-4xl font-light mt-2 mb-6"
            style={{ color: colors.gold }}
          >
            Encode the Frequency
          </h2>
          <p className="mb-8" style={{ color: colors.textLight, lineHeight: 1.8 }}>
            It takes 20 seconds for a blood cell to leave your heart, traverse your entire body, 
            and return. In this time, every cell receives the frequency you hold.
          </p>
          
          <div 
            className="p-8 rounded-lg mb-8"
            style={{ backgroundColor: colors.blackSoft }}
          >
            <BreathingTimer onComplete={() => markComplete('encode')} />
          </div>
          
          <p className="text-sm mb-8" style={{ color: colors.textLight, opacity: 0.8 }}>
            Hold the feeling of your Twin — their relaxation, their gratitude, their abundance — 
            as you breathe.
          </p>
          
          {completedSections.includes('encode') && (
            <button
              onClick={() => goToSection(5)}
              style={{
                background: `linear-gradient(135deg, ${colors.gold}, ${colors.goldDark})`,
                color: colors.black,
                padding: '0.75rem 2rem',
                borderRadius: '9999px',
                fontWeight: 500,
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Complete the Journey →
            </button>
          )}
        </div>
      </Section>
      
      {/* Integrate Section */}
      <Section id="integrate">
        <div className="max-w-2xl text-center">
          <div className="flex justify-center mb-6">
            <Merkaba active={currentSection === 5} size={120} />
          </div>

          <span style={{ color: colors.goldDark, letterSpacing: '0.2em', fontSize: '0.75rem' }}>
            INTEGRATION
          </span>
          <h2 
            className="text-3xl md:text-4xl font-light mt-2 mb-6"
            style={{ color: colors.gold }}
          >
            Your Daily Practice
          </h2>
          
          <div 
            className="p-8 rounded-lg mb-8 text-left"
            style={{ backgroundColor: colors.blackSoft }}
          >
            <p className="mb-4" style={{ color: colors.champagne, fontWeight: 500 }}>
              The 10-Minute Protocol:
            </p>
            <ol className="space-y-4" style={{ color: colors.textLight }}>
              <li className="flex gap-4">
                <span style={{ color: colors.gold }}>1.</span>
                <span><strong style={{ color: colors.white }}>Anchor</strong> — Check your safety. Breathe until you feel grounded.</span>
              </li>
              <li className="flex gap-4">
                <span style={{ color: colors.gold }}>2.</span>
                <span><strong style={{ color: colors.white }}>Illuminate</strong> — Feel into the exciting details of your vision.</span>
              </li>
              <li className="flex gap-4">
                <span style={{ color: colors.gold }}>3.</span>
                <span><strong style={{ color: colors.white }}>Cord</strong> — Step into your Twin. Look back with love.</span>
              </li>
              <li className="flex gap-4">
                <span style={{ color: colors.gold }}>4.</span>
                <span><strong style={{ color: colors.white }}>Encode</strong> — Three 20-second breath cycles, holding the frequency.</span>
              </li>
            </ol>
          </div>
          
          <p className="mb-8" style={{ color: colors.champagne, fontStyle: 'italic' }}>
            "This is the effortless way. It's the shortcut. It's the hack."
          </p>
          
          <p className="text-sm" style={{ color: colors.textLight, opacity: 0.8 }}>
            Your success is already achieved by your higher self. 
            All you're doing is removing the stress and allowing the inevitable to unfold.
          </p>
        </div>
      </Section>
    </div>
  );
};

export default FrequencyAlignmentPortal;
