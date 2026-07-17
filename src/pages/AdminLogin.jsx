import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Fingerprint, Terminal, Biohazard } from 'lucide-react';
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [glitchText, setGlitchText] = useState('SECURE TERMINAL');
  const navigate = useNavigate();

  useEffect(() => {
    const texts = ['RESTRICTED ACCESS', 'HOST REQUIRED', 'SYMBIOTE DETECTED', 'PROJECT V.E.N.O.M.'];
    let i = 0;
    const interval = setInterval(() => {
      setGlitchText(texts[i % texts.length]);
      i++;
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    setTimeout(() => {
      if (username === 'harsh' && password === 'harsh123') {
        localStorage.setItem('venom_auth_token', 'true');
        navigate('/admin/dashboard');
      } else {
        setError('DNA MATCH FAILED. ACCESS DENIED.');
        setIsLoading(false);
      }
    }, 1200);
  };

  const particlesInit = useCallback(async engine => {
    await loadSlim(engine);
  }, []);

  const particlesOptions = {
    background: {
      color: {
        value: "#020000",
      },
    },
    fpsLimit: 60,
    interactivity: {
      events: {
        onHover: {
          enable: true,
          mode: "grab", // Tendrils reach for cursor
        },
        onClick: {
          enable: true,
          mode: "repulse", // Symbiote repels on click
        },
        resize: true,
      },
      modes: {
        grab: {
          distance: 250,
          links: {
            opacity: 0.9,
            color: "#ff0000",
            width: 3,
          },
        },
        repulse: {
          distance: 200,
          duration: 0.4,
        },
      },
    },
    particles: {
      color: {
        value: ["#ffffff", "#ff0000", "#1a1a1a", "#000000"],
      },
      links: {
        color: "#2a0000",
        distance: 150,
        enable: true,
        opacity: 0.7,
        width: 2,
      },
      collisions: {
        enable: false,
      },
      move: {
        direction: "none",
        enable: true,
        outModes: {
          default: "bounce",
        },
        random: true,
        speed: 1.5,
        straight: false,
      },
      number: {
        density: {
          enable: true,
          area: 800,
        },
        value: 80,
      },
      opacity: {
        value: 0.8,
      },
      shape: {
        type: "circle",
      },
      size: {
        value: { min: 2, max: 10 }, // Varied sizes for organic feel
      },
    },
    detectRetina: true,
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      width: '100vw', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      position: 'relative', 
      overflow: 'hidden',
      fontFamily: 'monospace'
    }}>
      
      {/* Interactive Symbiote Background */}
      <Particles 
        id="venom-admin-particles" 
        init={particlesInit} 
        options={particlesOptions} 
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}
      />

      {/* Dark Red Grid Overlay to maintain terminal feel */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `
          linear-gradient(rgba(255, 0, 0, 0.05) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255, 0, 0, 0.05) 1px, transparent 1px)
        `,
        backgroundSize: '40px 40px',
        zIndex: 1,
        pointerEvents: 'none'
      }} />

      {/* Scanline Overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(transparent 50%, rgba(0, 0, 0, 0.25) 50%)',
        backgroundSize: '100% 4px',
        zIndex: 2,
        pointerEvents: 'none'
      }} />

      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        style={{ 
          background: 'rgba(5, 0, 0, 0.75)', 
          backdropFilter: 'blur(8px)',
          padding: '3rem', 
          border: '1px solid #ff0000', 
          boxShadow: '0 0 30px rgba(255, 0, 0, 0.3), inset 0 0 20px rgba(255, 0, 0, 0.1)',
          maxWidth: '450px', 
          width: '90%',
          position: 'relative',
          zIndex: 20,
          clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 25px), calc(100% - 25px) 100%, 0 100%)'
        }}
      >
        {/* Top left decorative square */}
        <div style={{ position: 'absolute', top: '15px', left: '15px', width: '12px', height: '12px', background: '#ff0000', boxShadow: '0 0 10px #ff0000' }} />
        {/* Top right decorative line */}
        <div style={{ position: 'absolute', top: '15px', right: '15px', width: '60px', height: '3px', background: '#ff0000', boxShadow: '0 0 10px #ff0000' }} />

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '2.5rem' }}>
          <motion.div
            animate={{ opacity: [1, 0.4, 1], scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Biohazard size={55} color="#ff0000" />
          </motion.div>
          <h2 style={{ color: '#ff0000', fontSize: '1.4rem', marginTop: '1.2rem', letterSpacing: '5px', textAlign: 'center', textShadow: '0 0 10px rgba(255,0,0,0.5)' }}>
            LIFE FOUNDATION
          </h2>
          <div style={{ color: '#fff', fontSize: '0.85rem', opacity: 0.8, letterSpacing: '3px', marginTop: '0.5rem' }}>
            {glitchText}
          </div>
        </div>

        {error && (
          <div style={{ 
            background: 'rgba(255, 0, 0, 0.15)', 
            borderLeft: '4px solid #ff0000',
            color: '#ff4444', 
            padding: '1rem', 
            marginBottom: '1.5rem', 
            fontSize: '0.85rem',
            letterSpacing: '1px',
            textTransform: 'uppercase'
          }}>
            WARNING: {error}
          </div>
        )}

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.8rem' }}>
          <div>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.8rem', color: '#ff0000', fontSize: '0.8rem', letterSpacing: '2px' }}>
              <Terminal size={14} /> HOST IDENTIFIER
            </label>
            <input 
              type="text" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{ 
                width: '100%', 
                padding: '1rem', 
                background: 'rgba(255, 0, 0, 0.05)', 
                border: '1px solid rgba(255, 0, 0, 0.4)', 
                color: '#ffdddd',
                outline: 'none',
                fontSize: '1rem',
                letterSpacing: '2px',
                fontFamily: 'monospace',
                transition: 'all 0.3s'
              }}
              onFocus={(e) => {
                e.target.style.background = 'rgba(255, 0, 0, 0.15)';
                e.target.style.boxShadow = '0 0 15px rgba(255,0,0,0.2)';
              }}
              onBlur={(e) => {
                e.target.style.background = 'rgba(255, 0, 0, 0.05)';
                e.target.style.boxShadow = 'none';
              }}
              required 
              spellCheck={false}
            />
          </div>
          
          <div>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.8rem', color: '#ff0000', fontSize: '0.8rem', letterSpacing: '2px' }}>
              <Fingerprint size={14} /> BIOMETRIC PASSCODE
            </label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ 
                width: '100%', 
                padding: '1rem', 
                background: 'rgba(255, 0, 0, 0.05)', 
                border: '1px solid rgba(255, 0, 0, 0.4)', 
                color: '#ffdddd',
                outline: 'none',
                fontSize: '1rem',
                letterSpacing: '5px',
                fontFamily: 'monospace',
                transition: 'all 0.3s'
              }}
              onFocus={(e) => {
                e.target.style.background = 'rgba(255, 0, 0, 0.15)';
                e.target.style.boxShadow = '0 0 15px rgba(255,0,0,0.2)';
              }}
              onBlur={(e) => {
                e.target.style.background = 'rgba(255, 0, 0, 0.05)';
                e.target.style.boxShadow = 'none';
              }}
              required 
            />
          </div>
          
          <motion.button 
            whileHover={{ backgroundColor: 'rgba(255, 0, 0, 0.15)', boxShadow: '0 0 20px rgba(255,0,0,0.4)' }}
            whileTap={{ scale: 0.98 }}
            type="submit" 
            disabled={isLoading}
            style={{ 
              marginTop: '1rem',
              width: '100%',
              padding: '1.2rem',
              background: 'rgba(255,0,0,0.05)',
              border: '1px solid #ff0000',
              color: '#ff0000',
              fontWeight: 'bold',
              fontSize: '1rem',
              letterSpacing: '4px',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              overflow: 'hidden',
              transition: 'all 0.3s',
              textShadow: '0 0 5px rgba(255,0,0,0.5)'
            }}
          >
            {isLoading ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                style={{ width: '20px', height: '20px', border: '2px solid transparent', borderTopColor: '#ff0000', borderRadius: '50%' }}
              />
            ) : (
              'INITIALIZE BOND'
            )}
            
            {/* Hover effect scanning line */}
            <motion.div 
              initial={{ top: '-100%' }}
              whileHover={{ top: '100%' }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
              style={{ position: 'absolute', left: 0, width: '100%', height: '3px', background: '#ff0000', opacity: 0.6, boxShadow: '0 0 10px #ff0000' }}
            />
          </motion.button>
        </form>

        <div style={{ marginTop: '2.5rem', textAlign: 'center', fontSize: '0.75rem', color: 'rgba(255,0,0,0.6)', letterSpacing: '2px' }}>
          UNAUTHORIZED ACCESS WILL RESULT IN ASSIMILATION
        </div>
      </motion.div>
    </div>
  );
}
