import { useContext } from "react";
import { CartContext } from "../../lib/contexts/cart.context";
import CheckoutCard from "../../components/checkout-card/checkout-card.component";

const Checkout = () => {
   const { cartItems, total } = useContext(CartContext)

   if (!cartItems.length) return <h2>Cart is Empty</h2>

   return (
      <>
         {
            cartItems.map(item => <CheckoutCard key={item.id} item={item} />)
         }
         <h2>Total: ${total}</h2>
      </>
   );
}

export default Checkout;