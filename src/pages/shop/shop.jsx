import React from 'react';
import { Route } from 'react-router-dom';
import CollectionsOverviewContainer from '../../components/collection-overview/collection-overview-container';
import CollectionContainer from '../collection/collection-container';
import { connect } from 'react-redux';
import { fetchCollectionsStartAsync } from '../../redux/shop/shop-actions';


class Shop extends React.Component {
  componentDidMount() {
    const { fetchCollectionsStartAsync } = this.props;
    fetchCollectionsStartAsync();
  }

  render() {
    const { match } = this.props;
    return ( 
      <div className='shop'>
        <Route exact path={`${match.path}`} component={CollectionsOverviewContainer} />
        <Route path={`${match.path}/:collectionId`} component={CollectionContainer} />
      </div>
      );
  }
}


const mapDispatchToProps = (dispatch) => ({
  fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync())
})

export default connect(null, mapDispatchToProps)(Shop);