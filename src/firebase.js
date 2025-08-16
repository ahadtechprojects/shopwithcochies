// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC2_zKE5PpkWlhMZU886CJPkCT98tPvG3g",
  authDomain: "shopwithcochies.firebaseapp.com",
  projectId: "shopwithcochies",
  storageBucket: "shopwithcochies.firebasestorage.app",
  messagingSenderId: "321402708943",
  appId: "1:321402708943:web:06900e0b2c71190fef28ba",
  measurementId: "G-NRR393QKCQ"
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Firestore
export const db = getFirestore(app);

// ✅ Authentication
export const auth = getAuth(app);
