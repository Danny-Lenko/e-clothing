import { takeLatest, all, call, put } from 'redux-saga/effects'
import { userActionTypes } from './user.types'
import {
   createUserDocumentFromAuth,
   getCurrentUser,
   signInUserWithEmailAndPassword,
   signInWithGooglePopup,
} from '../../utils/firebase.utils'

import {
   singInSuccess,
   signInError,
   emailSignInStart,
   googleSingInStart,
} from './user.action'

export function* getUserSnapshot(userAuth, additionalData) {
   try {
      const userSnapshot = yield call(
         createUserDocumentFromAuth,
         userAuth,
         additionalData
      )
      yield put(singInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }))
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
      switch (error.code) {
         case 'auth/wrong-password':
            yield put(signInError(error))
            alert('incorrect password for email')
            break
         case 'auth/user-not-found':
            yield put(signInError(error))
            alert('no user associated with this email')
            break
         default:
            console.log(error)
      }
   }
}

export function* singInWithGoogle() {
   try {
      const { user } = yield call(signInWithGooglePopup)
      yield call(getUserSnapshot, user)
   } catch (error) {
      yield put(signInError(error))
   }
}

export function* onCheckIsUser() {
   yield takeLatest(userActionTypes.checkIsUser, isUserAuthenticated)
}

export function* onEmailSignInStart() {
   yield takeLatest(userActionTypes.emailSignInStart, signInWithEmail)
}

export function* onGoogleSignInStart() {
   yield takeLatest(userActionTypes.googleSingInStart, singInWithGoogle)
}

export function* userSagas() {
   yield all([
      call(onCheckIsUser),
      call(onEmailSignInStart),
      call(onGoogleSignInStart),
   ])
}
