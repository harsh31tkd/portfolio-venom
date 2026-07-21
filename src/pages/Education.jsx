import React, { useState, useEffect, useCallback } from 'react';
import { getEducation, getEducationSkills, getEducationImage } from '../backend/db';
import { motion } from 'framer-motion';


const ShatteredTerminal = ({ edu, delay = 0 }) => {
  // Format the title depending on degree level
  let title = `[${edu.degreeLevel?.toUpperCase() || 'EDUCATION'}]`;
  if (edu.degreeLevel === 'PhD') {
    title = `[PHD: ${edu.phdResearchArea?.toUpperCase().replace(/\s+/g, '_') || 'RESEARCH'}]`;
  } else if (edu.degreeName) {
    title = `[${edu.degreeName.toUpperCase().replace(/\s+/g, '_')}]`;
  }

  return (
    <motion.div 
      className="broken-screen" 
      initial={{ opacity: 0, x: 50 }} 
      whileInView={{ opacity: 1, x: 0 }} 
      viewport={{ once: true }} 
      transition={{ delay }}
      style={{ position: 'relative' }}
    >
      {/* 2D Electricity Sparks (Stretched) */}
      <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 10 }} viewBox="0 0 400 200" preserveAspectRatio="none">
        {/* Left Green Bolt */}
        <motion.path 
          d="M 10,0 L 30,40 L 5,60 L 40,100 L 10,120 L 50,160 L 20,200"
          stroke="#fff" 
          strokeWidth="2" 
          fill="none"
          vectorEffect="nonScalingStroke"
          style={{ filter: 'drop-shadow(0 0 8px #4ade80)' }}
          animate={{ opacity: [0, 0, 1, 0.2, 1, 0, 0, 0, 0, 0, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'linear', delay: delay }}
        />
        {/* Right Purple Bolt */}
        <motion.path 
          d="M 390,200 L 370,160 L 395,140 L 360,100 L 390,80 L 350,40 L 380,0"
          stroke="#fff" 
          strokeWidth="2" 
          fill="none"
          vectorEffect="nonScalingStroke"
          style={{ filter: 'drop-shadow(0 0 8px #a855f7)' }}
          animate={{ opacity: [0, 0, 0, 0, 0, 1, 0.2, 1, 0, 0, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear', delay: delay + 0.5 }}
        />
      </svg>

      {/* Actual Glass Crack Dent (Preserved Aspect Ratio Top Right) */}
      <svg style={{ position: 'absolute', top: 0, right: 0, width: '150px', height: '150px', pointerEvents: 'none', zIndex: 11 }} viewBox="0 0 100 100" preserveAspectRatio="xMaxYMin meet">
        <radialGradient id="dentGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.4)" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        
        {/* Epicenter */}
        <circle cx="80" cy="20" r="30" fill="url(#dentGlow)" />
        <circle cx="80" cy="20" r="2" fill="rgba(255,255,255,0.9)" />
        <circle cx="80" cy="20" r="8" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="0.5" />
        <circle cx="80" cy="20" r="16" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="0.5" />
        <circle cx="80" cy="20" r="24" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
        
        {/* Deep Cracks */}
        <path 
          d="M 80,20 L 40,30 L 10,25
             M 80,20 L 70,60 L 80,95
             M 80,20 L 100,50 L 100,80
             M 80,20 L 50,5
             M 40,30 L 45,65 L 30,90
             M 70,60 L 50,80
             M 45,65 L 60,85" 
          stroke="rgba(255,255,255,0.5)" 
          strokeWidth="1" 
          fill="none" 
        />
        {/* Micro Cracks */}
        <path 
          d="M 60,25 L 65,45 M 85,35 L 90,60 M 30,27 L 40,40 M 75,70 L 85,85" 
          stroke="rgba(255,255,255,0.2)" 
          strokeWidth="0.5" 
          fill="none" 
        />
      </svg>

      <div style={{ position: 'relative', zIndex: 20 }}>
        <h3 className="terminal-title" style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>{title}</h3>
        <p className="terminal-text" style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: '#fff' }}>&gt; INST: {edu.institution}</p>
        
        {edu.board && <p className="terminal-text" style={{ opacity: 0.8 }}>&gt; BOARD: {edu.board}</p>}
        {edu.fieldOfStudy && <p className="terminal-text" style={{ opacity: 0.8 }}>&gt; FIELD: {edu.fieldOfStudy}</p>}
        {edu.phdThesis && <p className="terminal-text" style={{ opacity: 0.8 }}>&gt; THESIS: {edu.phdThesis}</p>}
        
        <p className="terminal-text" style={{ opacity: 0.8, color: '#eab308' }}>
          &gt; TIMELINE: {edu.pursuing ? `${edu.startingYear || 'N/A'} - Present` : (edu.fromTo || 'N/A')} {edu.yearOfPassing ? `(Class of ${edu.yearOfPassing})` : ''}
        </p>
        
        <p className="terminal-text" style={{ opacity: 0.8, color: '#4ade80' }}>
          &gt; STATUS: {edu.pursuing ? 'PURSUING...' : (edu.phdStatus ? edu.phdStatus.toUpperCase() : 'COMPLETED')}
        </p>
        
        {edu.percentage && (
          <p className="terminal-text" style={{ opacity: 0.8, color: '#a855f7' }}>&gt; SCORE: {edu.percentage}</p>
        )}

        {edu.description && (
          <div style={{ marginTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1rem' }}>
            {edu.description.split('\n').map((line, i) => (
              <p key={i} className="terminal-text" style={{ opacity: 0.7, fontSize: '0.95rem', marginBottom: '0.2rem' }}>{line}</p>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default function Education() {
  const [educationData, setEducationData] = useState([]);
  const [skills, setSkills] = useState([]);
  const [imageSrc, setImageSrc] = useState('/image.png');

  useEffect(() => {
    getEducation().then(setEducationData);
    getEducationSkills().then(setSkills);
    getEducationImage().then(bg => {
      if (bg) setImageSrc(bg);
    });
  }, []);

  // Calculate random floating positions for the hacked packets around Venom
  const getPacketStyle = (skill, idx) => {
    if (skill.x !== undefined && skill.y !== undefined) {
      return {
        left: `${skill.x}%`,
        top: `${skill.y}%`,
        zIndex: skill.zIndex || 50,
        transform: 'translate(-50%, -50%)',
        animationDelay: `${idx * 0.3}s`
      };
    }

    const positions = [
      { top: '5%', left: '10%' }, { top: '12%', right: '5%' },
      { top: '25%', left: '5%' }, { top: '35%', right: '0%' },
      { top: '50%', left: '2%' }, { top: '60%', right: '2%' },
      { top: '75%', left: '0%' }, { top: '85%', right: '5%' },
      { top: '2%', left: '45%' }, /* Python moved to top center */
      { top: '95%', left: '40%' },
      { top: '0%', left: '70%' }, { top: '90%', left: '15%' },
      { top: '40%', left: '15%' }, { top: '70%', right: '20%' },
      { top: '45%', right: '5%' }, { top: '80%', left: '30%' }, // Git moved near Express
    ];
    let pos = positions[idx % positions.length];
    
    return {
      ...pos,
      zIndex: 50,
      animationDelay: `${idx * 0.3}s`
    };
  };

  return (
    <div style={{ position: 'relative', minHeight: '100vh', width: '100%', overflow: 'hidden' }}>
      

      <div className="container" style={{ position: 'relative', paddingTop: '4rem', paddingBottom: '8rem', zIndex: 1 }}>
        <h2 className="edu-page-title">
          SYSTEM_BREACH // EDUCATION
        </h2>

        <div className="edu-layout">
          
          {/* Left Side: Venom + Floating Data Packets */}
          <div className="edu-left-side">
            
            <motion.img 
              src={imageSrc} 
              alt="Venom Hack"
              className="edu-venom-img"
              style={{ filter: 'drop-shadow(0 0 40px rgba(74,222,128,0.4)) hue-rotate(-20deg) brightness(1.2)', zIndex: 10 }}
              animate={{ y: [-15, 15, -15] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            />
            
            {/* Hacked Packet Skills Orbiting */}
            <div className="skills-wrapper">
              {skills.map((skill, idx) => (
                <motion.div 
                  key={skill.id || idx}
                  className="hacked-packet"
                  style={getPacketStyle(skill, idx)}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ scale: 1.2, zIndex: 99, background: '#4ade80', color: '#000', boxShadow: '0 0 30px #4ade80' }}
                >
                  {`<${skill.name || skill}/>`}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Side: Broken Screens (Education) */}
          <div className="edu-right-side">
            
            {educationData.map((edu, idx) => (
              <ShatteredTerminal 
                key={edu.id || idx}
                edu={edu}
                delay={idx * 0.15}
              />
            ))}

          </div>
        </div>
      </div>
    </div>
  );
}
