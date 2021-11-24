import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const config = {
  apiKey: "AIzaSyCdQ63XodLQwkOSBneFFGah-DTbpm-MfdI",
  authDomain: "crwn-db-634a3.firebaseapp.com",
  projectId: "crwn-db-634a3",
  storageBucket: "crwn-db-634a3.appspot.com",
  messagingSenderId: "753836430654",
  appId: "1:753836430654:web:f766d727cc59af11e6086f",
  measurementId: "G-G9Z8T4J3B6",
};

firebase.initializeApp(config);

// const provider = new firebase.auth.GoogleAuthProvider();
const provider = new GoogleAuthProvider();
// provider.setCustomParameters({ prompt: "select_account" });
provider.setCustomParameters({
  prompt: "select_account",
});

//
export const firestore = firebase.firestore();
// export const auth = firebase.auth();
export const auth = getAuth();
// export const signInWithGoogle = auth.signInWithPopup(provider);
export const signInWithGoogle = async () => {
  return await signInWithPopup(auth, provider);
};

export default firebase;
