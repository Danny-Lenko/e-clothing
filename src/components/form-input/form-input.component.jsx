import { Container, Input, Label } from "./form-input.styles";

const FormInput = ({ label, ...otherProps }) => {
   return (
      <Container>
         <Input
            {...otherProps}
         ></Input>
         {
            label && <Label
               className={`
                  label ${otherProps.value.length ? 'shrink' : ''}
               `}
            >
               {label}
            </Label>
         }
      </Container>
   );
}

export default FormInput;