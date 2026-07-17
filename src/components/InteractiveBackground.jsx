import React, { useCallback } from 'react';
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";

export default function InteractiveBackground() {
  const particlesInit = useCallback(async engine => {
    await loadSlim(engine);
  }, []);

  const particleOptions = {
    background: { color: { value: "transparent" } },
    fpsLimit: 60,
    interactivity: {
      events: {
        onHover: { enable: true, mode: "grab" },
        resize: true,
      },
      modes: {
        grab: { distance: 250, links: { opacity: 0.8, color: "random" } }
      }
    },
    particles: {
      color: { value: ["#E23636", "#a855f7", "#4ade80", "#3b82f6"] }, // Red, Purple, Green, Blue
      links: { color: "random", distance: 180, enable: true, opacity: 0.4, width: 1.5 },
      move: { enable: true, speed: 1.5, direction: "none", random: true, straight: false, outModes: { default: "out" } },
      number: { density: { enable: true, area: 1000 }, value: 100 },
      opacity: { value: 0.5 },
      shape: { type: "circle" },
      size: { value: { min: 1, max: 4 } }
    },
    detectRetina: true,
  };

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -5 }}>
      <Particles id="tsparticles-global" init={particlesInit} options={particleOptions} />
    </div>
  );
}
