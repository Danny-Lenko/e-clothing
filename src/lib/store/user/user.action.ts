import { createAction, withMatcher } from '../../utils/createAction.utils'
import { AdditionalData } from '../../utils/firebase.utils'
import {
   userActionTypes,
   UserData,
   CheckIsUser,
   GoogleSignInStart,
   EmailSignInStart,
   SignInSuccess,
   SignInError,
   SignUpStart,
   SignUpSuccess,
   SignUpError,
   SignOutStart,
   SignOutSuccess,
   SignOutError,
} from './user.types'

import { User } from 'firebase/auth'

export const checkIsUser = withMatcher(
   (): CheckIsUser => createAction(userActionTypes.checkIsUser)
)

export const googleSignInStart = withMatcher(
   (): GoogleSignInStart => createAction(userActionTypes.googleSignInStart)
)

export const emailSignInStart = withMatcher(
   (email: string, password: string): EmailSignInStart =>
      createAction(userActionTypes.emailSignInStart, { email, password })
)

export const signInSuccess = withMatcher(
   (user: UserData & {id: string}): SignInSuccess =>
      createAction(userActionTypes.signInSuccess, user)
)

export const signInError = withMatcher(
   (error: Error): SignInError =>
      createAction(userActionTypes.signInError, error)
)

export const signUpStart = withMatcher(
   (email: string, password: string, displayName: string): SignUpStart =>
      createAction(userActionTypes.signUpStart, {
         email,
         password,
         displayName,
      })
)

export const signUpSuccess = withMatcher(
   (user: User, additionalData: AdditionalData): SignUpSuccess =>
      createAction(userActionTypes.signUpSuccess, { user, additionalData })
)

export const signUpError = withMatcher(
   (error: Error): SignUpError =>
      createAction(userActionTypes.signUpError, error)
)

export const signOutStart = withMatcher(
   (): SignOutStart => createAction(userActionTypes.signOutStart)
)

export const signOutSuccess = withMatcher(
   (): SignOutSuccess => createAction(userActionTypes.signOutSuccess)
)

export const signOutError = withMatcher(
   (error: Error): SignOutError =>
      createAction(userActionTypes.signOutError, error)
)
