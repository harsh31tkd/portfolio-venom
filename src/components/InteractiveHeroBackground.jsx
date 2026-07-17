import React, { useEffect, useRef, useState, useCallback } from 'react';

/* ─── SVG Symbols ──────────────────────────────────────── */
const SYMBOLS = [
  { id: 'spider',    label: 'Spider-Man',       color: '#e11d48',
    svg: <g fill="currentColor"><ellipse cx="50" cy="52" rx="8" ry="12"/><ellipse cx="50" cy="38" rx="6" ry="7"/><path d="M42 50 Q28 42 18 35" stroke="currentColor" strokeWidth="3.5" fill="none" strokeLinecap="round"/><path d="M42 54 Q26 52 14 50" stroke="currentColor" strokeWidth="3.5" fill="none" strokeLinecap="round"/><path d="M42 58 Q28 62 18 70" stroke="currentColor" strokeWidth="3.5" fill="none" strokeLinecap="round"/><path d="M42 62 Q30 70 22 80" stroke="currentColor" strokeWidth="3.5" fill="none" strokeLinecap="round"/><path d="M58 50 Q72 42 82 35" stroke="currentColor" strokeWidth="3.5" fill="none" strokeLinecap="round"/><path d="M58 54 Q74 52 86 50" stroke="currentColor" strokeWidth="3.5" fill="none" strokeLinecap="round"/><path d="M58 58 Q72 62 82 70" stroke="currentColor" strokeWidth="3.5" fill="none" strokeLinecap="round"/><path d="M58 62 Q70 70 78 80" stroke="currentColor" strokeWidth="3.5" fill="none" strokeLinecap="round"/></g> },

  { id: 'shield',    label: 'Captain America',  color: '#3b82f6',
    svg: <g fill="none" stroke="currentColor" strokeWidth="5"><circle cx="50" cy="50" r="42"/><circle cx="50" cy="50" r="28"/><circle cx="50" cy="50" r="14"/><path d="M50 8 L59 35 L88 35 L65 53 L74 80 L50 63 L26 80 L35 53 L12 35 L41 35 Z" fill="currentColor" stroke="none"/></g> },

  { id: 'arc',       label: 'Iron Man',          color: '#f59e0b',
    svg: <g fill="none" stroke="currentColor" strokeWidth="4"><circle cx="50" cy="50" r="40"/><circle cx="50" cy="50" r="24"/><circle cx="50" cy="50" r="8" fill="currentColor"/>{[0,45,90,135,180,225,270,315].map((a,i)=>{const rad=a*Math.PI/180,r1=26,r2=38;return<line key={i} x1={50+r1*Math.cos(rad)} y1={50+r1*Math.sin(rad)} x2={50+r2*Math.cos(rad)} y2={50+r2*Math.sin(rad)}/>})}</g> },

  { id: 'mjolnir',   label: 'Thor',              color: '#6366f1',
    svg: <g fill="currentColor"><rect x="34" y="14" width="32" height="38" rx="4"/><rect x="16" y="24" width="68" height="14" rx="3"/><rect x="44" y="52" width="12" height="34" rx="2"/><rect x="36" y="82" width="28" height="8" rx="3"/></g> },

  { id: 'fist',      label: 'Hulk',              color: '#22c55e',
    svg: <g fill="currentColor"><rect x="22" y="42" width="56" height="46" rx="10"/><rect x="26" y="26" width="12" height="22" rx="6"/><rect x="40" y="22" width="12" height="24" rx="6"/><rect x="54" y="24" width="12" height="22" rx="6"/><rect x="64" y="36" width="12" height="16" rx="6"/><rect x="18" y="48" width="12" height="20" rx="6"/></g> },

  { id: 'hourglass', label: 'Black Widow',       color: '#ef4444',
    svg: <g fill="currentColor"><path d="M25 10 L75 10 L50 50 L75 90 L25 90 L50 50 Z"/><rect x="22" y="6" width="56" height="10" rx="4"/><rect x="22" y="84" width="56" height="10" rx="4"/></g> },

  { id: 'bullseye',  label: 'Hawkeye',           color: '#a78bfa',
    svg: <g fill="none" stroke="currentColor" strokeWidth="5"><circle cx="50" cy="50" r="40"/><circle cx="50" cy="50" r="26"/><circle cx="50" cy="50" r="12"/><line x1="50" y1="5" x2="50" y2="20"/><line x1="50" y1="80" x2="50" y2="95"/><line x1="5" y1="50" x2="20" y2="50"/><line x1="80" y1="50" x2="95" y2="50"/></g> },

  { id: 'eye',       label: 'Doctor Strange',    color: '#f97316',
    svg: <g fill="none" stroke="currentColor" strokeWidth="4"><path d="M50 15 Q90 50 50 85 Q10 50 50 15Z"/><ellipse cx="50" cy="50" rx="14" ry="20"/><circle cx="50" cy="50" r="7" fill="currentColor"/></g> },

  { id: 'paw',       label: 'Black Panther',     color: '#8b5cf6',
    svg: <g fill="currentColor"><ellipse cx="50" cy="62" rx="26" ry="22"/><ellipse cx="28" cy="38" rx="10" ry="13"/><ellipse cx="50" cy="32" rx="10" ry="13"/><ellipse cx="72" cy="38" rx="10" ry="13"/><ellipse cx="16" cy="54" rx="8" ry="11"/><ellipse cx="84" cy="54" rx="8" ry="11"/></g> },

  { id: 'skull',     label: 'Punisher',          color: '#94a3b8',
    svg: <g fill="currentColor"><ellipse cx="50" cy="38" rx="32" ry="30"/><rect x="32" y="60" width="36" height="22" rx="3"/><rect x="20" y="58" width="16" height="10" rx="2"/><rect x="64" y="58" width="16" height="10" rx="2"/><ellipse cx="38" cy="36" rx="9" ry="11" fill="#000" opacity="0.7"/><ellipse cx="62" cy="36" rx="9" ry="11" fill="#000" opacity="0.7"/><path d="M44 52 L50 46 L56 52 Z" fill="#000" opacity="0.7"/><rect x="38" y="64" width="6" height="10" rx="1" fill="#000" opacity="0.6"/><rect x="47" y="64" width="6" height="10" rx="1" fill="#000" opacity="0.6"/><rect x="56" y="64" width="6" height="10" rx="1" fill="#000" opacity="0.6"/></g> },

  { id: 'claws',     label: 'Wolverine',         color: '#fbbf24',
    svg: <g fill="currentColor"><path d="M50 80 L42 20 Q40 10 44 8 Q48 6 50 15 Z"/><path d="M50 80 L50 16 Q50 6 54 6 Q58 6 58 16 L58 80 Z" opacity="0.9"/><path d="M50 80 L58 20 Q60 10 56 8 Q52 6 50 15 Z"/><ellipse cx="50" cy="80" rx="14" ry="10"/></g> },

  { id: 'x',         label: 'X-Men',             color: '#f43f5e',
    svg: <g fill="none" stroke="currentColor" strokeWidth="12" strokeLinecap="round"><line x1="15" y1="15" x2="85" y2="85"/><line x1="85" y1="15" x2="15" y2="85"/></g> },

  { id: 'lightning', label: 'Lightning',         color: '#facc15',
    svg: <g fill="currentColor"><path d="M60 5 L30 52 L50 52 L40 95 L72 42 L52 42 Z"/></g> },

  { id: 'gauntlet',  label: 'Infinity Gauntlet', color: '#d4af37',
    svg: <g fill="currentColor"><rect x="26" y="46" width="48" height="44" rx="8"/><rect x="28" y="24" width="10" height="28" rx="5"/><rect x="40" y="18" width="10" height="32" rx="5"/><rect x="52" y="20" width="10" height="30" rx="5"/><rect x="62" y="26" width="10" height="26" rx="5"/><rect x="14" y="44" width="16" height="10" rx="5"/><circle cx="50" cy="58" r="5" fill="#a855f7"/><circle cx="36" cy="62" r="4" fill="#3b82f6"/><circle cx="64" cy="62" r="4" fill="#22c55e"/><circle cx="42" cy="74" r="4" fill="#f97316"/><circle cx="58" cy="74" r="4" fill="#ef4444"/><circle cx="50" cy="84" r="4" fill="#eab308"/></g> },

  { id: 'star',      label: 'Captain Marvel',    color: '#f59e0b',
    svg: <g fill="currentColor"><path d="M50 8 L60 38 L92 38 L67 56 L77 86 L50 68 L23 86 L33 56 L8 38 L40 38 Z"/></g> },

  { id: 'wings',     label: 'Falcon',            color: '#64748b',
    svg: <g fill="currentColor"><path d="M50 50 Q30 20 5 15 Q15 35 20 50 Q15 40 8 55 Q20 50 35 58 Z"/><path d="M50 50 Q70 20 95 15 Q85 35 80 50 Q85 40 92 55 Q80 50 65 58 Z"/><ellipse cx="50" cy="52" rx="6" ry="18"/></g> },

  { id: 'web',       label: 'Spider Web',        color: '#e2e8f0',
    svg: <g fill="none" stroke="currentColor" strokeWidth="3">{[0,30,60,90,120,150,180,210,240,270,300,330].map((a,i)=>{const rad=a*Math.PI/180;return<line key={i} x1="50" y1="50" x2={50+44*Math.cos(rad)} y2={50+44*Math.sin(rad)}/>})}{[12,22,32,42].map((r,i)=><circle key={i} cx="50" cy="50" r={r}/>)}</g> },

  { id: 'deadpool',  label: 'Deadpool',          color: '#dc2626',
    svg: <g fill="currentColor"><circle cx="50" cy="50" r="40"/><ellipse cx="36" cy="44" rx="12" ry="14" fill="#000" opacity="0.8"/><ellipse cx="64" cy="44" rx="12" ry="14" fill="#000" opacity="0.8"/><path d="M48 44 L52 44" stroke="white" strokeWidth="3" fill="none"/><path d="M32 62 Q50 75 68 62" stroke="white" strokeWidth="3" fill="none"/></g> },

  { id: 'antman',    label: 'Ant-Man',           color: '#ef4444',
    svg: <g fill="currentColor"><path d="M20 55 Q20 15 50 12 Q80 15 80 55 Q80 82 50 86 Q20 82 20 55Z"/><path d="M28 46 Q28 30 50 28 Q72 30 72 46 L68 50 Q68 36 50 34 Q32 36 32 50 Z" fill="#000" opacity="0.7"/><line x1="35" y1="12" x2="20" y2="2" stroke="currentColor" strokeWidth="4"/><circle cx="20" cy="2" r="4"/><line x1="65" y1="12" x2="80" y2="2" stroke="currentColor" strokeWidth="4"/><circle cx="80" cy="2" r="4"/></g> },

  { id: 'scarlet',   label: 'Scarlet Witch',     color: '#c026d3',
    svg: <g fill="none" stroke="currentColor" strokeWidth="4"><path d="M50 10 Q90 30 90 50 Q90 80 50 90 Q10 80 10 50 Q10 30 50 10Z"/><path d="M30 30 Q50 50 70 30" strokeLinecap="round"/><path d="M30 70 Q50 50 70 70" strokeLinecap="round"/><circle cx="50" cy="50" r="8" fill="currentColor" opacity="0.8"/><path d="M50 20 L50 36 M50 64 L50 80 M20 50 L36 50 M64 50 L80 50"/></g> },
];

