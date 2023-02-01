import { useState } from "react";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

const formDefaultValues = {
   email: '',
   password: ''
}

const SignInForm = ({ googleSubmit }) => {
   const [formValues, setFormValues] = useState(formDefaultValues)
   const { email, password } = formValues

   const handleChange = (event) => {
      const { name, value } = event.target
      setFormValues({ ...formValues, [name]: value })
   }

   console.log(formValues)

   return (
      <div className="sign-up-container">
         <h2>Already have an account?</h2>
         <span>Sign in with your email & password</span>
         <form
         // onSubmit={handleSubmit}
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

            <Button
               type='submit'
            >
               Sign In
            </Button>
            <Button
               buttonType='google'
               onClick={googleSubmit}
            >
               Sign In With Google
            </Button>
         </form>
      </div>

   );
}

export default SignInForm;