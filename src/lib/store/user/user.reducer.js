import { userActionTypes } from "./user.types"

const initialState = {
   user: null
}

export const userReducer = (state = initialState, action = {}) => {
   const { type, payload } = action

   switch (type) {
      case userActionTypes.setUser:
         return {
            ...state,
            user: payload
         }
      default:
         return state
   }
}