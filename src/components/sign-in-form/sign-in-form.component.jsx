import { useState } from "react";
import { signInWithGooglePopup, createUserDocumentFromAuth, signInUserWithEmailAndPassword } from "../../lib/utils/firebase.utils";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import './sign-in-form.styles.scss'

const formDefaultValues = {
   email: '',
   password: ''
}

const SignInForm = () => {
   const [formValues, setFormValues] = useState(formDefaultValues)
   const { email, password } = formValues

   const handleChange = (event) => {
      const { name, value } = event.target
      setFormValues({ ...formValues, [name]: value })
   }

   const handleSubmit = async (event) => {
      event.preventDefault()

      try {
         const res = await signInUserWithEmailAndPassword(email, password)
         console.log(res)
         clearForm()
      } catch (error) {
         switch (error.code) {
            case 'auth/wrong-password':
               alert('incorrect password for email');
               break;
            case 'auth/user-not-found':
               alert('no user associated with this email');
               break;
            default:
               console.log(error);
         }
      }
   }

   const clearForm = () => {
      setFormValues(formDefaultValues)
   }

   const logGoogleUser = async () => {
      const { user } = await signInWithGooglePopup();
      await createUserDocumentFromAuth(user);
   };

   return (
      <div className="sign-up-container">
         <h2>Already have an account?</h2>
         <span>Sign in with your email & password</span>
         <form
            onSubmit={handleSubmit}
         >
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

            <div className="buttons-container">
               <Button
                  type='submit'
               >
                  Sign In
               </Button>
               <Button
                  buttonType='google'
                  onClick={logGoogleUser}
               >
                  Sign In With Google
               </Button>
            </div>
         </form>
      </div>

   );
}

export default SignInForm;