// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore} from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCN36YPW3egRVI5ebopkldErmXdnMkzFmc",
  authDomain: "hotels-1b7e0.firebaseapp.com",
  projectId: "hotels-1b7e0",
  storageBucket: "hotels-1b7e0.appspot.com",
  messagingSenderId: "271289824882",
  appId: "1:271289824882:web:8b4d7a781a1afeb0bb74eb",
  measurementId: "G-0Z71439Z2S"
};
 
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const analytics = getAnalytics(app);

// initializing Firestore
const db = getFirestore(app);
const storage = getStorage(app);

export {auth, db, storage};