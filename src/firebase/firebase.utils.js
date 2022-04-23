import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

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

export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = firestore.collection(collectionKey);

  const batch = firestore.batch();
  objectsToAdd.forEach((obj) => {
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, obj);
  });

  return await batch.commit(); //it fire off batch req & it return a promise
};

export const convertCollectionsSnapshopToMap = (collections) => {
  const transformedCollection = collections.docs.map((doc) => {
    const { title, items } = doc.data();
    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items,
    };
  });

  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {});
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
