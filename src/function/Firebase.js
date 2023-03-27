// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBwOpM1fxCrstymA-poOTPQ_uCPoCCxBkk",
  authDomain: "kltn-253dd.firebaseapp.com",
  projectId: "kltn-253dd",
  storageBucket: "kltn-253dd.appspot.com",
  messagingSenderId: "789779247397",
  appId: "1:789779247397:web:67cad8d268d369448deacc",
  measurementId: "G-RC5B85XJK5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app)