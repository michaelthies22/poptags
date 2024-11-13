import { loadStripe } from '@stripe/stripe-js';
import { addDoc, collection, doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';
import { db } from './firebase';
import type { SubscriptionPlan } from '@/types/subscription';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

export async function createCheckoutSession(
  userId: string,
  plan: SubscriptionPlan,
  returnUrl: string
) {
  if (!userId) throw new Error('User ID is required');

  try {
    // Initialize customer document if it doesn't exist
    const customerRef = doc(db, 'customers', userId);
    const customerDoc = await getDoc(customerRef);

    if (!customerDoc.exists()) {
      await setDoc(customerRef, {
        userId,
        created: new Date(),
      });
    }

    // Create checkout session
    const checkoutRef = collection(customerRef, 'checkout_sessions');
    const checkoutDoc = await addDoc(checkoutRef, {
      price: plan.id,
      success_url: `${returnUrl}?success=true`,
      cancel_url: `${returnUrl}?canceled=true`,
      mode: 'subscription',
      metadata: {
        userId,
        planId: plan.id,
      },
      allow_promotion_codes: true,
      billing_address_collection: 'required',
    });

    // Wait for the session to be created by the extension
    const unsubscribe = onSnapshot(checkoutDoc, async (snap) => {
      const { sessionId, error } = snap.data() || {};

      if (error) {
        throw new Error(error.message);
      }

      if (sessionId) {
        const stripe = await stripePromise;
        if (!stripe) throw new Error('Stripe failed to initialize');
        
        await stripe.redirectToCheckout({ sessionId });
      }
    });

    return () => unsubscribe();
  } catch (error) {
    console.error('Error creating checkout session:', error);
    throw error;
  }
}

export async function getSubscriptionStatus(userId: string) {
  if (!userId) return null;

  try {
    const statusRef = doc(db, 'subscription_status', userId);
    const statusDoc = await getDoc(statusRef);

    if (!statusDoc.exists()) {
      return null;
    }

    return statusDoc.data();
  } catch (error) {
    console.error('Error getting subscription status:', error);
    return null;
  }
}