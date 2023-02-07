import { useContext } from "react";
import { CartContext } from "../../lib/contexts/cart.context";

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
      <div>
         <img src={imageUrl} alt={name} />
         <span>{name}</span>
         <button
            onClick={handleDecrease}
         >
            less
         </button>
         <span>{ordered}</span>
         <button
            onClick={handleIncrease}
         >
            more
         </button>
         <span>{price}</span>
         <button
            onClick={handleRemove}
         >
            remove
         </button>
      </div>
   );
}

export default CheckoutCard;