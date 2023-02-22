import { useSelector } from 'react-redux'
import { selectIsOpen, selectCartCount } from '../../lib/store/cart/cart.selector'
import { useCartUtils } from '../../lib/store/cart/useCartUtils'
import { Container, Image, ItemCount } from './cart-icon.styles'

const CartIcon = () => {
   const { setIsOpen } = useCartUtils()
   const isOpen = useSelector(selectIsOpen)
   const cartCount = useSelector(selectCartCount)

   const handleClick = () => {
      setIsOpen(!isOpen)
   }

   return (
      <Container onClick={handleClick}>
         <Image className="shopping-icon" />
         <ItemCount>{cartCount}</ItemCount>
      </Container>
   )
}

export default CartIcon
