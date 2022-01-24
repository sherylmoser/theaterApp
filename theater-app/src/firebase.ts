import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

const app = firebase.initializeApp({
    apiKey: "AIzaSyARFqRZo5aiNDXPi7anHBOzOYTvRT2Qo_o",
    authDomain: "onstagetheaterapp.firebaseapp.com",
    projectId: "onstagetheaterapp",
    storageBucket: "onstagetheaterapp.appspot.com",
    messagingSenderId: "640759180361",
    appId: "1:640759180361:web:5827ab51fe8ac81ecaa398"
  });

export const db = app.firestore()
export const dbUsers = db.collection('users');

export const dbTheaters = db.collection('theaters');


export const auth = firebase.auth();