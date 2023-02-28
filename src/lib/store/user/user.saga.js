import { takeLatest, all, call, put } from 'redux-saga/effects'
import { userActionTypes } from './user.types'
import {
   createUserDocumentFromAuth,
   getCurrentUser,
} from '../../utils/firebase.utils'

import { singInSuccess, signInError } from './user.action'

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

export function* onCheckIsUser() {
   yield takeLatest(userActionTypes.checkIsUser, isUserAuthenticated)
}

export function* userSagas() {
   yield all([call(onCheckIsUser)])
}
