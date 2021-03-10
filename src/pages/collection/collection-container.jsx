import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Collection from './collection';
import { selectIsCollectionsLoaded } from '../../redux/shop/shop-selector';
import WithSpinner from '../../components/with-spinner/with-spinner';
import { compose } from 'redux';

const mapStateToProps = createStructuredSelector({
  isLoading: (state) => !selectIsCollectionsLoaded(state)
});

const CollectionContainer = compose(
  connect(mapStateToProps),
  WithSpinner
)(Collection);

export default CollectionContainer;