import { useNavigate } from 'react-router-dom'
import Button from '../button/button.component'
import CartItem from '../cart-item/cart-item.component'
import { Container, CartItems, EmptyMessage } from './cart-dropdown.styles'
import { CartContext } from '../../lib/contexts/cart.context'
import { useContext } from 'react'

const CartDropdown = () => {
   const navigate = useNavigate()
   const { cartItems, setIsCartOpen } = useContext(CartContext)

   const handleClick = () => {
      navigate('/checkout')
      setIsCartOpen(false)
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
