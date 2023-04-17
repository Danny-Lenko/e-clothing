import { useDispatch, useSelector } from 'react-redux'
import { selectIsOpen, selectCartCount } from '../../lib/store/cart/cart.selector'
import { setIsOpen } from '../../lib/store/cart/cart.slice'
import { Container, Image, ItemCount } from './cart-icon.styles'

const CartIcon = () => {
const dispatch = useDispatch()
   const isOpen = useSelector(selectIsOpen)
   const cartCount = useSelector(selectCartCount)

   const handleClick = () => {
      dispatch(setIsOpen(!isOpen))
   }

   return (
      <Container onClick={handleClick}>
         <Image className="shopping-icon" />
         <ItemCount>{cartCount}</ItemCount>
      </Container>
   )
}

export default CartIcon
