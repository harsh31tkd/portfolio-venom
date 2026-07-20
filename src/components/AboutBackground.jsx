import React from 'react';
import { motion } from 'framer-motion';
import { 
  GiSpiderMask, GiSpiderAlt, GiSpiderWeb, GiSuckeredTentacle, 
  GiBatwingEmblem, GiPumpkinLantern, GiEvilBat, GiClaws, 
  GiTentacleStrike, GiChewedSkull, GiDna2, GiMaskedSpider, 
  GiSpikedTentacle, GiFleshyMass, GiSkullMask 
} from 'react-icons/gi';

const SYMBOLS = [
  { id: 'spidermask', color: '#e23636', Icon: GiSpiderMask, top: '10%', left: '8%', size: 100, delay: 0 },
  { id: 'spideralt', color: '#a855f7', Icon: GiSpiderAlt, top: '25%', left: '85%', size: 120, delay: 1 },
  { id: 'spiderweb', color: '#ffffff', Icon: GiSpiderWeb, top: '75%', left: '8%', size: 150, delay: 2 },
  { id: 'tentacle1', color: '#e23636', Icon: GiSuckeredTentacle, top: '45%', left: '4%', size: 130, delay: 0.5 },
  { id: 'batwing', color: '#3b82f6', Icon: GiBatwingEmblem, top: '12%', left: '45%', size: 90, delay: 1.5 },
  { id: 'pumpkin', color: '#f59e0b', Icon: GiPumpkinLantern, top: '88%', left: '40%', size: 110, delay: 0.8 },
  { id: 'evilbat', color: '#a855f7', Icon: GiEvilBat, top: '65%', left: '88%', size: 105, delay: 2.2 },
  { id: 'claws', color: '#e23636', Icon: GiClaws, top: '30%', left: '12%', size: 95, delay: 1.2 },
  { id: 'tentaclestrike', color: '#ef4444', Icon: GiTentacleStrike, top: '55%', left: '88%', size: 115, delay: 0.3 },
  { id: 'chewedskull', color: '#ffffff', Icon: GiChewedSkull, top: '82%', left: '80%', size: 85, delay: 1.7 },
  { id: 'dna', color: '#22c55e', Icon: GiDna2, top: '8%', left: '75%', size: 100, delay: 2.5 },
  { id: 'maskedspider', color: '#3b82f6', Icon: GiMaskedSpider, top: '40%', left: '92%', size: 135, delay: 0.7 },
  { id: 'spikedtentacle', color: '#ef4444', Icon: GiSpikedTentacle, top: '90%', left: '15%', size: 125, delay: 1.9 },
  { id: 'fleshy', color: '#a855f7', Icon: GiFleshyMass, top: '20%', left: '70%', size: 90, delay: 0.2 },
  { id: 'skullmask', color: '#ffffff', Icon: GiSkullMask, top: '60%', left: '10%', size: 110, delay: 1.4 },
];

export default function AboutBackground() {
  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none', overflow: 'hidden' }}>
      {SYMBOLS.map((sym) => {
        const Icon = sym.Icon;
        // Alternate directions and vary opacity slightly
        const directionY = sym.size % 2 === 0 ? -30 : 30;
        const rotateMax = sym.size % 3 === 0 ? 15 : -15;
        // The user wants them more showable (enhanced), so we increase opacity to be much more vibrant
        const opacity = sym.id === 'batwing' || sym.id === 'fleshy' ? 0.85 : (sym.size % 2 === 0 ? 0.75 : 0.65);

        return (
          <motion.div
            key={sym.id}
            className="floating-icon"
            style={{
              position: 'absolute',
              top: sym.top,
              left: sym.left,
              color: sym.color,
              opacity: opacity,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 0
            }}
            animate={{ 
              y: [0, directionY, 0], 
              rotate: [0, rotateMax, 0],
            }}
            transition={{ 
              duration: 4 + Math.random() * 2, 
              repeat: Infinity, 
              ease: 'easeInOut',
              delay: sym.delay
            }}
          >
            <Icon size={sym.size} />
          </motion.div>
        );
      })}
    </div>
  );
}
