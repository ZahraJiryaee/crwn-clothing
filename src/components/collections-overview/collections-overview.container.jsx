/*
The container is a components that gets wrapped in all of the higher order components 
that it needs in order to properly run the way that it expects itself
to
*/
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";

import { selectIsCollectionFetching } from "../../redux/shop/shop.selector";
import WithSpinner from "../with-spinner/with-spinner.component";

import CollectionsOverview from "./collections-overview.component";

const mapStateToProps = createStructuredSelector({
  isLoading: selectIsCollectionFetching,
});

const CollectionOverviewContainer = compose(
  connect(mapStateToProps),
  WithSpinner
)(CollectionsOverview); // compose values from right to left
/*const CollectionOverviewContainer = connect(mapStateToProps)(
  WithSpinner(CollectionsOverview)
);*/

export default CollectionOverviewContainer;
