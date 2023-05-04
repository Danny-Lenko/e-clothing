import { render, screen } from '@testing-library/react'
import Auth from './auth.route'
import { Provider } from 'react-redux'
import { store } from '../../lib/store/store'

describe('auth', () => {
   it('renders auth component', () => {
      render(
         <Provider store={store}>
            <Auth />
         </Provider>
      )
      expect(screen.getByText('Sign Up')).toBeInTheDocument()
      // expect(screen.getByRole('textbox')).toBeInTheDocument();
      // expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
      // expect(screen.getByPlaceholderText('search text...')).toBeInTheDocument();
      // expect(screen.getByAltText('search image')).toBeInTheDocument();
      // expect(screen.getByDisplayValue('')).toBeInTheDocument();
   })
})