const SYM_SIZE     = 56;          // px, width & height
const WANDER_SPEED = 1.3;         // max autonomous speed
const CATCH_RADIUS = 90;          // px — cursor gets this close → attract
const RELEASE_RADIUS = 140;       // px — cursor leaves → release
const ATTRACT_STRENGTH = 0.18;    // spring strength when caught

/* random wandering direction */
function randDir() {
  const a = Math.random() * Math.PI * 2;
  const spd = WANDER_SPEED * (0.5 + Math.random() * 0.8);
  return { vx: Math.cos(a) * spd, vy: Math.sin(a) * spd };
}

/* initial state for every symbol */
function buildInitial() {
  const W = typeof window !== 'undefined' ? window.innerWidth  : 1200;
  const H = typeof window !== 'undefined' ? window.innerHeight : 800;
  return SYMBOLS.map((_, i) => {
    const { vx, vy } = randDir();
    return {
      x: 50 + Math.random() * (W - SYM_SIZE - 100),
      y: 50 + Math.random() * (H - SYM_SIZE - 100),
      vx, vy,
      caught: false,
      nextTurn: Date.now() + 1500 + Math.random() * 3000,
    };
  });
}

export default function InteractiveHeroBackground() {
  const stateRef  = useRef(buildInitial());
  const mouseRef  = useRef({ x: -9999, y: -9999 }); // off-screen by default
  const rafRef    = useRef(null);
  const [, tick]  = useState(0); // force re-render each frame

  /* ── track mouse / touch position ── */
  useEffect(() => {
    const onMove = (e) => {
      const src = e.touches ? e.touches[0] : e;
      mouseRef.current = { x: src.clientX, y: src.clientY };
    };
    const onLeave = () => { mouseRef.current = { x: -9999, y: -9999 }; };

    window.addEventListener('mousemove',  onMove,  { passive: true });
    window.addEventListener('touchmove',  onMove,  { passive: true });
    document.addEventListener('mouseleave', onLeave);
    return () => {
      window.removeEventListener('mousemove',  onMove);
      window.removeEventListener('touchmove',  onMove);
      document.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  /* ── main physics loop ── */
  useEffect(() => {
    const loop = () => {
      const now = Date.now();
      const W   = window.innerWidth;
      const H   = window.innerHeight;
      const mx  = mouseRef.current.x;
      const my  = mouseRef.current.y;

      /* ── pre-pass: find the single closest symbol within catch range ── */
      let nearestIdx  = -1;
      let nearestDist = Infinity;
      stateRef.current.forEach((s, i) => {
        const cx   = s.x + SYM_SIZE / 2;
        const cy   = s.y + SYM_SIZE / 2;
        const dist = Math.sqrt((mx - cx) ** 2 + (my - cy) ** 2);
        /* keep track of currently-caught symbol with a small hysteresis bonus */
        const effective = dist - (s.caught ? 20 : 0);
        if (effective < CATCH_RADIUS && effective < nearestDist) {
          nearestDist = effective;
          nearestIdx  = i;
        }
      });

      stateRef.current = stateRef.current.map((s, i) => {
        /* centre of symbol */
        const cx = s.x + SYM_SIZE / 2;
        const cy = s.y + SYM_SIZE / 2;
        const dist = Math.sqrt((mx - cx) ** 2 + (my - cy) ** 2);

        /* only the nearest one within range can be caught */
        let caught = i === nearestIdx && dist < RELEASE_RADIUS;

        let { x, y, vx, vy, nextTurn } = s;

        if (caught) {
          /* ── ATTRACTED: spring toward cursor centre ── */
          const targetX = mx - SYM_SIZE / 2;
          const targetY = my - SYM_SIZE / 2;
          vx += (targetX - x) * ATTRACT_STRENGTH;
          vy += (targetY - y) * ATTRACT_STRENGTH;

          /* dampen so it circles the cursor rather than teleporting */
          vx *= 0.72;
          vy *= 0.72;

        } else {
          /* ── FREE WANDER ── */
          /* random direction change on schedule */
          if (now >= nextTurn) {
            const dir = randDir();
            vx = vx * 0.4 + dir.vx * 0.6;
            vy = vy * 0.4 + dir.vy * 0.6;
            nextTurn = now + 1500 + Math.random() * 3500;
          }

          /* speed clamp */
          const spd = Math.sqrt(vx * vx + vy * vy);
          if (spd > WANDER_SPEED * 2) { vx = (vx/spd)*WANDER_SPEED*2; vy = (vy/spd)*WANDER_SPEED*2; }
          if (spd < 0.3) { const d=randDir(); vx=d.vx; vy=d.vy; }
        }

        x += vx;
        y += vy;

        /* wall bounce */
        if (x < 0)            { x = 0;           vx =  Math.abs(vx) * 0.7; }
        if (x > W - SYM_SIZE) { x = W - SYM_SIZE; vx = -Math.abs(vx) * 0.7; }
        if (y < 0)            { y = 0;           vy =  Math.abs(vy) * 0.7; }
        if (y > H - SYM_SIZE) { y = H - SYM_SIZE; vy = -Math.abs(vy) * 0.7; }

        return { ...s, x, y, vx, vy, caught, nextTurn };
      });

      tick(n => n + 1); // re-render
      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <div className="hero-symbols-bg" aria-hidden="true">
      {SYMBOLS.map((sym, i) => {
        const s = stateRef.current[i];
        return (
          <div
            key={sym.id}
            className={`hero-sym${s.caught ? ' hero-sym--caught' : ''}`}
            style={{
              transform: `translate(${s.x}px, ${s.y}px)`,
              '--sym-color': sym.color,
            }}
          >
            <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              {sym.svg}
            </svg>
            {s.caught && (
              <span className="hero-sym-label">{sym.label}</span>
            )}
          </div>
        );
      })}
    </div>
  );
}
