export type SubscriptionTier = 'free' | 'pro' | 'enterprise';

export interface SubscriptionPlan {
  id: string;
  tier: SubscriptionTier;
  name: string;
  description: string;
  price: number;
  features: string[];
  searchLimit: number;
  highlighted?: boolean;
}

export interface UserSubscription {
  tier: SubscriptionTier;
  searchesUsed: number;
  searchLimit: number;
  validUntil: string;
}

export const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    id: 'price_basic',
    tier: 'free',
    name: 'Basic',
    description: 'Perfect for getting started',
    price: 0,
    searchLimit: 3,
    features: [
      '3 hashtag searches per month',
      'Basic hashtag analytics',
      'Copy and save hashtags',
      'Community support'
    ]
  },
  {
    id: 'price_pro',
    tier: 'pro',
    name: 'Pro',
    description: 'Best for content creators',
    price: 9.99,
    searchLimit: 100,
    highlighted: true,
    features: [
      '100 hashtag searches per month',
      'Advanced analytics and insights',
      'Trending hashtags detection',
      'Engagement rate analysis',
      'Priority support',
      'No ads'
    ]
  },
  {
    id: 'price_enterprise',
    tier: 'enterprise',
    name: 'Enterprise',
    description: 'For teams and agencies',
    price: 29.99,
    searchLimit: 1000,
    features: [
      'Unlimited hashtag searches',
      'Team collaboration features',
      'Custom analytics dashboard',
      'API access',
      'Dedicated account manager',
      'Custom contracts available',
      'SLA support'
    ]
  }
];