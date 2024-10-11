import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
//import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
//import { initializeAuth, getReactNativePersistence } from "firebase/auth";
//import getReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCbxid82NWlTaascWbFTfMJivYaItQ8QEA",
  authDomain: "tradr-app-c2b3a.firebaseapp.com",
  databaseURL: "https://tradr-app-c2b3a-default-rtdb.firebaseio.com",
  projectId: "tradr-app-c2b3a",
  storageBucket: "tradr-app-c2b3a.appspot.com",
  messagingSenderId: "760449925320",
  appId: "1:760449925320:web:8ac12bee24c42f9768e5fd",
  measurementId: "G-80EDHZNVL7"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
//export const FIREBASE_DB = getFirestore(FIREBASE_APP); // Initialize Firestore
export const FIREBASE_STORAGE = getStorage(FIREBASE_APP);
//export const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {persistence: getReactNativePersistence(getReactNativeAsyncStorage),});