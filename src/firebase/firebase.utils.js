import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
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

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  // query inside the fireStore to see if it already exist
  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShop = await userRef.get();

  if (!snapShop.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.error("error creating user::", error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

// export const auth = firebase.auth();
export const auth = getAuth();
export const firestore = firebase.firestore();

// const provider = new firebase.auth.GoogleAuthProvider();
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
}); /* this triggers the google pop up */

// export const signInWithGoogle = () => auth.signInWithPopup(provider);
export const signInWithGoogle = async () => {
  return await signInWithPopup(auth, provider);
};

export default firebase;
