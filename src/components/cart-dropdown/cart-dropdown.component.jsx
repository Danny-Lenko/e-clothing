import { useContext } from 'react'
import Button from '../button/button.component'
import { CartContext } from '../../lib/contexts/cart.context'
import './cart-dropdown.styles.scss'

const CartDropdown = () => {
   const { cartItems } = useContext(CartContext)

   return (
      <div className='cart-dropdown-container'>
         <div className='cart-items'>
            {
               cartItems.map(item => <div>{item.name} - {item.ordered}</div>)
            }
         </div>
         <Button>Go to checkout</Button>
      </div>
   );
}

export default CartDropdown;