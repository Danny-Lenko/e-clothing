import { cartActionTypes } from "./cart.types"

const initialState = {
   isOpen: null,
   cartItems: [],
   cartCount: 0,
   cartTotal: 0
}

export const cartReducer = (state = initialState, action = {}) => {
   const { type, payload } = action

   switch (type) {
      case cartActionTypes.updatePayload:
         return { ...state, ...payload }
      default:
         return state
   }
}
