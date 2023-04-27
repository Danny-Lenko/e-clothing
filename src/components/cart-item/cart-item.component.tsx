import { FC, memo } from 'react'

import { ICartItem } from '../../lib/store/cart/cart.slice'
import { Container, ItemDetails, Name } from './cart-item.styles'

interface Props {
   item: ICartItem
}

const CartItem: FC<Props> = memo(({ item }) => {
   const { name, imageUrl, price, ordered } = item

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
})

export default CartItem
