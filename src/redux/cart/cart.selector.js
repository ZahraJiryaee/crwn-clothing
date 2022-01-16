import { createSelector } from "reselect";

const selectCart = (state) => state.cart;

export const selectCartItems = createSelector(
  [selectCart],
  (cart) => cart.cartItems
);

export const selectCartHidden = createSelector(
  [selectCart],
  (cart) => cart.hidden
);

export const selectCartItemsCount = createSelector(
  [selectCartItems],
  (cartItems) =>
    cartItems.reduce(
      (accumalatedQuantity, cartItem) =>
        accumalatedQuantity + cartItem.quantity,
      0
    )
);

/*
1.input selector:
doesn't use createSelector
nameing convension: "selectName"
its a func that gets the whole state & just returns a slice of it

2.output selector:
does use input selectors & createSelector to build them selves
nameing convension: "selectCartItems" => cartItems is property in cart
createSelector(
    collection of input selecters, 
    a func that return the value we want out of the selector--
        parameters: each output of the input selectors array in the order that the selectors were written
)
bc of the createSelector, selectCartItems is now a memoized selector
*/
