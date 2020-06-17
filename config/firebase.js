import firebase from 'firebase';
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";


// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyBnvo_y5cTvArmE4JftmxxInlZ2T_Qd51Y",
  authDomain: "anonibusav2-7b640.firebaseapp.com",
  databaseURL: "https://anonibusav2-7b640.firebaseio.com",
  projectId: "anonibusav2-7b640",
  storageBucket: "anonibusav2-7b640.appspot.com",
  messagingSenderId: "146490448599",
  appId: "1:146490448599:web:e3ce9beea9ef2d9bf6ae92",
  measurementId: "G-59FS2E7660"
};
// Initialize Firebase

export default !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();