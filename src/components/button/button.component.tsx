import { ButtonHTMLAttributes } from 'react'
import {
   BasicButton,
   GoogleButton,
   InvertedButton,
   ButtonSpinner,
} from './button.styles'

export enum BUTTON_TYPES {
   basic = 'basic',
   google = 'google',
   inverted = 'inverted',
}

const getButton = (type = BUTTON_TYPES.basic): typeof BasicButton =>
   ({
      [BUTTON_TYPES.basic]: BasicButton,
      [BUTTON_TYPES.google]: GoogleButton,
      [BUTTON_TYPES.inverted]: InvertedButton,
   }[type])

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
   children: React.ReactNode
   buttonType: BUTTON_TYPES
   isLoading: boolean
}

const Button: React.FC<Props> = ({
   children,
   buttonType,
   isLoading,
   ...otherProps
}) => {
   const CustomButton = getButton(buttonType)

   return (
      <CustomButton {...otherProps}>
         {isLoading ? <ButtonSpinner /> : children}
      </CustomButton>
   )
}

export default Button
