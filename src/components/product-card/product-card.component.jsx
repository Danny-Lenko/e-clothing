import Button, { BUTTON_TYPES } from '../button/button.component'
import { addCartItem } from '../../lib/store/cart/cart.action'
import { useDispatch, useSelector } from 'react-redux'
import { selectCartItems } from '../../lib/store/cart/cart.selector'
import { Container, Footer, Name, Price } from './product-card.styles'

const ProductCard = ({ product }) => {
   const { name, imageUrl, price } = product
   const cartItems = useSelector(selectCartItems)
   const dispatch = useDispatch()

   const handleClick = () => {
      dispatch(addCartItem(cartItems, product))
   }

   return (
      <Container>
         <img src={imageUrl} alt={name} />
         <Button buttonType={BUTTON_TYPES.inverted} onClick={handleClick}>
            Add to cart
         </Button>
         <Footer>
            <Name>{name}</Name>
            <Price>{price}</Price>
         </Footer>
      </Container>
   )
}

export default ProductCard
