import React, { useEffect, useId, useRef, useState } from 'react';
import { motion } from 'motion/react';
import './DotBackground.css';

export function DotBackground({
  width = 16,
  height = 16,
  x = 0,
  y = 0,
  cx = 1,
  cy = 1,
  cr = 1,
  glow = false,
  ...props
}) {
  const containerRef = useRef(null);
  const id = useId();
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const clampNumber = (n, fallback) =>
      Number.isFinite(Number(n)) && Number(n) >= 0 ? Number(n) : fallback;

    width = clampNumber(width, 16);
    height = clampNumber(height, 16);
    cx = clampNumber(cx, 1);
    cy = clampNumber(cy, 1);
    cr = clampNumber(cr, 1);
  }, [width, height, cx, cy, cr]);

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setDimensions({ width, height });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  const cols = Math.ceil((dimensions.width || 0) / (width || 1));
  const rows = Math.ceil((dimensions.height || 0) / (height || 1));
  const dots = Array.from({ length: cols * rows }, (_, i) => {
    const col = i % cols;
    const row = Math.floor(i / cols);
    return {
      x: col * width + cx,
      y: row * height + cy,
      delay: Math.random() * 5,
      duration: Math.random() * 3 + 2,
    };
  });

  return (
    <svg
      ref={containerRef}
      aria-hidden='true'
      className='dotpattern'
      {...props}
    >
      <defs>
        <radialGradient id={`${id}-gradient`}>
          <stop offset='0%' stopColor='currentColor' stopOpacity='1' />
          <stop offset='100%' stopColor='currentColor' stopOpacity='0' />
        </radialGradient>
      </defs>
      {dots.map((dot) => (
        <motion.circle
          key={`${dot.x}-${dot.y}`}
          cx={dot.x}
          cy={dot.y}
          r={cr}
          fill={glow ? `url(#${id}-gradient)` : 'currentColor'}
          initial={glow ? { opacity: 0.4, scale: 1 } : {}}
          animate={
            glow
              ? {
                  opacity: [0.4, 1, 0.4],
                  scale: [1, 1.5, 1],
                }
              : {}
          }
          transition={
            glow
              ? {
                  duration: dot.duration,
                  repeat: Infinity,
                  repeatType: 'reverse',
                  delay: dot.delay,
                  ease: 'easeInOut',
                }
              : {}
          }
        />
      ))}
    </svg>
  );
}
