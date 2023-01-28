import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyCcMstCilucJ2Iim5IAPR-FAs9GQd3bcXg",
  authDomain: "filestorage-2894c.firebaseapp.com",
  projectId: "filestorage-2894c",
  storageBucket: "filestorage-2894c.appspot.com",
  messagingSenderId: "1036602162459",
  appId: "1:1036602162459:web:fdf5275cda5f7304e6e7be",
  measurementId: "G-7Y8LT936F4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage = getStorage(app)