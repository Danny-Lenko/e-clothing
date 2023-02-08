import { useContext } from "react";
import { CartContext } from "../../lib/contexts/cart.context";
import CheckoutCard from "../../components/checkout-card/checkout-card.component";
import './checkout.styles.scss'

const Checkout = () => {
   const { cartItems, total } = useContext(CartContext)

   if (!cartItems.length) return <h2>Cart is Empty</h2>

   return (
      <div className="checkout-container">
         <div className="checkout-header">
            <div className="header-block">
               Product
            </div>
            <div className="header-block">
               Description
            </div>
            <div className="header-block">
               Quantity
            </div>
            <div className="header-block">
               Price
            </div>
            <div className="header-block">
               Remove
            </div>
         </div>
         {
            cartItems.map(item => <CheckoutCard key={item.id} item={item} />)
         }
         <h2 className="total">Total: ${total}</h2>
      </div>
   );
}

export default Checkout;