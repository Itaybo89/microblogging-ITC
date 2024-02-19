// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDIAseW_d6pyaULANI_7jiAIKgBtZDfhrM",
  authDomain: "microblog-e4d10.firebaseapp.com",
  projectId: "microblog-e4d10",
  storageBucket: "microblog-e4d10.appspot.com",
  messagingSenderId: "230507524435",
  appId: "1:230507524435:web:7d6ec6c6df821b37c231a6",
  measurementId: "G-24KZY8NCG9"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);
const googleProvider = new GoogleAuthProvider();


export { app, db, auth, storage, googleProvider };