import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCBbWWZfZBtONHp06tTZzNxGKorIJraPDA",
  authDomain: "finalproject-62320.firebaseapp.com",
  projectId: "finalproject-62320",
  storageBucket: "finalproject-62320.appspot.com",
  messagingSenderId: "348494538678",
  appId: "1:348494538678:web:9c819231e97a66cd10c317",
  measurementId: "G-DT9EGB74J2"
};
  
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const auth = getAuth(app)
export const storage = getStorage(app);