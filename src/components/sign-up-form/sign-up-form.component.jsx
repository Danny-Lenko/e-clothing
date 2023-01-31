import { useState } from "react";
import {
   createAuthUserWithEmailAndPassword,
   createUserDocumentFromAuth
} from "../../lib/utils/firebase.utils";

const formDefaultValues = {
   displayName: '',
   email: '',
   password: '',
   confirmPassword: ''
}

const SignUpForm = () => {
   const [formValues, setFormValues] = useState(formDefaultValues)
   const { displayName, email, password, confirmPassword } = formValues

   console.log(formValues)

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
         createUserDocumentFromAuth(user, { displayName })
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
      <>
         <div>Sign Up</div>
         <form
            onSubmit={handleSubmit}
         >
            <label>
               User Name
               <input
                  type='text'
                  required
                  name='displayName'
                  onChange={handleChange}
                  value={displayName}
               ></input>
            </label>
            <label>
               User Email
               <input
                  type='email'
                  required
                  name='email'
                  onChange={handleChange}
                  value={email}
               ></input>
            </label>
            <label>
               User Password
               <input
                  type='password'
                  required
                  name='password'
                  onChange={handleChange}
                  value={password}
               ></input>
            </label>
            <label>
               Confirm Password
               <input
                  type='password'
                  required
                  name='confirmPassword'
                  onChange={handleChange}
                  value={confirmPassword}
               ></input>
            </label>
            <button type="submit">Sing Up</button>
         </form>
      </>
   );
}

export default SignUpForm;