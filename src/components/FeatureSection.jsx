import React, { useState } from 'react';
import WaveBackground from './WaveBackground';

const features = [
  { id: 1, title: 'Intelligent Orchestration', desc: 'Deploy multi-agent workflows with built-in conflict resolution. Automatically scale resources based on demand.', icon: '/assets/svgs/arrow-path.svg' },
  { id: 2, title: 'Real-time Analytics', desc: 'Monitor node health and pipeline throughput in real-time. Uncover hidden bottlenecks before they impact performance.', icon: '/assets/svgs/chart-pie.svg' },
  { id: 3, title: 'Seamless Integration', desc: 'Connect to your existing data lakes via secure Webhooks. Native support for AWS, GCP, and Azure.', icon: '/assets/svgs/link.svg' },
  { id: 4, title: 'Advanced Config', desc: 'Fine-tune model parameters and execution environments. Tailor your pipelines down to the specific micro-service level.', icon: '/assets/svgs/cog-8-tooth.svg' },
];

export default function FeatureSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  /*
   * Zero-Dependency Bento-to-Accordion Transition:
   * Uses a single, semantic DOM structure for both views.
   * State is isolated here and purely tracks the active index.
   * CSS Media Queries (@media min-width: 768px) handle the actual layout
   * transformation from a stacked accordion to a grid-based Bento box.
   * This guarantees 0 layout thrashing and perfect context tracking.
   */
  return (
    <section id="features" className="py-20" aria-labelledby="features-heading" style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Cool minimal 3D wireframe waves */}
      <WaveBackground color={0x114C5A} opacity={0.15} />
      
      <div className="container" style={{ position: 'relative', zIndex: 10 }}>
        <h2 id="features-heading" style={{ fontSize: 'clamp(2rem, 5vw, 2.5rem)', textAlign: 'center', marginBottom: '3rem' }}>
          Powerful Features
        </h2>

        <div className="features-hybrid-grid">
          {features.map((item, i) => (
            <article
              key={item.id}
              className={`bento-card hybrid-item ${activeIndex === i ? 'active' : ''}`}
              onMouseEnter={() => {
                // On desktop, hovering updates the context tracking
                if (window.innerWidth >= 768) setActiveIndex(i);
              }}
              onClick={() => {
                // On mobile, clicking toggles the accordion
                if (window.innerWidth < 768) {
                  setActiveIndex(activeIndex === i ? null : i);
                } else {
                  setActiveIndex(i);
                }
              }}
              onFocus={() => setActiveIndex(i)}
              tabIndex={0}
              aria-expanded={activeIndex === i}
            >
              <div className="hybrid-header">
                <h3>
                  <img src={item.icon} alt="" aria-hidden="true" width="36" height="36" className="hybrid-icon" />
                  {item.title}
                </h3>
                <img
                  className="hybrid-chevron"
                  src="/assets/svgs/chevron-down.svg"
                  alt=""
                  aria-hidden="true"
                  width="18"
                  height="18"
                />
              </div>
              <div className="hybrid-body">
                <p>{item.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
