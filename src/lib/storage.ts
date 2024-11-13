import { UserSubscription } from '@/types/subscription';

const STORAGE_KEYS = {
  SUBSCRIPTION: 'hashtag_subscription',
  SEARCHES: 'hashtag_searches',
} as const;

export function getLocalSubscription(): UserSubscription {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.SUBSCRIPTION);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Error reading subscription from storage:', error);
  }

  // Default free tier subscription
  const defaultSubscription: UserSubscription = {
    tier: 'free',
    searchesUsed: 0,
    searchLimit: 3,
    validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
  };

  localStorage.setItem(STORAGE_KEYS.SUBSCRIPTION, JSON.stringify(defaultSubscription));
  return defaultSubscription;
}

export function incrementSearchCount(): UserSubscription {
  const subscription = getLocalSubscription();
  subscription.searchesUsed += 1;
  localStorage.setItem(STORAGE_KEYS.SUBSCRIPTION, JSON.stringify(subscription));
  return subscription;
}

export function resetSearchCount(): UserSubscription {
  const subscription = getLocalSubscription();
  subscription.searchesUsed = 0;
  localStorage.setItem(STORAGE_KEYS.SUBSCRIPTION, JSON.stringify(subscription));
  return subscription;
}