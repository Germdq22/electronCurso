import firebase from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBEw5Z6Eun84ntJoLp-iv8oNy5vNrpU3fo",
  authDomain: "musicfy-ef3bf.firebaseapp.com",
  databaseURL: "https://musicfy-ef3bf.firebaseio.com",
  projectId: "musicfy-ef3bf",
  storageBucket: "musicfy-ef3bf.appspot.com",
  messagingSenderId: "583003589442",
  appId: "1:583003589442:web:ac343b12577a049ef0d6db",
};

export default firebase.initializeApp(firebaseConfig);
