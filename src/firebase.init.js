
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyAyr05MBaUgsOv9ygfzPXY0NcvAZNSmNcA",
  authDomain: "email-password-authentic-75c57.firebaseapp.com",
  projectId: "email-password-authentic-75c57",
  storageBucket: "email-password-authentic-75c57.firebasestorage.app",
  messagingSenderId: "336530216721",
  appId: "1:336530216721:web:db3b963a9b234bf06c5eb0"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
 