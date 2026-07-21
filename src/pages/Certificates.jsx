import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  GiStarMedal, GiSpiderWeb, GiTrophyCup, GiRibbonMedal, GiAchievement, 
  GiDiploma, GiShield, GiCrown, GiScrollQuill, GiMedal, 
  GiTargetPrize, GiDiamondTrophy, GiTrophy, GiPodium, GiSwordClash 
} from 'react-icons/gi';
import { getCertificates } from '../backend/db';

const iconMap = {
  GiStarMedal, GiSpiderWeb, GiTrophyCup, GiRibbonMedal, GiAchievement, 
  GiDiploma, GiShield, GiCrown, GiScrollQuill, GiMedal, 
  GiTargetPrize, GiDiamondTrophy, GiTrophy, GiPodium, GiSwordClash
};

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

const MemoryCard = ({ url, idx, total }) => {
  const [rotation, setRotation] = useState(0);

  return (
    <div style={{ flex: '0 0 auto', padding: '0.75rem', background: '#fff', borderRadius: '4px', boxShadow: '0 10px 25px rgba(0,0,0,0.5)', transform: `rotate(${idx % 2 === 0 ? -2 : 3}deg)`, transition: 'transform 0.3s ease', maxWidth: '280px', position: 'relative' }} onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05) rotate(0deg)'} onMouseLeave={e => e.currentTarget.style.transform = `scale(1) rotate(${idx % 2 === 0 ? -2 : 3}deg)`}>
      <button 
        onClick={(e) => { e.stopPropagation(); setRotation(prev => prev + 90); }} 
        style={{ position: 'absolute', top: '15px', right: '15px', background: 'rgba(0,0,0,0.7)', color: 'white', border: '1px solid #fff', borderRadius: '50%', width: '32px', height: '32px', cursor: 'pointer', zIndex: 10, display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '1.2rem', boxShadow: '0 2px 10px rgba(0,0,0,0.8)' }} 
        title="Rotate"
      >
        ↻
      </button>
      <div style={{ overflow: 'hidden', borderRadius: '4px', border: '1px solid #ddd', height: '180px', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#111' }}>
        {url.startsWith('data:video') ? (
          <video src={url} style={{ width: '100%', height: '100%', objectFit: 'contain', transform: `rotate(${rotation}deg)`, transition: 'transform 0.3s ease' }} controls muted />
        ) : (
          <img src={url} alt={`Memory ${idx + 1}`} style={{ width: '100%', height: '100%', objectFit: 'contain', transform: `rotate(${rotation}deg)`, transition: 'transform 0.3s ease' }} />
        )}
      </div>
      <p style={{ color: '#000', textAlign: 'center', margin: '0.75rem 0 0 0', fontFamily: 'cursive', fontSize: '1.1rem', fontWeight: 'bold' }}>{total === 1 ? 'Tournament Memory' : `Memory ${idx + 1}`}</p>
    </div>
  );
};

export default function Certificates() {
  const [selectedCert, setSelectedCert] = useState(null);
  const [certs, setCerts] = useState([]);

  useEffect(() => {
    setCerts(getCertificates());
  }, []);

  return (
    <div style={{ position: 'relative', minHeight: '100vh', width: '100%', paddingTop: '4rem', paddingBottom: '8rem' }}>
      
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
                {cert.icon && iconMap[cert.icon] 
                  ? React.createElement(iconMap[cert.icon], { size: 45 })
                  : (idx % 2 === 0 ? <GiSpiderWeb size={45} /> : <GiStarMedal size={45} />)}
              </div>
              <h3 className="cert-title">{cert.title}</h3>
              <p className="cert-date">{cert.month && cert.year ? `${cert.month} ${cert.year}` : cert.date}</p>
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
              <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxHeight: '75vh', overflowY: 'auto', alignItems: 'stretch', justifyContent: 'flex-start' }}>
                
                {/* 1. Description Section */}
                <div className="custom-scrollbar" style={{ flexShrink: 0, padding: '1.5rem', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '12px', borderLeft: '5px solid var(--accent-red)', border: '1px solid #333', backdropFilter: 'blur(10px)', maxHeight: '180px', overflowY: 'auto' }}>
                  <h4 style={{ color: 'var(--accent-red)', margin: '0 0 0.75rem 0', fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '1px', fontFamily: 'var(--font-heading)' }}>Description</h4>
                  <p style={{ color: '#ffffff', fontSize: '1.15rem', margin: 0, lineHeight: 1.6, whiteSpace: 'pre-wrap', textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>
                    {selectedCert.desc || "No description provided. You can add one in the Admin Dashboard!"}
                  </p>
                </div>

                <div style={{ flexShrink: 0, width: '100%', marginTop: '1rem' }}>
                  {selectedCert.type === 'pdf' ? (
                    <iframe src={`${selectedCert.fileUrl}#toolbar=0`} title={selectedCert.title} style={{ width: '100%', height: '70vh', border: 'none', borderRadius: '8px' }} />
                  ) : (
                    <img src={selectedCert.fileUrl} alt={selectedCert.title} style={{ width: '100%', height: 'auto', maxHeight: '70vh', objectFit: 'contain', borderRadius: '8px', boxShadow: '0 0 20px rgba(0,0,0,0.2)' }} />
                  )}
                </div>

                {/* 3. Memory Vault Section */}
                {(() => {
                  const photos = selectedCert.memoryPhotoUrls || (selectedCert.memoryPhotoUrl ? [selectedCert.memoryPhotoUrl] : []);
                  if (photos.length === 0) return null;
                  
                  return (
                    <div style={{ flexShrink: 0, margin: '1rem 0' }}>
                      <h4 style={{ color: '#fff', marginBottom: '1rem', borderBottom: '1px solid #333', paddingBottom: '0.5rem', fontFamily: 'var(--font-heading)' }}>Memory Vault</h4>
                      <div className="custom-scrollbar" style={{ display: 'flex', gap: '1.5rem', overflowX: 'auto', padding: '1.5rem 0.5rem', scrollbarWidth: 'thin', scrollbarColor: 'var(--accent-red) #222', background: 'rgba(0,0,0,0.3)', borderRadius: '12px', border: '1px solid #333' }}>
                        {photos.map((url, idx) => (
                           <MemoryCard key={idx} url={url} idx={idx} total={photos.length} />
                        ))}
                      </div>
                    </div>
                  );
                })()}

              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
