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
         console.log(payload)
         return {
            ...state,
            user: payload,
         }
      case userActionTypes.signOutSuccess:
         return {
            ...state,
            user: null,
         }
      case userActionTypes.signInError:
      case userActionTypes.signUpError:
      case userActionTypes.signOutError:
         return { ...state, error: payload }
      default:
         return state
   }
}
