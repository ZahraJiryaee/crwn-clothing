import { takeLatest, call, put } from "redux-saga/effects";
/* takeEvery listens for every action of a specific type that we pass.
 takeEvery creates a non blocking(concurrent) call in order to not stop the app 
 to continue running either other sagas or whatever the user wants to do */
/* call is the effect inside the generator function that invokes the method */
/* inside of a generator function, sagas do not dispatch actions using dispatch keyword.
put is the saga effect for creating action */

import {
  firestore,
  convertCollectionsSnapshopToMap,
} from "../../firebase/firebase.utils";

import {
  fetchCollectionsSuccess,
  fetchCollectionsFailure,
} from "./shop.actions";

import ShopActionTypes from "./shop.types";

export function* fetchCollectionsStart() {
  /* its gonna pause whenever a specific action that we want comes in - so we should use yield */
  /*
    takeEvery:
    first Arg: the action type that we want
    second Arg: a generator function that we'll run in response to the listener (first Arg) 
    */
  /*
    takeEvery: kicks of a new task for every action that comes in
    take: runs through the same saga (just once)
    takeLatest: when we only want the last one to get resolved, it will cancel all the previous ones.
   */
  /* The whole purpose of saga middle ware is to run sagas concurrently - to run them all
   together in a way that does not block the execution */
  yield takeLatest(
    ShopActionTypes.FETCH_COLLECTIONS_START,
    fetchCollectionsAsync
  );
}
export function* fetchCollectionsAsync() {
  yield console.log("fire");

  try {
    const collectionRef = firestore.collection("collections");
    const snapshot = yield collectionRef.get();
    const collectionsMap = yield call(
      convertCollectionsSnapshopToMap,
      snapshot
    );
    /* convertCollectionsSnapshopToMap; we can invoke it normally but 
    we wanna yield it in case this call takes longer than we expect 
    
    call:
      first Arg: some function
      subsequent Args: the parameters that you passsed into the function call  
    */
    yield put(fetchCollectionsSuccess(collectionsMap));
  } catch (error) {
    yield put(fetchCollectionsFailure(error.message));
  }
}
