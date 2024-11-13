import { loadStripe } from '@stripe/stripe-js';

// Test mode publishable key - replace with your test key
export const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

export const STRIPE_TEST_CARDS = {
  success: '4242424242424242', // Always succeeds
  decline: '4000000000000002', // Always declines
  insufficient: '4000000000009995', // Insufficient funds
  threeDSecure: '4000000000003220', // 3D Secure authentication
};

export const TEST_CARD_DETAILS = {
  expiry: '12/34',
  cvc: '123',
  postal: '12345',
};