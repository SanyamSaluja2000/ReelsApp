import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBEi7gJpayWNv4XpGU9n8A7g3JSJ_TuKJU",
  authDomain: "reels-app-38fc9.firebaseapp.com",
  projectId: "reels-app-38fc9",
  storageBucket: "reels-app-38fc9.appspot.com",
  messagingSenderId: "426651013848",
  appId: "1:426651013848:web:e75d199e7dfaafb41f7dad"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const firestore = getFirestore(app);

// Initialize Auth
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Initialize Storage
const storage = getStorage(app);

export { app, firestore, auth, provider, storage };