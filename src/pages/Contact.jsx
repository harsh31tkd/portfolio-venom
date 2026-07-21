import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaInstagram, FaSnapchat, FaEnvelope, FaLink, FaPaperPlane } from 'react-icons/fa';
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
  const [formData, setFormData] = useState({ title: '', email: '', message: '' });

  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    getContact().then(setSocials);
  }, []);

  const handleSend = (e) => {
    e.preventDefault();
    setIsSending(true);

    const payload = JSON.stringify({
      to: "harsh31tkd@gmail.com",
      subject: formData.title,
      body: `Message from: ${formData.email}<br><br>${formData.message}`
    });

    fetch("/api/send-email", {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: payload
    })
    .then(res => res.json())
    .then(data => {
      setIsSending(false);
      if (data.status === "OK") {
        alert("Transmit Successful! Message delivered to host.");
        setFormData({ title: '', email: '', message: '' });
      } else {
        alert("Transmit Failed: " + data.message);
      }
    })
    .catch(err => {
      setIsSending(false);
      alert("Error: " + err.message);
    });
  };

  return (
    <div className="container" style={{ padding: '4rem 0' }}>
      <motion.h2 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glitch-hover"
        style={{ fontSize: '3.5rem', fontFamily: 'var(--font-comic)', color: 'var(--accent-red)', marginBottom: '3rem', textAlign: 'center', textShadow: '3px 3px 0px #000' }}
      >
        COMMUNICATIONS
      </motion.h2>
      
      <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '4rem', justifyContent: 'center', alignItems: 'flex-start' }}>
        
        {/* Contact Form Section */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          style={{ 
            flex: '1 1 400px', 
            background: 'rgba(10, 10, 15, 0.8)', 
            padding: '2.5rem', 
            borderRadius: '0 30px 0 30px', 
            border: '3px solid var(--accent-red)',
            boxShadow: '10px 10px 0px rgba(0,0,0,0.8), 0 0 20px rgba(226,54,54,0.3)',
            maxWidth: '600px'
          }}
        >
          <h3 style={{ fontSize: '2rem', fontFamily: 'var(--font-comic)', color: '#fff', marginBottom: '1.5rem', borderBottom: '3px solid var(--accent-blue)', paddingBottom: '0.5rem', display: 'inline-block' }}>Send a Message</h3>
          
          <form onSubmit={handleSend} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ color: 'var(--text-main)', fontFamily: 'var(--font-heading)', fontWeight: 'bold' }}>Your Email</label>
              <input 
                type="email" 
                required 
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                placeholder="host@symbiote.com"
                style={{ padding: '1rem', background: '#111', border: '2px solid #333', color: '#fff', borderRadius: '4px', outline: 'none', transition: 'border-color 0.3s' }}
                onFocus={(e) => e.target.style.borderColor = 'var(--accent-blue)'}
                onBlur={(e) => e.target.style.borderColor = '#333'}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ color: 'var(--text-main)', fontFamily: 'var(--font-heading)', fontWeight: 'bold' }}>Subject / Title</label>
              <input 
                type="text" 
                required 
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                placeholder="We are Venom..."
                style={{ padding: '1rem', background: '#111', border: '2px solid #333', color: '#fff', borderRadius: '4px', outline: 'none', transition: 'border-color 0.3s' }}
                onFocus={(e) => e.target.style.borderColor = 'var(--accent-red)'}
                onBlur={(e) => e.target.style.borderColor = '#333'}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ color: 'var(--text-main)', fontFamily: 'var(--font-heading)', fontWeight: 'bold' }}>Message</label>
              <textarea 
                required 
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                rows="5"
                placeholder="Enter your message here..."
                style={{ padding: '1rem', background: '#111', border: '2px solid #333', color: '#fff', borderRadius: '4px', outline: 'none', resize: 'vertical', transition: 'border-color 0.3s' }}
                onFocus={(e) => e.target.style.borderColor = 'var(--accent-blue)'}
                onBlur={(e) => e.target.style.borderColor = '#333'}
              />
            </div>

            <motion.button 
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }}
              type="submit"
              style={{
                marginTop: '1rem',
                background: 'var(--accent-red)',
                color: '#fff',
                padding: '1rem',
                fontFamily: 'var(--font-comic)',
                fontSize: '1.2rem',
                fontWeight: 'bold',
                textTransform: 'uppercase',
                letterSpacing: '2px',
                border: '2px solid #000',
                boxShadow: '4px 4px 0px #000',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                transition: 'background 0.3s',
                clipPath: 'polygon(5% 0, 100% 0, 95% 100%, 0% 100%)'
              }}
              onMouseEnter={(e) => e.target.style.background = 'var(--accent-blue)'}
              onMouseLeave={(e) => e.target.style.background = 'var(--accent-red)'}
            >
              <FaPaperPlane /> {isSending ? 'Sending...' : 'Send Transmit'}
            </motion.button>
          </form>
        </motion.div>

        {/* Social Links Section */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', flex: '1 1 400px', maxWidth: '600px' }}>
          {socials.map((social, idx) => (
            <motion.a 
              key={idx}
              href={social.link}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.05)' }}
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '1.5rem', 
                padding: '1.5rem 2rem', 
                background: 'rgba(0,0,0,0.5)', 
                borderRadius: '0 20px 0 20px',
                border: `2px solid ${idx % 2 === 0 ? 'var(--accent-blue)' : 'var(--accent-red)'}`,
                boxShadow: `4px 4px 0px ${idx % 2 === 0 ? 'var(--accent-blue)' : 'var(--accent-red)'}`,
                textDecoration: 'none',
                color: 'var(--text-main)',
                backdropFilter: 'blur(5px)'
              }}
            >
              <div style={{ color: social.color || '#fff' }}>
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
    </div>
  );
}
