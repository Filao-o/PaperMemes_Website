import { initializeApp, getApps } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyCzxF6Ht4c-cGFT-QYY0m0dk6KYsf87B18',
  authDomain: 'papermemes-fd969.firebaseapp.com',
  projectId: 'papermemes-fd969',
  storageBucket: 'papermemes-fd969.firebasestorage.app',
  messagingSenderId: '1093050907458',
  appId: '1:1093050907458:web:d135de6fbb3c4a501ca6db',
  measurementId: 'G-7QQ41GV4FD',
};

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Analytics only in browser (not during SSR/static generation)
export async function getAnalyticsInstance() {
  if (typeof window === 'undefined') return null;
  const { getAnalytics } = await import('firebase/analytics');
  return getAnalytics(app);
}
