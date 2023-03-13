import { BUTTON_TYPES } from '../button/button.component'
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '../../lib/store/user/user.selector'
import { selectCartTotal } from '../../lib/store/cart/cart.selector'
import { useState } from 'react'
import {
   PaymentFormContainer,
   FormContainer,
   PaymentButton,
} from './payment-form.styles'

const PaymentForm = () => {
   const stripe = useStripe()
   const elements = useElements()
   const user = useSelector(selectCurrentUser)
   const total = useSelector(selectCartTotal)

   const [isLoading, setIsLoading] = useState(false)

   const handlePayment = async (e) => {
      e.preventDefault()

      if (!stripe || !elements) {
         return
      }

      setIsLoading(true)

      const response = await fetch(
         '/.netlify/functions/create-payment-intent',
         {
            method: 'post',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify({ amount: total * 100 }),
         }
      ).then((res) => {
         return res.json()
      })

      const clientSecret = response.paymentIntent.client_secret

      const paymentResult = await stripe.confirmCardPayment(clientSecret, {
         payment_method: {
            card: elements.getElement(CardElement),
            billing_details: {
               name: user ? user.displayName : 'Guest',
            },
         },
      })

      setIsLoading(false)

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
               isLoading={isLoading}
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
