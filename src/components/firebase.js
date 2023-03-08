import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBfva6ez9KApqCmrloL7drsgObIfbpm9Is",
    authDomain: "loginmern-eb68e.firebaseapp.com",
    projectId: "loginmern-eb68e",
    storageBucket: "loginmern-eb68e.appspot.com",
    messagingSenderId: "828037883397",
    appId: "1:828037883397:web:814765d54631e611e45e6c"
  };

  firebase.initializeApp(firebaseConfig);
  export const auth = firebase.auth();
  export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();