import { userActionTypes } from './user.types'

const initialState = {
   user: null,
   loading: false,
   error: null,
}

export const userReducer = (state = initialState, action = {}) => {
   const { type, payload } = action

   switch (type) {
      case userActionTypes.singInSuccess:
         return {
            ...state,
            user: payload,
         }
      case userActionTypes.singInError:
         return { ...state, error: payload }
      default:
         return state
   }
}
