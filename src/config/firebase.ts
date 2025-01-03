import appConstants from '@/lib/constants';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Initialize Firebase
const app = initializeApp(appConstants.firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
