import React, { Component } from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";

import { fetchCollectionsStartAsync } from "../../redux/shop/shop.actions";

import CollectionOverviewContainer from "../../components/collections-overview/collections-overview.container";
import CollectionPageContainer from "../collection/collection.container";

class ShopPage extends Component {
  componentDidMount() {
    /* get data from redux */
    const { fetchCollectionsStartAsync } = this.props;
    fetchCollectionsStartAsync();

    /* Promise Pattern 
    collectionRef.get().then((snapshopt) => {
      const collectionsMap = convertCollectionsSnapshopToMap(snapshopt);
      updateCollections(collectionsMap);
      this.setState({ loading: false });
    });*/
    /* Observable Pattern 
    collectionRef.onSnapshot(async (snapshopt) => {
      const collectionsMap = convertCollectionsSnapshopToMap(snapshopt);
      updateCollections(collectionsMap);
      this.setState({ loading: false });
    });*/
    /* Fetch Pattern 
    fetch(
      "https://firestore.googleapis.com/v1/projects/crwn-db-634a3/databases/(default)/documents/collections"
    )
      .then((response) => response.json())
      .then((collections) => console.log(collections));
    */
  }

  render() {
    const { match } = this.props;
    return (
      <div className="shop-page">
        <Route
          exact
          path={`${match.path}`}
          component={CollectionOverviewContainer}
        />
        <Route
          path={`${match.path}/:collectionId`}
          component={CollectionPageContainer}
        />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync()),
});

export default connect(null, mapDispatchToProps)(ShopPage);

/*
bc in App.js Shop in nested in a Route, 
and Route automatically passes match, history, location

for thae same reason CollectionPage has access to match
*/
