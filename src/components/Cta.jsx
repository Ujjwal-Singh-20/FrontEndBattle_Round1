import React from 'react';
import CTACanvas from './CTACanvas';

export default function Cta() {
  return (
    <section
      id="cta"
      className="py-20"
      style={{
        background: 'linear-gradient(135deg, var(--color-nocturnal), var(--color-oceanic-noir))',
        color: 'var(--color-arctic-powder)',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Three.js torus knot — subtle background geometry */}
      <CTACanvas />

      <div className="container" style={{ position: 'relative', zIndex: 1, padding: '4rem 2rem' }}>
        {/* Forsythia gradient corner glow */}
        <div aria-hidden="true" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'radial-gradient(ellipse at 50% 0%, rgba(255,200,1,0.08) 0%, transparent 60%)', pointerEvents: 'none' }}></div>

        <div style={{ position: 'relative' }}>
          {/* Section label */}
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.75rem', letterSpacing: '0.15em', color: 'var(--color-forsythia)', textTransform: 'uppercase', marginBottom: '1.5rem', opacity: 0.9 }}>
            — Get started today
          </div>

          <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', marginBottom: '1.25rem', color: 'var(--color-arctic-powder)', lineHeight: 1.1 }}>
            Ready to automate?
          </h2>
          <p style={{ fontSize: '1.125rem', marginBottom: '2.5rem', maxWidth: '560px', margin: '0 auto 2.5rem', opacity: 0.8, lineHeight: 1.7 }}>
            Join thousands of data teams scaling faster with NeuralFlow's intelligent orchestration engine.
          </p>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '2rem' }}>
            <button className="btn-primary" style={{ padding: '1.125rem 3rem', fontSize: '1.125rem', display: 'inline-flex', alignItems: 'center', gap: '0.75rem' }}>
              Start your free trial
              <img src="/assets/svgs/chevron-right.svg" alt="" aria-hidden="true" width="18" height="18" style={{ width: '18px', filter: 'brightness(0) saturate(100%) invert(18%) sepia(30%) saturate(1217%) hue-rotate(149deg) brightness(97%) contrast(93%)' }} />
            </button>
          </div>

          <p style={{ fontSize: '0.8125rem', opacity: 0.5, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1.5rem', flexWrap: 'wrap', fontFamily: 'var(--font-display)' }}>
            <span>✓ No credit card required</span>
            <span>✓ 14-day full access</span>
            <span>✓ Cancel anytime</span>
          </p>
        </div>
      </div>
    </section>
  );
}
