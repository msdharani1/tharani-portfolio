// firebase.jsx
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyA1SPfbos5QWc9_9DPcSNdgNIfUCh4eEbc",
  authDomain: "msd-portfolio.firebaseapp.com",
  projectId: "msd-portfolio",
  storageBucket: "msd-portfolio.appspot.com",
  messagingSenderId: "816165009712",
  appId: "1:816165009712:web:e79c75bfd68f0056c830f5",
  measurementId: "G-H6L7FVWX76"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth(app);
const database = getDatabase(app);
const storage = getStorage(app);

export { auth, database, storage };