import React, { useState, ChangeEvent } from 'react';
import logo from './logo.svg';
import './styles/App.css';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

import { SignupView } from './views/public/signup.view';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyARFqRZo5aiNDXPi7anHBOzOYTvRT2Qo_o",
  authDomain: "onstagetheaterapp.firebaseapp.com",
  projectId: "onstagetheaterapp",
  storageBucket: "onstagetheaterapp.appspot.com",
  messagingSenderId: "640759180361",
  appId: "1:640759180361:web:5827ab51fe8ac81ecaa398"
};

// export FirebaseCrap; 
function App() {

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db = getFirestore();



  return (
    <div className="App">
      <SignupView />

    </div>
  );
}

export default App;
