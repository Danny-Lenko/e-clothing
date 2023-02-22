import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Button from '../button/button.component'
import CartItem from '../cart-item/cart-item.component'
import { useCartUtils } from '../../lib/store/cart/useCartUtils'
import { selectCartItems } from '../../lib/store/cart/cart.selector'
import { Container, CartItems, EmptyMessage } from './cart-dropdown.styles'

const CartDropdown = () => {
   const { setIsOpen } = useCartUtils()
   const cartItems = useSelector(selectCartItems)
   const navigate = useNavigate()

   const handleClick = () => {
      navigate('/checkout')
      setIsOpen(false)
   }

   return (
      <Container>
         <CartItems>
            {cartItems.length ? (
               cartItems.map((item) => <CartItem key={item.id} item={item} />)
            ) : (
               <EmptyMessage>The cart is empty</EmptyMessage>
            )}
         </CartItems>
         <Button onClick={handleClick}>Go to checkout</Button>
      </Container>
   )
}

export default CartDropdown
