import { InputHTMLAttributes } from 'react'
import { Container, Input, Label } from './form-input.styles'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
   label: string
}

const FormInput: React.FC<Props> = ({ label, ...otherProps }) => {
   return (
      <Container>
         <Input {...otherProps}></Input>
         {label && (
            <Label
               // className={`
               //    label ${otherProps.value.length ? 'shrink' : ''}
               // `}
               shrink={Boolean(
                  otherProps.value &&
                     typeof otherProps.value === 'string' &&
                     otherProps.value.length
               )}
            >
               {label}
            </Label>
         )}
      </Container>
   )
}

export default FormInput
