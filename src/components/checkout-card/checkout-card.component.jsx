import { useDispatch, useSelector } from 'react-redux'
import {
   removeTitle,
   increaseOrder,
   decreaseOrder,
} from '../../lib/store/cart/cart.action'
import { selectCartItems } from '../../lib/store/cart/cart.selector'
import { Container, ImgContainer } from './checkout-card.styles'

const CheckoutCard = ({ item }) => {
   const cartItems = useSelector(selectCartItems)
   const dispatch = useDispatch()
   const { id, name, imageUrl, price, ordered } = item

   const handleRemove = () => {
      dispatch(removeTitle(cartItems, id))
   }

   const handleIncrease = () => {
      dispatch(increaseOrder(cartItems, id))
   }

   const handleDecrease = () => {
      dispatch(decreaseOrder(cartItems, id))
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
