// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-app.js";
import { getAuth, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "INSERT_YOUR_FIREBASE_API_KEY",
  authDomain: "gdsc-ar-hunt.firebaseapp.com",
  databaseURL: "https://gdsc-ar-hunt-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "gdsc-ar-hunt",
  storageBucket: "gdsc-ar-hunt.appspot.com",
  messagingSenderId: "596515515464",
  appId: "1:596515515464:web:1b7b269edc62b4a4b9bc7d",
  measurementId: "G-8Q1ERYEXNG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();
const auth = getAuth(app);
console.log("Connected to Firebase!!!");

export {auth, app, db, provider}