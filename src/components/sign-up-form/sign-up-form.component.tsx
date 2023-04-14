import { useState, ChangeEvent, FormEvent } from 'react'
import { AuthError, AuthErrorCodes } from 'firebase/auth'
import FormInput from '../form-input/form-input.component'
import Button from '../button/button.component'
import { Container } from './sign-up-form.styles'
import { useDispatch } from 'react-redux'
import { signUpStart } from '../../lib/store/user/user.action'

const formDefaultValues = {
   displayName: '',
   email: '',
   password: '',
   confirmPassword: '',
}

const SignUpForm = () => {
   const dispatch = useDispatch()
   const [formValues, setFormValues] = useState(formDefaultValues)
   const { displayName, email, password, confirmPassword } = formValues

   const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target
      setFormValues({ ...formValues, [name]: value })
   }

   const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault()

      if (password !== confirmPassword) {
         alert("Passwords don't match")
         return
      }

      try {
         dispatch(signUpStart(email, password, displayName))
         clearForm()
      } catch (error) {
         if ((error as AuthError).code === AuthErrorCodes.EMAIL_EXISTS) {
            alert('Cannot create user, email already in use')
         }
         alert('User creation encountered an error, ' + error)
      }
   }

   const clearForm = () => {
      setFormValues(formDefaultValues)
   }

   return (
      <Container>
         <h2>Don't have an account?</h2>
         <span>Sign up with your email & password</span>
         <form onSubmit={handleSubmit}>
            <FormInput
               label="User Name"
               type="text"
               required
               name="displayName"
               onChange={handleChange}
               value={displayName}
            />

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

            <FormInput
               label="Confirm Password"
               type="password"
               required
               name="confirmPassword"
               onChange={handleChange}
               value={confirmPassword}
            />

            <Button type="submit">Sign Up</Button>
         </form>
      </Container>
   )
}

export default SignUpForm
