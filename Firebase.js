// Import the functions you need from the SDKs you need
import firebase from "firebase";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBCqBD_w3D_yiV2w63rlLoH8ZSqRPS-wCM",
  authDomain: "gallery-360-africa.firebaseapp.com",
  projectId: "gallery-360-africa",
  storageBucket: "gallery-360-africa.appspot.com",
  messagingSenderId: "977191750253",
  appId: "1:977191750253:web:e904658e10a43b0e5fcd64",
  measurementId: "G-XDXYJT7HBJ",
};

// Initialize Firebase
let app;

if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const auth = firebase.auth();
const firestore = firebase.firestore();
const storageRef = firebase.storage().ref();

const fb = firebase.storage.TaskEvent.STATE_CHANGED;

export { auth, firestore, storageRef, fb };
