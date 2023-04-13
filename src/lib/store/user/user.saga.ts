import { takeLatest, all, call, put } from 'typed-redux-saga/macro'
import { User } from 'firebase/auth'
import { EmailSignInStart, SignUpStart, SignUpSuccess, userActionTypes } from './user.types'
import {
   createUserDocumentFromAuth,
   getCurrentUser,
   signInUserWithEmailAndPassword,
   signInWithGooglePopup,
   createAuthUserWithEmailAndPassword,
   signOutUser,
   AdditionalData,
} from '../../utils/firebase.utils'

import {
   signInSuccess,
   signInError,
   signUpError,
   signUpSuccess,
   signOutError,
   signOutSuccess,
} from './user.action'

export function* getUserSnapshot(
   userAuth: User,
   additionalData?: AdditionalData
) {
   try {
      const userSnapshot = yield* call(
         createUserDocumentFromAuth,
         userAuth,
         additionalData
      )
      if (userSnapshot) {
         yield* put(
            signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() })
         )
      }
   } catch (error) {
      yield* put(signInError(error as Error))
   }
}

export function* isUserAuthenticated() {
   try {
      const userAuth = yield* call(getCurrentUser)
      if (!userAuth) return
      yield* call(getUserSnapshot, userAuth)
   } catch (error) {
      yield* put(signInError(error as Error))
   }
}

export function* signInWithEmail({
   payload: { email, password },
}: EmailSignInStart) {
   try {
      const userCredential = yield* call(
         signInUserWithEmailAndPassword,
         email,
         password
      )
      if (userCredential) {
         const { user } = userCredential
         yield* call(getUserSnapshot, user)
      }
   } catch (error) {
      yield* put(signInError(error as Error))
   }
}

export function* signInWithGoogle() {
   try {
      const { user } = yield* call(signInWithGooglePopup)
      yield* call(getUserSnapshot, user)
   } catch (error) {
      yield* put(signInError(error as Error))
   }
}

export function* signUp({
   payload: { email, password, displayName },
}: SignUpStart) {
   try {
      const userCredentials = yield* call(
         createAuthUserWithEmailAndPassword,
         email,
         password
      )
      if (userCredentials) {
         const { user } = userCredentials
         yield* put(signUpSuccess(user, { displayName }))
      }
   } catch (error) {
      yield* put(signUpError(error as Error))
   }
}

export function* signInWhenSignUp({ payload: { user, additionalData } }: SignUpSuccess) {
   try {
      yield* call(getUserSnapshot, user, additionalData)
   } catch (error) {
      yield* put(signInError(error as Error))
   }
}

export function* signOut() {
   try {
      yield* call(signOutUser)
      yield* put(signOutSuccess())
   } catch (error) {
      yield* put(signOutError(error as Error))
   }
}

export function* onCheckIsUser() {
   yield* takeLatest(userActionTypes.checkIsUser, isUserAuthenticated)
}

export function* onEmailSignInStart() {
   yield* takeLatest(userActionTypes.emailSignInStart, signInWithEmail)
}

export function* onGoogleSignInStart() {
   yield* takeLatest(userActionTypes.googleSignInStart, signInWithGoogle)
}

export function* onSignUpStart() {
   yield* takeLatest(userActionTypes.signUpStart, signUp)
}

export function* onSingUpSuccess() {
   yield* takeLatest(userActionTypes.signUpSuccess, signInWhenSignUp)
}

export function* onSignOutStart() {
   yield* takeLatest(userActionTypes.signOutStart, signOut)
}

export function* userSagas() {
   yield* all([
      call(onCheckIsUser),
      call(onEmailSignInStart),
      call(onGoogleSignInStart),
      call(onSignUpStart),
      call(onSingUpSuccess),
      call(onSignOutStart),
   ])
}
