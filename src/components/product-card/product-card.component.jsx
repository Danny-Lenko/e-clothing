import Button, { BUTTON_TYPES } from '../button/button.component'
import { useCartUtils } from '../../lib/store/cart/useCartUtils'
import {
   Container,
   Footer,
   Name,
   Price
} from './product-card.styles'

const ProductCard = ({ product }) => {
   const { name, imageUrl, price } = product
   const { addCartItem } = useCartUtils()

   const handleClick = () => {
      addCartItem(product)
   }

   return (
      <Container>
         <img src={imageUrl} alt={name} />
         <Button
            buttonType={BUTTON_TYPES.inverted}
            onClick={handleClick}
         >
            Add to cart
         </Button>
         <Footer>
            <Name>{name}</Name>
            <Price>{price}</Price>
         </Footer>
      </Container>
   );
}

export default ProductCard;