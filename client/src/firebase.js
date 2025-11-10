// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
//   authDomain: "blog-mern-cd1ae.firebaseapp.com",
//   projectId: "blog-mern-cd1ae",
//   storageBucket: "blog-mern-cd1ae.firebasestorage.app",
//   messagingSenderId: "634568885310",
//   appId: "1:634568885310:web:76483b38be5f7f11c47d6f"
// };

// Initialize Firebase
// export const app = initializeApp(firebaseConfig);


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-dd42b.firebaseapp.com",
  projectId: "mern-blog-dd42b",
  storageBucket: "mern-blog-dd42b.firebasestorage.app",
  messagingSenderId: "923266283669",
  appId: "1:923266283669:web:6a6800b5834cd46a3c439c"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

