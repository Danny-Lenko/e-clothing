import { useContext } from 'react';
import { CartContext } from '../../lib/contexts/cart.context';
import { Container, Image, ItemCount } from './cart-icon.styles'

const CartIcon = () => {
   const { isCartOpen, setIsCartOpen, cartCount } = useContext(CartContext);

   const handleClick = () => {
      setIsCartOpen(!isCartOpen);
   }

   return (
      <Container onClick={handleClick}>
         <Image className="shopping-icon" />
         <ItemCount>{cartCount}</ItemCount>
      </Container>
   )
}

export default CartIcon
