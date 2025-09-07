
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDBqyNSKRuChIT66HAHaZhsiXduZxlAj58",
  authDomain: "lot-to-come.firebaseapp.com",
  projectId: "lot-to-come",
  storageBucket: "lot-to-come.firebasestorage.app",
  messagingSenderId: "443472354993",
  appId: "1:443472354993:web:0598fcc5ef7d0fd9990c90",
  measurementId: "G-6V81R80V0S"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);