// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { getDatabase } from "firebase/database"; // <--- Import Realtime Database

// --- YOUR REAL CONFIG ---
const firebaseConfig = {
  apiKey: "AIzaSyCAEbChUNxORFTJCmaaPW7d7AMNC9qSTIM",
  authDomain: "indiabix-web.firebaseapp.com",
  projectId: "indiabix-web",
  storageBucket: "indiabix-web.firebasestorage.app",
  messagingSenderId: "88978076564",
  appId: "1:88978076564:web:d37115b8951f61f926d581"
};
// ---------------------------------

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Authentication
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Initialize Realtime Database
export const db = getDatabase(app); 

export { signInWithPopup, signOut };