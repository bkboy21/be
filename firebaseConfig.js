// src/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from "firebase/analytics";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDIILFZzm6mNOP1sPHamWp2EEpOtORMAos",
    authDomain: "be-parent-35b3e.firebaseapp.com",
    projectId: "be-parent-35b3e",
    storageBucket: "be-parent-35b3e.appspot.com",
    messagingSenderId: "648141287677",
    appId: "1:648141287677:web:78ae9874da96a604c28e94",
    measurementId: "G-85SJ7BDRCL"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
const db = getFirestore(app);

export { auth, db };
