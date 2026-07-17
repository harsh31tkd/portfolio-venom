import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaInstagram, FaSnapchat, FaEnvelope, FaLink } from 'react-icons/fa';
import { getContact } from '../backend/db';

const IconMap = {
  FaEnvelope: <FaEnvelope size={30} />,
  FaGithub: <FaGithub size={30} />,
  FaLinkedin: <FaLinkedin size={30} />,
  FaInstagram: <FaInstagram size={30} />,
  FaSnapchat: <FaSnapchat size={30} />,
  FaLink: <FaLink size={30} />
};

export default function Contact() {
  const [socials, setSocials] = useState([]);

  useEffect(() => {
    setSocials(getContact());
  }, []);

  return (
    <div className="container" style={{ padding: '4rem 0', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h2 style={{ fontSize: '3rem', fontFamily: 'var(--font-comic)', color: 'var(--accent-blue)', marginBottom: '3rem', textAlign: 'center' }}>
        Connect With Me
      </h2>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '100%', maxWidth: '600px' }}>
        {socials.map((social, idx) => (
          <motion.a 
            key={idx}
            href={social.link}
            target="_blank"
            rel="noreferrer"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.1)' }}
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '1.5rem', 
              padding: '1.5rem 2rem', 
              background: 'var(--bg-card)', 
              borderRadius: '8px',
              border: `1px solid ${idx % 2 === 0 ? 'var(--accent-red)' : 'var(--accent-blue)'}`,
              textDecoration: 'none',
              color: 'var(--text-main)'
            }}
          >
            <div style={{ color: social.color }}>
              {IconMap[social.iconType] || <FaLink size={30} />}
            </div>
            <div>
              <h3 style={{ fontSize: '1.5rem', fontFamily: 'var(--font-heading)' }}>{social.name}</h3>
              <p style={{ color: 'var(--text-muted)' }}>{social.value}</p>
            </div>
          </motion.a>
        ))}
      </div>
    </div>
  );
}
