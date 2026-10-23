import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Web App Firebase Configuration for project "sskps-school-website"
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'AIzaSyAswxVlqDxyxESE7UFquH-BeTxlBQd1SE8',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'sskps-school-website.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'sskps-school-website',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'sskps-school-website.firebasestorage.app',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '24915743784',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:24915743784:web:d7d45d53c22d327bb3911d',
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || 'G-HXQ02YTRVY'
};

// Singleton initialization to prevent multiple Firebase app instances
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
export default app;
