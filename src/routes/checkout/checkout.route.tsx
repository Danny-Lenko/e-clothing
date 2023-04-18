import { useContext } from "react";

import CheckoutCard from "../../components/checkout-card/checkout-card.component";
import PaymentForm from "../../components/payment-form/payment-form.component";

import { CartContext } from "../../lib/contexts/cart.context";

import { 
   Container,
   Header,
   Col,
   Total
} from "./checkout.styles";

const Checkout = () => {
   const {cartItems, cartTotal} = useContext(CartContext)

   if (!cartItems.length) return <h2>Cart is Empty</h2>

   return (
      <Container>
         <Header>
            <Col>
               Product
            </Col>
            <Col>
               Description
            </Col>
            <Col>
               Quantity
            </Col>
            <Col>
               Price
            </Col>
            <Col>
               Remove
            </Col>
         </Header>
         {
            cartItems.map(item => <CheckoutCard key={item.id} item={item} />)
         }
         <Total>Total: ${cartTotal}</Total>

         <PaymentForm/>
      </Container>
   );
}

export default Checkout;