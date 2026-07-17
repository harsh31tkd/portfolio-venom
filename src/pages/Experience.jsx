import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { GiSpiderMask, GiSkullCrossedBones, GiPumpkinLantern, GiBatwingEmblem, GiSuckeredTentacle, GiLightningStorm, GiNinjaMask, GiAlienStare, GiShield, GiHammerDrop, GiIronMask, GiVampireCape } from 'react-icons/gi';
import { getExperience } from '../backend/db';

export default function Experience() {
  const containerRef = useRef(null);
  const [experiences, setExperiences] = useState([]);
  
  // Track scrolling within this container to animate the map trail
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const scrollSpring = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 20,
    restDelta: 0.001
  });

  useEffect(() => {
    setExperiences(getExperience());
  }, []);

  return (
    <div ref={containerRef} style={{ position: 'relative', width: '100vw', minHeight: '100vh', overflow: 'hidden' }}>
      
      {/* Floating Superhero & Villain Background Icons */}
      <motion.div className="floating-icon" style={{ position: 'absolute', top: '12%', left: '4%', zIndex: -2, color: 'rgba(226, 54, 54, 0.4)' }} animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}>
        <GiSpiderMask size={80} />
      </motion.div>
      <motion.div className="floating-icon" style={{ position: 'absolute', top: '25%', right: '8%', zIndex: -2, color: 'rgba(168, 85, 247, 0.3)' }} animate={{ y: [0, 15, 0], scale: [1, 1.1, 1] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}>
        <GiAlienStare size={100} />
      </motion.div>
      <motion.div className="floating-icon" style={{ position: 'absolute', top: '40%', left: '15%', zIndex: -2, color: 'rgba(234, 179, 8, 0.4)' }} animate={{ y: [0, -25, 0], rotate: [0, -15, 0] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}>
        <GiLightningStorm size={75} />
      </motion.div>
      <motion.div className="floating-icon" style={{ position: 'absolute', top: '55%', right: '5%', zIndex: -2, color: 'rgba(74, 222, 128, 0.3)' }} animate={{ y: [0, 20, 0], rotate: [0, 10, 0] }} transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}>
        <GiBatwingEmblem size={85} />
      </motion.div>
      <motion.div className="floating-icon" style={{ position: 'absolute', top: '75%', left: '6%', zIndex: -2, color: 'rgba(255, 153, 0, 0.3)' }} animate={{ y: [0, -15, 0], scale: [1, 1.2, 1] }} transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}>
        <GiPumpkinLantern size={80} />
      </motion.div>
      <motion.div className="floating-icon" style={{ position: 'absolute', top: '85%', right: '12%', zIndex: -2, color: 'rgba(161, 161, 170, 0.3)' }} animate={{ y: [0, 30, 0], rotate: [0, -20, 0] }} transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}>
        <GiSuckeredTentacle size={110} />
      </motion.div>
      <motion.div className="floating-icon" style={{ position: 'absolute', top: '10%', right: '35%', zIndex: -2, color: 'rgba(226, 54, 54, 0.3)' }} animate={{ y: [0, -15, 0] }} transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}>
        <GiNinjaMask size={60} />
      </motion.div>
      <motion.div className="floating-icon" style={{ position: 'absolute', top: '90%', left: '30%', zIndex: -2, color: 'rgba(59, 130, 246, 0.4)' }} animate={{ y: [0, 20, 0], rotate: [0, 15, 0] }} transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut' }}>
        <GiShield size={85} />
      </motion.div>
      <motion.div className="floating-icon" style={{ position: 'absolute', top: '35%', right: '25%', zIndex: -2, color: 'rgba(161, 161, 170, 0.5)' }} animate={{ y: [0, -20, 0], scale: [1, 1.05, 1] }} transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}>
        <GiHammerDrop size={70} />
      </motion.div>
      <motion.div className="floating-icon" style={{ position: 'absolute', top: '20%', left: '30%', zIndex: -2, color: 'rgba(234, 179, 8, 0.4)' }} animate={{ y: [0, 15, 0], rotate: [0, -10, 0] }} transition={{ duration: 5.2, repeat: Infinity, ease: 'easeInOut' }}>
        <GiIronMask size={70} />
      </motion.div>
      <motion.div className="floating-icon" style={{ position: 'absolute', top: '65%', left: '25%', zIndex: -2, color: 'rgba(168, 85, 247, 0.3)' }} animate={{ y: [0, -25, 0], rotate: [0, 15, 0] }} transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut' }}>
        <GiVampireCape size={95} />
      </motion.div>

      <div className="container" style={{ position: 'relative', paddingTop: '4rem', paddingBottom: '8rem', zIndex: 1 }}>
        <h2 style={{ 
          fontSize: '4.5rem', 
          fontFamily: 'var(--font-venom)', 
          color: '#a855f7', 
          textAlign: 'center', 
          marginBottom: '2rem', 
          textShadow: '4px 4px 0 #000, 0 0 20px rgba(168,85,247,0.5)' 
        }}>
          Venom Treasure Map 🕸️
        </h2>

        {/* Winding Map Container */}
        <div style={{ position: 'relative', padding: '4rem 0', display: 'flex', flexDirection: 'column', gap: '10rem' }}>
          
          {/* Winding Map Trail (SVG S-Curve) */}
          <svg 
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }} 
            viewBox="0 0 100 100" 
            preserveAspectRatio="none"
          >
            {/* The Background Trail (Faded) */}
            <path 
              d="M 50,0 Q -10,30 50,50 Q 110,75 50,100" 
              stroke="rgba(226, 54, 54, 0.2)" 
              strokeWidth="4" 
              strokeDasharray="4 4" 
              fill="none" 
              vectorEffect="nonScalingStroke" 
            />
            {/* The Animated Glowing Trail */}
            <motion.path 
              d="M 50,0 Q -10,30 50,50 Q 110,75 50,100" 
              stroke="#a855f7" 
              strokeWidth="6" 
              strokeDasharray="4 4" 
              fill="none" 
              vectorEffect="nonScalingStroke" 
              style={{ pathLength: scrollSpring, filter: 'drop-shadow(0 0 10px #a855f7)' }}
            />
          </svg>

          {experiences.map((exp, index) => {
            const isLeft = index % 2 === 0;
            return (
              <motion.div 
                key={exp.id || index}
                style={{ 
                  width: '90%', 
                  maxWidth: '600px', 
                  alignSelf: isLeft ? 'flex-start' : 'flex-end', 
                  background: isLeft ? 'rgba(15,15,20,0.95)' : 'linear-gradient(135deg, rgba(20,10,30,0.95), rgba(0,0,0,0.98))', 
                  padding: '3rem', 
                  borderRadius: '16px', 
                  border: isLeft ? '3px solid #E23636' : '4px solid #a855f7', 
                  boxShadow: isLeft ? '10px 10px 0 #000' : '0 0 40px rgba(168,85,247,0.4), inset 0 0 20px rgba(168,85,247,0.2)', 
                  zIndex: 10, 
                  position: 'relative' 
                }}
                initial={{ opacity: 0, scale: 0.8, x: isLeft ? -50 : 50, rotate: isLeft ? -2 : 2 }}
                whileInView={{ opacity: 1, scale: 1, x: 0, rotate: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ type: 'spring', bounce: 0.5, duration: 1 }}
              >
                {/* Marker */}
                {isLeft ? (
                  <div style={{ position: 'absolute', top: '-25px', right: '-25px', background: '#E23636', padding: '12px', borderRadius: '50%', border: '4px solid #000' }}>
                     <GiSkullCrossedBones size={35} color="#000" />
                  </div>
                ) : (
                  <motion.div 
                    style={{ position: 'absolute', top: '-40px', left: '-40px', background: '#000', padding: '15px', borderRadius: '50%', border: '4px solid #a855f7', boxShadow: '0 0 30px #a855f7', zIndex: 20 }}
                    animate={{ scale: [1, 1.1, 1], boxShadow: ['0 0 20px #a855f7', '0 0 50px #a855f7', '0 0 20px #a855f7'] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                     <GiSpiderMask size={60} color="#a855f7" />
                  </motion.div>
                )}
                
                <h3 style={{ fontFamily: 'var(--font-venom)', fontSize: '2.5rem', color: isLeft ? '#E23636' : '#a855f7', marginBottom: '0.5rem', letterSpacing: '2px', textShadow: '2px 2px 0 #000' }}>{exp.role}</h3>
                
                {exp.link ? (
                  <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '2rem', marginBottom: '1.5rem' }}>
                    <a href={exp.link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', transition: 'transform 0.3s ease' }} onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'} onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}>
                      <h4 style={{ fontFamily: 'var(--font-symbiote)', fontSize: '1.4rem', color: '#fff', margin: 0, textShadow: '2px 2px 0 #000', borderBottom: `2px dashed ${isLeft ? '#E23636' : '#a855f7'}` }}>
                        {exp.company}
                      </h4>
                    </a>
                    {exp.appLink && (
                      <a href={exp.appLink} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '1.2rem', letterSpacing: '1px', textDecoration: 'none', display: 'inline-block' }}>
                        Play Store 📱
                      </a>
                    )}
                  </div>
                ) : (
                  <h4 style={{ fontFamily: 'var(--font-symbiote)', fontSize: '1.4rem', color: '#fff', marginBottom: '1.5rem', textShadow: '2px 2px 0 #000' }}>{exp.company}</h4>
                )}
                
                <div style={{ background: isLeft ? 'none' : 'rgba(0,0,0,0.5)', padding: isLeft ? '0' : '1.5rem', borderRadius: '8px', borderLeft: isLeft ? 'none' : '4px solid var(--accent-red)' }}>
                  <ul style={{ color: '#e4e4e7', paddingLeft: '1.5rem', lineHeight: '1.8', fontSize: '1.15rem' }}>
                    {exp.points && exp.points.map((point, i) => (
                      <li key={i}>{point}</li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}

        </div>
      </div>
    </div>
  );
}
