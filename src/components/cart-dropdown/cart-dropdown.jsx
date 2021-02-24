import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';
import CartItem from '../cart-item/cart-item';
import { selectCartItems } from '../../redux/cart/cart-selectors';
import { toggleCartHidden } from '../../redux/cart/cart-actions';
import { CartDropdownContainer, CartItemsContainer, CartDropdownButton, EmptyMessageContainer } from './cart-dropdown-styles.jsx';
import './court-dropdown.scss';

const CartDropdown = ({ cartItems, history, dispatch }) => {
  return (
    <CartDropdownContainer>
      <CartItemsContainer>
      {
        cartItems.length ?   
          cartItems.map(cartItem => (
          <CartItem key={cartItem} item={cartItem} />
        )) 
        :
        <EmptyMessageContainer>Your cart is empty</EmptyMessageContainer>
      }
      </CartItemsContainer>
        <CartDropdownButton onClick={() => {
          history.push('/checkout');
          dispatch(toggleCartHidden());
        }}>
        GO TO CHECKOUT
        </CartDropdownButton>
    </CartDropdownContainer>
  );
};

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems
});

export default withRouter(connect(mapStateToProps, null)(CartDropdown));