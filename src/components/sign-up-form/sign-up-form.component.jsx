import { useState } from "react";

const formDefaultValues = {
   userName: '',
   userEmail: '',
   userPassword: '',
   confirmPassword: ''
}

const SignUpForm = () => {
   const [formValues, setFormValues] = useState(formDefaultValues)
   const {userName, userEmail, userPassword, confirmPassword} = formValues

   console.log(formValues)

   const handleChange = (event) => {
      const { name, value } = event.target
      setFormValues({...formValues, [name]: value})
   }

   return (
      <>
         <div>Sign Up</div>
         <form>
            <label>
               User Name
               <input
                  type='text'
                  required
                  name='userName'
                  onChange={handleChange}
                  value={userName}
               ></input>
            </label>
            <label>
               User Email
               <input
                  type='email'
                  required
                  name='userEmail'
                  onChange={handleChange}
                  value={userEmail}
               ></input>
            </label>
            <label>
               User Password
               <input
                  type='password'
                  required
                  name='userPassword'
                  onChange={handleChange}
                  value={userPassword}
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