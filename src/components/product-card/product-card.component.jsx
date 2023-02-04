import { useContext } from 'react'
import Button from '../button/button.component'
import { CartContext } from '../../lib/contexts/cart.context'
import './product-card.styles.scss'

const ProductCard = ({ product }) => {
   const { name, imageUrl, price } = product
   const { addCartItem } = useContext(CartContext)

   const handleClick = () => {
      addCartItem(product)
   }

   return (
      <div className='product-card-container'>
         <img src={imageUrl} alt={name} />
         <Button
            buttonType='inverted'
            onClick={handleClick}
         >
            Add to cart
         </Button>
         <div className="footer">
            <span className="name">{name}</span>
            <span className="price">{price}</span>
         </div>
      </div>
   );
}

export default ProductCard;