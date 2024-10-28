import { initializeApp } from "firebase/app";
import { getAuth, getReactNativePersistence, setPersistence } from "firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
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
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
const localPersistence = getReactNativePersistence(ReactNativeAsyncStorage);
setPersistence(FIREBASE_AUTH, localPersistence)
  /*.then(() => {
    console.log('Persistence set to local');
  })
  .catch((error) => {
    console.error('Error setting persistence:', error);
  });*/
export const FIREBASE_STORAGE = getStorage(FIREBASE_APP);