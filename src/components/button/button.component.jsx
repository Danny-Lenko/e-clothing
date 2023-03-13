import {
   BasicButton,
   GoogleButton,
   InvertedButton,
   ButtonSpinner,
} from './button.styles'

export const BUTTON_TYPES = {
   basic: 'basic',
   google: 'google',
   inverted: 'inverted',
}

const getButton = (type = 'basic') =>
   ({
      [BUTTON_TYPES.basic]: BasicButton,
      [BUTTON_TYPES.google]: GoogleButton,
      [BUTTON_TYPES.inverted]: InvertedButton,
   }[type])

const Button = ({ children, buttonType, isLoading, ...otherProps }) => {
   const CustomButton = getButton(buttonType)

   return (
      <CustomButton {...otherProps}>
         {isLoading ? <ButtonSpinner /> : children}
      </CustomButton>
   )
}

export default Button
