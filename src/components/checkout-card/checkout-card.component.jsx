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

         <span className="quantity">
            <div
               className="arrow"
               onClick={handleDecrease}
            >
               &#10094;
            </div>
            <span className="value">{ordered}</span>
            <div
               className="arrow"
               onClick={handleIncrease}
            >
               &#10095;
            </div>
         </span>

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