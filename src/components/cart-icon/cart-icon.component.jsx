import { useContext } from 'react';
import { DropdownContext } from '../../lib/contexts/dropdown.context';
import { ReactComponent as Image } from '../../assets/shopping-bag.svg';
import './cart-icon.styles.scss'

const CartIcon = () => {
   const { setIsOpen } = useContext(DropdownContext)

   const handleClick = () => {
      setIsOpen(prev => !prev)
   }

   return (
      <div
         className='cart-icon-container'
         onClick={handleClick}
      >
         <Image className='shopping-icon' />
         <span className='item-count'>0</span>
      </div>
   );
}

export default CartIcon;