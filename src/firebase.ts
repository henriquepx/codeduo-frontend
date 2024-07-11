// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "codeduo-4f967.firebaseapp.com",
  projectId: "codeduo-4f967",
  storageBucket: "codeduo-4f967.appspot.com",
  messagingSenderId: "972882557852",
  appId: "1:972882557852:web:e7cd7171b905dba3b4e659"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);