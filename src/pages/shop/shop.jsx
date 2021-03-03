import React from 'react';
import { Route } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { selectIsCollectionsFetching, selectIsCollectionsLoading } from '../../redux/shop/shop-selector';
import CollectionsOverview from '../../components/collection-overview/collection-overview';
import Collection from '../collection/collection';
import { connect } from 'react-redux';
import { fetchCollectionsStartAsync } from '../../redux/shop/shop-actions';
import WithSpinner from '../../components/with-spinner/with-spinner';

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(Collection);

class Shop extends React.Component {
  componentDidMount() {
    const { fetchCollectionsStartAsync } = this.props;
    fetchCollectionsStartAsync();
  }

  render() {
    const { match, isCollectionsFetching, isCollectionsLoaded } = this.props;
    return ( 
      <div className='shop'>
        <Route exact path={`${match.path}`} render={(props) => <CollectionsOverviewWithSpinner isLoading={isCollectionsFetching} {...props} />} />
        <Route path={`${match.path}/:collectionId`} render={(props) => <CollectionPageWithSpinner isLoading={!isCollectionsLoaded} {...props} />}/>
      </div>
      );
  }
}

const mapStateToProps = createStructuredSelector({
  isCollectionsFetching: selectIsCollectionsFetching, 
  isCollectionsLoaded: selectIsCollectionsLoading
});

const mapDispatchToProps = (dispatch) => ({
  fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync())
})

export default connect(mapStateToProps, mapDispatchToProps)(Shop);