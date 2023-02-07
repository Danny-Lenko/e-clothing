import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../button/button.component'
import CartItem from '../cart-item/cart-item.component'
import { CartContext } from '../../lib/contexts/cart.context'
import './cart-dropdown.styles.scss'

const CartDropdown = () => {
   const { cartItems, setIsOpen } = useContext(CartContext)
   const navigate = useNavigate()

   const handleClick = () => {
      navigate('/checkout')
      setIsOpen(false)
   }

   return (
      <div className='cart-dropdown-container'>
         <div className='cart-items'>
            {
               cartItems.map(item => <CartItem key={item.id} item={item} />)
            }
         </div>
         <Button
            onClick={handleClick}
         >
            Go to checkout
         </Button>
      </div>
   );
}

export default CartDropdown;