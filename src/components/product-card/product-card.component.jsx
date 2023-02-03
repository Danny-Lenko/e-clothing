import Button from '../button/button.component'
import './product-card.styles.scss'

const ProductCard = ({ product }) => {
   const { name, imageUrl, price } = product

   return (
      <div className='product-card-container'>
         <img src={imageUrl} alt={name} />
         <Button
            buttonType='inverted'
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