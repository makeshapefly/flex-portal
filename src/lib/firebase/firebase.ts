import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDHr0wfnsTnrTFE-eB8SPqTGX69a5A8Boc",
  authDomain: "bank-energi.firebaseapp.com",
  projectId: "bank-energi",
  storageBucket: "bank-energi.firebasestorage.app",
  messagingSenderId: "1032655334859",
  appId: "1:1032655334859:web:4c8fdee8c707b2c62eda4e"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);