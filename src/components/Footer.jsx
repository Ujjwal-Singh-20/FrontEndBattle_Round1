import React from 'react';

export default function Footer() {
  return (
    <footer style={{ backgroundColor: 'var(--color-oceanic-noir)', color: 'var(--color-arctic-powder)', padding: '4rem 0 2rem' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '3rem', marginBottom: '4rem' }}>
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.25rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <img src="/assets/svgs/cube-16-solid.svg" alt="" aria-hidden="true" width="20" height="20" style={{ width: '20px', filter: 'brightness(0) invert(1)' }} />
              NeuralFlow
            </div>
            <p style={{ opacity: 0.7, fontSize: '0.875rem', lineHeight: 1.6 }}>
              Next-gen AI automation platform for data teams. Real-time processing, multi-agent orchestration, and enterprise-grade reliability.
            </p>
          </div>
          <div>
            <h4 style={{ color: 'var(--color-arctic-powder)', marginBottom: '1rem', fontFamily: 'var(--font-body)', fontWeight: 600 }}>Product</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li><a href="#features" style={{ color: 'var(--color-arctic-powder)', opacity: 0.7, textDecoration: 'none' }}>Features</a></li>
              <li><a href="#pricing" style={{ color: 'var(--color-arctic-powder)', opacity: 0.7, textDecoration: 'none' }}>Pricing</a></li>
              <li><a href="#" style={{ color: 'var(--color-arctic-powder)', opacity: 0.7, textDecoration: 'none' }}>Documentation</a></li>
              <li><a href="#" style={{ color: 'var(--color-arctic-powder)', opacity: 0.7, textDecoration: 'none' }}>Integrations</a></li>
            </ul>
          </div>
          <div>
            <h4 style={{ color: 'var(--color-arctic-powder)', marginBottom: '1rem', fontFamily: 'var(--font-body)', fontWeight: 600 }}>Company</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li><a href="#" style={{ color: 'var(--color-arctic-powder)', opacity: 0.7, textDecoration: 'none' }}>About</a></li>
              <li><a href="#" style={{ color: 'var(--color-arctic-powder)', opacity: 0.7, textDecoration: 'none' }}>Blog</a></li>
              <li><a href="#" style={{ color: 'var(--color-arctic-powder)', opacity: 0.7, textDecoration: 'none' }}>Careers</a></li>
              <li><a href="#" style={{ color: 'var(--color-arctic-powder)', opacity: 0.7, textDecoration: 'none' }}>Contact</a></li>
            </ul>
          </div>
        </div>
        <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)', paddingTop: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', fontSize: '0.875rem', opacity: 0.7 }}>
          <p>&copy; {new Date().getFullYear()} NeuralFlow. All rights reserved.</p>
          <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <a href="#" style={{ color: 'var(--color-arctic-powder)', textDecoration: 'none' }}>Privacy Policy</a>
              <a href="#" style={{ color: 'var(--color-arctic-powder)', textDecoration: 'none' }}>Terms of Service</a>
            </div>
            <button aria-label="Scroll to top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: 'rgba(255, 255, 255, 0.1)', color: 'var(--color-arctic-powder)', padding: '0.5rem 1rem', borderRadius: '4px' }}>
              Top
              <img src="/assets/svgs/chevron-up-solid.svg" alt="" aria-hidden="true" width="16" height="16" style={{ width: '16px', filter: 'invert(1)' }} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
