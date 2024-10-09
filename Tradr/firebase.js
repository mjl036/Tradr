// Import the functions you need from the SDKs you need
import * as firebase from "firebase";
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

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
let app;
if (firebase.apps.lenght === 0) {
    app = firebase.initializeApp(firebaseConfig);
} else {
    app = firebase.app()
}

const auth = firebase.auth()

export { auth };
//const analytics = getAnalytics(app);