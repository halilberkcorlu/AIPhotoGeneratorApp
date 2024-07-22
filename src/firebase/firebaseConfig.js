// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAu2295bvHSdMmsspDJ2zyeaMujL0liVMI",
  authDomain: "habeco-f0e41.firebaseapp.com",
  projectId: "habeco-f0e41",
  storageBucket: "habeco-f0e41.appspot.com",
  messagingSenderId: "961797650390",
  appId: "1:961797650390:web:8fba121c747d50c99d9677",
  measurementId: "G-EJZSYFTJXG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);