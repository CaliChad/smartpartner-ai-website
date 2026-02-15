import type { PackageConfig, PackageId } from '@/types/payment';

// Update this rate periodically to reflect current market rates
// Current rate as of Feb 2026: $1 USD = KES 128.81
export const USD_TO_KES_RATE = 128.81;

export const CURRENCY = 'KES';

export function usdToKes(usd: number): number {
  return Math.round(usd * USD_TO_KES_RATE);
}

export const PACKAGES: Record<PackageId, PackageConfig> = {
  'ai-audit': {
    id: 'ai-audit',
    name: 'AI Audit Only',
    description: '60-minute consultation',
    minAmountUSD: 150,
    maxAmountUSD: 150,
    isFixed: true,
  },
  starter: {
    id: 'starter',
    name: 'Starter Automation',
    description: 'Single workflow automation',
    minAmountUSD: 250,
    maxAmountUSD: 500,
    isFixed: false,
  },
  growth: {
    id: 'growth',
    name: 'Growth Package',
    description: '3-5 interconnected automations',
    minAmountUSD: 625,
    maxAmountUSD: 1250,
    isFixed: false,
  },
  enterprise: {
    id: 'enterprise',
    name: 'Enterprise Suite',
    description: 'Complete business automation overhaul',
    minAmountUSD: 2500,
    maxAmountUSD: 5000,
    isFixed: false,
  },
};

export const PACKAGE_ORDER: PackageId[] = ['ai-audit', 'starter', 'growth', 'enterprise'];

export function isValidAmountKES(packageId: PackageId, kesAmount: number): boolean {
  const pkg = PACKAGES[packageId];
  if (!pkg) return false;
  const minKES = usdToKes(pkg.minAmountUSD);
  const maxKES = usdToKes(pkg.maxAmountUSD);
  // Allow 2% tolerance for rounding differences
  const tolerance = 0.02;
  return kesAmount >= minKES * (1 - tolerance) && kesAmount <= maxKES * (1 + tolerance);
}
