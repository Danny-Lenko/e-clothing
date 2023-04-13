import { AnyAction } from 'redux'
import { UserData } from './user.types'
import {
   signInError,
   signInSuccess,
   signOutError,
   signOutSuccess,
   signUpError,
} from './user.action'

export type UserState = {
   readonly user: UserData | null
   readonly loading: boolean
   readonly error: Error | null
}

const initialState: UserState = {
   user: null,
   loading: false,
   error: null,
}

export const userReducer = (
   state = initialState,
   action = {} as AnyAction
): UserState => {
   if (signInSuccess.match(action)) {
      return { ...state, user: action.payload }
   }

   if (signOutSuccess.match(action)) {
      return { ...state, user: null }
   }

   if (
      signInError.match(action) ||
      signUpError.match(action) ||
      signOutError.match(action)
   ) {
      return { ...state, error: action.payload }
   }

   return state
}
