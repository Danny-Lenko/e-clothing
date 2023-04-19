import { MouseEvent, useContext } from 'react'
import { UserContext } from '../../lib/contexts/user.context'
import { BUTTON_TYPES } from '../button/button.component'
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js'
import { useState } from 'react'
import {
   PaymentFormContainer,
   FormContainer,
   PaymentButton,
} from './payment-form.styles'
import { CartContext } from '../../lib/contexts/cart.context'

const PaymentForm = () => {
   const stripe = useStripe()
   const elements = useElements()
   const { currentUser } = useContext(UserContext)
   const {cartTotal} = useContext(CartContext)

   const [isLoading, setIsLoading] = useState(false)

   const handlePayment = async (e: MouseEvent<HTMLButtonElement>) => {
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
            body: JSON.stringify({ amount: cartTotal * 100 }),
         }
      ).then((res) => {
         return res.json()
      })

      const clientSecret = response.paymentIntent.client_secret

      const cardContent = elements.getElement(CardElement)

      if (cardContent === null) return

      const paymentResult = await stripe.confirmCardPayment(clientSecret, {
         payment_method: {
            card: cardContent,
            billing_details: {
               name: currentUser ? currentUser.displayName! : 'Guest',
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
               onClick={(e) => handlePayment}
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
