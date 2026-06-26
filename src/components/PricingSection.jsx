import React, { useState, useEffect, useRef } from 'react';
import { TIERS, CURRENCIES, getPrice } from '../data/pricingMatrix';

function PricingCard({ tier, name, description, highlighted }) {
  const priceRef = useRef(null);

  useEffect(() => {
    let currentCurrency = 'USD';
    let currentIsAnnual = false;

    const updatePrice = () => {
      if (priceRef.current) {
        priceRef.current.textContent = CURRENCIES[currentCurrency].symbol + getPrice(tier, currentCurrency, currentIsAnnual).toFixed(0);
      }
    };

    const handlePricingChange = (e) => {
      if (e.detail.currency !== undefined) currentCurrency = e.detail.currency;
      if (e.detail.isAnnual !== undefined) currentIsAnnual = e.detail.isAnnual;
      updatePrice();
    };

    window.addEventListener('pricing-change', handlePricingChange);
    updatePrice();

    return () => window.removeEventListener('pricing-change', handlePricingChange);
  }, [tier]);

  return (
    <div className="bento-card" style={{ 
      display: 'flex', 
      flexDirection: 'column',
      position: 'relative',
      border: highlighted ? '2px solid var(--color-forsythia)' : '2px solid transparent'
    }}>
      {highlighted && (
        <div style={{ position: 'absolute', top: '-14px', left: '50%', transform: 'translateX(-50%)', background: 'var(--color-forsythia)', color: 'var(--color-oceanic-noir)', padding: '4px 12px', borderRadius: '12px', fontSize: '0.875rem', fontWeight: 600, fontFamily: 'var(--font-display)' }}>
          Most Popular
        </div>
      )}
      <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{name}</h3>
      <p style={{ color: 'var(--color-arctic-powder)', opacity: 0.8, marginBottom: '2rem' }}>{description}</p>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: '4px', marginBottom: '2rem' }}>
        <span ref={priceRef} aria-live="polite" style={{ fontSize: '3rem', fontWeight: 700, fontFamily: 'var(--font-display)', lineHeight: 1 }}>
          {/* Initial value is set via useEffect to avoid hydration mismatch if needed, but since it's client side rendering it's fine. */}
        </span>
        <span style={{ color: 'var(--color-arctic-powder)', opacity: 0.8, paddingBottom: '6px' }}>/mo</span>
      </div>
      <button className="btn-primary" style={{ marginTop: 'auto', width: '100%', background: highlighted ? 'linear-gradient(135deg, var(--color-forsythia), var(--color-deep-saffron))' : 'var(--color-mystic-mint)' }}>
        Choose {name}
      </button>
    </div>
  );
}

function PricingToggles() {
  const [isAnnual, setIsAnnual] = useState(false);
  const [currency, setCurrency] = useState('USD');

  const onAnnualChange = (e) => {
    const val = e.target.checked;
    setIsAnnual(val);
    window.dispatchEvent(new CustomEvent('pricing-change', { detail: { isAnnual: val } }));
  };

  const onCurrencyChange = (e) => {
    const val = e.target.value;
    setCurrency(val);
    window.dispatchEvent(new CustomEvent('pricing-change', { detail: { currency: val } }));
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '2rem', flexWrap: 'wrap' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <span style={{ fontWeight: isAnnual ? 400 : 600 }}>Monthly</span>
        <input 
          type="checkbox" 
          className="pill-switch" 
          checked={isAnnual} 
          onChange={onAnnualChange} 
          aria-label="Toggle Annual Billing"
        />
        <span style={{ fontWeight: isAnnual ? 600 : 400, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          Annually
          <span style={{ background: 'var(--color-forsythia)', color: 'var(--color-oceanic-noir)', fontSize: '0.75rem', padding: '2px 8px', borderRadius: '12px', fontFamily: 'var(--font-display)', fontWeight: 600 }}>Save 20%</span>
        </span>
      </div>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <label htmlFor="currency-select" style={{ fontWeight: 500 }}>Currency:</label>
        <select 
          id="currency-select"
          value={currency} 
          onChange={onCurrencyChange}
          style={{ padding: '0.5rem', borderRadius: '4px', border: 'none', fontFamily: 'var(--font-display)', fontWeight: 600, background: 'var(--color-mystic-mint)', color: 'var(--color-oceanic-noir)', cursor: 'pointer' }}
        >
          {Object.keys(CURRENCIES).map(curr => (
            <option key={curr} value={curr}>{curr}</option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default function PricingSection() {
  // PricingSection has NO state. Toggling currency/billing will NOT re-render this parent component.
  return (
    <section id="pricing" className="py-20 dark-section">
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>Transparent Pricing</h2>
          <PricingToggles />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', maxWidth: '1000px', margin: '0 auto' }}>
          <PricingCard tier="starter" name="Starter" description="For small teams getting started with automation." />
          <PricingCard tier="pro" name="Professional" description="Advanced workflows and multi-agent systems." highlighted />
          <PricingCard tier="enterprise" name="Enterprise" description="Custom deployments and dedicated support." />
        </div>
      </div>
    </section>
  );
}
