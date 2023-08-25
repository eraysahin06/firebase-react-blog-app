// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCB9vlWU9axmRqYXqKbJIzQBX9hGwJTEMY',
  authDomain: 'blog-project-37c60.firebaseapp.com',
  projectId: 'blog-project-37c60',
  storageBucket: 'blog-project-37c60.appspot.com',
  messagingSenderId: '1095811206344',
  appId: '1:1095811206344:web:6743b7f469750879ab29fd',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
