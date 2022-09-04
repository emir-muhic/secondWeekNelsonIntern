// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyADKtFuGbZgEz_U0-26SBlMRJAE1-OltVs",
  authDomain: "todo-app-9bea0.firebaseapp.com",
  projectId: "todo-app-9bea0",
  storageBucket: "todo-app-9bea0.appspot.com",
  messagingSenderId: "729927790473",
  appId: "1:729927790473:web:20255c0709f10c4f38bb58"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

export default app