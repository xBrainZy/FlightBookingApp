import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyAjBr3FNBmn7RVFxju-g1BVUDpt1WTKtXI",
    authDomain: "app1-f3aa2.firebaseapp.com",
    projectId: "app1-f3aa2",
    storageBucket: "app1-f3aa2.appspot.com",
    messagingSenderId: "337341121786",
    appId: "1:337341121786:web:42d47c9a0658b47e5df543",
    measurementId: "G-M0RSCWED77"
  };
  
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const auth = getAuth(app)
export const storage = getStorage(app); 