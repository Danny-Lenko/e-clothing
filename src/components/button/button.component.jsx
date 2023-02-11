import { BasicButton, GoogleButton, InvertedButton } from "./button.styles";

export const BUTTON_TYPES = {
   basic: 'basic',
   google: 'google',
   inverted: 'inverted'
}

const getButton = (type = 'basic') => ({
   [BUTTON_TYPES.basic]: BasicButton,
   [BUTTON_TYPES.google]: GoogleButton,
   [BUTTON_TYPES.inverted]: InvertedButton
})[type]

const Button = ({ children, buttonType, ...otherProps }) => {
   const CustomButton = getButton(buttonType)

   return (
      <CustomButton {...otherProps} >{children}</CustomButton>
   );
}

export default Button;