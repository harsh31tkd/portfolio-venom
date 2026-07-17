import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import venomGif from '../assets/Tom Hardy Sticker by Venom Movie.gif';
import flyingGif from '../assets/Flying Tom Holland Sticker by Spider-Man.gif';
import spideyGif from '../assets/Spider-Man Thumbs Up Sticker.gif';
import InteractiveHeroBackground from '../components/InteractiveHeroBackground';
import { getCompanyProjects, getPersonalProjects } from '../backend/db';

/* ── Billboard Component ────────────────────────────────── */
const Billboard = ({ title, accent = 'red', delay = 0 }) => (
  <motion.div
    className="billboard-section"
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.7, delay }}
  >
    <div className="billboard-board">
      <div className="billboard-light l1" />
      <div className="billboard-light l2" />
      <div className="billboard-light l3" />
      <div className="billboard-light l4" />
      <div className="billboard-light l5" />
      <div className="billboard-label">— Symbiote Classified —</div>
      <h2 className={`billboard-heading ${accent}`}>{title}</h2>
    </div>
    <div className="billboard-pole-left" />
    <div className="billboard-pole-right" />
  </motion.div>
);

/* ── Project Card Component ─────────────────────────────── */
const accents  = ['red', 'blue', 'purple', 'red', 'blue', 'purple'];
const icons    = ['🧬', '🌐', '⚙️', '🌿', '📱', '🎵', '🎬'];

const ProjectCard = ({ project, idx }) => (
  <motion.div
    className="project-card"
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-40px' }}
    transition={{ duration: 0.5, delay: idx * 0.08 }}
  >
    <div className={`project-card-accent ${accents[idx % accents.length]}`} />
    <div className="project-card-body">
      <div className="project-card-icon">{icons[idx % icons.length]}</div>
      <div className="project-card-title">{project.title}</div>
      <div className="project-card-tech">{project.tech}</div>
      <div className="project-card-desc">{project.desc}</div>
    </div>
    <div className="project-card-footer">
      {project.tech.split(',').slice(0, 3).map((t, i) => (
        <span key={i} className="project-card-tag">{t.trim()}</span>
      ))}
    </div>
  </motion.div>
);

/* ── Symbiote Floating Particles ────────────────────────── */
const particles = [
  { w: 60, h: 60, top: '15%', left: '8%',  dur: '7s',  delay: '0s'   },
  { w: 40, h: 40, top: '35%', right: '6%', dur: '9s',  delay: '1s'   },
  { w: 80, h: 80, top: '60%', left: '4%',  dur: '11s', delay: '2s'   },
  { w: 30, h: 30, top: '25%', left: '88%', dur: '8s',  delay: '0.5s' },
  { w: 50, h: 50, top: '75%', right: '12%',dur: '10s', delay: '3s'   },
  { w: 25, h: 25, top: '50%', left: '92%', dur: '6s',  delay: '1.5s' },
];

/* ── Main Page ──────────────────────────────────────────── */
export default function Projects() {
  const [companyProjects, setCompanyProjects] = useState([]);
  const [personalProjects, setPersonalProjects] = useState([]);

  useEffect(() => {
    setCompanyProjects(getCompanyProjects());
    setPersonalProjects(getPersonalProjects());
  }, []);

  return (
    <div className="projects-page">
      {/* ── Night Sky Background ── */}
      <div className="city-bg" />

      {/* ── Interactive Hero Symbols ── */}
      <InteractiveHeroBackground />

      {/* ── Floating symbiote particles ── */}
      {particles.map((p, i) => (
        <div
          key={i}
          className="symbiote-particle"
          style={{
            width:  p.w,
            height: p.h,
            top:    p.top,
            left:   p.left,
            right:  p.right,
            animationDuration:  p.dur,
            animationDelay:     p.delay,
            opacity: 0.5,
          }}
        />
      ))}

      {/* ── Fixed Character Layer ── */}
      <div className="characters-layer">

        {/* VENOM — placed at bottom of the page */}
        <div className="venom-bottom">
          <img
            src={venomGif}
            alt="Venom"
            className="character-gif venom-gif"
          />
        </div>

        {/* FLYING SPIDER-MAN — soars across the screen */}
        <div className="goblin-wrapper">
          <img
            src={flyingGif}
            alt="Flying Spider-Man"
            className="character-gif flying-gif"
          />
        </div>

        {/* SPIDEY THUMBS UP — left side, starting from navbar */}
        <div className="spidey-left">
          <img
            src={spideyGif}
            alt="Spider-Man"
            className="character-gif spidey-gif"
          />
        </div>

      </div>

      {/* ── Page Content ── */}
      <div className="projects-content">

        {/* Page title */}
        <motion.div
          className="projects-page-title"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1>Projects</h1>
          <p>Code Woven in Symbiote Darkness</p>
        </motion.div>

        {/* ── COMPANY SECTION ── */}
        <Billboard title="Company Projects" accent="red" delay={0.2} />

        <div className="projects-grid">
          {companyProjects.map((p, i) => (
            <ProjectCard key={p.title} project={p} idx={i} />
          ))}
        </div>

        {/* ── PERSONAL SECTION ── */}
        <Billboard title="Personal Projects" accent="blue" delay={0} />

        <div className="projects-grid">
          {personalProjects.map((p, i) => (
            <ProjectCard key={p.title} project={p} idx={i} />
          ))}
        </div>

      </div>
    </div>
  );
}
