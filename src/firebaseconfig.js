import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage";

const config  = firebase.initializeApp( {
    apiKey: "AIzaSyBjhWf1j7CKaUBF9w1muQLUFxSUvzfJY54",
    authDomain: "ptuxiakhtesting.firebaseapp.com",
    databaseURL: "https://ptuxiakhtesting.firebaseio.com",
    projectId: "ptuxiakhtesting",
    storageBucket: "ptuxiakhtesting.appspot.com",
    messagingSenderId: "62953189723",
    appId: "1:62953189723:web:22f4d8ccfd1d926274aa7e",
    measurementId: "G-LK6BJ3DGK8"

  });

export default config;