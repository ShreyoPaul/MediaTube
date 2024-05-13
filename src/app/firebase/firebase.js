// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCD_ObBSq_L8zAc1XJwbDz1113SWTkJ104",
  authDomain: "media-773b3.firebaseapp.com",
  projectId: "media-773b3",
  storageBucket: "media-773b3.appspot.com",
  messagingSenderId: "119010251601",
  appId: "1:119010251601:web:c2199f698539070ad1f970",
  measurementId: "G-M13YPMK7FP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);