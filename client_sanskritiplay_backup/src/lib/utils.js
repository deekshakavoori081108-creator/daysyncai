import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  }).format(amount);
}

export function getCivilizationThemeColor(civ) {
  const c = civ?.toLowerCase() || '';
  if (c.includes('mesopotamia') || c.includes('ur')) return { bg: 'bg-amber-100', text: 'text-amber-900', border: 'border-amber-300', badge: 'bg-amber-700 text-amber-50', hex: '#C1A456' };
  if (c.includes('indus') || c.includes('harapp')) return { bg: 'bg-orange-100', text: 'text-orange-900', border: 'border-orange-300', badge: 'bg-terracotta-500 text-white', hex: '#C85A32' };
  if (c.includes('egypt')) return { bg: 'bg-yellow-100', text: 'text-yellow-900', border: 'border-yellow-400', badge: 'bg-yellow-700 text-yellow-50', hex: '#DDA15E' };
  if (c.includes('viking') || c.includes('nordic')) return { bg: 'bg-slate-100', text: 'text-slate-900', border: 'border-slate-300', badge: 'bg-lapis-600 text-white', hex: '#1D3557' };
  if (c.includes('india') || c.includes('vedic')) return { bg: 'bg-red-100', text: 'text-red-900', border: 'border-red-300', badge: 'bg-red-700 text-white', hex: '#BA4924' };
  if (c.includes('maya') || c.includes('mesoamerica') || c.includes('aztec')) return { bg: 'bg-emerald-100', text: 'text-emerald-900', border: 'border-emerald-300', badge: 'bg-jade-500 text-white', hex: '#2A9D8F' };
  if (c.includes('china') || c.includes('han')) return { bg: 'bg-rose-100', text: 'text-rose-900', border: 'border-rose-300', badge: 'bg-rose-700 text-white', hex: '#9B391A' };
  if (c.includes('africa') || c.includes('mali') || c.includes('yoruba')) return { bg: 'bg-lime-100', text: 'text-lime-900', border: 'border-lime-300', badge: 'bg-lime-800 text-lime-50', hex: '#7F6427' };
  return { bg: 'bg-sand-100', text: 'text-sand-900', border: 'border-sand-300', badge: 'bg-terracotta-600 text-white', hex: '#C85A32' };
}
