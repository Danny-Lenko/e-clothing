import { useNavigate } from 'react-router-dom'
import Button from '../button/button.component'
import CartItem from '../cart-item/cart-item.component'
import { Container, CartItems, EmptyMessage } from './cart-dropdown.styles'
// redux
import { useDispatch, useSelector } from 'react-redux'
import { setIsOpen } from '../../lib/store/cart/cart.slice'
import { selectCartItems } from '../../lib/store/cart/cart.selector'

const CartDropdown = () => {
   const navigate = useNavigate()
   const dispatch = useDispatch()
   const cartItems = useSelector(selectCartItems)

   const handleClick = () => {
      navigate('/checkout')
      dispatch(setIsOpen(false))
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
