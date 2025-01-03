import { TopicItem } from '@/types';

const appConstants = {
  // GitHub
  gitHubApiUrl: import.meta.env.VITE_GIT_HUB_API_URL,
  gitHubAccessToken: import.meta.env.VITE_GIT_HUB_ACCESS_TOKEN,
  // Firebase
  firebaseConfig: {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
  },
  initialTopics: [
    { name: 'Vue', isActive: false },
    { name: 'TypeScript', isActive: false },
    { name: 'Javascript', isActive: false },
    { name: 'Go', isActive: false },
    { name: 'CSS', isActive: false },
    { name: 'Node', isActive: false },
  ] as TopicItem[],
};

export default appConstants;
