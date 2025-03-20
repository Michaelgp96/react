// firebaseConfig.jsx
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Configuración de Firebase (reemplaza con tu propia configuración)
const firebaseConfig = {
    apiKey: "AIzaSyBicOq6hrC3n7EPnCyMDBD9BH_4CnhxMzk",
    authDomain: "react-firebase-11c17.firebaseapp.com",
    projectId: "react-firebase-11c17",
    storageBucket: "react-firebase-11c17.firebasestorage.app",
    messagingSenderId: "764217742307",
    appId: "1:764217742307:web:5b45ecc5f3ae589b7846d6"
};

// Inicialización de Firebase
const app = initializeApp(firebaseConfig);

// Inicialización de Firestore
const db = getFirestore(app);

export { db };
 