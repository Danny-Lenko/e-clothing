import SignInForm from "../../components/sign-in-form/sign-in-form.component";
import SignUpForm from "../../components/sign-up-form/sign-up-form.component";
import { Container } from "./auth.styles";

const Auth = () => {
   return (
      <Container>
         <SignInForm />
         <SignUpForm />
      </Container>
   );
};

export default Auth;
