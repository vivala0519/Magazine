import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA5KWkSGjIR-d9MzVhHIfz1OIHUoaL5P58",
  authDomain: "image-community-bb916.firebaseapp.com",
  projectId: "image-community-bb916",
  storageBucket: "image-community-bb916.appspot.com",
  messagingSenderId: "317016731912",
  appId: "1:317016731912:web:6bb25a05612cefe2d47cbd",
  measurementId: "G-T4F49T7DEM",
};

firebase.initializeApp(firebaseConfig);

const apiKey = firebaseConfig.apiKey;
const auth = firebase.auth();
const firestore = firebase.firestore();
const storage = firebase.storage();

export{auth, apiKey, firestore, storage};