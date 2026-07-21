import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getAboutMe } from '../backend/db';
import { GiSpiderWeb, GiSuckeredTentacle, GiSpiderAlt, GiBatwingEmblem, GiSpiderMask } from 'react-icons/gi';
import { Link } from 'react-router-dom';
import AboutBackground from '../components/AboutBackground';

export default function About() {
  const [about, setAbout] = useState({ title: '', content: '', image: null });

  useEffect(() => {
    setAbout(getAboutMe());
  }, []);

  return (
    <div style={{ position: 'relative', minHeight: 'calc(100vh - 80px)', overflow: 'hidden', padding: '3rem 0', width: '100%' }}>
      <AboutBackground />
      {/* FLOATING VENOM/SPIDER ELEMENTS */}
      <motion.div
        className="floating-icon"
        style={{ position: 'absolute', top: '10%', left: '5%', zIndex: 0, color: 'var(--accent-red)', opacity: 0.4 }}
        animate={{ y: [0, -25, 0], rotate: [0, 15, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <GiSuckeredTentacle size={140} />
      </motion.div>

      <motion.div
        className="floating-icon"
        style={{ position: 'absolute', bottom: '15%', right: '8%', zIndex: 0, color: 'var(--accent-blue)', opacity: 0.3 }}
        animate={{ y: [0, 25, 0], rotate: [0, -15, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      >
        <GiSpiderAlt size={160} />
      </motion.div>

      <motion.div
        className="floating-icon"
        style={{ position: 'absolute', top: '40%', right: '4%', zIndex: 0, color: '#333', opacity: 0.6 }}
        animate={{ scale: [1, 1.15, 1], rotate: [0, 5, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <GiBatwingEmblem size={120} />
      </motion.div>

      <div className="container" style={{ position: 'relative', zIndex: 10 }}>
        <motion.div 
          initial={{ opacity: 0, scale: 0.8, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, type: "spring", bounce: 0.5 }}
        >
          <h1 className="page-title text-center glitch-hover" style={{ marginBottom: '3rem', fontSize: 'clamp(2.5rem, 5vw, 4rem)', textShadow: '4px 4px 0px rgba(226, 54, 54, 0.6)' }}>
            <span className="text-red">WHO</span> IS <span className="text-blue">VENOM?</span>
          </h1>

          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '2.5rem', 
            alignItems: 'center', 
            justifyContent: 'center',
            background: 'rgba(10, 10, 15, 0.85)',
            border: '4px solid var(--accent-red)',
            boxShadow: '15px 15px 0px rgba(0,0,0,0.9), 0 0 40px rgba(226,54,54,0.4)',
            borderRadius: '0 40px 0 40px',
            padding: '4rem 2rem',
            maxWidth: '900px',
            margin: '0 auto',
            backdropFilter: 'blur(12px)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            
            {/* Background Spiders in the card */}
            <GiSpiderAlt size={350} style={{ position: 'absolute', top: '-100px', left: '-100px', color: 'var(--accent-red)', transform: 'rotate(25deg)', opacity: 0.15, zIndex: 0 }} />
            <GiSpiderMask size={400} style={{ position: 'absolute', bottom: '-150px', right: '-100px', color: 'var(--accent-blue)', transform: 'rotate(20deg)', opacity: 0.15, zIndex: 0 }} />

            {/* Profile Image Section */}
            {about.image && (
              <motion.div 
                style={{ display: 'flex', justifyContent: 'center', zIndex: 2, width: '100%' }}
                whileHover={{ scale: 1.05, rotate: -2 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <div style={{ position: 'relative' }}>
                  <img 
                    src={about.image} 
                    alt="About Me" 
                    style={{ 
                      width: '100%', 
                      maxWidth: '300px', 
                      height: 'auto', 
                      objectFit: 'cover', 
                      border: '4px solid #fff', 
                      boxShadow: '-10px 10px 0px var(--accent-blue)',
                      filter: 'contrast(1.15) drop-shadow(0 0 15px rgba(226, 54, 54, 0.6))',
                      borderRadius: '10px 50px 10px 50px',
                      backgroundColor: 'rgba(0,0,0,0.6)'
                    }}
                  />
                  {/* Symbiote overlay effect on image */}
                  <GiSuckeredTentacle size={80} style={{ position: 'absolute', bottom: '-20px', right: '-20px', color: 'var(--accent-red)', transform: 'rotate(-45deg)', filter: 'drop-shadow(3px 3px 0 #000)' }} />
                </div>
              </motion.div>
            )}
            
            {/* Text Content Section */}
            <div style={{ zIndex: 2, display: 'flex', flexDirection: 'column', gap: '2rem', alignItems: 'center', width: '100%' }}>
              <h2 className="glitch-hover text-center" style={{ 
                color: '#fff', 
                fontSize: 'clamp(2rem, 3vw, 2.8rem)', 
                fontFamily: 'var(--font-comic)',
                textTransform: 'uppercase',
                letterSpacing: '3px',
                borderBottom: '4px solid var(--accent-red)',
                paddingBottom: '0.5rem',
                display: 'inline-block',
                textShadow: '3px 3px 0px #000',
                textAlign: 'center'
              }}>
                {about.title || 'THE SYMBIOTE HOST'}
              </h2>
              
              <div style={{ 
                color: '#f4f4f5', 
                fontSize: '1.25rem', 
                fontWeight: '500',
                lineHeight: '1.9', 
                whiteSpace: 'pre-line', 
                fontFamily: 'var(--font-main)',
                background: 'linear-gradient(135deg, rgba(0,0,0,0.8), rgba(20,0,10,0.6))',
                padding: '2.5rem',
                borderRadius: '12px',
                borderTop: '5px solid var(--accent-blue)',
                borderBottom: '5px solid var(--accent-red)',
                boxShadow: '0 10px 30px rgba(0,0,0,0.8), inset 0 0 25px rgba(226,54,54,0.15)',
                textAlign: 'justify',
                width: '100%',
                maxWidth: '750px',
                textShadow: '2px 2px 4px rgba(0,0,0,0.9)'
              }}>
                {about.content || 'We are venom...'}
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '2rem', marginTop: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link 
                    to="/projects" 
                    style={{
                      background: 'var(--accent-red)',
                      color: '#fff',
                      padding: '1rem 2.5rem',
                      fontFamily: 'var(--font-comic)',
                      fontSize: '1.2rem',
                      fontWeight: 'bold',
                      textTransform: 'uppercase',
                      letterSpacing: '2px',
                      textDecoration: 'none',
                      display: 'inline-block',
                      border: '2px solid #000',
                      boxShadow: '5px 5px 0px #000',
                      transition: 'all 0.3s ease',
                      clipPath: 'polygon(8% 0, 100% 0, 92% 100%, 0% 100%)'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = 'var(--accent-blue)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = 'var(--accent-red)';
                    }}
                  >
                    View Mutations
                  </Link>
                </motion.div>
                
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link 
                    to="/contact" 
                    style={{
                      background: 'transparent',
                      color: '#fff',
                      padding: '1rem 2.5rem',
                      fontFamily: 'var(--font-comic)',
                      fontSize: '1.2rem',
                      fontWeight: 'bold',
                      textTransform: 'uppercase',
                      letterSpacing: '2px',
                      textDecoration: 'none',
                      display: 'inline-block',
                      border: '3px solid var(--accent-blue)',
                      boxShadow: '5px 5px 0px var(--accent-blue)',
                      transition: 'all 0.3s ease',
                      clipPath: 'polygon(0 0, 92% 0, 100% 100%, 8% 100%)'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = 'rgba(168, 85, 247, 0.2)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = 'transparent';
                    }}
                  >
                    Host Link (Contact)
                  </Link>
                </motion.div>
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </div>
  );
}
