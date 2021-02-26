import React from 'react';
import './App.css';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { selectCurrentUser } from './redux/user/user-selectors';
import { setCurrentUser } from "./redux/user/user-actions";
import { createStructuredSelector } from 'reselect';
import Homepage from './pages/homepage/homepage.jsx';
import Shop from './pages/shop/shop.jsx';
import Header from './components/header/header.jsx';
import SignInAndSignUp from './pages/sign-in-and-sign-up/sign-in-and-sign-up.jsx';
import CheckOut from './pages/checkout/checkout.jsx';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';

class App extends React.Component {

  unsubscribeFromAuth = null;
//async here as making request to firestore database
  componentDidMount() {
    const { setCurrentUser } = this.props;
// unsubscribeFromAuth is reassigned to the return value of calling auth.onAuthStateChanged()
// this method returns another method: firebase.unsubscribe().
// so when unsubscribeFromAuth() is called inside the componentWillUnmount, 
// it now has the value of firebase.unsubscribe(), which executes, closing the session.
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapshot => {
           setCurrentUser({
               id: snapshot.id,
               ...snapshot.data()
           })
        });
      } else {
        setCurrentUser(userAuth);// sets user to null
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render(){
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path='/' component={Homepage} />    
          <Route path='/shop' component={Shop} />
          <Route exact path='/checkout' component={CheckOut} />
          <Route exact path='/signin' render={() =>
             this.props.currentUser ? 
             (<Redirect to='/' />) : 
             (<SignInAndSignUp />)
          }/>
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
})

const mapDispatchToProps = (dispatch) =>  ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);