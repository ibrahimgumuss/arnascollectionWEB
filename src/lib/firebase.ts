import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyDZwfnPt7CCmeuH_hiXMfn1n3Qb_CNJrKI",
    authDomain: "arnascollectionweb.firebaseapp.com",
    projectId: "arnascollectionweb",
    storageBucket: "arnascollectionweb.firebasestorage.app",
    messagingSenderId: "354828373655",
    appId: "1:354828373655:web:18368741c24c79be7d23d2",
    measurementId: "G-KPN2EEMRES"
};

// Initialize Firebase (prevent re-initialization in dev mode)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Firestore Database
export const db = getFirestore(app);

// Firebase Storage
export const storage = getStorage(app);

export default app;
