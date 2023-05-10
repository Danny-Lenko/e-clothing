import { render, screen, fireEvent } from '@testing-library/react'
import { Provider } from 'react-redux'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import configureMockStore from 'redux-mock-store'
import CartDropdown from './cart-dropdown.component'
import { setIsOpen } from '../../lib/store/cart/cart.slice'

const mockStore = configureMockStore()

describe('CartDropdown component', () => {
   const history = createMemoryHistory()
   let store

   beforeEach(() => {
      store = mockStore({
         cart: {
            isOpen: true,
            cartItems: [
               {
                  id: 1,
                  name: 'Test Item',
                  imageUrl: 'test-image-url',
                  price: 10,
                  quantity: 1,
               },
            ],
         },
      })
      store.dispatch = jest.fn()
      // eslint-disable-next-line testing-library/no-render-in-setup
      render(
         <Provider store={store}>
            <Router location={history.location} navigator={history}>
               <CartDropdown />
            </Router>
         </Provider>
      )
   })

   it('should render the cart items', () => {
      expect(screen.getByText('Test Item')).toBeInTheDocument()
   })

   it('should render the "Go to checkout" button', () => {
      expect(screen.getByText('Go to checkout')).toBeInTheDocument()
   })

   it('should navigate to the checkout page when "Go to checkout" button is clicked', () => {
      const button = screen.getByText('Go to checkout')
      fireEvent.click(button)
      expect(store.dispatch).toHaveBeenCalledWith(setIsOpen(false))
      expect(history.location.pathname).toBe('/checkout')
   })

   it('should render the "The cart is empty" message when there are no cart items', () => {
      store = mockStore({
         cart: {
            isOpen: true,
            cartItems: [],
         },
      })
      render(
         <Provider store={store}>
            <Router location={history.location} navigator={history}>
               <CartDropdown />
            </Router>
         </Provider>
      )
      expect(screen.getByText('The cart is empty')).toBeInTheDocument()
   })
})
