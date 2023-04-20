import { useState, ChangeEvent, FormEvent } from 'react'
import { AuthError, AuthErrorCodes } from 'firebase/auth'
import FormInput from '../form-input/form-input.component'
import Button, { BUTTON_TYPES } from '../button/button.component'
import { Container, BtnContainer } from './sign-in-form.styles'
import {
   signInUserWithEmailAndPassword,
   signInWithGooglePopup,
} from '../../lib/utils/firebase.utils'

const formDefaultValues = {
   email: '',
   password: '',
}

const SignInForm = () => {
   const [formValues, setFormValues] = useState(formDefaultValues)
   const { email, password } = formValues

   const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target
      setFormValues({ ...formValues, [name]: value })
   }

   const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      try {
         signInUserWithEmailAndPassword(email, password)
         clearForm()
      } catch (error) {
         switch ((error as AuthError).code) {
            case AuthErrorCodes.INVALID_PASSWORD:
               alert('incorrect password for email')
               break
            case 'auth/user-not-found':
               alert('no user associated with this email')
               break
            default:
               console.log(error)
         }
      }
   }

   const clearForm = () => {
      setFormValues(formDefaultValues)
   }

   const logGoogleUser = async () => {
      signInWithGooglePopup()
   }

   return (
      <Container>
         <h2>Already have an account?</h2>
         <span>Sign in with your email & password</span>
         <form onSubmit={handleSubmit}>
            <FormInput
               label="User Email"
               type="email"
               required
               name="email"
               onChange={handleChange}
               value={email}
            />

            <FormInput
               label="Password"
               type="password"
               required
               name="password"
               onChange={handleChange}
               value={password}
            />

            <BtnContainer>
               <Button type="submit">Sign In</Button>
               <Button
                  type="button"
                  buttonType={BUTTON_TYPES.google}
                  onClick={logGoogleUser}
               >
                  Sign In With Google
               </Button>
            </BtnContainer>
         </form>
      </Container>
   )
}

export default SignInForm
