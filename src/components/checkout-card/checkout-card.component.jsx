import { useDispatch } from 'react-redux'
import {
   removeProduct,
   increaseOrder,
   decreaseOrder,
} from '../../lib/store/cart/cart.slice'
import { Container, ImgContainer } from './checkout-card.styles'

const CheckoutCard = ({ item }) => {
   const dispatch = useDispatch()
   const { id, name, imageUrl, price, ordered } = item

   const handleRemove = () => {
      dispatch(removeProduct(id))
   }

   const handleIncrease = () => {
      dispatch(increaseOrder(id))
   }

   const handleDecrease = () => {
      dispatch(decreaseOrder(id))
   }

   return (
      <Container>
         <ImgContainer>
            <img src={imageUrl} alt={name} />
         </ImgContainer>

         <span className="name">{name}</span>

         <span className="quantity">
            <div className="arrow" onClick={handleDecrease}>
               &#10094;
            </div>
            <span className="value">{ordered}</span>
            <div className="arrow" onClick={handleIncrease}>
               &#10095;
            </div>
         </span>

         <span className="price">{price}</span>

         <span className="remove-button" onClick={handleRemove}>
            &#10005;
         </span>
      </Container>
   )
}

export default CheckoutCard
