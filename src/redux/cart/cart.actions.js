import CartActionTypes from "./cart.types";

export const toggleCartHidden = () => ({
  type: CartActionTypes.TOGGLE_CART_HIDDEN,
}); // we don't need payload here

export const addItem = (item) => ({
  type: CartActionTypes.ADD_ITEM,
  payload: item,
});
