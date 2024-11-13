import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/auth-context';
import { doc, setDoc, getDoc, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { UserSubscription } from '@/types/subscription';

const FREE_TIER: UserSubscription = {
  tier: 'free',
  searchLimit: 3,
  searchesUsed: 0,
  validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
};

export function useSubscription() {
  const { user } = useAuth();
  const [subscription, setSubscription] = useState<UserSubscription>(FREE_TIER);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setSubscription(FREE_TIER);
      setLoading(false);
      return;
    }

    let unsubscribe: (() => void) | undefined;

    const setupSubscriptionListener = async () => {
      try {
        // Initialize subscription status if it doesn't exist
        const statusRef = doc(db, 'subscription_status', user.uid);
        const statusDoc = await getDoc(statusRef);

        if (!statusDoc.exists()) {
          await setDoc(statusRef, {
            ...FREE_TIER,
            userId: user.uid,
            email: user.email,
            createdAt: new Date(),
            updatedAt: new Date(),
          });
        }

        // Listen for subscription changes
        unsubscribe = onSnapshot(statusRef, (doc) => {
          if (doc.exists()) {
            setSubscription(doc.data() as UserSubscription);
          } else {
            setSubscription(FREE_TIER);
          }
          setLoading(false);
        }, (error) => {
          console.error('Subscription listener error:', error);
          setSubscription(FREE_TIER);
          setLoading(false);
        });
      } catch (error) {
        console.error('Error setting up subscription:', error);
        setSubscription(FREE_TIER);
        setLoading(false);
      }
    };

    setupSubscriptionListener();

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [user]);

  const incrementUsage = async () => {
    if (!user) return;

    try {
      const statusRef = doc(db, 'subscription_status', user.uid);
      const newCount = subscription.searchesUsed + 1;

      await setDoc(statusRef, {
        ...subscription,
        searchesUsed: newCount,
        updatedAt: new Date(),
      }, { merge: true });

      // Also track usage in separate collection
      const usageRef = doc(db, 'usage', `${user.uid}_${Date.now()}`);
      await setDoc(usageRef, {
        userId: user.uid,
        action: 'search',
        timestamp: new Date(),
      });
    } catch (error) {
      console.error('Error updating usage count:', error);
    }
  };

  const resetUsage = async () => {
    if (!user) return;

    try {
      const statusRef = doc(db, 'subscription_status', user.uid);
      await setDoc(statusRef, {
        ...subscription,
        searchesUsed: 0,
        updatedAt: new Date(),
      }, { merge: true });
    } catch (error) {
      console.error('Error resetting usage count:', error);
    }
  };

  return {
    subscription,
    loading,
    incrementUsage,
    resetUsage,
  };
}