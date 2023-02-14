import { useContext } from 'react';
import { CartContext } from '../../lib/contexts/cart.context';
import { Container, Image, ItemCount } from './cart-icon.styles';

const CartIcon = () => {
   const { isOpen, setIsOpen, cartCount } = useContext(CartContext)

   const handleClick = () => {
      setIsOpen(!isOpen)
   }

   return (
      <Container
         onClick={handleClick}
      >
         <Image className='shopping-icon' />
         <ItemCount>{cartCount}</ItemCount>
      </Container>
   );
}

export default CartIcon;