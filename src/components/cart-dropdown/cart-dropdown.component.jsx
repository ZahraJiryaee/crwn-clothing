import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { withRouter } from "react-router-dom/cjs/react-router-dom.min";

import CustomButton from "../custom-button/custom-button.component";
import CartItem from "../cart-item/cart-item.component";
import { selectCartItems } from "../../redux/cart/cart.selector";
import { toggleCartHidden } from "../../redux/cart/cart.actions";

import "./cart-dropdown.styles.scss";

const CartDropdown = ({ cartItems, history, dispatch }) => (
  <div className="cart-dropdown">
    <div className="cart-items">
      {cartItems.length ? (
        cartItems.map((cartItems) => (
          <CartItem key={cartItems.id} item={cartItems} />
        ))
      ) : (
        <span className="empty-message">Your cart is empty</span>
      )}
    </div>
    <CustomButton
      onClick={() => {
        history.push("/checkout");
        dispatch(toggleCartHidden());
      }}
    >
      GO TO CHECKOUT
    </CustomButton>
  </div>
);

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
}); // cart-dropdown component doesn't get rerendred whenever the state change is unrelated to the cart-item

export default withRouter(connect(mapStateToProps)(CartDropdown));

/*
connect passes dispatch to the component as a prop,
if we don not supply a second argument to connect.
bc if we need to make one off action dispatches,
there is no reason to write another mapDispatchToProp. it might be more verbose
*/
