import { initializeApp, getApp, getApps } from "firebase/app";
import { initializeAuth, getAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';
//import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getStorage } from "firebase/storage";

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
let FIREBASE_APP;
let FIREBASE_AUTH;
let FIREBASE_STORAGE;

if (!getApps().length) {
  try {
    alert('Does this even initialize?')
    FIREBASE_APP = initializeApp(firebaseConfig);
    FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
      persistence: getReactNativePersistence(AsyncStorage),
    });
  } catch (error) {
    console.log('Error initializing app: ' + error);
  }
} else {
  alert('It does not.')
  FIREBASE_APP = getApp();
  FIREBASE_AUTH = getAuth(FIREBASE_APP);
  FIREBASE_STORAGE = getStorage(FIREBASE_APP);
}

export {FIREBASE_APP, FIREBASE_AUTH, FIREBASE_STORAGE}