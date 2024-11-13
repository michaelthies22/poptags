import { SUBSCRIPTION_PLANS } from '@/types/subscription';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export async function createPaymentIntent(planId: string) {
  const plan = SUBSCRIPTION_PLANS.find(p => p.id === planId);
  if (!plan) throw new Error('Invalid plan selected');

  try {
    const response = await fetch(`${API_URL}/create-payment-intent`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: plan.price * 100, // Convert to cents
        currency: 'usd',
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to create payment intent');
    }

    const data = await response.json();
    return data.clientSecret;
  } catch (error) {
    console.error('Payment intent error:', error);
    throw error;
  }
}