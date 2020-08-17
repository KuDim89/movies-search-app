import firebase from "firebase";

firebase.initializeApp({
  apiKey: 'AIzaSyA3enoauYsNVnmv8RcZOPGXW7rmo1xUWy8',
  authDomain: 'justwatch-app.firebaseapp.com',
  databaseUrl: 'https://justwatch-app.firebaseio.com',
  projectId: 'justwatch-app',
  storageBucket: 'justwatch-app.appspot.com',
  messagingSenderId: '912844325177',
  appId: '1:912844325177:web:39c722274e7aa61ffca8e8'
});

export const db = firebase.firestore();