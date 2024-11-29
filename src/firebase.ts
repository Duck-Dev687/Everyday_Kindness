// firebase.ts
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth'; // Import Firebase Authentication

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCbLQ6evDcOWd1chz4z6K3fA1jwrGDnb-0",
  authDomain: "everyday-kindness.firebaseapp.com",
  projectId: "everyday-kindness",
  storageBucket: "everyday-kindness.firebasestorage.app",
  messagingSenderId: "211021248821",
  appId: "1:211021248821:web:a773075eaedf3d01dc747c",
  measurementId: "G-ZH1HYV6LCF"
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

// Export Firebase Authentication service
export const auth = firebaseApp.auth();

// Export default firebase instance if needed
export default firebaseApp;
