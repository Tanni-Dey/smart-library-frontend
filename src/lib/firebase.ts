// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAN2HTXqiDUM4GwyAZkyh564qKk4Oebi0I",
  authDomain: "smart-library-d5999.firebaseapp.com",
  projectId: "smart-library-d5999",
  storageBucket: "smart-library-d5999.appspot.com",
  messagingSenderId: "740887467014",
  appId: "1:740887467014:web:70f4c1f5669ea22a61df87",
};
// const firebaseConfig = {
//   apiKey: process.env.VITE_apiKey,
//   authDomain: process.env.VITE_authDomain,
//   projectId: process.env.VITE_projectId,
//   storageBucket: process.env.VITE_storageBucket,
//   messagingSenderId: process.env.VITE_messagingSenderId,
//   appId: process.env.VITE_appId,
// };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
