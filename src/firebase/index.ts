import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAqPHmHO0TmVyetcTSFDnJjyBfq9mNjQW4",
  authDomain: "api-disney-68712.firebaseapp.com",
  projectId: "api-disney-68712",
  storageBucket: "api-disney-68712.firebasestorage.app",
  messagingSenderId: "451394902944",
  appId: "1:451394902944:web:cc8152d25c2b32b8f222c5",
  measurementId: "G-8JVBKSCS65"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
