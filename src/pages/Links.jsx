import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { getQuickLinks, getResume, openPdfInNewTab } from '../backend/db';

export default function Links() {
  const [quickLinks, setQuickLinks] = useState([]);

  useEffect(() => {
    setQuickLinks(getQuickLinks());
  }, []);

  return (
    <div className="container" style={{ padding: '4rem 0', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h2 style={{ fontSize: '3rem', fontFamily: 'var(--font-comic)', color: 'var(--accent-red)', marginBottom: '3rem', textAlign: 'center' }}>
        Quick Links
      </h2>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%', maxWidth: '400px' }}>
        {quickLinks.map((link, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            whileHover={{ scale: 1.05 }}
          >
            {link.type === 'internal' ? (
              <Link 
                to={link.url}
                className="btn-secondary"
                style={{ 
                  display: 'block', 
                  textAlign: 'center', 
                  width: '100%', 
                  padding: '1rem',
                  borderColor: link.highlight ? 'var(--accent-red)' : 'var(--accent-blue)',
                  color: link.highlight ? 'var(--accent-red)' : 'var(--text-main)'
                }}
              >
                {link.title}
              </Link>
            ) : (
              <a 
                href={link.title.toLowerCase().includes('resume') ? '#' : link.url}
                onClick={(e) => {
                  if (link.title.toLowerCase().includes('resume')) {
                    e.preventDefault();
                    openPdfInNewTab(getResume());
                  }
                }}
                className="btn-primary"
                style={{ 
                  display: 'block', 
                  textAlign: 'center', 
                  width: '100%', 
                  padding: '1rem',
                  background: link.highlight ? 'var(--accent-red)' : 'var(--accent-blue)'
                }}
              >
                {link.title}
              </a>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
