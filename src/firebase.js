import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/storage';
import 'firebase/database';
import 'firebase/compat/firestore';
// for authentication
// for storage
// for realtime database
// for cloud firestore
const firebaseConfig = {
    apiKey: "AIzaSyCYZ0etPGtSaQnv1nbX9TAHa57UjoKjy-s",
    authDomain: "messaging-app-mern-b4f09.firebaseapp.com",
    projectId: "messaging-app-mern-b4f09",
    storageBucket: "messaging-app-mern-b4f09.appspot.com",
    messagingSenderId: "989493596164",
    appId: "1:989493596164:web:50ae2cb7caa912ddb5a551",
    measurementId: "G-3QEJ6PRG4D"
  };
const firebaseApp = firebase.initializeApp(firebaseConfig)
const db = firebaseApp.firestore()
const auth = firebase.auth()
const provider = new firebase.auth.GoogleAuthProvider()
export { auth, provider }
export default db