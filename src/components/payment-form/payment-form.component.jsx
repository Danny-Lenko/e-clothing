import Button, { BUTTON_TYPES } from '../button/button.component'
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js'
import {
   PaymentFormContainer,
   FormContainer,
   PaymentButton,
} from './payment-form.styles'

const ProductCard = () => {
   const stripe = useStripe()
   const elements = useElements()

   const handlePayment = (e) => {
      e.preventDefault()

      if (!stripe || !elements) {
         return
      }
   }

   return (
      <PaymentFormContainer>
         <FormContainer>
            <h2>Credit Card Payment:</h2>
            <CardElement />
            <PaymentButton buttonType={BUTTON_TYPES.inverted}>
               {' '}
               Pay now{' '}
            </PaymentButton>
         </FormContainer>
      </PaymentFormContainer>
   )
}

export default ProductCard
