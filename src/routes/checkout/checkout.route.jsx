import { useContext } from "react";
import { CartContext } from "../../lib/contexts/cart.context";
import CheckoutCard from "../../components/checkout-card/checkout-card.component";
import { 
   Container,
   Header,
   Col,
   Total
} from "./checkout.styles";

const Checkout = () => {
   const { cartItems, total } = useContext(CartContext)

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
         <Total>Total: ${total}</Total>
      </Container>
   );
}

export default Checkout;