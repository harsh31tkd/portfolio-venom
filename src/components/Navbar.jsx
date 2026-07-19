import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShieldAlert, Menu, X } from 'lucide-react';
import { GiSpiderWeb, GiCobweb } from 'react-icons/gi';
import { getResume } from '../backend/db';
import './Navbar.css';

const DeadpoolLogo = ({ size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" style={{ filter: 'drop-shadow(0 0 5px rgba(226,54,54,0.5))' }}>
    <circle cx="50" cy="50" r="45" fill="#E23636" stroke="#111" strokeWidth="4" />
    <line x1="50" y1="5" x2="50" y2="95" stroke="#111" strokeWidth="8" />
    <ellipse cx="30" cy="50" rx="15" ry="25" fill="#111" transform="rotate(-15 30 50)" />
    <ellipse cx="70" cy="50" rx="15" ry="25" fill="#111" transform="rotate(15 70 50)" />
    <ellipse cx="32" cy="47" rx="5" ry="10" fill="#FFF" transform="rotate(-25 32 47)" />
    <ellipse cx="68" cy="47" rx="5" ry="10" fill="#FFF" transform="rotate(25 68 47)" />
  </svg>
);

export default function Navbar() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');
  const [resumeUrl, setResumeUrl] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setResumeUrl(getResume());
  }, [location.pathname]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <nav className="navbar">
      
      {/* Clean Comic Style Web Background & Web String */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: -1, overflow: 'hidden' }}>
        
        {/* Background Webs (4 Unique Webs) */}
        <GiSpiderWeb size={180} style={{ position: 'absolute', top: '-60px', left: '2%', color: 'var(--text-main)', opacity: 0.15, transform: 'rotate(15deg)' }} />
        <GiCobweb size={140} style={{ position: 'absolute', top: '-20px', left: '30%', color: 'var(--text-main)', opacity: 0.1, transform: 'rotate(-45deg)' }} />
        <GiSpiderWeb size={160} style={{ position: 'absolute', top: '-40px', right: '28%', color: 'var(--text-main)', opacity: 0.12, transform: 'scaleX(-1) rotate(20deg)' }} />
        <GiCobweb size={200} style={{ position: 'absolute', top: '-70px', right: '-10px', color: 'var(--text-main)', opacity: 0.18, transform: 'scaleX(-1) rotate(-10deg)' }} />
        
        {/* Curvy, Thick, 2D Comic Web String */}
        <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0.8 }} viewBox="0 0 1000 80" preserveAspectRatio="none">
          {/* Main sagging thick web */}
          <path d="M -50,5 Q 500,120 1050,5" stroke="#111" strokeWidth="12" fill="none" />
          <path d="M -50,5 Q 500,120 1050,5" stroke="#f4f4f4" strokeWidth="7" fill="none" />
          
          {/* Intertwining secondary web */}
          <path d="M -50,25 Q 300,90 600,50 T 1050,15" stroke="#111" strokeWidth="8" fill="none" />
          <path d="M -50,25 Q 300,90 600,50 T 1050,15" stroke="#fff" strokeWidth="4" fill="none" />
          
          {/* Jagged connecting knots (Comic style) */}
          <path d="M 150,50 L 170,63 M 300,75 L 320,90 M 450,80 L 460,95 M 600,50 L 590,65 M 800,25 L 780,40 M 900,12 L 880,22" stroke="#111" strokeWidth="8" fill="none" strokeLinecap="round" />
          <path d="M 150,50 L 170,63 M 300,75 L 320,90 M 450,80 L 460,95 M 600,50 L 590,65 M 800,25 L 780,40 M 900,12 L 880,22" stroke="#fff" strokeWidth="4" fill="none" strokeLinecap="round" />
        </svg>
      </div>

      <div className="container nav-container">
        <Link to="/" className="nav-brand glitch-hover" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <DeadpoolLogo size={36} />
          <span><span className="text-red">H</span>ARSH<span className="text-blue">.</span></span>
        </Link>

        {/* Hamburger Toggle (Mobile Only) */}
        {!isAdmin && (
          <button 
            className="mobile-nav-toggle" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        )}

        {/* Mobile menu overlay background */}
        <div className={`mobile-overlay-bg ${isMobileMenuOpen ? 'visible' : ''}`} onClick={() => setIsMobileMenuOpen(false)} />

        <div className={`nav-links ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
          {!isAdmin ? (
            <>
              <Link to="/" className={`nav-link mobile-only-link ${location.pathname === '/' ? 'active' : ''}`}>Home</Link>
              <Link to="/experience" className={`nav-link ${location.pathname === '/experience' ? 'active' : ''}`}>Experience</Link>
              <Link to="/education" className={`nav-link ${location.pathname === '/education' ? 'active' : ''}`}>Education</Link>
              <Link to="/projects" className={`nav-link ${location.pathname === '/projects' ? 'active' : ''}`}>Projects</Link>
              <Link to="/certificates" className={`nav-link ${location.pathname === '/certificates' ? 'active' : ''}`}>Certificates</Link>
              <Link to="/links" className={`nav-link ${location.pathname === '/links' ? 'active' : ''}`}>Links</Link>
              <Link to="/contact" className={`nav-link ${location.pathname === '/contact' ? 'active' : ''}`}>Contact</Link>
              <Link to="/admin" className="admin-icon nav-link-admin" title="Admin Panel" style={{ marginRight: '0.5rem' }}>
                <ShieldAlert size={20} />
              </Link>
              {resumeUrl && (
                <a 
                  href={resumeUrl} 
                  download="Resume.pdf" 
                  className="nav-link nav-link-resume" 
                  style={{
                    background: 'var(--accent-red)',
                    color: '#fff',
                    padding: '0.5rem 1rem',
                    borderRadius: '4px',
                    border: '1px solid rgba(255,255,255,0.15)',
                    fontWeight: 'bold',
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    whiteSpace: 'nowrap',
                    fontSize: '1rem',
                    letterSpacing: '1px',
                    transition: 'background 0.3s'
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--accent-blue)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'var(--accent-red)'}
                >
                  Download Resume
                </a>
              )}
            </>
          ) : (
            <Link to="/" className="nav-link">Back to Portfolio</Link>
          )}
        </div>
      </div>
      <div className="web-line" style={{ margin: 0 }}></div>
    </nav>
  );
}
