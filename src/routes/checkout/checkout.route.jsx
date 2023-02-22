import { useSelector } from "react-redux";
import { selectCartItems, selectCartTotal } from "../../lib/store/cart/cart.selector";
import CheckoutCard from "../../components/checkout-card/checkout-card.component";
import { 
   Container,
   Header,
   Col,
   Total
} from "./checkout.styles";

const Checkout = () => {
   const cartItems = useSelector(selectCartItems)
   const cartTotal = useSelector(selectCartTotal)

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
      </Container>
   );
}

export default Checkout;