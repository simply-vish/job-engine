import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAs0eAnXW9Clwa5ug20eeGlsc02qbhhfyI",
  authDomain: "job-engine-2006.firebaseapp.com",
  projectId: "job-engine-2006",
  storageBucket: "job-engine-2006.firebasestorage.app",
  messagingSenderId: "947639858031",
  appId: "1:947639858031:web:4f63f133933d0a94fbae9a",
  measurementId: "G-WQLHJ4LHB0"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);