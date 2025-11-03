// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDzV3GneOxqEBPFMHxll0Ua-VarEcaLJp0",
  authDomain: "prepgpt-7c0d2.firebaseapp.com",
  projectId: "prepgpt-7c0d2",
  storageBucket: "prepgpt-7c0d2.firebasestorage.app",
  messagingSenderId: "269277536819",
  appId: "1:269277536819:web:e4c5d9e1c5e88980753946",
  measurementId: "G-T25ZXD6DEP"
};

// Initialize Firebase if any app has not intiallised it and if it intiallized by an app then get that app itself.
const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);
export const db = getFirestore(app);