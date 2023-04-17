import { ICartItem } from '../../lib/store/cart/cart.slice'
import { Container, ItemDetails, Name } from './cart-item.styles'

interface Props {
   item: ICartItem
}

const CartItem: React.FC<Props> = ({ item }) => {
   const { name, imageUrl, ordered, price } = item

   return (
      <Container>
         <img src={imageUrl} alt={name} />
         <ItemDetails>
            <Name>{name}</Name>
            <span>
               {ordered} x {price}
            </span>
         </ItemDetails>
      </Container>
   )
}

export default CartItem
