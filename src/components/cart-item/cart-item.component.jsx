import { Container, ItemDetails, Name } from "./cart-item.styles";

const CartItem = ({ item }) => {
   const { name, imageUrl, ordered, price } = item

   return (
      <Container>
         <img src={imageUrl} alt={name} />
         <ItemDetails>
            <Name>{name}</Name>
            <span>{ordered} x {price}</span>
         </ItemDetails>
      </Container>
   );
}

export default CartItem;