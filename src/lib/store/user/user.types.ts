import { Action, ActionWithPayload } from '../../utils/createAction.utils'
import { User } from 'firebase/auth';

export enum userActionTypes {
   checkIsUser = 'user/checkIsUser',
   googleSignInStart = 'user/googleSignInStart',
   emailSignInStart = 'user/emailSignInStart',
   signInSuccess = 'user/signInSuccess',
   signInError = 'user/signInError',
   signUpStart = 'user/signUpStart',
   signUpSuccess = 'user/signUpSuccess',
   signUpError = 'user/signUpError',
   signOutStart = 'user/signOutStart',
   signOutSuccess = 'user/signOutSuccess',
   signOutError = 'user/signOutError',
}

export type UserData = {
   createdAt: Date;
   displayName: string;
   email: string;
}

interface IEmailPassword {
   email: string
   password: string
}

interface ISignUpStart extends IEmailPassword {
   displayName: string
}

interface ISignUpSuccess {
   user: User
   additionalData: any
}

export type CheckIsUser = Action<userActionTypes.checkIsUser>

export type GoogleSignInStart = Action<userActionTypes.googleSignInStart>

export type EmailSignInStart = ActionWithPayload<
   userActionTypes.emailSignInStart,
   IEmailPassword
>

export type SignInSuccess = ActionWithPayload<
   userActionTypes.signInSuccess,
   UserData
>

export type SignInError = ActionWithPayload<userActionTypes.signInError, Error>

export type SignUpStart = ActionWithPayload<
   userActionTypes.signUpStart,
   ISignUpStart
>

export type SignUpSuccess = ActionWithPayload<
   userActionTypes.signUpSuccess,
   ISignUpSuccess
>

export type SignUpError = ActionWithPayload<userActionTypes.signUpError, Error>

export type SignOutStart = Action<userActionTypes.signOutStart>

export type SignOutSuccess = Action<userActionTypes.signOutSuccess>

export type SignOutError = ActionWithPayload<
   userActionTypes.signOutError,
   Error
>
