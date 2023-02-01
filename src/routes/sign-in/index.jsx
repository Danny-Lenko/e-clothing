import {
   signInWithGooglePopup,
   createUserDocumentFromAuth,
} from "../../lib/utils/firebase.utils";
import SignInForm from "../../components/sign-in-form/sign-in-form.component";
import SignUpForm from "../../components/sign-up-form/sign-up-form.component";

const SignIn = () => {
   const logGoogleUser = async () => {
      const { user } = await signInWithGooglePopup();
      const userDocRef = await createUserDocumentFromAuth(user);
   };

   return (
      <div>
         <h1>Sign In Page</h1>
         <button onClick={logGoogleUser}>Sign in with Google Popup</button>

         <SignInForm googleSubmit={logGoogleUser} />
         <SignUpForm />
      </div>
   );
};

export default SignIn;
