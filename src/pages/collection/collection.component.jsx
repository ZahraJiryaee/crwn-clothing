import React from "react";
import { connect } from "react-redux";

import CollectionItem from "../../components/collection-item/collection-item.component";

import { selectCollection } from "../../redux/shop/shop.selector";

import "./collection.styles.scss";

const CollectionPage = ({ collection }) => {
  const { title, items } = collection;
  return (
    <div className="collection-page">
      <h2 className="title">{title}</h2>
      <div className="items">
        {items.map((item) => (
          <CollectionItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => ({
  collection: selectCollection(ownProps.match.params.collectionId)(state),
});

export default connect(mapStateToProps)(CollectionPage);

/*
mapStateToProps(
  state: overall reducer state from the top,
  ownProps: the props of the component that we're wrapping in connect
)
*/

/*
# we shoul pass state to the selector manually when we dont use createStructuredSelector
this is necessary bc unlike other selectors, this selector needs a partt of the state,
depending on the url parameter
so we pass state as the second parameter
selectCollection 
*/
