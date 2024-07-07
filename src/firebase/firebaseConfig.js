// src/firebase/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCdX3pO0_a5d7ePM6liDfzKVkuIAf7395Y",
  authDomain: "lostimagematchingapp.firebaseapp.com",
  projectId: "lostimagematchingapp",
  storageBucket: "lostimagematchingapp.appspot.com",
  messagingSenderId: "440023364049",
  appId: "1:440023364049:android:1da9ecc1c22ec4738670f0",
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Initialize Storage
const storage = getStorage(app);

// Initialize Auth with persistence
let auth;
try {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
  });
} catch (error) {
  if (error.code === 'auth/already-initialized') {
    auth = getAuth(app);
  } else {
    throw error;
  }
}

export { auth, db, storage };
