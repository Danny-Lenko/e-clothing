import { render, screen } from '../../test-utils'
import userEvent from '@testing-library/user-event'
import CheckoutCard from './checkout-card.component'
import {
   removeProduct,
   increaseOrder,
   decreaseOrder,
} from '../../lib/store/cart/cart.slice'
import { store } from '../../lib/store/store'

store.dispatch = jest.fn()

const mockCartItem = {
   id: 1,
   name: 'Test Item',
   imageUrl: 'test-image-url',
   price: 10,
   ordered: 2,
}

const mockCartItemTwo = {
   id: 2,
   name: 'Test Item Two',
   imageUrl: 'test-image-url-two',
   price: 11,
   ordered: 1
}

describe('CheckoutCard component', () => {
   it('should render the proper props', () => {
      render(<CheckoutCard item={mockCartItem} />)

      expect(screen.getByText(/test item/i)).toBeInTheDocument()
      expect(screen.getByText('2')).toBeInTheDocument()
      expect(screen.getByText('10')).toBeInTheDocument()
   })

   it('should dispatch an action to increase the item order when the increase arrow is clicked', () => {
      render(<CheckoutCard item={mockCartItem} />)

      const increaseArrow = screen.getByTitle(/increase/i)
      userEvent.click(increaseArrow)
      expect(store.dispatch).toHaveBeenCalledWith(increaseOrder(1))
      expect(store.dispatch).not.toHaveBeenCalledWith(decreaseOrder(1))
   })

   it('should dispatch increase the item order with the second product', () => {
      render(<CheckoutCard item={mockCartItemTwo} />)

      const increaseArrow = screen.getByTitle(/increase/i)
      userEvent.click(increaseArrow)
      expect(store.dispatch).toHaveBeenCalledWith(increaseOrder(2))
      expect(store.dispatch).not.toHaveBeenCalledWith(increaseOrder(1))
   })

   it('should dispatch an action to decrease the item order when the decrease arrow is clicked', () => {
      render(<CheckoutCard item={mockCartItem} />)

      const decreaseArrow = screen.getByTitle(/decrease/i)
      userEvent.click(decreaseArrow)
      expect(store.dispatch).toHaveBeenCalledWith(decreaseOrder(1))
      expect(store.dispatch).not.toHaveBeenCalledWith(decreaseOrder(2))
      expect(store.dispatch).not.toHaveBeenCalledWith(increaseOrder(1))
      expect(store.dispatch).not.toHaveBeenCalledWith(removeProduct(1))
   })

   it('should check dispatch decrease the item order the second product', () => {
      render(<CheckoutCard item={mockCartItemTwo} />)

      const decreaseArrow = screen.getByTitle(/decrease/i)
      userEvent.click(decreaseArrow)
      expect(store.dispatch).toHaveBeenCalledWith(decreaseOrder(2))
      expect(store.dispatch).not.toHaveBeenCalledWith(decreaseOrder(1))
   })

   it('should dispatch an action to remove the product when the remove button is clicked', () => {
      render(<CheckoutCard item={mockCartItem} />)

      const removeButton = screen.getByTitle(/remove/i)
      userEvent.click(removeButton)
      expect(store.dispatch).toHaveBeenCalledWith(removeProduct(1))
      expect(store.dispatch).not.toHaveBeenCalledWith(removeProduct(2))
      expect(store.dispatch).not.toHaveBeenCalledWith(increaseOrder(1))
      expect(store.dispatch).not.toHaveBeenCalledWith(decreaseOrder(1))
   })

   it('should check dispatch remove with the second product', () => {
      render(<CheckoutCard item={mockCartItemTwo} />)

      const removeButton = screen.getByTitle(/remove/i)
      userEvent.click(removeButton)
      expect(store.dispatch).toHaveBeenCalledWith(removeProduct(2))
      expect(store.dispatch).not.toHaveBeenCalledWith(removeProduct(1))
   })
})
