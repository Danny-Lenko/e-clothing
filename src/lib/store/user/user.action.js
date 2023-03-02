import { createAction } from '../../utils/createAction.utils'
import { userActionTypes } from './user.types'

export const setUser = (user) => createAction(userActionTypes.setUser, user)

export const checkIsUser = () => createAction(userActionTypes.checkIsUser)

export const googleSignInStart = () =>
   createAction(userActionTypes.googleSignInStart)

export const emailSignInStart = (email, password) =>
   createAction(userActionTypes.emailSignInStart, { email, password })

export const signInSuccess = (user) =>
   createAction(userActionTypes.signInSuccess, user)

export const signInError = (error) =>
   createAction(userActionTypes.signInError, error)

export const signUpStart = (email, password, displayName) =>
   createAction(userActionTypes.signUpStart, { email, password, displayName })

export const signUpSuccess = (user, additionalData) =>
   createAction(userActionTypes.signUpSuccess, { user, additionalData })

export const signUpError = (error) =>
   createAction(userActionTypes.signUpError, error)

export const signOutStart = () =>
   createAction(userActionTypes.signOutStart)

export const signOutSuccess = () =>
   createAction(userActionTypes.signOutSuccess)

export const signOutError = (error) =>
   createAction(userActionTypes.signOutError, error)
