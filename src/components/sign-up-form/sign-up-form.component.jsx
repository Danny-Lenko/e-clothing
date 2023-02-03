import { useState } from "react";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../lib/utils/firebase.utils";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import './sign-up-form.styles.scss'

const formDefaultValues = {
   displayName: '',
   email: '',
   password: '',
   confirmPassword: ''
}

const SignUpForm = () => {
   const [formValues, setFormValues] = useState(formDefaultValues)
   const { displayName, email, password, confirmPassword } = formValues

   const handleChange = (event) => {
      const { name, value } = event.target
      setFormValues({ ...formValues, [name]: value })
   }

   const handleSubmit = async (event) => {
      event.preventDefault()

      if (password !== confirmPassword) {
         alert("Passwords don't match")
         return
      }

      try {
         const { user } = await createAuthUserWithEmailAndPassword(email, password)
         await createUserDocumentFromAuth(user, { displayName })
         clearForm()
      } catch (error) {
         if (error.code === 'auth/email-already-in-use') {
            alert("Cannot create user, email already in use")
         }
         alert("User creation encountered an error", error)
      }
   }

   const clearForm = () => {
      setFormValues(formDefaultValues)
   }

   return (
      <div className="sign-up-container">
         <h2>Don't have an account?</h2>
         <span>Sign up with your email & password</span>
         <form
            onSubmit={handleSubmit}
         >
            <FormInput
               label='User Name'
               type='text'
               required
               name='displayName'
               onChange={handleChange}
               value={displayName}
            />

            <FormInput
               label='User Email'
               type='email'
               required
               name='email'
               onChange={handleChange}
               value={email}
            />

            <FormInput
               label='Password'
               type='password'
               required
               name='password'
               onChange={handleChange}
               value={password}
            />

            <FormInput
               label='Confirm Password'
               type='password'
               required
               name='confirmPassword'
               onChange={handleChange}
               value={confirmPassword}
            />

            <Button
               type='submit'
            >
               Sign Up
            </Button>         
         </form>
      </div>
   );
}

export default SignUpForm;