import { useContext } from 'react'
import { CartContext } from '../../lib/contexts/cart.context'
import Button, { BUTTON_TYPES } from '../button/button.component'
import { ICategory } from '../../lib/contexts/categories.context'
import { Container, Footer, Name, Price } from './product-card.styles'

interface Props {
   product: ICategory
}

const ProductCard: React.FC<Props> = ({ product }) => {
   const { id, name, imageUrl, price } = product
   const cartItem = { id, name, imageUrl, price }
   const { addItemToCart } = useContext(CartContext)

   const handleClick = () => {
      addItemToCart(cartItem)
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
