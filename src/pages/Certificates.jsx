import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GiSpiderWeb, GiStarMedal } from 'react-icons/gi';
import { getCertificates } from '../backend/db';

import certGNA from '../assets/hackthon and trainning certificates/WhatsApp Image 2026-07-14 at 7.08.48 PM.jpeg';
import certQuantum from '../assets/hackthon and trainning certificates/WhatsApp Image 2026-07-14 at 6.55.58 PM.jpeg';
import certSummer from '../assets/hackthon and trainning certificates/WhatsApp Image 2024-12-11 at 12.53.56_058acddc.jpg';
import certHarsh from '../assets/hackthon and trainning certificates/harsh.pdf';

import certDecision from '../assets/online certificates/decision_making.pdf';
import certDigital from '../assets/online certificates/digital_intelligence.pdf';
import certInnovation from '../assets/online certificates/innovation_and_creativity.pdf';
import certPresentation from '../assets/online certificates/presentation_skills.pdf';
import certStrategy from '../assets/online certificates/strategy_planning_and_execution.pdf';
import certExtra1 from '../assets/online certificates/WhatsApp Image 2026-07-14 at 7.09.48 PM.jpeg';
import certExtra2 from '../assets/online certificates/WhatsApp Image 2026-07-14 at 7.09.49 PM.jpeg';

export default function Certificates() {
  const [selectedCert, setSelectedCert] = useState(null);
  const [certs, setCerts] = useState([]);

  useEffect(() => {
    setCerts(getCertificates());
  }, []);

  return (
    <div style={{ position: 'relative', minHeight: '100vh', width: '100vw', paddingTop: '4rem', paddingBottom: '8rem' }}>
      
      <div className="container" style={{ position: 'relative', zIndex: 10, maxWidth: '1200px', margin: '0 auto' }}>
        
        <h2 style={{ 
          fontSize: '4.5rem', 
          fontFamily: 'var(--font-venom)', 
          color: 'var(--accent-red)', 
          textAlign: 'center', 
          marginBottom: '4rem', 
          textShadow: '3px 3px 0 #000, 0 0 15px rgba(226, 54, 54, 0.5)',
          letterSpacing: '3px'
        }}>
          Certifications
        </h2>

        {/* Premium Glassmorphism Grid */}
        <div className="cert-grid">
          {certs.map((cert, idx) => (
            <motion.div 
              key={idx} 
              className="cert-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, type: "spring", stiffness: 100 }}
              onClick={() => setSelectedCert(cert)}
            >
              <div className="cert-icon-wrapper">
                {idx % 2 === 0 ? <GiSpiderWeb size={45} /> : <GiStarMedal size={45} />}
              </div>
              <h3 className="cert-title">{cert.title}</h3>
              <p className="cert-date">{cert.date}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Sleek Lightbox Modal */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div 
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCert(null)}
          >
            <motion.div 
              className="modal-content"
              initial={{ scale: 0.8, y: 50, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()} /* Prevent closing when clicking inside modal */
            >
              <div className="modal-header">
                <h3 className="modal-title">{selectedCert.title}</h3>
                <button className="modal-close-btn" onClick={() => setSelectedCert(null)}>
                  &times;
                </button>
              </div>
              <div className="modal-body">
                {selectedCert.type === 'pdf' ? (
                  <iframe src={`${selectedCert.fileUrl}#toolbar=0`} title={selectedCert.title} />
                ) : (
                  <img src={selectedCert.fileUrl} alt={selectedCert.title} />
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
