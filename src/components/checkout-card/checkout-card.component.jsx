import { useContext } from "react";
import { CartContext } from "../../lib/contexts/cart.context";
import './checkout-card.styles.scss'

const CheckoutCard = ({ item }) => {
   const { removeTitle, increaseOrder, decreaseOrder } = useContext(CartContext)
   const { id, name, imageUrl, price, ordered } = item

   const handleRemove = () => {
      removeTitle(id)
   }

   const handleIncrease = () => {
      increaseOrder(id)
   }

   const handleDecrease = () => {
      decreaseOrder(id)
   }

   return (
      <div className="checkout-card-container">
         <div className="image-container">
            <img src={imageUrl} alt={name} />
         </div>
         <span className="name">{name}</span>
         {/* <button
            onClick={handleDecrease}
         >
            less
         </button> */}
         <span className="quantity">{ordered}</span>
         {/* <button
            onClick={handleIncrease}
         >
            more
         </button> */}
         <span className="price">{price}</span>
         <span
            className="remove-button"
            onClick={handleRemove}
         >
            &#10005;
         </span>
      </div>
   );
}

export default CheckoutCard;