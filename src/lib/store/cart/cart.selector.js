import { createSelector } from 'reselect'

const selectCartReducer = (state) => state.cart

export const selectIsOpen = createSelector(
   [selectCartReducer],
   (cart) => cart.isOpen
)

export const selectCartItems = createSelector(
   [selectCartReducer],
   (cart) => cart.cartItems
)

export const selectCartCount = createSelector([selectCartItems], (cartItems) =>
   cartItems.reduce((acc, cartItem) => acc + cartItem.ordered, 0)
)

export const selectCartTotal = createSelector([selectCartItems], (cartItems) =>
   cartItems.reduce((total, cartItem) => {
      return total + cartItem.ordered * cartItem.price
   }, 0)
)
