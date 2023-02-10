import { useContext } from "react";
import { CartContext } from "../../lib/contexts/cart.context";
import { Container, ImgContainer } from './checkout-card.styles'

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
      <Container>
         <ImgContainer>
            <img src={imageUrl} alt={name} />
         </ImgContainer>
         
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
      </Container>
   );
}

export default CheckoutCard;