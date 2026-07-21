import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { GiSpiderMask, GiPumpkinLantern, GiSuckeredTentacle, GiSpiderAlt, GiLightningStorm, GiBatwingEmblem, GiSpiderWeb, GiAlienStare } from 'react-icons/gi';
import { getIntro } from '../backend/db';
export default function Home() {
  const [intro, setIntro] = useState({ title: '', subtitle: '', bio: '' });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX - window.innerWidth / 2) / 35,
        y: (e.clientY - window.innerHeight / 2) / 35
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    getIntro().then(setIntro);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div style={{ position: 'relative', minHeight: 'calc(100vh - 80px)', overflow: 'hidden', width: '100%' }}>
      
      {/* --- FLOATING CHARACTERS / WEAPONS ON LEFT AND RIGHT --- */}
      
      {/* LEFT SIDE */}
      <motion.div
        className="floating-icon"
        style={{ position: 'fixed', top: '15vh', left: '3vw', zIndex: 0, color: 'var(--accent-red)' }}
        animate={{ y: [0, -15, 0], rotate: [0, -5, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <GiSpiderMask size={100} />
      </motion.div>
      
      <motion.div
        className="floating-icon"
        style={{ position: 'fixed', top: '45vh', left: '15vw', zIndex: 0, color: '#eab308' }}
        animate={{ y: [0, -20, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <GiLightningStorm size={90} />
      </motion.div>

      <motion.div
        className="floating-icon"
        style={{ position: 'fixed', bottom: '15vh', left: '4vw', zIndex: 0, color: '#ffffff' }}
        animate={{ y: [0, 15, 0], rotate: [0, -10, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <GiSpiderAlt size={100} />
      </motion.div>

      {/* RIGHT SIDE */}
      <motion.div
        className="floating-icon"
        style={{ position: 'fixed', top: '20vh', right: '3vw', zIndex: 0, color: '#ff9900' }}
        animate={{ y: [0, -20, 0], rotate: [0, 15, 0] }}
        transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut' }}
      >
        <GiPumpkinLantern size={90} />
      </motion.div>

      <motion.div
        className="floating-icon"
        style={{ position: 'fixed', top: '55vh', right: '20vw', zIndex: 0, color: '#4ade80' }}
        animate={{ y: [0, 20, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <GiBatwingEmblem size={100} />
      </motion.div>

      <motion.div
        className="floating-icon"
        style={{ position: 'fixed', bottom: '20vh', right: '4vw', zIndex: 0, color: '#a1a1aa' }}
        animate={{ y: [0, 25, 0], rotate: [0, -15, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <GiSuckeredTentacle size={110} />
      </motion.div>


      {/* --- HERO CONTENT --- */}
      <div className="container">
        <section className="hero" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', padding: '2rem 0' }}>
          
          <div style={{ position: 'relative', margin: '0 auto', maxWidth: '950px', width: '100%', zIndex: 10 }}>
            
            {/* --- ENHANCED RESPONSIVE INTRO BOX --- */}
            <motion.div 
              className="hero-box"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.02 }}
              transition={{ 
                opacity: { duration: 0.8 },
                scale: { type: "spring", stiffness: 100, damping: 15 } 
              }}
            >
              {/* --- ULTIMATE SPIDERMAN BACKGROUND WEB (REALISTIC) --- */}
              <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none', overflow: 'hidden', borderRadius: '24px' }}>
                <GiSpiderWeb size={600} style={{ position: 'absolute', top: '-250px', left: '-250px', color: 'var(--accent-red)', transform: 'rotate(15deg)', opacity: 0.12 }} />
                <GiSpiderWeb size={600} style={{ position: 'absolute', bottom: '-250px', right: '-250px', color: 'var(--accent-blue)', transform: 'rotate(195deg)', opacity: 0.12 }} />
                
                {/* Custom Background Image (Transparent) */}
                <img 
                  src={intro.bgImage || "/venom-accurate-transparent.png"} 
                  alt="Hero background" 
                  className="hero-bg-img"
                />
              </div>

              <div style={{ position: 'relative', zIndex: 1 }}>
                <h2 style={{ fontFamily: 'var(--font-comic)', color: 'var(--accent-red)', fontSize: '2.5rem', letterSpacing: '3px' }}>
                Hello, I am
              </h2>
              
              <h1 className="glitch-hover hero-title">
                {intro.title || 'HARSH'}
              </h1>
              
              <h3 className="hero-subtitle">
                {intro.subtitle || 'Full Stack & Flutter Developer'}
              </h3>
              
              <div className="venom-intro-container" style={{ whiteSpace: 'pre-line' }}>
                {intro.bio}
              </div>
              
              <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
                {intro.buttons && intro.buttons.length > 0 ? (
                  intro.buttons.map((btn, idx) => (
                    btn.isExternal ? (
                      <a key={btn.id || idx} href={btn.link} target="_blank" rel="noopener noreferrer" className={idx % 2 === 0 ? "btn-primary" : "btn-secondary"}>
                        {btn.label}
                      </a>
                    ) : (
                      <Link key={btn.id || idx} to={btn.link} className={idx % 2 === 0 ? "btn-primary" : "btn-secondary"}>
                        {btn.label}
                      </Link>
                    )
                  ))
                ) : (
                  <>
                    <Link to="/projects" className="btn-primary">View Projects</Link>
                    <Link to="/contact" className="btn-secondary">Contact Me</Link>
                  </>
                )}
              </div>
              
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
}
