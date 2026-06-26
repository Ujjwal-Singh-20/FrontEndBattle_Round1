import React, { useState } from 'react';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header style={{ position: 'sticky', top: 0, backgroundColor: 'var(--color-arctic-powder)', zIndex: 1000, borderBottom: '1px solid var(--color-mystic-mint)' }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem' }}>

        {/* Brand */}
        <a href="#" aria-label="NeuralFlow Home" style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.5rem', color: 'var(--color-nocturnal)', display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
          <img src="/assets/svgs/cube-16-solid.svg" alt="" aria-hidden="true" width="24" height="24" style={{ width: '24px', height: '24px', transition: 'transform 200ms ease-out' }}
            onMouseEnter={e => e.target.style.transform = 'rotate(20deg) scale(1.1)'}
            onMouseLeave={e => e.target.style.transform = 'rotate(0deg) scale(1)'}
          />
          NeuralFlow
        </a>

        {/* Desktop Nav */}
        <nav aria-label="Main Navigation" className="nav-desktop">
          <ul style={{ display: 'flex', gap: '2rem', alignItems: 'center', listStyle: 'none', margin: 0, padding: 0 }}>
            <li>
              <a href="#features" className="nav-link" style={{ color: 'var(--color-oceanic-noir)', textDecoration: 'none', fontWeight: 500, fontSize: '0.9375rem' }}>Features</a>
            </li>
            <li>
              <a href="#pricing" className="nav-link" style={{ color: 'var(--color-oceanic-noir)', textDecoration: 'none', fontWeight: 500, fontSize: '0.9375rem' }}>Pricing</a>
            </li>
            <li>
              <button aria-label="Search" style={{ background: 'transparent', display: 'flex', alignItems: 'center', padding: '0.5rem', borderRadius: '4px', transition: 'background 150ms ease-out' }}>
                <img src="/assets/svgs/search.svg" alt="" aria-hidden="true" width="20" height="20" style={{ width: '20px', transition: 'transform 150ms ease-out' }}
                  onMouseEnter={e => e.target.style.transform = 'scale(1.15)'}
                  onMouseLeave={e => e.target.style.transform = 'scale(1)'}
                />
              </button>
            </li>
            <li>
              <button className="btn-primary">Get Started</button>
            </li>
          </ul>
        </nav>

        {/* Mobile Hamburger — toggles open/close */}
        <button
          className="nav-hamburger"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav-menu"
          onClick={() => setMenuOpen(v => !v)}
        >
          {menuOpen
            ? <img src="/assets/svgs/x-mark.svg" alt="" aria-hidden="true" width="22" height="22" style={{ width: '22px' }} />
            : <div className="hamburger-lines" aria-hidden="true"><span></span><span></span><span></span></div>
          }
        </button>
      </div>

      {/*
        Mobile Nav — uses `inert` attribute (not aria-hidden) to prevent
        focus reaching hidden children, fixing the browser accessibility warning.
        The `inert` prop is supported in React 19+ and modern browsers.
      */}
      <nav
        id="mobile-nav-menu"
        className={`nav-mobile${menuOpen ? ' open' : ''}`}
        aria-label="Mobile Navigation"
        {...(!menuOpen ? { inert: '' } : {})}
      >
        <div className="container" style={{ padding: '0 1rem 1.25rem' }}>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            <li>
              <a href="#features" onClick={() => setMenuOpen(false)} style={{ display: 'block', padding: '0.875rem 0', color: 'var(--color-oceanic-noir)', textDecoration: 'none', fontWeight: 500, borderBottom: '1px solid var(--color-mystic-mint)', transition: 'color 150ms ease-out' }}>
                Features
              </a>
            </li>
            <li>
              <a href="#pricing" onClick={() => setMenuOpen(false)} style={{ display: 'block', padding: '0.875rem 0', color: 'var(--color-oceanic-noir)', textDecoration: 'none', fontWeight: 500, borderBottom: '1px solid var(--color-mystic-mint)', transition: 'color 150ms ease-out' }}>
                Pricing
              </a>
            </li>
            <li style={{ paddingTop: '1rem' }}>
              <button className="btn-primary" style={{ width: '100%', justifyContent: 'center' }} onClick={() => setMenuOpen(false)}>
                Get Started
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
