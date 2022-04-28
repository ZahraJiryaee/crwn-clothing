import React, { Component } from "react";
import { Route } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";

import { fetchCollectionsStartAsync } from "../../redux/shop/shop.actions";
import {
  selectIsCollectionFetching,
  selectIsCollectionsLoaded,
} from "../../redux/shop/shop.selector";

import CollectionsOverview from "../../components/collections-overview/collections-overview.component";
import CollectionPage from "../collection/collection.component";
import WithSpinner from "../../components/with-spinner/with-spinner.component";

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

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
    const { match, isCollectionFetching, isCollectionsLoaded } = this.props;
    return (
      <div className="shop-page">
        <Route
          exact
          path={`${match.path}`}
          render={(props) => (
            <CollectionsOverviewWithSpinner
              isLoading={isCollectionFetching}
              {...props}
            />
          )}
        />
        <Route
          path={`${match.path}/:collectionId`}
          render={(props) => (
            <CollectionPageWithSpinner
              isLoading={!isCollectionsLoaded}
              {...props}
            />
          )}
        />
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  isCollectionFetching: selectIsCollectionFetching,
  isCollectionsLoaded: selectIsCollectionsLoaded,
});
const mapDispatchToProps = (dispatch) => ({
  fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ShopPage);

/*
bc in App.js Shop in nested in a Route, 
and Route automatically passes match, history, location

for thae same reason CollectionPage has access to match
*/
