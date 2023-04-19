import { ICartItem } from '../../lib/contexts/cart.context'
import { Container, ItemDetails, Name } from './cart-item.styles'

interface Props {
   item: ICartItem
}

const CartItem: React.FC<Props> = ({ item }) => {
   const { name, imageUrl, quantity, price } = item

   return (
      <Container>
         <img src={imageUrl} alt={name} />
         <ItemDetails>
            <Name>{name}</Name>
            <span>
               {quantity} x {price}
            </span>
         </ItemDetails>
      </Container>
   )
}

export default CartItem
