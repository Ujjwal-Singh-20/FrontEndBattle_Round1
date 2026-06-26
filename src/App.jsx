import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import FeatureSection from './components/FeatureSection';
import SocialProof from './components/SocialProof';
import PricingSection from './components/PricingSection';
import Cta from './components/Cta';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';

function Banner() {
  const [show, setShow] = useState(true);
  if (!show) return null;
  return (
    <div role="banner" style={{ background: 'var(--color-forsythia)', color: 'var(--color-oceanic-noir)', padding: '0.75rem', textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem', position: 'relative', zIndex: 100 }}>
      <span style={{ fontWeight: 600, fontSize: '0.875rem', fontFamily: 'var(--font-display)' }}>✦ NeuralFlow 2.0 Early Access is now live!</span>
      <button onClick={() => setShow(false)} aria-label="Dismiss banner" style={{ background: 'rgba(0,0,0,0.15)', display: 'flex', alignItems: 'center', padding: '0.3rem', borderRadius: '50%', transition: 'background 150ms ease-out' }}>
        <img src="/assets/svgs/x-mark.svg" alt="" aria-hidden="true" width="14" height="14" style={{ width: '14px' }} />
      </button>
    </div>
  );
}

function App() {
  // Scroll-reveal: observe sections as they enter viewport (native IntersectionObserver, no library)
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          io.unobserve(entry.target); // fire once
        }
      }),
      { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
    );

    // Observe every section except the hero (already has entry animations)
    document.querySelectorAll('section:not(#hero), footer').forEach(el => io.observe(el));

    return () => io.disconnect();
  }, []);

  return (
    <>
      <CustomCursor />
      <Banner />
      <Header />
      <main>
        <HeroSection />
        <FeatureSection />
        <SocialProof />
        <PricingSection />
        <Cta />
      </main>
      <Footer />
    </>
  );
}

export default App;
