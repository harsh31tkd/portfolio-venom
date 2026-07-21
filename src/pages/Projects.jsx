import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import venomGif from '../assets/Tom Hardy Sticker by Venom Movie.gif';
import flyingGif from '../assets/Flying Tom Holland Sticker by Spider-Man.gif';
import spideyGif from '../assets/Spider-Man Thumbs Up Sticker.gif';
import InteractiveHeroBackground from '../components/InteractiveHeroBackground';
import { getCompanyProjects, getPersonalProjects, getCasualProjects } from '../backend/db';
import { FaGithub, FaGooglePlay, FaGlobe, FaTimes } from 'react-icons/fa';

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

const ProjectCard = ({ project, idx, onClick }) => (
  <motion.div
    className="project-card"
    onClick={() => onClick(project)}
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-40px' }}
    transition={{ duration: 0.5, delay: idx * 0.08 }}
    style={{ cursor: 'pointer' }}
  >
    <div className={`project-card-accent ${accents[idx % accents.length]}`} />
    <div className="project-card-body">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div className="project-card-icon">{project.icon || icons[idx % icons.length]}</div>
        {project.status && (
          <span style={{ fontSize: '0.75rem', padding: '0.2rem 0.5rem', borderRadius: '12px', background: 'rgba(255,255,255,0.1)', color: '#ccc' }}>
            {project.status}
          </span>
        )}
      </div>
      <div className="project-card-title">{project.title}</div>
      {project.companyName && <div style={{ fontSize: '0.85rem', color: '#888', marginBottom: '0.5rem' }}>{project.companyName}</div>}
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

/* ── Project Modal Component ────────────────────────────── */
const ProjectModal = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div className="project-modal-overlay" onClick={onClose}>
      <motion.div
        className="project-modal-content"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          style={{
            position: 'absolute', top: '1rem', right: '1rem',
            background: 'none', border: 'none', color: '#fff',
            fontSize: '1.5rem', cursor: 'pointer', zIndex: 10
          }}
        >
          <FaTimes />
        </button>

        <div className="project-modal-body">
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', marginBottom: '1rem', paddingRight: '2rem', minWidth: 0 }}>
            <span style={{ fontSize: '2.5rem', flexShrink: 0 }}>{project.icon || '💻'}</span>
            <h2 style={{ fontSize: 'clamp(1.5rem, 6vw, 2rem)', margin: 0, fontFamily: 'var(--font-heading)', color: 'var(--accent-red)', wordBreak: 'break-word', overflowWrap: 'anywhere', minWidth: 0, flex: 1 }}>{project.title}</h2>
          </div>
        
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
          {project.companyName && <span style={{ color: '#888', fontWeight: 'bold' }}>{project.companyName}</span>}
          {project.status && <span style={{ color: '#aaa', background: '#222', padding: '2px 8px', borderRadius: '12px', fontSize: '0.9rem' }}>{project.status}</span>}
        </div>

        <p style={{ fontSize: '1.1rem', color: '#ddd', lineHeight: '1.6', marginBottom: '1.5rem' }}>{project.desc}</p>
        
        <div style={{ marginBottom: '1.5rem' }}>
          <strong style={{ display: 'block', color: 'var(--accent-blue)', marginBottom: '0.5rem' }}>Tech Stack</strong>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {project.tech.split(',').map((t, i) => (
              <span key={i} style={{ background: 'rgba(56, 189, 248, 0.1)', color: '#38bdf8', padding: '4px 12px', borderRadius: '16px', fontSize: '0.9rem' }}>{t.trim()}</span>
            ))}
          </div>
        </div>

        {project.workflow && (
          <div style={{ marginBottom: '1.5rem', background: '#1a1a1a', padding: '1rem', borderRadius: '8px', borderLeft: '4px solid #a855f7' }}>
            <strong style={{ color: '#a855f7', display: 'block', marginBottom: '0.5rem' }}>Workflow & Architecture</strong>
            <p style={{ color: '#ccc', margin: 0, whiteSpace: 'pre-line' }}>{project.workflow}</p>
          </div>
        )}

        {project.whatIDid && (
          <div style={{ marginBottom: '2rem' }}>
            <strong style={{ color: '#4ade80', display: 'block', marginBottom: '0.5rem' }}>Key Contributions</strong>
            <ul style={{ color: '#ccc', paddingLeft: '1.5rem', margin: 0 }}>
              {project.whatIDid.split('\n').filter(line => line.trim()).map((line, i) => (
                <li key={i} style={{ marginBottom: '0.5rem' }}>{line}</li>
              ))}
            </ul>
          </div>
        )}

        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid #333' }}>
          {project.projectLink && (
            <a href={project.projectLink} target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#fff', textDecoration: 'none', background: '#333', padding: '0.5rem 1rem', borderRadius: '8px', transition: 'background 0.2s' }} className="hover-bg-444">
              <FaGithub /> Source Code
            </a>
          )}
          {project.appLink && (
            <a href={project.appLink} target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#fff', textDecoration: 'none', background: '#16a34a', padding: '0.5rem 1rem', borderRadius: '8px', transition: 'background 0.2s' }} className="hover-bg-15803d">
              <FaGooglePlay /> Google Play
            </a>
          )}
          {project.liveLink && (
            <a href={project.liveLink} target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#fff', textDecoration: 'none', background: 'var(--accent-red)', padding: '0.5rem 1rem', borderRadius: '8px', transition: 'filter 0.2s' }} className="hover-brightness-110">
              <FaGlobe /> Live Preview
            </a>
          )}
        </div>
        </div>
      </motion.div>
    </div>
  );
};


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
  const [casualProjects, setCasualProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    getCompanyProjects().then(setCompanyProjects);
    getPersonalProjects().then(setPersonalProjects);
    getCasualProjects().then(setCasualProjects);
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
            <ProjectCard key={p.title} project={p} idx={i} onClick={setSelectedProject} />
          ))}
        </div>

        {/* ── PERSONAL SECTION ── */}
        <Billboard title="Personal Projects" accent="blue" delay={0} />

        <div className="projects-grid">
          {personalProjects.map((p, i) => (
            <ProjectCard key={p.title} project={p} idx={i} onClick={setSelectedProject} />
          ))}
        </div>

        {/* ── CASUAL SECTION ── */}
        <Billboard title="Casual Projects" accent="purple" delay={0} />

        <div className="projects-grid">
          {casualProjects.map((p, i) => (
            <ProjectCard key={p.title} project={p} idx={i} onClick={setSelectedProject} />
          ))}
        </div>

      </div>

      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </div>
  );
}
