import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "codeduo-4f967.firebaseapp.com",
  projectId: "codeduo-4f967",
  storageBucket: "codeduo-4f967.appspot.com",
  messagingSenderId: "972882557852",
  appId: "1:972882557852:web:e7cd7171b905dba3b4e659"
};

export const app = initializeApp(firebaseConfig);