import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";


// Firebase configuration (replace with your own keys from Firebase Console)
const firebaseConfig = {
    apiKey: "AIzaSyAgKbT7r9PL0V542CXIp6Qhh0dMqBfwkRE",
    authDomain: "word-skilled.firebaseapp.com",
    projectId: "word-skilled",
    storageBucket: "word-skilled.firebasestorage.app",
    messagingSenderId: "1081823544772",
    appId: "1:1081823544772:web:3f3a43206c15e47a349091",
    measurementId: "G-T26TH2BWCF"
  };

  const app = initializeApp(firebaseConfig);

  export const auth = getAuth(app);
  export const database = getDatabase(app);
  export const db = getFirestore(app);