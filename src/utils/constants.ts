export const APP_NAME = 'PROMOZY';
export const APP_TAGLINE = 'Promote Faster. Sell Smarter.';

export const PLANS = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    maxProducts: 3,
    maxShares: 10,
    features: ['3 Products', '10 Shares/month', 'Basic Analytics', 'Email Support'],
  },
  {
    id: 'starter',
    name: 'Starter',
    price: 499,
    maxProducts: 10,
    maxShares: 100,
    features: ['10 Products', '100 Shares/month', 'Advanced Analytics', 'Priority Support', 'Custom Messages'],
  },
  {
    id: 'professional',
    name: 'Professional',
    price: 999,
    maxProducts: 50,
    maxShares: 500,
    features: ['50 Products', '500 Shares/month', 'Full Analytics Dashboard', '24/7 Support', 'Custom Branding', 'API Access'],
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 2999,
    maxProducts: -1,
    maxShares: -1,
    features: ['Unlimited Products', 'Unlimited Shares', 'White-label Solution', 'Dedicated Support', 'Custom Integration', 'SLA Guarantee'],
  },
];

export const CATEGORIES = [
  'Electronics',
  'Fashion',
  'Home & Kitchen',
  'Beauty & Personal Care',
  'Sports & Fitness',
  'Books & Stationery',
  'Toys & Games',
  'Automotive',
  'Health & Wellness',
  'Other',
];