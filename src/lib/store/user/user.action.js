import { createAction } from '../../utils/createAction.utils'
import { userActionTypes } from './user.types'

export const setUser = (user) => createAction(userActionTypes.setUser, user)

// export const userActionTypes = {
//    // setUser: 'user/setUser'
//    checkIsUser: 'user/checkIsUser',
//    googleSingInStart: 'user/googleSingInStart',
//    emailSignInStart: 'user/emailSingInStart',
//    singInSuccess: 'user/singInSuccess',
//    singInError: 'user/signInError',
// }

export const checkIsUser = () => createAction(userActionTypes.checkIsUser)

export const googleSingInStart = () =>
   createAction(userActionTypes.googleSingInStart)

export const emailSignInStart = (email, password) =>
   createAction(userActionTypes.emailSignInStart, { email, password })

export const singInSuccess = (user) =>
   createAction(userActionTypes.singInSuccess, user)

export const signInError = (error) => 
   createAction(userActionTypes.singInError, error)
