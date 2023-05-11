import { FC, memo } from 'react'

import { useDispatch } from 'react-redux'
import {
   removeProduct,
   increaseOrder,
   decreaseOrder,
} from '../../lib/store/cart/cart.slice'
import { ICartItem } from '../../lib/store/cart/cart.slice'
import { Container, ImgContainer } from './checkout-card.styles'

interface Props {
   item: ICartItem
}

const CheckoutCard: FC<Props> = memo(({ item }) => {
   const dispatch = useDispatch()

   const { id, name, imageUrl, price, ordered } = item

   const handleIncrease = () => {
      dispatch(increaseOrder(id))
   }

   const handleDecrease = () => {
      dispatch(decreaseOrder(id))
   }

   const handleRemove = () => {
      dispatch(removeProduct(id))
   }

   return (
      <Container>
         <ImgContainer>
            <img src={imageUrl} alt={name} />
         </ImgContainer>

         <span className="name">{name}</span>

         <span className="quantity">
            <div className="arrow" onClick={handleDecrease} title="decrease">
               &#10094;
            </div>
            <span className="value" title='ordered'>{ordered}</span>
            <div className="arrow" onClick={handleIncrease} title="increase">
               &#10095;
            </div>
         </span>

         <span className="price">{price}</span>

         <span className="remove-button" onClick={handleRemove} title="remove">
            &#10005;
         </span>
      </Container>
   )
})

export default CheckoutCard
