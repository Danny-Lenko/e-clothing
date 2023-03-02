import { userActionTypes } from './user.types'

const initialState = {
   user: null,
   loading: false,
   error: null,
}

export const userReducer = (state = initialState, action = {}) => {
   const { type, payload } = action

   switch (type) {
      case userActionTypes.signInSuccess:
         return {
            ...state,
            user: payload,
         }
      case userActionTypes.signInError:
         return { ...state, error: payload }
      default:
         return state
   }
}
