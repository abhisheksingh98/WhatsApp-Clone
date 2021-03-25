import firebase from "firebase"

const firebaseConfig = {
    apiKey: "AIzaSyDegfwqoiSTApvkOtaSWP9Uf1hbUDU3afg",
    authDomain: "whatsapp-7242c.firebaseapp.com",
    projectId: "whatsapp-7242c",
    storageBucket: "whatsapp-7242c.appspot.com",
    messagingSenderId: "583136359890",
    appId: "1:583136359890:web:03091b0c2168b00b60840b",
    measurementId: "G-8VQXPTR9QG"
  };

  const app = !firebase.apps.length 
                ? firebase.initializeApp(firebaseConfig)
                : firebase.app();

  const db = app.firestore();
  const auth = app.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  export {db, auth, provider};
                