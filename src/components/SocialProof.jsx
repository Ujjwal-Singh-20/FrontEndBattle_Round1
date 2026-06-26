import React from 'react';
import InteractiveGrid from './InteractiveGrid';

export default function SocialProof() {
  return (
    <section id="social-proof" className="py-20" style={{ background: 'linear-gradient(180deg, var(--color-arctic-powder) 0%, var(--color-mystic-mint) 100%)', position: 'relative', overflow: 'hidden' }} aria-labelledby="social-proof-heading">
      {/* Subtle mouse-following grid animation */}
      <InteractiveGrid glowColor="rgba(255, 200, 1, 0.06)" gridColor="rgba(17, 76, 90, 0.1)" />
      <div className="container" style={{ textAlign: 'center', position: 'relative', zIndex: 10 }}>
        <h2 id="social-proof-heading" style={{ fontSize: '2rem', marginBottom: '3rem' }}>Trusted by Data Teams Worldwide</h2>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '4rem', flexWrap: 'wrap', opacity: 0.6, marginBottom: '4rem' }}>
          {/* Using placeholder SVGs acting as logos */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, fontSize: '1.25rem' }}>
            <img src="/assets/svgs/cube-16-solid.svg" alt="" aria-hidden="true" width="24" height="24" style={{ width: '24px' }} />
            DataStack
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, fontSize: '1.25rem' }}>
            <img src="/assets/svgs/link-solid.svg" alt="" aria-hidden="true" width="24" height="24" style={{ width: '24px' }} />
            ChainFlow
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, fontSize: '1.25rem' }}>
            <img src="/assets/svgs/arrow-trending-up.svg" alt="" aria-hidden="true" width="24" height="24" style={{ width: '24px' }} />
            TrendMetrics
          </div>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', justifyContent: 'center' }}>
          <article className="bento-card" style={{ maxWidth: '400px', textAlign: 'left', backgroundColor: 'var(--color-arctic-powder)' }}>
            <div style={{ color: 'var(--color-forsythia)', fontSize: '1.5rem', marginBottom: '1rem' }} aria-label="5 out of 5 stars">★★★★★</div>
            <blockquote style={{ fontStyle: 'italic', marginBottom: '1.5rem', color: 'var(--color-oceanic-noir)', opacity: 0.8 }}>
              "NeuralFlow completely transformed how we orchestrate our pipelines. What used to take hours now takes minutes."
            </blockquote>
            <cite style={{ fontWeight: 600, display: 'block', fontStyle: 'normal' }}>
              — Sarah Jenkins, Lead Data Engineer
            </cite>
          </article>

          <article className="bento-card" style={{ maxWidth: '400px', textAlign: 'left', backgroundColor: 'var(--color-arctic-powder)' }}>
            <div style={{ color: 'var(--color-forsythia)', fontSize: '1.5rem', marginBottom: '1rem' }} aria-label="5 out of 5 stars">★★★★★</div>
            <blockquote style={{ fontStyle: 'italic', marginBottom: '1.5rem', color: 'var(--color-oceanic-noir)', opacity: 0.8 }}>
              "The pricing model is transparent and the intelligent node auto-scaling saves us thousands a month."
            </blockquote>
            <cite style={{ fontWeight: 600, display: 'block', fontStyle: 'normal' }}>
              — Mark Davids, CTO
            </cite>
          </article>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginTop: '3rem' }}>
          <button aria-label="Previous testimonial" style={{ background: 'var(--color-arctic-powder)', padding: '0.75rem', borderRadius: '50%', border: '1px solid rgba(0,0,0,0.1)' }}>
            <img src="/assets/svgs/chevron-left.svg" alt="" aria-hidden="true" width="24" height="24" style={{ width: '24px' }} />
          </button>
          <button aria-label="Next testimonial" style={{ background: 'var(--color-arctic-powder)', padding: '0.75rem', borderRadius: '50%', border: '1px solid rgba(0,0,0,0.1)' }}>
            <img src="/assets/svgs/chevron-right.svg" alt="" aria-hidden="true" width="24" height="24" style={{ width: '24px' }} />
          </button>
        </div>
      </div>
    </section>
  );
}
