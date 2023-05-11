import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { Provider } from 'react-redux'
import CheckoutCard from './checkout-card.component'
import configureMockStore from 'redux-mock-store'
import {
   removeProduct,
   increaseOrder,
   decreaseOrder,
} from '../../lib/store/cart/cart.slice'

const mockCartItem = {
   id: 1,
   name: 'Test Item',
   imageUrl: 'test-image-url',
   price: 10,
   ordered: 2,
}

const mockStore = configureMockStore()

describe('CheckoutCard component', () => {
   let store

   beforeEach(() => {
      store = mockStore({
         cart: {
            items: [
               {
                  id: 1,
                  name: 'Product 1',
                  imageUrl: 'image-url',
                  price: 10,
                  ordered: 2,
               },
            ],
         },
      })
      store.dispatch = jest.fn()
      // eslint-disable-next-line testing-library/no-render-in-setup
      render(
         <Provider store={store}>
            <CheckoutCard item={store.getState().cart.items[0]} />
         </Provider>
      )
   })

   it('should render the item name', () => {
      expect(screen.getByText('Product 1')).toBeInTheDocument()
   })

   it('should render the item quantity', () => {
      expect(screen.getByText('2')).toBeInTheDocument()
   })

   it('should render the item price', () => {
      expect(screen.getByText('10')).toBeInTheDocument()
   })

   it('should dispatch an action to increase the item order when the increase arrow is clicked', () => {
      const increaseArrow = screen.getByTitle(/increase/i)
      fireEvent.click(increaseArrow)
      expect(store.dispatch).toHaveBeenCalledWith(increaseOrder(1))
   })

   it('should dispatch an action to decrease the item order when the decrease arrow is clicked', () => {
      const decreaseArrow = screen.getByTitle(/decrease/i)
      fireEvent.click(decreaseArrow)
      expect(store.dispatch).toHaveBeenCalledWith(decreaseOrder(1))
   })

   it('should dispatch an action to remove the product when the remove button is clicked', async () => {
      const removeButton = screen.getByTitle(/remove/i)
      fireEvent.click(removeButton)
      expect(store.dispatch).toHaveBeenCalledWith(removeProduct(1))
   })
})
