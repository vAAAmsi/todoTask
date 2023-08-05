// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAJsIv-3GpY-0eTpsuzlYIo6AtS_7Nd9_c",
  authDomain: "todo-f0328.firebaseapp.com",
  projectId: "todo-f0328",
  storageBucket: "todo-f0328.appspot.com",
  messagingSenderId: "896930785572",
  appId: "1:896930785572:web:88710c3c5bad31c16aabb1",
  measurementId: "G-K3ZSP72TC8"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
export default db;