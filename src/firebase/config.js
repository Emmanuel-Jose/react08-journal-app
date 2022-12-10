// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBvKs1o8-hAPNtG2WmmmDqxetusx--4jYI",
    authDomain: "react-cursos-1c5a8.firebaseapp.com",
    projectId: "react-cursos-1c5a8",
    storageBucket: "react-cursos-1c5a8.appspot.com",
    messagingSenderId: "695943574092",
    appId: "1:695943574092:web:b31a684abfef3f40703ae9"
};

// Initialize Firebase
export const FirebaseApp = initializeApp( firebaseConfig );
export const FirebaseAuth = getAuth( FirebaseApp )
export const FirebaseDB = getFirestore( FirebaseApp )