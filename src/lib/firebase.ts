import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { 
  getFirestore, 
  enableIndexedDbPersistence,
  increment,
  doc,
  setDoc,
  serverTimestamp,
  collection,
  getDocs,
  query,
  where,
  limit,
  writeBatch
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Create an initialization function
function initializeFirestore() {
  enableIndexedDbPersistence(db).catch((err) => {
    if (err.code === "failed-precondition") {
      // Multiple tabs open, persistence can only be enabled in one tab at a time
      console.warn("Multiple tabs open, persistence disabled");
    } else if (err.code === "unimplemented") {
      // The current browser doesn't support persistence
      console.warn("Browser doesn't support persistence");
    }
  });
}

// Call the function
initializeFirestore();

export async function getSubscription(userId: string) {
  try {
    const subscriptionRef = doc(db, 'subscriptions', userId);
    const subscriptionSnap = await getDocs(query(
      collection(db, 'subscriptions'),
      where('userId', '==', userId),
      limit(1)
    ));

    if (subscriptionSnap.empty) {
      // Create default free subscription
      const defaultSubscription = {
        userId,
        tier: 'free',
        searchesUsed: 0,
        searchLimit: 3,
        validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        createdAt: serverTimestamp(),
      };

      await setDoc(subscriptionRef, defaultSubscription);
      return defaultSubscription;
    }

    return subscriptionSnap.docs[0].data();
  } catch (error) {
    console.error('Error fetching subscription:', error);
    // Return offline fallback
    return {
      tier: 'free',
      searchesUsed: 0,
      searchLimit: 3,
      validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    };
  }
}

export async function trackUsage(userId: string, action: 'search') {
  try {
    const batch = writeBatch(db);
    const subscriptionRef = doc(db, 'subscriptions', userId);
    const usageRef = doc(db, 'usage', `${userId}_${Date.now()}`);

    batch.update(subscriptionRef, {
      searchesUsed: increment(1),
      lastUsed: serverTimestamp(),
    });

    batch.set(usageRef, {
      userId,
      action,
      timestamp: serverTimestamp(),
    });

    await batch.commit();
  } catch (error) {
    console.error('Error tracking usage:', error);
    // Store failed tracking attempts in localStorage for retry
    const failedTracking = JSON.parse(localStorage.getItem('failedTracking') || '[]');
    failedTracking.push({
      userId,
      action,
      timestamp: Date.now(),
    });
    localStorage.setItem('failedTracking', JSON.stringify(failedTracking));
  }
}