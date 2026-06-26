import React from 'react';
import HeroCanvas from './HeroCanvas';

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="dark-section"
      style={{
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Three.js neural network — sits behind all content at z-index 0 */}
      <HeroCanvas />

      {/* Part 1: Full Viewport Hero Header */}
      <div style={{
        minHeight: '100svh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        zIndex: 2,
        width: '100%',
        paddingTop: '5rem',
        paddingBottom: '2rem',
        textAlign: 'center'
      }}>
        <div aria-hidden="true" style={{ position: 'absolute', top: '-20%', left: '50%', transform: 'translateX(-50%)', width: '800px', height: '600px', background: 'radial-gradient(ellipse, rgba(255,200,1,0.07) 0%, transparent 70%)', pointerEvents: 'none' }}></div>
        <div aria-hidden="true" style={{ position: 'absolute', bottom: '0', right: '-10%', width: '500px', height: '500px', background: 'radial-gradient(ellipse, rgba(17,76,90,0.5) 0%, transparent 70%)', pointerEvents: 'none' }}></div>

        <div className="container">
        <div className="hero-badge" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,200,1,0.1)', border: '1px solid rgba(255,200,1,0.2)', borderRadius: '100px', padding: '0.375rem 1rem', marginBottom: '2rem', fontFamily: 'var(--font-display)', fontSize: '0.75rem', color: 'var(--color-forsythia)', letterSpacing: '0.08em', textTransform: 'uppercase', animation: 'fadeSlideUp 300ms ease-out both' }}>
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--color-forsythia)', animation: 'wfBlink 2s ease-in-out infinite', flexShrink: 0 }}></span>
          v2.0 Early Access — Now Live
        </div>

        <h1 className="hero-headline" style={{
          fontSize: 'clamp(2.5rem, 7vw, 6.5rem)',
          lineHeight: 0.95,
          letterSpacing: '-0.04em',
          margin: '0 auto 1.5rem',
          textTransform: 'lowercase',
          maxWidth: '900px',
        }}>
          Power your future with{' '}
          <span style={{ color: 'var(--color-forsythia)', position: 'relative', display: 'inline-block' }}>
            AI
          </span>
        </h1>

        <p className="hero-subtext" style={{ fontSize: '1.125rem', maxWidth: '560px', margin: '0 auto 2.5rem', color: 'var(--color-mystic-mint)', opacity: 0.85, lineHeight: 1.7 }}>
          Deploy custom enterprise agents and automate complex workflows.{' '}
          <span style={{ fontFamily: 'var(--font-display)', color: 'var(--color-forsythia)', fontWeight: 600 }}>Scale your intelligence.</span>
        </p>

        <div className="hero-cta" style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginBottom: '5rem', flexWrap: 'wrap' }}>
          <button className="btn-primary btn-magnetic" style={{ padding: '1rem 2.5rem', fontSize: '1.125rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <img src="/assets/svgs/cube-16-solid.svg" alt="" aria-hidden="true" width="20" height="20" style={{ width: '20px', filter: 'brightness(0) saturate(100%) invert(18%) sepia(30%) saturate(1217%) hue-rotate(149deg) brightness(97%) contrast(93%)' }} />
            Build A Workflow
          </button>
          <button className="btn-ghost" style={{ padding: '1rem 2.5rem', fontSize: '1.125rem' }}>
            <img src="/assets/svgs/link.svg" alt="" aria-hidden="true" width="18" height="18" style={{ width: '18px', filter: 'invert(1) opacity(0.7)' }} />
            Read Documentation
          </button>
        </div>
      </div>
      </div>

      {/* Part 2: Workflow Card (Below the fold) */}
      <div style={{ position: 'relative', zIndex: 2, width: '100%', paddingBottom: '6rem' }}>
        <div className="container">
          {/* Hero Visual: Animated Agent Workflow Pipeline */}
          <div className="hero-visual" style={{
          backgroundColor: 'var(--color-nocturnal)',
          borderRadius: '20px',
          border: '1px solid rgba(255,255,255,0.08)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
          padding: '3rem 2rem',
        }}>
          {/* Animated gradient border glow */}
          <div aria-hidden="true" style={{ position: 'absolute', inset: 0, borderRadius: '20px', background: 'linear-gradient(135deg, rgba(255,200,1,0.05) 0%, transparent 50%, rgba(17,76,90,0.3) 100%)', pointerEvents: 'none' }}></div>

          {/* Terminal-style header bar */}
          <div aria-hidden="true" style={{ position: 'absolute', top: '1rem', left: '1.5rem', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#FF5F57' }}></div>
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#FFBD2E' }}></div>
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#28C840' }}></div>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.6875rem', color: 'rgba(255,255,255,0.3)', marginLeft: '0.5rem', letterSpacing: '0.05em' }}>
              neuralflow — agent-pipeline-v2
            </span>
          </div>

          {/* Workflow Nodes */}
          <div className="workflow-viz" role="img" aria-label="NeuralFlow agent pipeline visualization">
            <div className="wf-node" style={{ animationDelay: '0ms' }}>
              <div className="wf-icon-wrapper">
                <img src="/assets/svgs/cube-16-solid.svg" alt="" aria-hidden="true" width="22" height="22" />
              </div>
              <span className="wf-label">Data Source</span>
              <span className="wf-status">ACTIVE</span>
            </div>
            <div className="wf-connector" style={{ '--delay': '0s' }} aria-hidden="true"></div>
            <div className="wf-node wf-node-active" style={{ animationDelay: '200ms' }}>
              <div className="wf-icon-wrapper" style={{ background: 'rgba(255,200,1,0.2)' }}>
                <img src="/assets/svgs/cog-8-tooth.svg" alt="" aria-hidden="true" width="22" height="22" />
              </div>
              <span className="wf-label">NeuralFlow</span>
              <span className="wf-status running">RUNNING</span>
            </div>
            <div className="wf-connector" style={{ '--delay': '0.5s' }} aria-hidden="true"></div>
            <div className="wf-node" style={{ animationDelay: '400ms' }}>
              <div className="wf-icon-wrapper">
                <img src="/assets/svgs/chart-pie.svg" alt="" aria-hidden="true" width="22" height="22" />
              </div>
              <span className="wf-label">Analytics</span>
              <span className="wf-status">READY</span>
            </div>
            <div className="wf-connector" style={{ '--delay': '1s' }} aria-hidden="true"></div>
            <div className="wf-node" style={{ animationDelay: '600ms' }}>
              <div className="wf-icon-wrapper">
                <img src="/assets/svgs/arrow-path.svg" alt="" aria-hidden="true" width="22" height="22" />
              </div>
              <span className="wf-label">Automate</span>
              <span className="wf-status">READY</span>
            </div>
          </div>

          {/* Live Metrics Strip */}
          <div className="workflow-stats">
            <div className="stat-item">
              <span className="stat-value">99.9%</span>
              <span className="stat-label">Uptime</span>
            </div>
            <div className="stat-divider" aria-hidden="true"></div>
            <div className="stat-item">
              <span className="stat-value">2.3M</span>
              <span className="stat-label">Requests/day</span>
            </div>
            <div className="stat-divider" aria-hidden="true"></div>
            <div className="stat-item">
              <span className="stat-value">&lt;12ms</span>
              <span className="stat-label">Avg Latency</span>
            </div>
            <div className="stat-divider" aria-hidden="true"></div>
            <div className="stat-item">
              <span className="stat-value">340+</span>
              <span className="stat-label">Integrations</span>
            </div>
          </div>
          </div>
        </div>
      </div>
    </section>
  );
}
