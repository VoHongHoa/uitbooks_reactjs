import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCi6B9yDDTs2Wg5l3bvgkx6WpNbqLUEbrs",
  authDomain: "uitphone.firebaseapp.com",
  projectId: "uitphone",
  storageBucket: "uitphone.appspot.com",
  messagingSenderId: "337898358809",
  appId: "1:337898358809:web:283994e0d028561791c288",
  measurementId: "G-5NDT2VF7QD",
};

export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
