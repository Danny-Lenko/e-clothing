import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../button/button.component'
import CartItem from '../cart-item/cart-item.component'
import { CartContext } from '../../lib/contexts/cart.context'
import { Container, CartItems } from './cart-dropdown.styles'

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
            {
               cartItems.map(item => <CartItem key={item.id} item={item} />)
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