import { Middleware } from 'redux'
import { cartService } from '../utils/cart.service'
import { RootState } from '../store/store'

export const firestoreSyncMiddleware: Middleware<{}, RootState> =
   (store) => (next) => (action) => {
      const result = next(action)
      const state = store.getState()

      // Check if the action is related to cart changes
      if (
         action.type.startsWith('cart/') &&
         action.type !== 'cart/mergeAndSync/fulfilled'
      ) {
         const userId = state.user.user?.id // Adjust this based on your user state structure
         if (userId) {
            cartService.saveCart(userId, state.cart.cartItems)
         }
      }

      return result
   }
