import { BUTTON_TYPES } from '../button/button.component'
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js'
import {
   PaymentFormContainer,
   FormContainer,
   PaymentButton,
} from './payment-form.styles'

const PaymentForm = () => {
   const stripe = useStripe()
   const elements = useElements()

   const handlePayment = async (e) => {
      e.preventDefault()

      if (!stripe || !elements) {
         return
      }

      const response = await fetch(
         '/.netlify/functions/create-payment-intent',
         {
            method: 'post',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify({ amount: 10000 }),
         }
      ).then((res) => {
         return res.json()
      })

      const clientSecret = response.paymentIntent.client_secret

      const paymentResult = await stripe.confirmCardPayment(clientSecret, {
         payment_method: {
            card: elements.getElement(CardElement),
            billing_details: {
               name: 'Danny Lenko',
            },
         },
      })

      if (paymentResult.error) {
         alert(paymentResult.error.message)
      } else {
         if (paymentResult.paymentIntent.status === 'succeeded') {
            alert('Payment Successful!')
         }
      }
   }

   return (
      <PaymentFormContainer>
         <FormContainer>
            <h2>Credit Card Payment:</h2>
            <CardElement />
            <PaymentButton
               onClick={handlePayment}
               buttonType={BUTTON_TYPES.inverted}
            >
               {' '}
               Pay now{' '}
            </PaymentButton>
         </FormContainer>
      </PaymentFormContainer>
   )
}

export default PaymentForm
