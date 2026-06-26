import React, { useEffect, useRef } from 'react';

/**
 * Minimal, zero-dependency interactive background.
 * Creates a subtle grid that illuminates dynamically around the user's cursor.
 * Uses CSS variables updated via requestAnimationFrame to avoid React reflows.
 */
export default function InteractiveGrid({ 
  glowColor = 'rgba(255, 200, 1, 0.08)', 
  gridColor = 'rgba(17, 76, 90, 0.1)' 
}) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let rafId;
    const onMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        container.style.setProperty('--x', `${x}px`);
        container.style.setProperty('--y', `${y}px`);
      });
    };

    const section = container.closest('section') || container;
    section.addEventListener('mousemove', onMouseMove, { passive: true });
    
    return () => {
      section.removeEventListener('mousemove', onMouseMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
        '--x': '-1000px',
        '--y': '-1000px',
      }}
      aria-hidden="true"
    >
      {/* Ambient follow glow */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(800px circle at var(--x) var(--y), ${glowColor}, transparent 40%)`,
        }}
      />
      {/* Dotted grid mask reveal */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `radial-gradient(${gridColor} 1.5px, transparent 1.5px)`,
          backgroundSize: '36px 36px',
          maskImage: 'radial-gradient(600px circle at var(--x) var(--y), black 10%, transparent 70%)',
          WebkitMaskImage: 'radial-gradient(600px circle at var(--x) var(--y), black 10%, transparent 70%)',
        }}
      />
    </div>
  );
}
