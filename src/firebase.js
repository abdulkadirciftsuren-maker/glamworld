import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Firebase config - Firebase Console > Proje Ayarları > Uygulamalar
const firebaseConfig = {
  apiKey: "AIzaSyDWWa-WTCMxDD25Fmj8d8Atbq92RA_H9M0",
  authDomain: "glamworld-f3051.firebaseapp.com",
  projectId: "glamworld-f3051",
  storageBucket: "glamworld-f3051.firebasestorage.app",
  messagingSenderId: "161842453551",
  appId: "1:161842453551:web:4550f7fbdcbd6a37d63ada"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
