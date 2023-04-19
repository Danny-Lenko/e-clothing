// import { useDispatch } from 'react-redux'
// import {
//    removeProduct,
//    increaseOrder,
//    decreaseOrder,
// } from '../../lib/store/cart/cart.slice'
import { useContext } from 'react'
import { CartContext, ICartItem } from '../../lib/contexts/cart.context'
import { Container, ImgContainer } from './checkout-card.styles'

interface Props {
   item: ICartItem
}

const CheckoutCard: React.FC<Props> = ({ item }) => {
   // const dispatch = useDispatch()
   const { removeItemFromCart, addItemToCart, clearItemFromCart } =
      useContext(CartContext)
   const { id, name, imageUrl, price, quantity } = item

   const handleIncrease = () => {
      // dispatch(increaseOrder(id))
      removeItemFromCart(item)
   }

   const handleDecrease = () => {
      // dispatch(decreaseOrder(id))
      addItemToCart(item)
   }

   const handleRemove = () => {
      clearItemFromCart(item)
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
            <span className="value">{quantity}</span>
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
