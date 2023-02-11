import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../button/button.component'
import CartItem from '../cart-item/cart-item.component'
import { CartContext } from '../../lib/contexts/cart.context'
import { Container, CartItems, EmptyMessage } from './cart-dropdown.styles'

const CartDropdown = () => {
   const { cartItems, setIsOpen } = useContext(CartContext)
   const navigate = useNavigate()

   const handleClick = () => {
      navigate('/checkout')
      setIsOpen(false)
   }

   return (
      <Container>
         <CartItems>
            { cartItems.length 
               ? cartItems.map(item => <CartItem key={item.id} item={item} />)
               : <EmptyMessage>The cart is empty</EmptyMessage>
            }
         </CartItems>
         <Button
            onClick={handleClick}
         >
            Go to checkout
         </Button>
      </Container>
   );
}

export default CartDropdown;