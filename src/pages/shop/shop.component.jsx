import React, { Component } from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";

import CollectionsOverview from "../../components/collections-overview/collections-overview.component";
import CollectionPage from "../collection/collection.component";

import {
  firestore,
  convertCollectionsSnapshopToMap,
} from "../../firebase/firebase.utils";

import { updateCollections } from "../../redux/shop/shop.actions";

class ShopPage extends Component {
  unsubscribeFromSnapshop = null;
  componentDidMount() {
    const { updateCollections } = this.props;
    const collectionRef = firestore.collection("collections");
    collectionRef.onSnapshot(async (snapshopt) => {
      const collectionsMap = convertCollectionsSnapshopToMap(snapshopt);
      updateCollections(collectionsMap);
    });
  }

  render() {
    const { match } = this.props;
    return (
      <div className="shop-page">
        <Route exact path={`${match.path}`} component={CollectionsOverview} />
        <Route
          path={`${match.path}/:collectionId`}
          component={CollectionPage}
        />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  updateCollections: (colllectionsMap) =>
    dispatch(updateCollections(colllectionsMap)),
});

export default connect(null, mapDispatchToProps)(ShopPage);

/*
bc in App.js Shop in nested in a Route, 
and Route automatically passes match, history, location

for thae same reason CollectionPage has access to match
*/
