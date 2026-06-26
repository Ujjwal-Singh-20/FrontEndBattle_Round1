export const TIERS = {
  starter:    { base_usd: 29  },
  pro:        { base_usd: 79  },
  enterprise: { base_usd: 199 },
};

export const CURRENCIES = {
  USD: { symbol: '$', rate: 1, tariff_multiplier: 1.0 },
  INR: { symbol: '₹', rate: 83.50, tariff_multiplier: 1.18 }, // 18% tax/tariff
  EUR: { symbol: '€', rate: 0.92, tariff_multiplier: 1.05 }, // 5% VAT/tariff
};

export const ANNUAL_MULTIPLIER = 0.80; // 20% discount

export function getPrice(tierKey, currency, isAnnual) {
  const base = TIERS[tierKey].base_usd;
  const curr = CURRENCIES[currency];
  const monthly = base * curr.rate * curr.tariff_multiplier;
  return isAnnual ? monthly * ANNUAL_MULTIPLIER : monthly;
}
