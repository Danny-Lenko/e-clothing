import { takeLatest, all, call, put } from 'redux-saga/effects'
import { userActionTypes } from './user.types'
import {
   createUserDocumentFromAuth,
   getCurrentUser,
   signInUserWithEmailAndPassword,
   signInWithGooglePopup,
   createAuthUserWithEmailAndPassword,
} from '../../utils/firebase.utils'

import {
   signInSuccess,
   signInError,
   signUpError,
   signUpSuccess,
} from './user.action'

export function* getUserSnapshot(userAuth, additionalData) {
   try {
      const userSnapshot = yield call(
         createUserDocumentFromAuth,
         userAuth,
         additionalData
      )
      yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }))
   } catch (error) {
      yield put(signInError(error))
   }
}

export function* isUserAuthenticated() {
   try {
      const userAuth = yield call(getCurrentUser)
      if (!userAuth) return
      yield call(getUserSnapshot, userAuth)
   } catch (error) {
      yield put(signInError(error))
   }
}

export function* signInWithEmail({ payload: { email, password } }) {
   try {
      const { user } = yield call(
         signInUserWithEmailAndPassword,
         email,
         password
      )
      yield call(getUserSnapshot, user)
   } catch (error) {
      yield put(signInError(error))
   }
}

export function* signInWithGoogle() {
   try {
      const { user } = yield call(signInWithGooglePopup)
      yield call(getUserSnapshot, user)
   } catch (error) {
      yield put(signInError(error))
   }
}

export function* signUp({ payload: { email, password, displayName } }) {
   try {
      const { user } = yield call(
         createAuthUserWithEmailAndPassword,
         email,
         password
      )

      yield put(signUpSuccess(user, { displayName }))
   } catch (error) {
      yield put(signUpError(error))
   }
}

export function* signInWhenSignUp({ payload: { user, additionalData } }) {
   try {
      yield call(getUserSnapshot, user, additionalData)
   } catch (error) {
      yield put(signInError(error))
   }
}

export function* signOut() {
   
}

export function* onCheckIsUser() {
   yield takeLatest(userActionTypes.checkIsUser, isUserAuthenticated)
}

export function* onEmailSignInStart() {
   yield takeLatest(userActionTypes.emailSignInStart, signInWithEmail)
}

export function* onGoogleSignInStart() {
   yield takeLatest(userActionTypes.googleSignInStart, signInWithGoogle)
}

export function* onSignUpStart() {
   yield takeLatest(userActionTypes.signUpStart, signUp)
}

export function* onSingUpSuccess() {
   yield takeLatest(userActionTypes.signUpSuccess, signInWhenSignUp)
}

export function* onSignOutStart() {
   yield takeLatest(userActionTypes.signOutStart, signOut)
}

export function* userSagas() {
   yield all([
      call(onCheckIsUser),
      call(onEmailSignInStart),
      call(onGoogleSignInStart),
      call(onSignUpStart),
      call(onSingUpSuccess),
      call(onSignOutStart)
   ])
}
